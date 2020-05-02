"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _baseObject = _interopRequireDefault(require("./base-object/base-object"));

var _boxscorePlayer = _interopRequireDefault(require("./boxscore-player"));

var _boxscore = _interopRequireDefault(require("./boxscore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Boxscore', function () {
  test('extends BaseObject', function () {
    var instance = new _boxscore["default"]();
    expect(instance).toBeInstanceOf(_baseObject["default"]);
  });
  describe('responseMap', function () {
    var buildBoxscore = function buildBoxscore(data, options) {
      return _boxscore["default"].buildFromServer(data, options);
    };

    var data;
    var playerData;
    beforeEach(function () {
      playerData = {
        lineupSlotId: 2,
        playerPoolEntry: {
          player: {
            stats: [{
              appliedStats: {
                24: 2.3,
                25: 6
              },
              statSourceId: 0,
              statSplitTypeId: 1
            }]
          }
        }
      };
      data = {
        home: {
          totalPoints: 123,
          teamId: 3,
          rosterForCurrentScoringPeriod: {
            entries: [playerData]
          }
        },
        away: {
          totalPoints: 324,
          teamId: 2,
          rosterForCurrentScoringPeriod: {
            entries: [playerData]
          }
        }
      };
    });
    describe('homeScore', function () {
      describe('manualParse', function () {
        describe('when totalPointsLive is populated on the team\'s response', function () {
          test('maps to totalPointsLive', function () {
            data.home.totalPointsLive = data.home.totalPoints + 12;
            var boxscore = buildBoxscore(data);
            expect(boxscore.homeScore).toBe(data.home.totalPointsLive);
          });
        });
        describe('when totalPointsLive is not populated on the team\'s response', function () {
          test('maps to totalPoints', function () {
            delete data.home.totalPointsLive;
            var boxscore = buildBoxscore(data);
            expect(boxscore.homeScore).toBe(data.home.totalPoints);
          });
        });
      });
    });
    describe('awayScore', function () {
      describe('manualParse', function () {
        describe('when totalPointsLive is populated on the team\'s response', function () {
          test('maps to totalPointsLive', function () {
            data.away.totalPointsLive = data.away.totalPoints + 12;
            var boxscore = buildBoxscore(data);
            expect(boxscore.awayScore).toBe(data.away.totalPointsLive);
          });
        });
        describe('when totalPointsLive is not populated on the team\'s response', function () {
          test('maps to totalPoints', function () {
            delete data.away.totalPointsLive;
            var boxscore = buildBoxscore(data);
            expect(boxscore.awayScore).toBe(data.away.totalPoints);
          });
        });
      });
    });
    describe('homeRoster', function () {
      describe('manualParse', function () {
        test('maps to BoxscorePlayer instances', function () {
          var boxscore = buildBoxscore(data);
          expect.hasAssertions();

          _lodash["default"].forEach(boxscore.homeRoster, function (player) {
            expect(player).toBeInstanceOf(_boxscorePlayer["default"]);
          });
        });
      });
    });
    describe('awayRoster', function () {
      describe('manualParse', function () {
        test('maps to BoxscorePlayer instances', function () {
          var boxscore = buildBoxscore(data);
          expect.hasAssertions();

          _lodash["default"].forEach(boxscore.awayRoster, function (player) {
            expect(player).toBeInstanceOf(_boxscorePlayer["default"]);
          });
        });
      });
    });
  });
});