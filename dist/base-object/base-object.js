"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The base class for all project objects. Provides data mapping functionality.
 */
var BaseObject = /*#__PURE__*/function () {
  /**
   * @param {Object} options Properties to be assigned to the BaseObject. Must match the keys of the
   *                         BaseObject's `responseMap` or valid options defined by the class's
   *                         `constructor`.
   */
  function BaseObject() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BaseObject);

    if (!_lodash["default"].isEmpty(options)) {
      this.constructor._populateObject({
        data: options,
        instance: this,
        isDataFromServer: false
      });
    }
  }
  /**
   * The class name. Minification will break `this.constructor.name`; this allows for readable
   * logging even in minified code.
   * @type {String}
   */


  _createClass(BaseObject, null, [{
    key: "_processObjectValue",

    /**
     * Helper for processing items on `responseMap`s that are objects.
     * @private
     *
     * @param  {Object} options.data
     * @param  {BaseObject} options.instance The instance to populate. This instance will be mutated.
     * @param  {Object} options.constructorParams Params to be passed to the instance's constructor.
     *                                            Useful for passing parent data, such as `leagueId`.
     * @param  {String} options.value The value of the responseMap entry being parsed.
     * @return {*}
     */
    value: function _processObjectValue(_ref) {
      var data = _ref.data,
          constructorParams = _ref.constructorParams,
          instance = _ref.instance,
          value = _ref.value;

      if (!value.key) {
        throw new Error("".concat(this.displayName, ": _populateObject: Invalid responseMap object. Object must define ") + 'key. See docs for typedef of ResponseMapValueObject.');
      }

      var responseData = _lodash["default"].get(data, value.key);

      if (_lodash["default"].isFunction(value.manualParse)) {
        return value.manualParse(responseData, data, constructorParams, instance);
      } else if (value.BaseObject) {
        var buildInstance = function buildInstance(passedData) {
          return value.BaseObject.buildFromServer(passedData, constructorParams);
        };

        return value.isArray ? _lodash["default"].map(responseData, buildInstance) : buildInstance(responseData);
      }

      throw new Error("".concat(this.displayName, ": _populateObject: Invalid responseMap object. Object must define ") + '`BaseObject` or `manualParse`. See docs for typedef of ResponseMapValueObject.');
    }
    /**
     * Helper method for `_populateObject` that houses the attribute mapping logic. Should never be
     * used by other methods. See {@link ResponseMapValueObject} for `responseMap` documentation.
     * @private
     *
     * @param  {Object} options.data
     * @param  {BaseObject} options.instance The instance to populate. This instance will be mutated.
     * @param  {Object} options.constructorParams Params to be passed to the instance's constructor.
     *                                            Useful for passing parent data, such as `leagueId`.
     * @param  {Boolean} options.isDataFromServer When true, the data came from the ESPN API over the
     *                                            wire. When false, the data came locally.
     * @param  {String} options.key The key of the responseMap entry being parsed.
     * @param  {String} options.value The value of the responseMap entry being parsed.
     */

  }, {
    key: "_processResponseMapItem",
    value: function _processResponseMapItem(_ref2) {
      var data = _ref2.data,
          constructorParams = _ref2.constructorParams,
          instance = _ref2.instance,
          isDataFromServer = _ref2.isDataFromServer,
          key = _ref2.key,
          value = _ref2.value;

      /**
       * @typedef {Object} BaseObject~ResponseMapValueObject
       *
       * The `responseMap` can have two values: a string or a ResponseMapValueObject. When string, the
       * data found on that response is directly mapped to the BaseObject without mutation. When
       * ResponseMapValueObject, the data at the `key` will be used to create BaseObject(s) or
       * manually parsed with a provided `manualParse function`. Either result is attached to the
       * BaseObject being populated.
       *
       * @property {String} key The key on the response data where the data can be found. This must be
       *                        defined.
       * @property {BaseObject} BaseObject The BaseObject to create with the response data.
       * @property {Boolean} isArray Whether or not the response data is an array. Useful for
       *                             attributes such as "teams".
       * @property {Boolean} defer Whether or not to wait to parse the entry until a second pass of
       *                           the map. This is useful for populating items with cached instances
       *                           that are not guaranteed to be parsed/cached during initial parsing.
       *                           Example: Using Team instances on League.
       * @property {function} manualParse A function to manually apply logic to the response. This
       *                                  function must return its result to be attached to the
       *                                  populated BaseObject. The arguments to this function are:
       *                                  (data at the key), (the whole response), (the instance being
       *                                  populated).
       * @example
       * static responseMap = {
       *   teamId: 'teamId',
       *   team: {
       *     key: 'team_on_response',
       *     BaseObject: true
       *   },
       *   teams: {
       *     key: 'teams_on_response',
       *     BaseObject: Team,
       *     isArray: true
       *   },
       *   manualTeams: {
       *     key: 'manual_teams_on_response',
       *     BaseObject: Team,
       *     manualParse: (responseData, response, constructorParams, instance) => (
       *       Team.buildFromServer(responseData)
       *     )
       *   }
       * };
       */
      var item;

      if (!isDataFromServer) {
        item = _lodash["default"].get(data, key);
      } else if (_lodash["default"].isString(value)) {
        item = _lodash["default"].get(data, value);
      } else if (_lodash["default"].isPlainObject(value)) {
        item = this._processObjectValue({
          data: data,
          constructorParams: constructorParams,
          instance: instance,
          value: value
        });
      } else {
        throw new Error("".concat(this.displayName, ": _populateObject: Did not recognize responseMap value type for key ") + "".concat(key));
      }

      if (!_lodash["default"].isUndefined(item)) {
        _lodash["default"].set(instance, key, item);
      }
    }
    /**
     * Returns the passed instance of the BaseObject populated with the passed data, mapping the
     * attributes defined in the value of responseMap to the matching key.
     * @private
     *
     * @param  {Object} options.data The data to map onto the passed instance.
     * @param  {BaseObject} options.instance The instance to populate. This instance will be mutated.
     * @param  {Boolean} options.isDataFromServer When true, the data came from ESPN. When false, the
     *                                            data came locally.
     * @return {BaseObject} The mutated BaseObject instance.
     */

  }, {
    key: "_populateObject",
    value: function _populateObject(_ref3) {
      var _this = this;

      var data = _ref3.data,
          constructorParams = _ref3.constructorParams,
          instance = _ref3.instance,
          isDataFromServer = _ref3.isDataFromServer;

      if (!instance) {
        throw new Error("".concat(this.displayName, ": _populateObject: Did not receive instance to populate"));
      } else if (_lodash["default"].isEmpty(data)) {
        return instance;
      }

      var deferredMapItems = {};

      _lodash["default"].forEach(this.responseMap, function (value, key) {
        if (_lodash["default"].isPlainObject(value) && value.defer) {
          _lodash["default"].set(deferredMapItems, key, value);
        } else {
          _this._processResponseMapItem({
            data: data,
            constructorParams: constructorParams,
            instance: instance,
            isDataFromServer: isDataFromServer,
            key: key,
            value: value
          });
        }
      });

      _lodash["default"].forEach(deferredMapItems, function (value, key) {
        _this._processResponseMapItem({
          data: data,
          constructorParams: constructorParams,
          instance: instance,
          isDataFromServer: isDataFromServer,
          key: key,
          value: value
        });
      });

      return instance;
    }
    /**
     * Returns a new instance of the BaseObject populated with the passed data that came from ESPN,
     * mapping the attributes defined in the value of responseMap to the matching key. Use this method
     * when constructing BaseObjects with server responses.
     * @param  {Object} data Data originating from the server.
     * @param  {Object} constructorParams Params to be passed to the instance's constructor. Useful
     *                                    for passing parent data, such as `leagueId`.
     * @return {BaseObject} A new instance of the BaseObject populated with the passed data.
     */

  }, {
    key: "buildFromServer",
    value: function buildFromServer(data, constructorParams) {
      var instance = new this(constructorParams);
      var dataToUse = this.flattenResponse ? (0, _utils.flattenObject)(data) : data;

      this._populateObject({
        data: dataToUse,
        constructorParams: constructorParams,
        instance: instance,
        isDataFromServer: true
      });

      return instance;
    }
  }]);

  return BaseObject;
}();

BaseObject.displayName = 'BaseObject';
var _default = BaseObject;
exports["default"] = _default;