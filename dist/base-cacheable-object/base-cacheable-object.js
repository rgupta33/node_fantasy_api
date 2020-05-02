"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _baseObject = _interopRequireDefault(require("../base-object/base-object.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * The base class for all project objects that can be cached. This class is extremely useful for
 * classes which have unique identifiers but cannot make API calls.
 *
 * Note: The id used for caching may be different than any id used by the response from the wire.
 * This allows for caching of an instance with the same id but different season data. Example:
 * League with different `seasonId`s can all be cached using this functionality. See the
 * `getCacheId` method for implementation.
 *
 * When managing the cache, never set an object to an `undefined` id. Always check that the result
 * from `getCacheId` is valid (see `_populateObject` for an example). Otherwise the cache will not
 * be in the correct state.
 *
 * @extends {BaseObject}
 */
var BaseCacheableObject = /*#__PURE__*/function (_BaseObject) {
  _inherits(BaseCacheableObject, _BaseObject);

  var _super = _createSuper(BaseCacheableObject);

  function BaseCacheableObject() {
    _classCallCheck(this, BaseCacheableObject);

    return _super.apply(this, arguments);
  }

  _createClass(BaseCacheableObject, [{
    key: "getIDParams",

    /**
     * Returns an object containing all IDs used for API requests and caching for the instance.
     * @return {Object}
     */
    value: function getIDParams() {
      return this.constructor.getIDParams(this);
    }
    /**
     * Returns the id used for caching. Important for classes that have multiple identifiers. Example:
     * League is identified by its `leagueId` and its `seasonId`. This method prevents separate
     * seasons from overriding each other's data.
     * @return {String|undefined}
     */

  }, {
    key: "getCacheId",
    value: function getCacheId() {
      return this.constructor.getCacheId(this);
    }
  }], [{
    key: "_populateObject",

    /**
     * Defers to `BaseObject._populateObject` and then caches the instance using the caching id from
     * `getCacheId`.
     * @override
     */
    value: function _populateObject(_ref) {
      var data = _ref.data,
          constructorParams = _ref.constructorParams,
          instance = _ref.instance,
          isDataFromServer = _ref.isDataFromServer;

      var populatedInstance = _get(_getPrototypeOf(BaseCacheableObject), "_populateObject", this).call(this, {
        data: data,
        constructorParams: constructorParams,
        instance: instance,
        isDataFromServer: isDataFromServer
      });

      if (isDataFromServer && populatedInstance.getCacheId()) {
        this.cache[populatedInstance.getCacheId()] = populatedInstance;
      }

      return populatedInstance;
    }
    /**
     * Returns all cached instances of an BaseCacheableObject. If no cache exists, a cache object is
     * created. This implementation ensures each class has a unique cache of only instances of the
     * BaseCacheableObject that does not overlap with other BaseCacheableObject classes. The keys of
     * the cache should use the caching id implemented in `getCacheId`.
     * @return {Object.<String, BaseCacheableObject>} The cache of BaseCacheableObjects.
     */

  }, {
    key: "clearCache",

    /**
     * Resets cache to an empty object.
     */
    value: function clearCache() {
      this._cache = {};
    }
    /**
     * Returns a cached instance matching the passed caching id if it exists. Otherwise, returns
     * undefined.
     * @param  {Number} id This id must match the form of the caching id provided by `getCacheId`.
     * @return {BaseCacheableObject|undefined}
     */

  }, {
    key: "get",
    value: function get(id) {
      return _lodash["default"].get(this.cache, id);
    }
    /**
     * Should be overridden by each subclass. Returns an object containing all IDs used for API
     * requests and caching.
     * @return {Object}
     */

  }, {
    key: "getIDParams",
    value: function getIDParams() {
      return {};
    }
    /**
     * Constructs and returns an id for the cache if possible from the passed params. If construction
     * is not possible, returns undefined.
     * @param  {Object} idParams
     * @return {string|undefined}
     */

  }, {
    key: "getCacheId",
    value: function getCacheId(idParams) {
      var cacheId = _lodash["default"].map(this.getIDParams(idParams), function (value, key) {
        return "".concat(key, "=").concat(value, ";");
      }).join('');

      return _lodash["default"].isEmpty(cacheId) ? undefined : cacheId;
    }
  }, {
    key: "cache",
    get: function get() {
      if (!this._cache) {
        this._cache = {};
      }

      return this._cache;
    }
    /**
     * Sets the cache object.
     * @param {Object.<String, BaseCacheableObject>} cache
     */
    ,
    set: function set(cache) {
      this._cache = cache;
    }
  }]);

  return BaseCacheableObject;
}(_baseObject["default"]);

BaseCacheableObject.displayName = 'BaseCacheableObject';
var _default = BaseCacheableObject;
exports["default"] = _default;