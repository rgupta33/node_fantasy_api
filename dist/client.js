"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _lodash = _interopRequireDefault(require("lodash"));

var _boxscore = _interopRequireDefault(require("./boxscore"));

var _freeAgentPlayer = _interopRequireDefault(require("./free-agent-player"));

var _league = _interopRequireDefault(require("./league"));

var _nflGame = _interopRequireDefault(require("./nfl-game"));

var _team = _interopRequireDefault(require("./team"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_axios["default"].defaults.baseURL = 'https://fantasy.espn.com/apis/v3/games/ffl/seasons/';
/**
 * Provides functionality to make a variety of API calls to ESPN for a given fantasy football
 * league. This class should be used by consuming projects.
 *
 * @class
 */

var Client = /*#__PURE__*/function () {
  function Client() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Client);

    this.leagueId = options.leagueId;
    this.setCookies({
      espnS2: options.espnS2,
      SWID: options.SWID
    });
  }
  /**
   * Set cookies from ESPN for interacting with private leagues in NodeJS. Both cookie smust be
   * provided to be set. See the README for instructions on how to find these cookies.
   *
   * @param {object} options Required options object.
   * @param {string} options.espnS2 The value of the `espn_s2` cookie key:value pair to auth with.
   * @param {string} options.SWID The value of the `SWID` cookie key:value pair to auth with.
   */


  _createClass(Client, [{
    key: "setCookies",
    value: function setCookies(_ref) {
      var espnS2 = _ref.espnS2,
          SWID = _ref.SWID;

      if (espnS2 && SWID) {
        this.espnS2 = espnS2;
        this.SWID = SWID;
      }
    }
    /**
     * Returns all boxscores for a week.
     *
     * NOTE: Due to the way ESPN populates data, both the `scoringPeriodId` and `matchupPeriodId` are
     * required and must correspond with each other correctly.
     *
     * @param  {object} options Required options object.
     * @param  {number} options.seasonId The season in which the boxscore occurs.
     * @param  {number} options.matchupPeriodId The matchup period in which the boxscore occurs.
     * @param  {number} options.scoringPeriodId The scoring period in which the boxscore occurs.
     * @returns {Boxscore[]} All boxscores for the week
     */

  }, {
    key: "getBoxscoreForWeek",
    value: function getBoxscoreForWeek(_ref2) {
      var _this = this;

      var seasonId = _ref2.seasonId,
          matchupPeriodId = _ref2.matchupPeriodId,
          scoringPeriodId = _ref2.scoringPeriodId;

      var route = this.constructor._buildRoute({
        base: "".concat(seasonId, "/segments/0/leagues/").concat(this.leagueId),
        params: "?view=mMatchup&view=mMatchupScore&scoringPeriodId=".concat(scoringPeriodId)
      });

      return _axios["default"].get(route, this._buildAxiosConfig()).then(function (response) {
        var schedule = _lodash["default"].get(response.data, 'schedule');

        var data = _lodash["default"].filter(schedule, {
          matchupPeriodId: matchupPeriodId
        });

        return _lodash["default"].map(data, function (matchup) {
          return _boxscore["default"].buildFromServer(matchup, {
            leagueId: _this.leagueId,
            seasonId: seasonId
          });
        });
      });
    }
    /**
     * Returns boxscores WITHOUT ROSTERS for PREVIOUS seasons. Useful for pulling historical
     * scoreboards.
     *
     * NOTE: This route will error for the current season, as ESPN only exposes this data for previous
     * seasons.
     *
     * NOTE: Due to the way ESPN populates data, both the `scoringPeriodId` and `matchupPeriodId` are
     * required and must correspond with each other correctly.
     *
     * @param  {object} options Required options object.
     * @param  {number} options.seasonId The season in which the boxscore occurs.
     * @param  {number} options.matchupPeriodId The matchup period in which the boxscore occurs.
     * @param  {number} options.scoringPeriodId The scoring period in which the boxscore occurs.
     * @returns {Boxscore[]} All boxscores for the week
     */

  }, {
    key: "getHistoricalScoreboardForWeek",
    value: function getHistoricalScoreboardForWeek(_ref3) {
      var _this2 = this;

      var seasonId = _ref3.seasonId,
          matchupPeriodId = _ref3.matchupPeriodId,
          scoringPeriodId = _ref3.scoringPeriodId;

      var route = this.constructor._buildRoute({
        base: "".concat(this.leagueId),
        params: "?scoringPeriodId=".concat(scoringPeriodId, "&seasonId=").concat(seasonId) + '&view=mMatchupScore&view=mScoreboard&view=mSettings&view=mTopPerformers&view=mTeam'
      });

      var axiosConfig = this._buildAxiosConfig({
        baseURL: 'https://fantasy.espn.com/apis/v3/games/ffl/leagueHistory/'
      });

      return _axios["default"].get(route, axiosConfig).then(function (response) {
        var schedule = _lodash["default"].get(response.data[0], 'schedule'); // Data is an array instead of object


        var data = _lodash["default"].filter(schedule, {
          matchupPeriodId: matchupPeriodId
        });

        return _lodash["default"].map(data, function (matchup) {
          return _boxscore["default"].buildFromServer(matchup, {
            leagueId: _this2.leagueId,
            seasonId: seasonId
          });
        });
      });
    }
    /**
     * Returns all free agents (in terms of the league's rosters) for a given week.
     *
     * NOTE: `scoringPeriodId` of 0 corresponds to the preseason; `18` for after the season ends.
     *
     * @param  {object} options Required options object.
     * @param  {number} options.seasonId The season to grab data from.
     * @param  {number} options.scoringPeriodId The scoring period to grab free agents from.
     * @returns {FreeAgentPlayer[]} The list of free agents.
     */

  }, {
    key: "getFreeAgents",
    value: function getFreeAgents(_ref4) {
      var _this3 = this;

      var seasonId = _ref4.seasonId,
          scoringPeriodId = _ref4.scoringPeriodId;

      var route = this.constructor._buildRoute({
        base: "".concat(seasonId, "/segments/0/leagues/").concat(this.leagueId),
        params: "?scoringPeriodId=".concat(scoringPeriodId, "&view=kona_player_info")
      });

      return _axios["default"].get(route, this._buildAxiosConfig()).then(function (response) {
        var data = _lodash["default"].get(response.data, 'players');

        return _lodash["default"].map(data, function (player) {
          return _freeAgentPlayer["default"].buildFromServer(player, {
            leagueId: _this3.leagueId,
            seasonId: seasonId
          });
        });
      });
    }
    /**
     * Returns an array of Team object representing each fantasy football team in the FF league.
     *
     * @param  {object} options Required options object.
     * @param  {number} options.seasonId The season to grab data from.
     * @param  {number} options.scoringPeriodId The scoring period in which to grab teams from.
     * @returns {Team[]} The list of teams.
     */

  }, {
    key: "getTeamsAtWeek",
    value: function getTeamsAtWeek(_ref5) {
      var _this4 = this;

      var seasonId = _ref5.seasonId,
          scoringPeriodId = _ref5.scoringPeriodId;

      var route = this.constructor._buildRoute({
        base: "".concat(seasonId, "/segments/0/leagues/").concat(this.leagueId),
        params: "?scoringPeriodId=".concat(scoringPeriodId, "&view=mRoster&view=mTeam")
      });

      return _axios["default"].get(route, this._buildAxiosConfig()).then(function (response) {
        var data = _lodash["default"].get(response.data, 'teams');

        return _lodash["default"].map(data, function (team) {
          return _team["default"].buildFromServer(team, {
            leagueId: _this4.leagueId,
            seasonId: seasonId
          });
        });
      });
    }
    /**
     * Returns all NFL games that occur in the passed timeframe. NOTE: Date format must be "YYYYMMDD".
     *
     * @param  {object} options Required options object.
     * @param  {string} options.startDate Must be in "YYYYMMDD" format.
     * @param  {string} options.endDate   Must be in "YYYYMMDD" format.
     * @returns {NFLGame[]} The list of NFL games.
     */

  }, {
    key: "getNFLGamesForPeriod",
    value: function getNFLGamesForPeriod(_ref6) {
      var startDate = _ref6.startDate,
          endDate = _ref6.endDate;

      var route = this.constructor._buildRoute({
        base: 'apis/fantasy/v2/games/ffl/games',
        params: "?dates=".concat(startDate, "-").concat(endDate, "&pbpOnly=true")
      });

      var axiosConfig = this._buildAxiosConfig({
        baseURL: 'https://site.api.espn.com/'
      });

      return _axios["default"].get(route, axiosConfig).then(function (response) {
        var data = _lodash["default"].get(response.data, 'events');

        return _lodash["default"].map(data, function (game) {
          return _nflGame["default"].buildFromServer(game);
        });
      });
    }
    /**
     * Returns info on an ESPN fantasy football league
     *
     * @param   {object} options Required options object.
     * @param   {number} options.seasonId The season to grab data from.
     * @returns {League} The league info.
     */

  }, {
    key: "getLeagueInfo",
    value: function getLeagueInfo(_ref7) {
      var _this5 = this;

      var seasonId = _ref7.seasonId;

      var route = this.constructor._buildRoute({
        base: "".concat(seasonId, "/segments/0/leagues/").concat(this.leagueId),
        params: '?view=mSettings'
      });

      return _axios["default"].get(route, this._buildAxiosConfig()).then(function (response) {
        var data = _lodash["default"].get(response.data, 'settings');

        return _league["default"].buildFromServer(data, {
          leagueId: _this5.leagueId,
          seasonId: seasonId
        });
      });
    }
    /**
     * Correctly builds an axios config with cookies, if set on the instance
     *
     * @param   {object} config An axios config.
     * @returns {object} An axios config with cookies added if set on instance
     * @private
     */

  }, {
    key: "_buildAxiosConfig",
    value: function _buildAxiosConfig(config) {
      if (this.espnS2 && this.SWID) {
        var headers = {
          Cookie: "espn_s2=".concat(this.espnS2, "; SWID=").concat(this.SWID, ";")
        };
        return _lodash["default"].merge({}, config, {
          headers: headers,
          withCredentials: true
        });
      }

      console.log("end of build axios config");
      console.log(config);
      return config;
    }
  }], [{
    key: "_buildRoute",
    value: function _buildRoute(_ref8) {
      var base = _ref8.base,
          params = _ref8.params;
      return "".concat(base).concat(params);
    }
  }]);

  return Client;
}();

var _default = Client;
exports["default"] = _default;