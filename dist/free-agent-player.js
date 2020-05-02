"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _baseObject = _interopRequireDefault(require("./base-object/base-object"));

var _player = _interopRequireDefault(require("./player"));

var _playerStats = require("./player-stats");

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
 * Represents a player and their raw stats.
 *
 * @augments {BaseObject}
 */
var FreeAgentPlayer = /*#__PURE__*/function (_BaseObject) {
  _inherits(FreeAgentPlayer, _BaseObject);

  var _super = _createSuper(FreeAgentPlayer);

  function FreeAgentPlayer() {
    _classCallCheck(this, FreeAgentPlayer);

    return _super.apply(this, arguments);
  }

  return FreeAgentPlayer;
}(_baseObject["default"]);

FreeAgentPlayer.displayName = 'FreeAgentPlayer';
FreeAgentPlayer.responseMap = {
  player: {
    key: 'player',
    manualParse: function manualParse(responseData, data, constructorParams) {
      return _player["default"].buildFromServer(data, constructorParams);
    }
  },
  rawStats: {
    key: 'player',
    manualParse: function manualParse(responseData, data, constructorParams) {
      return (0, _playerStats.parsePlayerStats)({
        responseData: data,
        constructorParams: constructorParams,
        usesPoints: false,
        seasonId: constructorParams.seasonId,
        statKey: 'stats',
        statSourceId: 0,
        statSplitTypeId: 0
      });
    }
  },
  projectedRawStats: {
    key: 'player',
    manualParse: function manualParse(responseData, data, constructorParams) {
      return (0, _playerStats.parsePlayerStats)({
        responseData: data,
        constructorParams: constructorParams,
        usesPoints: false,
        seasonId: constructorParams.seasonId,
        statKey: 'stats',
        statSourceId: 1,
        statSplitTypeId: 0
      });
    }
  }
};
var _default = FreeAgentPlayer;
exports["default"] = _default;