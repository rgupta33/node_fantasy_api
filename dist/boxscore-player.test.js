"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _baseObject = _interopRequireDefault(require("./base-object/base-object.js"));

var _playerStats = _interopRequireDefault(require("./player-stats"));

var _constants = require("./constants");

var _boxscorePlayer = _interopRequireDefault(require("./boxscore-player.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('BoxscorePlayer', function () {
  test('extends BaseObject', function () {
    var instance = new _boxscorePlayer["default"]();
    expect(instance).toBeInstanceOf(_baseObject["default"]);
  });
  describe('responseMap', function () {
    var buildBoxscorePlayer = function buildBoxscorePlayer(data, options) {
      return _boxscorePlayer["default"].buildFromServer(data, options);
    };

    var data;
    var pointStats;
    var projectedStats;
    beforeEach(function () {
      pointStats = {
        appliedStats: {
          24: 2.3,
          25: 6
        },
        stats: {
          24: 3,
          25: 6.4
        },
        statSourceId: 0,
        statSplitTypeId: 1
      };
      projectedStats = {
        appliedStats: {
          24: 4.2,
          25: 1
        },
        stats: {
          24: 3.2,
          25: 4
        },
        statSourceId: 1,
        statSplitTypeId: 1
      };
      data = {
        lineupSlotId: 2,
        playerPoolEntry: {
          player: {
            stats: [projectedStats, pointStats]
          }
        }
      };
    });
    describe('position', function () {
      describe('manualParse', function () {
        test('maps id to human readable position', function () {
          var player = buildBoxscorePlayer(data);
          expect(player.position).toBe(_lodash["default"].get(_constants.slotCategoryIdToPositionMap, data.lineupSlotId));
        });
      });
    });
    describe('pointBreakdown', function () {
      describe('manualParse', function () {
        test('maps points to a PlayerStats instance', function () {
          var player = buildBoxscorePlayer(data);

          var expectedStats = _playerStats["default"].buildFromServer(pointStats.appliedStats, {
            usesPoints: true
          });

          expect(player.pointBreakdown).toEqual(expectedStats);
        });
      });
    });
    describe('projectedPointBreakdown', function () {
      describe('manualParse', function () {
        test('maps points to a PlayerStats instance', function () {
          var player = buildBoxscorePlayer(data);

          var expectedStats = _playerStats["default"].buildFromServer(projectedStats.appliedStats, {
            usesPoints: true
          });

          expect(player.projectedPointBreakdown).toEqual(expectedStats);
        });
      });
    });
    describe('rawStats', function () {
      describe('manualParse', function () {
        test('maps points to a PlayerStats instance', function () {
          var player = buildBoxscorePlayer(data);

          var expectedStats = _playerStats["default"].buildFromServer(pointStats.stats, {
            usesPoints: false
          });

          expect(player.rawStats).toEqual(expectedStats);
        });
      });
    });
    describe('projectedRawStats', function () {
      describe('manualParse', function () {
        test('maps points to a PlayerStats instance', function () {
          var player = buildBoxscorePlayer(data);

          var expectedStats = _playerStats["default"].buildFromServer(projectedStats.stats, {
            usesPoints: false
          });

          expect(player.projectedRawStats).toEqual(expectedStats);
        });
      });
    });
  });
});