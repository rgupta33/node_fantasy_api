"use strict";

var _baseObject = _interopRequireDefault(require("../base-classes/base-object/base-object"));

var _player = _interopRequireDefault(require("../player/player"));

var _playerStats = _interopRequireDefault(require("../player-stats/player-stats"));

var _freeAgentPlayer = _interopRequireDefault(require("./free-agent-player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('FreeAgentPlayer', function () {
  test('extends BaseObject', function () {
    var instance = new _freeAgentPlayer["default"]();
    expect(instance).toBeInstanceOf(_baseObject["default"]);
  });
  describe('responseMap', function () {
    var buildFreeAgentPlayer = function buildFreeAgentPlayer(data, options) {
      return _freeAgentPlayer["default"].buildFromServer(data, options);
    };

    var data;
    var pointStats;
    var projectedStats;
    var seasonId;
    beforeEach(function () {
      seasonId = 2018;
      pointStats = {
        appliedStats: {
          24: 2.3,
          25: 6
        },
        seasonId: seasonId,
        stats: {
          24: 3,
          25: 6.4
        },
        statSourceId: 0,
        statSplitTypeId: 0
      };
      projectedStats = {
        appliedStats: {
          24: 4.2,
          25: 1
        },
        seasonId: seasonId,
        stats: {
          24: 3.2,
          25: 4
        },
        statSourceId: 1,
        statSplitTypeId: 0
      };
      data = {
        player: {
          stats: [projectedStats, pointStats]
        }
      };
    });
    describe('player', function () {
      describe('manualParse', function () {
        test('returns a Player', function () {
          var player = buildFreeAgentPlayer(data, {
            seasonId: seasonId
          });
          expect(player.player).toBeInstanceOf(_player["default"]);
        });
      });
    });
    describe('rawStats', function () {
      describe('manualParse', function () {
        test('maps points to a PlayerStats instance', function () {
          var player = buildFreeAgentPlayer(data, {
            seasonId: seasonId
          });

          var expectedStats = _playerStats["default"].buildFromServer(pointStats.stats, {
            usesPoints: false,
            seasonId: seasonId
          });

          expect(player.rawStats).toEqual(expectedStats);
        });
      });
    });
    describe('projectedRawStats', function () {
      describe('manualParse', function () {
        test('maps points to a PlayerStats instance', function () {
          var player = buildFreeAgentPlayer(data, {
            seasonId: seasonId
          });

          var expectedStats = _playerStats["default"].buildFromServer(projectedStats.stats, {
            usesPoints: false,
            seasonId: seasonId
          });

          expect(player.projectedRawStats).toEqual(expectedStats);
        });
      });
    });
  });
});