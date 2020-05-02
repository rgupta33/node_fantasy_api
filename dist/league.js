"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _baseObject = _interopRequireDefault(require("./base-object/base-object"));

var _constants = require("./constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/* global DRAFT_TYPE, LINEUP_LOCK_TIMES */

/**
 * Represents basic information about an ESPN fantasy football league.
 *
 * @augments {BaseObject}
 */
var League = /*#__PURE__*/function (_BaseObject) {
  _inherits(League, _BaseObject);

  var _super = _createSuper(League);

  function League() {
    _classCallCheck(this, League);

    return _super.apply(this, arguments);
  }

  return League;
}(_baseObject["default"]);

League.displayName = 'League';
League.responseMap = {
  name: 'name',
  size: 'size',
  isPublic: 'isPublic',
  draftSettings: {
    key: 'draftSettings',
    manualParse: function manualParse(responseData) {
      return {
        date: new Date(responseData.date),
        type: responseData.type,
        timePerPick: responseData.timePerSelection,
        canTradeDraftPicks: responseData.isTradingEnabled
      };
    }
  },
  rosterSettings: {
    key: 'rosterSettings',
    manualParse: function manualParse(responseData) {
      return {
        lineupPositionCount: _lodash["default"].mapKeys(responseData.lineupSlotCounts, function (count, position) {
          return _lodash["default"].get(_constants.slotCategoryIdToPositionMap, position);
        }),
        positionLimits: _lodash["default"].mapKeys(responseData.positionLimits, function (count, position) {
          return _lodash["default"].get(_constants.slotCategoryIdToPositionMap, position);
        }),
        locktime: responseData.rosterLocktimeType
      };
    }
  },
  scheduleSettings: {
    key: 'scheduleSettings',
    manualParse: function manualParse(responseData) {
      var numberOfPlayoffMatchups = _lodash["default"].toSafeInteger((17 - responseData.matchupPeriodCount * responseData.matchupPeriodLength) / responseData.playoffMatchupPeriodLength);

      return {
        numberOfRegularSeasonMatchups: responseData.matchupPeriodCount,
        regularSeasonMatchupLength: responseData.matchupPeriodLength,
        numberOfPlayoffMatchups: numberOfPlayoffMatchups,
        playoffMatchupLength: responseData.playoffMatchupPeriodLength,
        numberOfPlayoffTeams: responseData.playoffTeamCount
      };
    }
  }
};
var _default = League;
exports["default"] = _default;