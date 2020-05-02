"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _baseCacheableObject = _interopRequireDefault(require("./base-cacheable-object/base-cacheable-object.js"));

var _constants = require("../constants.js");

var _player = _interopRequireDefault(require("./player.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('Player', function () {
  test('extends BaseCacheableObject', function () {
    var instance = new _player["default"]();
    expect(instance).toBeInstanceOf(_baseCacheableObject["default"]);
  });
  describe('constructor', function () {
    describe('when options are not passed', function () {
      var testPropIsUndefined = function testPropIsUndefined(prop) {
        test("".concat(prop, " is undefined"), function () {
          var newInstance = new _player["default"]();
          expect(_lodash["default"].get(newInstance, prop)).toBeUndefined();
        });
      };

      testPropIsUndefined('seasonId');
    });
    describe('when options are passed', function () {
      var testPropIsSetFromOptions = function testPropIsSetFromOptions(prop) {
        test("".concat(prop, " is set from options"), function () {
          var value = 25;
          var newInstance = new _player["default"](_defineProperty({}, prop, value));
          expect(_lodash["default"].get(newInstance, prop)).toBe(value);
        });
      };

      testPropIsSetFromOptions('seasonId');
    });
  });
  describe('responseMap', function () {
    var buildPlayer = function buildPlayer(data, options) {
      return _player["default"].buildFromServer(data, options);
    };

    describe('jerseyNumber', function () {
      describe('manualParse', function () {
        test('converts response to a number', function () {
          var data = {
            jersey: '23'
          };
          var player = buildPlayer(data);
          expect(player.jerseyNumber).toBe(23);
        });
      });
    });
    describe('proTeam', function () {
      describe('manualParse', function () {
        test('maps team id to human readable string', function () {
          var proTeamId = 22;
          var data = {
            proTeamId: proTeamId
          };
          var player = buildPlayer(data);
          expect(player.proTeam).toBe(_lodash["default"].get(_constants.nflTeamIdToNFLTeam, proTeamId));
        });
      });
    });
    describe('proTeamAbbreviation', function () {
      describe('manualParse', function () {
        test('maps team id to human readable abbreviation', function () {
          var proTeamId = 22;
          var data = {
            proTeamId: proTeamId
          };
          var player = buildPlayer(data);
          expect(player.proTeamAbbreviation).toBe(_lodash["default"].get(_constants.nflTeamIdToNFLTeamAbbreviation, proTeamId));
        });
      });
    });
    describe('defaultPosition', function () {
      describe('manualParse', function () {
        test('maps id to human readable position', function () {
          var defaultPositionId = 2;
          var data = {
            defaultPositionId: defaultPositionId
          };
          var player = buildPlayer(data);
          expect(player.defaultPosition).toBe(_lodash["default"].get(_constants.slotCategoryIdToPositionMap, defaultPositionId));
        });
      });
    });
    describe('eligiblePositions', function () {
      describe('manualParse', function () {
        test('maps ids to positions', function () {
          var eligibleSlots = [0, 1, 2];
          var data = {
            eligibleSlots: eligibleSlots
          };
          var player = buildPlayer(data);
          expect.hasAssertions();

          _lodash["default"].forEach(player.eligiblePositions, function (position, index) {
            expect(position).toBe(_lodash["default"].get(_constants.slotCategoryIdToPositionMap, eligibleSlots[index]));
          });
        });
      });
    });
    describe('acquiredDate', function () {
      describe('manualParse', function () {
        describe('when data is passed', function () {
          test('returns a Date', function () {
            var acquisitionDate = 1545432134218;
            var data = {
              acquisitionDate: acquisitionDate
            };
            var player = buildPlayer(data);
            expect(player.acquiredDate).toEqual(new Date(acquisitionDate));
          });
        });
        describe('when data is not passed', function () {
          test('returns undefined', function () {
            var acquisitionDate = undefined;
            var data = {
              acquisitionDate: acquisitionDate
            };
            var player = buildPlayer(data);
            expect(player.acquiredDate).toBeUndefined();
          });
        });
      });
    });
  });
  describe('class methods', function () {
    describe('getIDParams', function () {
      var testReturnsUndefined = function testReturnsUndefined(_ref) {
        var id = _ref.id,
            seasonId = _ref.seasonId;
        test('returns undefined', function () {
          var params = {
            id: id,
            seasonId: seasonId
          };
          expect(_player["default"].getIDParams(params)).toBeUndefined();
        });
      };

      describe('when called with no params', function () {
        test('returns undefined', function () {
          expect(_player["default"].getIDParams()).toBeUndefined();
        });
      });
      describe('when id is defined', function () {
        describe('when seasonId is defined', function () {
          test('returns a valid caching id', function () {
            var params = {
              id: 341243,
              seasonId: 2017
            };

            var returnedCachingId = _player["default"].getIDParams(params);

            expect(returnedCachingId).toEqual(params);
          });
        });
        describe('when seasonId is undefined', function () {
          testReturnsUndefined({
            id: 341243
          });
        });
      });
      describe('when id is undefined', function () {
        describe('when seasonId is defined', function () {
          testReturnsUndefined({
            seasonId: 2017
          });
        });
        describe('when seasonId is undefined', function () {
          testReturnsUndefined({});
        });
      });
    });
  });
});