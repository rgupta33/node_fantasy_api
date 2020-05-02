"use strict";

var _baseObject = _interopRequireDefault(require("./base-object/base-object.js"));

var _baseCacheableObjectBaseCacheableObject = _interopRequireDefault(require("./base-cacheable-object.base-cacheable-object.js"));

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

var TestBaseCacheableObject = /*#__PURE__*/function (_BaseCacheableObject) {
  _inherits(TestBaseCacheableObject, _BaseCacheableObject);

  var _super = _createSuper(TestBaseCacheableObject);

  function TestBaseCacheableObject() {
    _classCallCheck(this, TestBaseCacheableObject);

    return _super.apply(this, arguments);
  }

  return TestBaseCacheableObject;
}(_baseCacheableObjectBaseCacheableObject["default"]);

TestBaseCacheableObject.displayName = 'TestBaseCacheableObject';
describe('BaseCacheableObject', function () {
  describe('class methods', function () {
    describe('_populateObject', function () {
      var data;
      var isDataFromServer;
      var instance;
      beforeEach(function () {
        data = {};
        isDataFromServer = true;
        instance = new TestBaseCacheableObject();
      });
      test('defers to BaseObject\'s _populateObject for data mapping functionality', function () {
        // Super lazy way to test
        jest.spyOn(_baseObject["default"], '_populateObject');

        TestBaseCacheableObject._populateObject({
          data: data,
          instance: instance,
          isDataFromServer: isDataFromServer
        });

        expect(_baseObject["default"]._populateObject).toBeCalledWith({
          data: data,
          instance: instance,
          isDataFromServer: isDataFromServer
        });

        _baseObject["default"]._populateObject.mockRestore();
      });

      var testDoesNotCache = function testDoesNotCache() {
        test('does not cache the instance', function () {
          TestBaseCacheableObject.clearCache();

          TestBaseCacheableObject._populateObject({
            data: data,
            instance: instance,
            isDataFromServer: isDataFromServer
          });

          expect(TestBaseCacheableObject.cache).toEqual({});
        });
      };

      describe('when isDataFromServer is true', function () {
        beforeEach(function () {
          isDataFromServer = true;
        });
        describe('when a caching id is returned by the populated instance', function () {
          test('caches populated instance', function () {
            var id = 'someCacheId23';
            jest.spyOn(instance, 'getCacheId').mockReturnValue(id);

            TestBaseCacheableObject._populateObject({
              data: data,
              instance: instance,
              isDataFromServer: isDataFromServer
            });

            expect(TestBaseCacheableObject.get(id)).toBe(instance);
          });
        });
        describe('when a caching id is not returned by the populated instance', function () {
          beforeEach(function () {
            jest.spyOn(instance, 'getCacheId').mockReturnValue();
          });
          testDoesNotCache();
        });
      });
      describe('when isDataFromServer is false', function () {
        beforeEach(function () {
          isDataFromServer = false;
        });
        describe('when a caching id is returned by the populated instance', function () {
          beforeEach(function () {
            jest.spyOn(instance, 'getCacheId').mockReturnValue('someCacheId23');
          });
          testDoesNotCache();
        });
        describe('when a caching id is not returned by the populated instance', function () {
          beforeEach(function () {
            jest.spyOn(instance, 'getCacheId').mockReturnValue();
          });
          testDoesNotCache();
        });
      });
      test('returns populated instance', function () {
        var returnedInstance = TestBaseCacheableObject._populateObject({
          data: data,
          instance: instance,
          isDataFromServer: isDataFromServer
        });

        expect(returnedInstance).toBe(instance);
      });
    });
    describe('get cache', function () {
      describe('when _cache is not set', function () {
        beforeEach(function () {
          TestBaseCacheableObject._cache = undefined;
        });
        test('sets _cache to an empty object', function () {
          var returnedCache = TestBaseCacheableObject.cache;
          expect(returnedCache).toEqual({});
        });
        test('returns empty object', function () {
          expect(TestBaseCacheableObject.cache).toEqual({});
        });
      });
      describe('when _cache is set', function () {
        test('does not mutate _cache', function () {
          var cache = {
            some: 'cache'
          };
          TestBaseCacheableObject._cache = cache;
          var returnedCache = TestBaseCacheableObject.cache;
          expect(returnedCache).toEqual(cache);
        });
        test('returns _cache', function () {
          var cache = {
            some: 'cache'
          };
          TestBaseCacheableObject._cache = cache;
          expect(TestBaseCacheableObject.cache).toBe(cache);
        });
      });
    });
    describe('set cache', function () {
      beforeEach(function () {
        TestBaseCacheableObject._cache = undefined;
      });
      test('sets _cache', function () {
        var cache = {
          some: 'cache'
        };
        TestBaseCacheableObject.cache = cache;
        expect(TestBaseCacheableObject._cache).toBe(cache);
      });
    });
    describe('clearCache', function () {
      test('sets cache to empty object', function () {
        TestBaseCacheableObject.cache = {
          some: 'cached items'
        };
        TestBaseCacheableObject.clearCache();
        expect(TestBaseCacheableObject.cache).toEqual({});
      });
    });
    describe('get', function () {
      describe('when there is a instance with a matching id', function () {
        test('returns the instance', function () {
          var id = 12;
          var instance = new TestBaseCacheableObject({
            testId: id
          });
          TestBaseCacheableObject.cache[id] = instance;
          var cachedInstance = TestBaseCacheableObject.get(id);
          expect(cachedInstance).toBe(instance);
          TestBaseCacheableObject.clearCache();
        });
      });
      describe('when there is not a instance with a matching id', function () {
        test('returns undefined', function () {
          var id = 12;
          var instance = new TestBaseCacheableObject({
            testId: id + 1
          });
          TestBaseCacheableObject.cache[id] = undefined;
          TestBaseCacheableObject.cache[id + 1] = instance;
          var cachedInstance = TestBaseCacheableObject.get(id);
          expect(cachedInstance).toBeUndefined();
          TestBaseCacheableObject.clearCache();
        });
      });
    });
    describe('getIDParams', function () {
      test('returns empty object', function () {
        expect(TestBaseCacheableObject.getIDParams()).toEqual({});
      });
    });
    describe('getCacheId', function () {
      describe('when getIDParams returns a non-empty object', function () {
        test('returns a key-value string', function () {
          jest.spyOn(TestBaseCacheableObject, 'getIDParams').mockReturnValue({
            a: 1,
            b: 2
          });
          expect(TestBaseCacheableObject.getCacheId()).toBe('a=1;b=2;');
        });
      });
      describe('when getIDParams returns an empty object', function () {
        test('returns undefined', function () {
          jest.spyOn(TestBaseCacheableObject, 'getIDParams').mockReturnValue({});
          expect(TestBaseCacheableObject.getCacheId()).toBeUndefined();
        });
      });
    });
  });
  describe('instance methods', function () {
    var baseCachableObject;
    beforeEach(function () {
      baseCachableObject = new TestBaseCacheableObject();
    });
    afterEach(function () {
      baseCachableObject = null;
    });
    describe('getIDParams', function () {
      test('calls static getIDParams with the instance', function () {
        jest.spyOn(TestBaseCacheableObject, 'getIDParams');
        baseCachableObject.getIDParams();
        expect(TestBaseCacheableObject.getIDParams).toBeCalledWith(baseCachableObject);
      });
      test('returns the result of static getIDParams', function () {
        var idParams = {};
        jest.spyOn(TestBaseCacheableObject, 'getIDParams').mockReturnValue(idParams);
        expect(baseCachableObject.getIDParams()).toBe(idParams);
      });
    });
    describe('getCacheId', function () {
      test('calls static getCacheId with the instance', function () {
        jest.spyOn(TestBaseCacheableObject, 'getCacheId');
        baseCachableObject.getCacheId();
        expect(TestBaseCacheableObject.getCacheId).toBeCalledWith(baseCachableObject);
      });
      test('returns the result of static getCacheId', function () {
        var cacheId = 'some cache id';
        jest.spyOn(TestBaseCacheableObject, 'getCacheId').mockReturnValue(cacheId);
        expect(baseCachableObject.getCacheId()).toBe(cacheId);
      });
    });
  });
});