"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _baseCacheableObject = _interopRequireDefault(require("./base-cacheable-object/base-cacheable-object.js"));

var _player = _interopRequireDefault(require("./player"));

var _team = _interopRequireDefault(require("./team"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('Team', function () {
  test('extends BaseCacheableObject', function () {
    var instance = new _team["default"]();
    expect(instance).toBeInstanceOf(_baseCacheableObject["default"]);
  });
  describe('constructor', function () {
    describe('when options are not passed', function () {
      var testPropIsUndefined = function testPropIsUndefined(prop) {
        test("".concat(prop, " is undefined"), function () {
          var newInstance = new _team["default"]();
          expect(_lodash["default"].get(newInstance, prop)).toBeUndefined();
        });
      };

      testPropIsUndefined('leagueId');
      testPropIsUndefined('seasonId');
    });
    describe('when options are passed', function () {
      var testPropIsSetFromOptions = function testPropIsSetFromOptions(prop) {
        test("".concat(prop, " is set from options"), function () {
          var value = 25;
          var newInstance = new _team["default"](_defineProperty({}, prop, value));
          expect(_lodash["default"].get(newInstance, prop)).toBe(value);
        });
      };

      testPropIsSetFromOptions('leagueId');
      testPropIsSetFromOptions('seasonId');
    });
  });
  describe('responseMap', function () {
    var buildTeam = function buildTeam(data, options) {
      return _team["default"].buildFromServer(data, options);
    };

    describe('name', function () {
      describe('manualParse', function () {
        test('interpolates location and nickname into a single string', function () {
          var data = {
            location: ' First ',
            nickname: ' Last ',
            name: 'This is not used'
          };
          var team = buildTeam(data);
          expect(team.name).toBe("".concat(_lodash["default"].trim(data.location), " ").concat(_lodash["default"].trim(data.nickname)));
        });
      });
    });
    describe('roster', function () {
      describe('manualParse', function () {
        test('returns an array of players', function () {
          var data = {
            roster: {
              entries: [{
                playerPoolEntry: {
                  id: 0
                }
              }, {
                playerPoolEntry: {
                  id: 1
                }
              }, {
                playerPoolEntry: {
                  id: 2
                }
              }]
            }
          };
          var team = buildTeam(data, {
            seasonId: 2018
          });
          expect.hasAssertions();

          _lodash["default"].forEach(team.roster, function (player, index) {
            expect(player).toBeInstanceOf(_player["default"]);
            expect(player.id).toBe(index);
            expect(player.seasonId).toBe(team.seasonId);
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
          expect(_team["default"].getIDParams(params)).toBeUndefined();
        });
      };

      describe('when called with no params', function () {
        test('returns undefined', function () {
          expect(_team["default"].getIDParams()).toBeUndefined();
        });
      });
      describe('when id is defined', function () {
        describe('when leagueId is defined', function () {
          describe('when seasonId is defined', function () {
            test('returns a valid caching id', function () {
              var params = {
                id: 341243,
                leagueId: 412322,
                seasonId: 2017
              };

              var returnedCachingId = _team["default"].getIDParams(params);

              expect(returnedCachingId).toEqual(params);
            });
          });
          describe('when seasonId is undefined', function () {
            testReturnsUndefined({
              id: 341243,
              leagueId: 312321
            });
          });
        });
        describe('when leagueId is not defined', function () {
          describe('when seasonId is defined', function () {
            testReturnsUndefined({
              id: 341243,
              seasonId: 2018
            });
          });
          describe('when seasonId is undefined', function () {
            testReturnsUndefined({
              id: 341243
            });
          });
        });
      });
      describe('when id is undefined', function () {
        describe('when leagueId is defined', function () {
          describe('when seasonId is defined', function () {
            testReturnsUndefined({
              leagueId: 231231,
              seasonId: 2018
            });
          });
          describe('when seasonId is undefined', function () {
            testReturnsUndefined({
              leagueId: 231231
            });
          });
        });
        describe('when leagueId is not defined', function () {
          describe('when seasonId is defined', function () {
            testReturnsUndefined({
              seasonId: 2018
            });
          });
          describe('when seasonId is undefined', function () {
            testReturnsUndefined({});
          });
        });
      });
    });
  });
});