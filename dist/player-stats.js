"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.parsePlayerStats = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _baseObject = _interopRequireDefault(require("./base-object/base-object"));

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

/**
 * Represents statistical values for a player's fantasy performance. The values may be real
 * statistical values (yards, attempts, etc) or fantasy point values.
 *
 * The stat map is not comprehensive, but should cover normal standard and PPR scoring rules. The
 * largest missing piece is IDP scoring.
 *
 * @augments {BaseObject}
 */
var PlayerStats = /*#__PURE__*/function (_BaseObject) {
  _inherits(PlayerStats, _BaseObject);

  var _super = _createSuper(PlayerStats);

  function PlayerStats() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, PlayerStats);

    _this = _super.call(this, options);
    _this.usesPoints = options.usesPoints;
    return _this;
  }

  return PlayerStats;
}(_baseObject["default"]);

PlayerStats.displayName = 'PlayerStats';
PlayerStats.responseMap = {
  passingYards: '3',
  passingTouchdowns: '4',
  passing2PtConversions: '19',
  passingInterceptions: '20',
  rushingYards: '24',
  rushingTouchdowns: '25',
  rushing2PtConversions: '26',
  receivingYards: '42',
  receivingTouchdowns: '43',
  receiving2PtConversions: '44',
  receivingReceptions: '53',
  lostFumbles: '72',
  madeFieldGoalsFrom50Plus: '74',
  madeFieldGoalsFrom40To49: '77',
  madeFieldGoalsFromUnder40: '80',
  missedFieldGoals: '85',
  madeExtraPoints: '86',
  missedExtraPoints: '88',
  defensive0PointsAllowed: '89',
  defensive1To6PointsAllowed: '90',
  defensive7To13PointsAllowed: '91',
  defensive14To17PointsAllowed: '92',
  defensiveBlockedKickForTouchdowns: '93',
  defensiveInterceptions: '95',
  defensiveFumbles: '96',
  defensiveBlockedKicks: '97',
  defensiveSafeties: '98',
  defensiveSacks: '99',
  kickoffReturnTouchdown: '101',
  puntReturnTouchdown: '102',
  fumbleReturnTouchdown: '103',
  interceptionReturnTouchdown: '104',
  defensive28To34PointsAllowed: '123',
  defensive35To45PointsAllowed: '124',
  defensive100To199YardsAllowed: '129',
  defensive200To299YardsAllowed: '130',
  defensive350To399YardsAllowed: '132',
  defensive400To449YardsAllowed: '133',
  defensive450To499YardsAllowed: '134',
  defensive500To549YardsAllowed: '135',
  defensiveOver550YardsAllowed: '136'
};

var parsePlayerStats = function parsePlayerStats(_ref) {
  var responseData = _ref.responseData,
      constructorParams = _ref.constructorParams,
      usesPoints = _ref.usesPoints,
      seasonId = _ref.seasonId,
      statKey = _ref.statKey,
      statSourceId = _ref.statSourceId,
      statSplitTypeId = _ref.statSplitTypeId;
  var filters = {
    statSourceId: statSourceId,
    statSplitTypeId: statSplitTypeId
  };

  if (seasonId) {
    filters.seasonId = seasonId;
  }

  var statData = _lodash["default"].find(responseData.player.stats, filters);

  var params = _lodash["default"].assign({}, constructorParams, {
    usesPoints: usesPoints
  });

  return PlayerStats.buildFromServer(_lodash["default"].get(statData, statKey), params);
};

exports.parsePlayerStats = parsePlayerStats;
var _default = PlayerStats;
exports["default"] = _default;