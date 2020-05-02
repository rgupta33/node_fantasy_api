"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _constants = require("../constants.js");

var _nflGame = _interopRequireDefault(require("./nfl-game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('NFLGame', function () {
  describe('responseMap', function () {
    var awayTeam;
    var data;
    var homeTeam;
    beforeEach(function () {
      awayTeam = {
        id: 7,
        homeAway: 'away',
        record: '0-1',
        score: ''
      };
      homeTeam = {
        id: 3,
        homeAway: 'home',
        record: '1-0',
        score: ''
      };
      data = {
        date: '2018-11-30T01:20:00Z',
        status: 'pre',
        competitors: [homeTeam, awayTeam]
      };
    });
    describe('startTime', function () {
      test('returns a JS Date', function () {
        var game = _nflGame["default"].buildFromServer(data);

        expect(game.startTime).toEqual(new Date(data.date));
      });
    });
    describe('gameStatus', function () {
      test('maps to GAME_STATUSES', function () {
        var game = _nflGame["default"].buildFromServer(data);

        expect(game.gameStatus).toBe(_lodash["default"].get(_nflGame["default"].GAME_STATUSES, data.status));
      });
    });
    describe('homeTeam', function () {
      test('returns an object', function () {
        var game = _nflGame["default"].buildFromServer(data);

        expect(game.homeTeam).toEqual(expect.any(Object));
      });
      test('maps id as an integer', function () {
        var game = _nflGame["default"].buildFromServer(data);

        expect(game.homeTeam.id).toBe(homeTeam.id);
      });
      test('maps team id to full team name', function () {
        var game = _nflGame["default"].buildFromServer(data);

        expect(game.homeTeam.team).toBe(_lodash["default"].get(_constants.nflTeamIdToNFLTeam, homeTeam.id));
      });
      test('maps team id to team abbreviation', function () {
        var game = _nflGame["default"].buildFromServer(data);

        expect(game.homeTeam.teamAbbrev).toBe(_lodash["default"].get(_constants.nflTeamIdToNFLTeamAbbreviation, homeTeam.id));
      });
      test('maps record directly', function () {
        var game = _nflGame["default"].buildFromServer(data);

        expect(game.homeTeam.record).toBe(homeTeam.record);
      });
      test('maps score to integer', function () {
        var game = _nflGame["default"].buildFromServer(data);

        expect(game.homeTeam.score).toBe(0);
      });
    });
    describe('awayTeam', function () {
      test('returns an object', function () {
        var game = _nflGame["default"].buildFromServer(data);

        expect(game.awayTeam).toEqual(expect.any(Object));
      });
      test('maps id as an integer', function () {
        var game = _nflGame["default"].buildFromServer(data);

        expect(game.awayTeam.id).toBe(awayTeam.id);
      });
      test('maps team id to full team name', function () {
        var game = _nflGame["default"].buildFromServer(data);

        expect(game.awayTeam.team).toBe(_lodash["default"].get(_constants.nflTeamIdToNFLTeam, awayTeam.id));
      });
      test('maps team id to team abbreviation', function () {
        var game = _nflGame["default"].buildFromServer(data);

        expect(game.awayTeam.teamAbbrev).toBe(_lodash["default"].get(_constants.nflTeamIdToNFLTeamAbbreviation, awayTeam.id));
      });
      test('maps record directly', function () {
        var game = _nflGame["default"].buildFromServer(data);

        expect(game.awayTeam.record).toBe(awayTeam.record);
      });
      test('maps score to integer', function () {
        var game = _nflGame["default"].buildFromServer(data);

        expect(game.awayTeam.score).toBe(0);
      });
    });
  });
});