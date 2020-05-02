"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _baseObject = _interopRequireDefault(require("./base-object/base-object"));

var _constants = require("../constants.js");

var _league = _interopRequireDefault(require("./league"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('League', function () {
  test('extends BaseObject', function () {
    expect(new _league["default"]()).toBeInstanceOf(_baseObject["default"]);
  });
  describe('responseMap', function () {
    var data;
    var draftSettings;
    var rosterSettings;
    var scheduleSettings;
    beforeEach(function () {
      draftSettings = {
        date: 1535476500000,
        type: 'SNAKE',
        timePerSelection: 120,
        isTradingEnabled: true
      };
      rosterSettings = {
        lineupSlotCounts: {
          1: 2,
          3: 3
        },
        positionLimits: {
          1: 2,
          3: 3
        },
        rosterLocktimeType: 'INDIVIDUAL_GAME'
      };
      scheduleSettings = {
        matchupPeriodCount: 15,
        matchupPeriodLength: 1,
        playoffMatchupPeriodLength: 1,
        playoffTeamCount: 4
      };
      data = {
        draftSettings: draftSettings,
        rosterSettings: rosterSettings,
        scheduleSettings: scheduleSettings
      };
    });
    describe('draftSettings', function () {
      test('returns an object', function () {
        var league = _league["default"].buildFromServer(data);

        expect(league.draftSettings).toEqual(expect.any(Object));
      });
      test('maps date as a JS Date instance', function () {
        var league = _league["default"].buildFromServer(data);

        expect(league.draftSettings.date).toEqual(new Date(draftSettings.date));
      });
      test('maps type directly', function () {
        var league = _league["default"].buildFromServer(data);

        expect(league.draftSettings.type).toBe(draftSettings.type);
      });
      test('maps timePerPick directly', function () {
        var league = _league["default"].buildFromServer(data);

        expect(league.draftSettings.timePerPick).toBe(draftSettings.timePerSelection);
      });
      test('maps canTradeDraftPicks directly', function () {
        var league = _league["default"].buildFromServer(data);

        expect(league.draftSettings.canTradeDraftPicks).toBe(draftSettings.isTradingEnabled);
      });
    });
    describe('rosterSettings', function () {
      test('returns an object', function () {
        var league = _league["default"].buildFromServer(data);

        expect(league.rosterSettings).toEqual(expect.any(Object));
      });
      test('maps lineupSlotCounts to object using slotCategoryIdToPositionMap for keys', function () {
        var league = _league["default"].buildFromServer(data);

        expect.assertions(_lodash["default"].keys(rosterSettings.lineupSlotCounts).length);

        _lodash["default"].forEach(rosterSettings.lineupSlotCounts, function (value, key) {
          var position = _lodash["default"].get(_constants.slotCategoryIdToPositionMap, key);

          expect(_lodash["default"].get(league.rosterSettings.lineupPositionCount, position)).toBe(value);
        });
      });
      test('maps positionLimits to object using slotCategoryIdToPositionMap for keys', function () {
        var league = _league["default"].buildFromServer(data);

        expect.assertions(_lodash["default"].keys(rosterSettings.positionLimits).length);

        _lodash["default"].forEach(rosterSettings.positionLimits, function (value, key) {
          var position = _lodash["default"].get(_constants.slotCategoryIdToPositionMap, key);

          expect(_lodash["default"].get(league.rosterSettings.positionLimits, position)).toBe(value);
        });
      });
      test('maps locktime directly', function () {
        var league = _league["default"].buildFromServer(data);

        expect(league.rosterSettings.locktime).toBe(rosterSettings.rosterLocktimeType);
      });
    });
    describe('scheduleSettings', function () {
      test('returns an object', function () {
        var league = _league["default"].buildFromServer(data);

        expect(league.scheduleSettings).toEqual(expect.any(Object));
      });
      test('maps numberOfRegularSeasonMatchups directly', function () {
        var league = _league["default"].buildFromServer(data);

        expect(league.scheduleSettings.numberOfRegularSeasonMatchups).toBe(scheduleSettings.matchupPeriodCount);
      });
      test('maps regularSeasonMatchupLength directly', function () {
        var league = _league["default"].buildFromServer(data);

        expect(league.scheduleSettings.regularSeasonMatchupLength).toBe(scheduleSettings.matchupPeriodLength);
      });
      test('calculates numberOfPlayoffMatchups', function () {
        var league = _league["default"].buildFromServer(data);

        var expected = _lodash["default"].toSafeInteger((17 - scheduleSettings.matchupPeriodCount * scheduleSettings.matchupPeriodLength) / scheduleSettings.playoffMatchupPeriodLength);

        expect(league.scheduleSettings.numberOfPlayoffMatchups).toBe(expected);
      });
      test('maps playoffMatchupLength directly', function () {
        var league = _league["default"].buildFromServer(data);

        expect(league.scheduleSettings.playoffMatchupLength).toBe(scheduleSettings.playoffMatchupPeriodLength);
      });
      test('maps numberOfPlayoffTeams directly', function () {
        var league = _league["default"].buildFromServer(data);

        expect(league.scheduleSettings.numberOfPlayoffTeams).toBe(scheduleSettings.playoffTeamCount);
      });
    });
  });
});