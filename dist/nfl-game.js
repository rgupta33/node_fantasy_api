"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _baseObject = _interopRequireDefault(require("./base-object/base-object"));

var _constants = require("./constants.js");

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Represents an NFL game between two NFL teams.
 *
 * @augments {BaseObject}
 */
var NFLGame = /*#__PURE__*/function (_BaseObject) {
  _inherits(NFLGame, _BaseObject);

  var _super = _createSuper(NFLGame);

  function NFLGame() {
    _classCallCheck(this, NFLGame);

    return _super.apply(this, arguments);
  }

  _createClass(NFLGame, null, [{
    key: "_buildTeamAttribute",

    /**
     * @typedef {object} NFLGame~NFLTeam
     *
     * @property {number} id The id of the NFL team in the ESPN universe.
     * @property {string} team The name of the NFL team.
     * @property {string} teamAbbrev The name abbreviation of the NFL team.
     * @property {string} record The win/loss/tie record of the NFL team.
     * @property {number} score The score of the NFL team in the game.
     */

    /**
     * @typedef {object} NFLGame~NFLGameMap
     *
     * @property {Date} startTime The date and time when the game starts in Eastern Time.
     * @property {number} quarter The quarter the game is in.
     * @property {string} clock The current game clock formatted as MM:SS.
     * @property {string} odds The odds for the game formatted as "TEAM_ABBREV LINE"
     * @property {string} broadcaster Who is broadcasting the game on TV.
     *
     * @property {string} gameStatus Whether or not the game has not started, is in progress, or has
     *                               finished.
     * @property {NFLGame~NFLTeam} homeTeam The home team in the game.
     * @property {NFLGame~NFLTeam} awayTeam The away team in the game.
     */

    /**
     * @type {NFLGame~NFLGameMap}
     */
    value: function _buildTeamAttribute(teamResponseData) {
      return {
        id: _lodash["default"].toSafeInteger(teamResponseData.id),
        team: _lodash["default"].get(_constants.nflTeamIdToNFLTeam, teamResponseData.id),
        teamAbbrev: _lodash["default"].get(_constants.nflTeamIdToNFLTeamAbbreviation, teamResponseData.id),
        record: teamResponseData.record,
        score: _lodash["default"].toSafeInteger(teamResponseData.score)
      };
    }
  }]);

  return NFLGame;
}(_baseObject["default"]);

NFLGame.displayName = 'NFLGame';
NFLGame.GAME_STATUSES = {
  pre: 'Not Started',
  "in": 'In Progress',
  post: 'Final'
};
NFLGame.responseMap = {
  startTime: {
    key: 'date',
    manualParse: function manualParse(responseData) {
      return new Date(responseData);
    }
  },
  quarter: 'period',
  clock: 'clock',
  odds: 'odds',
  broadcaster: 'broadcast',
  gameStatus: {
    key: 'status',
    manualParse: function manualParse(responseData) {
      return _lodash["default"].get(_this.GAME_STATUSES, responseData);
    }
  },
  homeTeam: {
    key: 'competitors',
    manualParse: function manualParse(responseData) {
      return _this._buildTeamAttribute(_lodash["default"].find(responseData, {
        homeAway: 'home'
      }));
    }
  },
  awayTeam: {
    key: 'competitors',
    manualParse: function manualParse(responseData) {
      return _this._buildTeamAttribute(_lodash["default"].find(responseData, {
        homeAway: 'away'
      }));
    }
  }
};
var _default = NFLGame;
exports["default"] = _default;