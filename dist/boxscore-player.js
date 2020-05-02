"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _baseObject = _interopRequireDefault(require("./base-object/base-object"));

var _player = _interopRequireDefault(require("./player"));

var _playerStats = require("./player-stats");

var _constants = require("./constants");

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

/* global PlayerStats */

/**
 * Represents a player and their stats on a boxscore.
 *
 * @augments {BaseObject}
 */
var BoxscorePlayer = /*#__PURE__*/function (_BaseObject) {
  _inherits(BoxscorePlayer, _BaseObject);

  var _super = _createSuper(BoxscorePlayer);

  function BoxscorePlayer() {
    _classCallCheck(this, BoxscorePlayer);

    return _super.apply(this, arguments);
  }

  return BoxscorePlayer;
}(_baseObject["default"]);

BoxscorePlayer.displayName = 'BoxscorePlayer';
BoxscorePlayer.responseMap = {
  player: {
    key: 'playerPoolEntry',
    BaseObject: _player["default"]
  },
  position: {
    key: 'lineupSlotId',
    manualParse: function manualParse(responseData) {
      return _lodash["default"].get(_constants.slotCategoryIdToPositionMap, responseData);
    }
  },
  totalPoints: 'playerPoolEntry.appliedStatTotal',
  pointBreakdown: {
    key: 'playerPoolEntry',
    manualParse: function manualParse(responseData, data, constructorParams) {
      return (0, _playerStats.parsePlayerStats)({
        responseData: responseData,
        constructorParams: constructorParams,
        usesPoints: true,
        statKey: 'appliedStats',
        statSourceId: 0,
        statSplitTypeId: 1
      });
    }
  },
  projectedPointBreakdown: {
    key: 'playerPoolEntry',
    manualParse: function manualParse(responseData, data, constructorParams) {
      return (0, _playerStats.parsePlayerStats)({
        responseData: responseData,
        constructorParams: constructorParams,
        usesPoints: true,
        statKey: 'appliedStats',
        statSourceId: 1,
        statSplitTypeId: 1
      });
    }
  },
  rawStats: {
    key: 'playerPoolEntry',
    manualParse: function manualParse(responseData, data, constructorParams) {
      return (0, _playerStats.parsePlayerStats)({
        responseData: responseData,
        constructorParams: constructorParams,
        usesPoints: false,
        statKey: 'stats',
        statSourceId: 0,
        statSplitTypeId: 1
      });
    }
  },
  projectedRawStats: {
    key: 'playerPoolEntry',
    manualParse: function manualParse(responseData, data, constructorParams) {
      return (0, _playerStats.parsePlayerStats)({
        responseData: responseData,
        constructorParams: constructorParams,
        usesPoints: false,
        statKey: 'stats',
        statSourceId: 1,
        statSplitTypeId: 1
      });
    }
  }
};
var _default = BoxscorePlayer;
exports["default"] = _default;