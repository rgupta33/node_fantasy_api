"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _lodash = _interopRequireDefault(require("lodash"));

var _baseObject = _interopRequireDefault(require("./base-object/base-object"));

var _playerStats = _interopRequireWildcard(require("./player-stats"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('PlayerStats', function () {
  test('extends BaseObject', function () {
    var instance = new _playerStats["default"]();
    expect(instance).toBeInstanceOf(_baseObject["default"]);
  });
  describe('constructor', function () {
    describe('when options are not passed', function () {
      var testPropIsUndefined = function testPropIsUndefined(prop) {
        test("".concat(prop, " is undefined"), function () {
          var newInstance = new _playerStats["default"]();
          expect(_lodash["default"].get(newInstance, prop)).toBeUndefined();
        });
      };

      testPropIsUndefined('usesPoints');
    });
    describe('when options are passed', function () {
      var testPropIsSetFromOptions = function testPropIsSetFromOptions(prop) {
        test("".concat(prop, " is set from options"), function () {
          var value = true;
          var newInstance = new _playerStats["default"](_defineProperty({}, prop, value));
          expect(_lodash["default"].get(newInstance, prop)).toBe(value);
        });
      };

      testPropIsSetFromOptions('usesPoints');
    });
  });
});
describe('parsePlayerStats', function () {
  var data;
  beforeEach(function () {
    data = {
      player: {
        stats: [{
          appliedStats: {
            24: 23,
            25: 46
          },
          seasonId: 2018,
          stats: {
            24: 318,
            25: 63
          },
          statSourceId: 0,
          statSplitTypeId: 1
        }, {
          appliedStats: {
            24: 2.3,
            25: 6
          },
          seasonId: 2017,
          stats: {
            24: 3,
            25: 6.4
          },
          statSourceId: 0,
          statSplitTypeId: 1
        }]
      }
    };
  });
  test('maps stats to a PlayerStats instance', function () {
    var stats = (0, _playerStats.parsePlayerStats)({
      responseData: data,
      constructorParams: {},
      usesPoints: false,
      statKey: 'stats',
      statSourceId: 0,
      statSplitTypeId: 1
    });
    expect(stats).toBeInstanceOf(_playerStats["default"]);
  });
  describe('when seasonId is passed', function () {
    test('filters based on seasonId in addition to stat ids', function () {
      var stats = (0, _playerStats.parsePlayerStats)({
        responseData: data,
        constructorParams: {},
        usesPoints: false,
        seasonId: 2018,
        statKey: 'stats',
        statSourceId: 0,
        statSplitTypeId: 1
      });
      expect(stats).toBeInstanceOf(_playerStats["default"]);
      expect(stats.rushingYards).toBe(318);
    });
  });
});