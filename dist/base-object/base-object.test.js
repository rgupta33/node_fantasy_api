"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../utils.js");

var _baseObject = _interopRequireDefault(require("./base-object/base-object.js"));

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

var MapObjectErrorBaseObject = /*#__PURE__*/function (_BaseObject) {
  _inherits(MapObjectErrorBaseObject, _BaseObject);

  var _super = _createSuper(MapObjectErrorBaseObject);

  function MapObjectErrorBaseObject() {
    _classCallCheck(this, MapObjectErrorBaseObject);

    return _super.apply(this, arguments);
  }

  return MapObjectErrorBaseObject;
}(_baseObject["default"]);

MapObjectErrorBaseObject.responseMap = {
  invalid: 34
};
MapObjectErrorBaseObject.displayName = 'MapObjectErrorBaseObject';

var KeyErrorTestBaseObject = /*#__PURE__*/function (_BaseObject2) {
  _inherits(KeyErrorTestBaseObject, _BaseObject2);

  var _super2 = _createSuper(KeyErrorTestBaseObject);

  function KeyErrorTestBaseObject() {
    _classCallCheck(this, KeyErrorTestBaseObject);

    return _super2.apply(this, arguments);
  }

  return KeyErrorTestBaseObject;
}(_baseObject["default"]);

KeyErrorTestBaseObject.responseMap = {
  invalidObjectWithoutKey: {
    BaseObject: _baseObject["default"]
  }
};
KeyErrorTestBaseObject.displayName = 'KeyErrorTestBaseObject';

var ObjectErrorTestBaseObject = /*#__PURE__*/function (_BaseObject3) {
  _inherits(ObjectErrorTestBaseObject, _BaseObject3);

  var _super3 = _createSuper(ObjectErrorTestBaseObject);

  function ObjectErrorTestBaseObject() {
    _classCallCheck(this, ObjectErrorTestBaseObject);

    return _super3.apply(this, arguments);
  }

  return ObjectErrorTestBaseObject;
}(_baseObject["default"]);

ObjectErrorTestBaseObject.responseMap = {
  invalidObjectWithoutBaseObject: {
    key: 'failed_key'
  }
};
ObjectErrorTestBaseObject.displayName = 'ObjectErrorTestBaseObject';

var MappingTestBaseObject = /*#__PURE__*/function (_BaseObject4) {
  _inherits(MappingTestBaseObject, _BaseObject4);

  var _super4 = _createSuper(MappingTestBaseObject);

  function MappingTestBaseObject() {
    _classCallCheck(this, MappingTestBaseObject);

    return _super4.apply(this, arguments);
  }

  return MappingTestBaseObject;
}(_baseObject["default"]);

MappingTestBaseObject.responseMap = {
  mappingId: 'mapping_id',
  someValue: 'some_value',
  someNestedData: 'nested.item'
};
MappingTestBaseObject.displayName = 'MappingTestBaseObject';
MappingTestBaseObject.idName = 'mappingId';

var TestBaseObject = /*#__PURE__*/function (_BaseObject5) {
  _inherits(TestBaseObject, _BaseObject5);

  var _super5 = _createSuper(TestBaseObject);

  function TestBaseObject() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, TestBaseObject);

    _this = _super5.call(this, options);
    _this.constructorOption = options.constructorOption;
    return _this;
  }

  return TestBaseObject;
}(_baseObject["default"]);

TestBaseObject.responseMap = {
  testId: 'testId',
  someValue: 'some_value',
  someNestedData: 'nested.item',
  someObject: {
    key: 'map_object',
    BaseObject: MappingTestBaseObject
  },
  someObjects: {
    key: 'map_objects',
    BaseObject: MappingTestBaseObject,
    isArray: true
  },
  someManualObject: {
    key: 'manual',
    manualParse: jest.fn()
  },
  someManualAndBaseObject: {
    key: 'both',
    BaseObject: MappingTestBaseObject,
    manualParse: jest.fn()
  },
  someDeferredObject: {
    key: 'deferred',
    BaseObject: MappingTestBaseObject,
    defer: true,
    manualParse: jest.fn()
  }
};
TestBaseObject.route = 'fake/route';
TestBaseObject.displayName = 'TestBaseObject';
TestBaseObject.idName = 'testId';
describe('BaseObject', function () {
  describe('constructor', function () {
    describe('when options are passed', function () {
      test('calls _populateObject with local data', function () {
        jest.spyOn(_baseObject["default"], '_populateObject');
        var options = {
          someValue: 'yeahhhhhhhhhhh'
        };
        var returnedInstance = new TestBaseObject(options);
        expect(TestBaseObject._populateObject).toBeCalledWith({
          data: options,
          instance: returnedInstance,
          isDataFromServer: false
        });
      });
      test('populates instance with local data', function () {
        var options = {
          someValue: 'yeahhhhhhhhhhh'
        };
        var returnedInstance = new TestBaseObject(options);
        expect(returnedInstance.someValue).toBe(options.someValue);
      });
    });
    describe('when options are not passed', function () {
      test('does not call _populateObject', function () {
        jest.spyOn(_baseObject["default"], '_populateObject');
        new TestBaseObject(); // eslint-disable-line no-new

        expect(TestBaseObject._populateObject).not.toBeCalled();
      });
    });
  });
  describe('class methods', function () {
    describe('_populateObject', function () {
      var constructorParams;
      var data;
      var instance;
      var isDataFromServer;
      beforeEach(function () {
        constructorParams = {
          leagueId: 123213
        };
        data = {
          testId: 42,
          some_value: 'some item',
          nested: {
            item: 'some nested item'
          }
        };
        instance = new TestBaseObject();
      });
      afterEach(function () {
        constructorParams = null;
        data = null;
        instance = null;
        isDataFromServer = null;
      });

      var callPopulate = function callPopulate() {
        var Klass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : TestBaseObject;
        return Klass._populateObject({
          data: data,
          constructorParams: constructorParams,
          instance: instance,
          isDataFromServer: isDataFromServer
        });
      };

      describe('when a instance is not passed', function () {
        test('throws error', function () {
          expect(function () {
            return TestBaseObject._populateObject({
              data: data
            });
          }).toThrowError("".concat(TestBaseObject.displayName, ": _populateObject: Did not receive instance to populate"));
        });
      });
      describe('when data is not passed', function () {
        test('returns instance without mutation', function () {
          var returnedInstance = TestBaseObject._populateObject({
            instance: instance
          });

          expect(returnedInstance).toBe(instance);
          expect(returnedInstance.testId).toBeUndefined();
          expect(returnedInstance.someValue).toBeUndefined();
          expect(returnedInstance.someNestedData).toBeUndefined();
          expect(returnedInstance.someObjects).toBeUndefined();
          expect(returnedInstance.someManualObject).toBeUndefined();
          expect(returnedInstance.someManualAndBaseObject).toBeUndefined();
          expect(returnedInstance.someDeferredObject).toBeUndefined();
        });
      });
      describe('responseMap mapping', function () {
        describe('when isDataFromServer is true', function () {
          beforeEach(function () {
            isDataFromServer = true;
          });
          test('does not map keys not defined in responseMap', function () {
            data = {
              notInMap: 'some wack stuff'
            };
            var returnedInstance = callPopulate();
            expect(returnedInstance.notInMap).toBeUndefined();
          });
          test('does not map data passed in the form of local (non-server) data', function () {
            data = {
              someValue: 'some server data'
            };
            var returnedInstance = callPopulate();
            expect(returnedInstance.someValue).toBeUndefined();
            expect(returnedInstance.some_value).toBeUndefined();
          });
          describe('when a value in the static responseMap is a string', function () {
            var testMapsDataToStringKey = function testMapsDataToStringKey(_ref) {
              var value = _ref.value,
                  valueString = _ref.valueString;
              describe("when the passed data at the key is ".concat(valueString), function () {
                test("assigns ".concat(valueString, " to the instance at the correct key"), function () {
                  data = {
                    some_value: value
                  };
                  var returnedInstance = callPopulate();
                  expect(returnedInstance.someValue).toBe(value);
                });
              });
            };

            testMapsDataToStringKey({
              value: undefined,
              valueString: 'undefined'
            });
            testMapsDataToStringKey({
              value: null,
              valueString: 'null'
            });
            testMapsDataToStringKey({
              value: '',
              valueString: 'empty string'
            });
            testMapsDataToStringKey({
              value: 0,
              valueString: 'zero'
            });
            testMapsDataToStringKey({
              value: 123,
              valueString: 'positive number'
            });
            testMapsDataToStringKey({
              value: -123,
              valueString: 'negative number'
            });
            testMapsDataToStringKey({
              value: true,
              valueString: 'true'
            });
            testMapsDataToStringKey({
              value: false,
              valueString: 'false'
            });
            testMapsDataToStringKey({
              value: [],
              valueString: 'empty array'
            });
            testMapsDataToStringKey({
              value: [1, 2, 3],
              valueString: 'populated array'
            });
            testMapsDataToStringKey({
              value: {},
              valueString: 'empty object'
            });
            testMapsDataToStringKey({
              value: new TestBaseObject(),
              valueString: 'empty BaseObject'
            });
            testMapsDataToStringKey({
              value: new TestBaseObject({
                testId: 1,
                someValue: 'value'
              }),
              valueString: 'populated BaseObject'
            });
          });
          describe('when a value in the static responseMap is a plain object', function () {
            describe('when the object does not define key', function () {
              test('throws error', function () {
                expect(function () {
                  return callPopulate(KeyErrorTestBaseObject);
                }).toThrowError("".concat(KeyErrorTestBaseObject.displayName, ": _populateObject: Invalid responseMap ") + 'object. Object must define key. See docs for typedef of ResponseMapValueObject.');
              });
            });
            describe('when the object defines key', function () {
              describe('when the object defines defer as true', function () {
                test('processes deferred entries after all non-deferred entries', function () {
                  data = {
                    manual: {
                      mapping_id: 1,
                      some_value: 'works recursively too'
                    },
                    deferred: {
                      mapping_id: 4,
                      some_value: 'works recursively too'
                    }
                  };
                  expect.assertions(2);
                  TestBaseObject.responseMap.someManualObject.manualParse.mockImplementation(function () {
                    expect(TestBaseObject.responseMap.someDeferredObject.manualParse).not.toBeCalled();
                  });
                  callPopulate();
                  expect(TestBaseObject.responseMap.someDeferredObject.manualParse).toBeCalled();
                });
              });
              describe('when the object defines a manualParse function', function () {
                beforeEach(function () {
                  data = {
                    manual: {
                      mapping_id: 1,
                      some_value: 'works recursively too',
                      nested: {
                        item: 'also works recursively'
                      }
                    }
                  };
                });

                var testMapsData = function testMapsData(_ref2) {
                  var value = _ref2.value,
                      valueString = _ref2.valueString;
                  describe("when the manualParse returns ".concat(valueString), function () {
                    test("assigns ".concat(valueString, " to the instance at the correct key"), function () {
                      TestBaseObject.responseMap.someManualObject.manualParse.mockReturnValue(value);
                      var returnedInstance = callPopulate();
                      expect(returnedInstance.someManualObject).toBe(value);
                    });
                  });
                };

                test('calls the manualParse function', function () {
                  callPopulate();
                  expect(TestBaseObject.responseMap.someManualObject.manualParse).toBeCalledWith(data.manual, data, constructorParams, instance);
                });
                testMapsData({
                  value: undefined,
                  valueString: 'undefined'
                });
                testMapsData({
                  value: null,
                  valueString: 'null'
                });
                testMapsData({
                  value: '',
                  valueString: 'empty string'
                });
                testMapsData({
                  value: 0,
                  valueString: 'zero'
                });
                testMapsData({
                  value: 123,
                  valueString: 'positive number'
                });
                testMapsData({
                  value: -123,
                  valueString: 'negative number'
                });
                testMapsData({
                  value: true,
                  valueString: 'true'
                });
                testMapsData({
                  value: false,
                  valueString: 'false'
                });
                testMapsData({
                  value: [],
                  valueString: 'empty array'
                });
                testMapsData({
                  value: [1, 2, 3],
                  valueString: 'populated array'
                });
                testMapsData({
                  value: {},
                  valueString: 'empty object'
                });
                testMapsData({
                  value: new TestBaseObject(),
                  valueString: 'empty BaseObject'
                });
                testMapsData({
                  value: new TestBaseObject({
                    testId: 1,
                    someValue: 'value'
                  }),
                  valueString: 'populated BaseObject'
                });
              });
              describe('when the object defines BaseObject', function () {
                describe('when the object specifies isArray: true', function () {
                  var testAssignsEmptyArray = function testAssignsEmptyArray(_ref3) {
                    var value = _ref3.value,
                        valueString = _ref3.valueString;
                    describe("when the passed data at the key is ".concat(valueString), function () {
                      test("assigns ".concat(valueString, " to the instance at the correct key"), function () {
                        data = {
                          map_objects: value
                        };
                        var returnedInstance = callPopulate();
                        expect(returnedInstance.someObjects).toEqual([]);
                      });
                    });
                  };

                  testAssignsEmptyArray({
                    value: undefined,
                    valueString: 'undefined'
                  });
                  testAssignsEmptyArray({
                    value: null,
                    valueString: 'null'
                  });
                  testAssignsEmptyArray({
                    value: [],
                    valueString: 'emptyArray'
                  });
                  describe('when the passed data at the key is a populated array', function () {
                    test('maps the data to instances of the specified BaseObject', function () {
                      data = {
                        map_objects: [{
                          mapping_id: 1,
                          some_value: 'works recursively too'
                        }, {
                          mapping_id: 2,
                          nested: {
                            item: 'also works recursively'
                          }
                        }]
                      };
                      var returnedInstance = callPopulate();
                      expect.hasAssertions();

                      _lodash["default"].forEach(returnedInstance.someObjects, function (populatedInstance, index) {
                        expect(populatedInstance).toBeInstanceOf(MappingTestBaseObject);
                        expect(populatedInstance.mappingId).toBe(data.map_objects[index].mapping_id);
                        expect(populatedInstance.someValue).toBe(data.map_objects[index].some_value);
                        expect(populatedInstance.someNestedData).toBe(_lodash["default"].get(data.map_objects[index], 'nested.item'));
                      });
                    });
                  });
                });
                describe('when the object specifies isArray: false', function () {
                  var testAssignsEmptyObject = function testAssignsEmptyObject(_ref4) {
                    var value = _ref4.value,
                        valueString = _ref4.valueString;
                    describe("when the passed data at the key is ".concat(valueString), function () {
                      test('assigns an empty instance of the specified BaseObject to the instance', function () {
                        data = {
                          map_object: value
                        };
                        var returnedInstance = callPopulate();
                        var emptyObject = returnedInstance.someObject;
                        expect(emptyObject).toBeInstanceOf(MappingTestBaseObject);

                        _lodash["default"].forEach(MappingTestBaseObject.responseMap, function (v, key) {
                          expect(_lodash["default"].get(emptyObject, key)).toBeUndefined();
                        });
                      });
                    });
                  };

                  testAssignsEmptyObject({
                    value: undefined,
                    valueString: 'undefined'
                  });
                  testAssignsEmptyObject({
                    value: null,
                    valueString: 'null'
                  });
                  testAssignsEmptyObject({
                    value: {},
                    valueString: 'empty object'
                  });
                  describe('when the passed data at the key is a populated object', function () {
                    test('maps the data to an instance of the specified BaseObject', function () {
                      data = {
                        map_object: {
                          mapping_id: 1,
                          some_value: 'works recursively too',
                          nested: {
                            item: 'also works recursively'
                          }
                        }
                      };
                      var returnedInstance = callPopulate();
                      var populatedInstance = returnedInstance.someObject;
                      expect(populatedInstance).toBeInstanceOf(MappingTestBaseObject);
                      expect(populatedInstance.mappingId).toBe(data.map_object.mapping_id);
                      expect(populatedInstance.someValue).toBe(data.map_object.some_value);
                      expect(populatedInstance.someNestedData).toBe(_lodash["default"].get(data.map_object, 'nested.item'));
                    });
                  });
                });
              });
              describe('when manualParse and BaseObject are defined', function () {
                test('calls manualParse instead of using BaseObject logic', function () {
                  data = {
                    both: 'something'
                  };
                  jest.spyOn(MappingTestBaseObject, 'buildFromServer');
                  callPopulate();
                  expect(TestBaseObject.responseMap.someManualAndBaseObject.manualParse).toBeCalledWith(data.both, data, constructorParams, instance);
                  expect(MappingTestBaseObject.buildFromServer).not.toBeCalledWith(data.both);
                  MappingTestBaseObject.buildFromServer.mockRestore();
                });
              });
              describe('when the object does not define BaseObject or manualParse', function () {
                test('throws error', function () {
                  expect(function () {
                    return callPopulate(ObjectErrorTestBaseObject);
                  }).toThrowError("".concat(ObjectErrorTestBaseObject.displayName, ": _populateObject: Invalid ") + 'responseMap object. Object must define `BaseObject` or `manualParse`. See ' + 'docs for typedef of ResponseMapValueObject.');
                });
              });
            });
          });
          describe('when a value in the static responseMap is not a string or valid object', function () {
            test('throws error', function () {
              expect(function () {
                return callPopulate(MapObjectErrorBaseObject);
              }).toThrowError("".concat(MapObjectErrorBaseObject.displayName, ": _populateObject: Did not recognize ") + 'responseMap value type for key invalid');
            });
          });
        });
        describe('when isDataFromServer is false', function () {
          beforeEach(function () {
            isDataFromServer = false;
          });

          var testMapsDataIgnoringMapValue = function testMapsDataIgnoringMapValue(Klass) {
            test('maps the data attribute at the map key, ignoring the map value', function () {
              expect.hasAssertions();
              var returnedInstance = callPopulate(Klass);

              _lodash["default"].forEach(data, function (value, key) {
                expect(returnedInstance[key]).toBe(data[key]);
              });
            });
          };

          test('does not map data passed in the form of a server response', function () {
            data = {
              some_value: 'some server data'
            };
            var returnedInstance = callPopulate();
            expect(returnedInstance.someValue).toBeUndefined();
            expect(returnedInstance.some_value).toBeUndefined();
          });
          describe('when a value in the static responseMap is a string', function () {
            beforeEach(function () {
              data = {
                someValue: 'some server data'
              };
            });
            testMapsDataIgnoringMapValue();
          });
          describe('when a value in the static responseMap is a plain object', function () {
            describe('when the object does not define key', function () {
              beforeEach(function () {
                data = {
                  invalidObjectWithoutKey: 'works'
                };
              });
              testMapsDataIgnoringMapValue(KeyErrorTestBaseObject);
            });
            describe('when the object defines key', function () {
              describe('when the object defines a manualParse function', function () {
                beforeEach(function () {
                  var someManualObject = new MappingTestBaseObject({
                    mapping_id: 1,
                    some_value: 'works recursively too'
                  });
                  data = {
                    someManualObject: someManualObject
                  };
                });
                testMapsDataIgnoringMapValue();
              });
              describe('when the object defines BaseObject', function () {
                describe('when the object specifies isArray: true', function () {
                  beforeEach(function () {
                    var someObjects = [new MappingTestBaseObject({
                      mapping_id: 1,
                      some_value: 'works recursively too'
                    }), new MappingTestBaseObject({
                      mapping_id: 2,
                      nested: {
                        item: 'also works recursively'
                      }
                    })];
                    data = {
                      someObjects: someObjects
                    };
                  });
                  testMapsDataIgnoringMapValue();
                });
                describe('when the object specifies isArray: false', function () {
                  beforeEach(function () {
                    var someObject = new MappingTestBaseObject({
                      mapping_id: 1,
                      some_value: 'works recursively too',
                      nested: {
                        item: 'also works recursively'
                      }
                    });
                    data = {
                      someObject: someObject
                    };
                  });
                  testMapsDataIgnoringMapValue();
                });
              });
              describe('when the object defines manualParse and BaseObject', function () {
                beforeEach(function () {
                  data = {
                    someManualAndBaseObject: 'something'
                  };
                });
                testMapsDataIgnoringMapValue();
              });
              describe('when the object does not define manualParse or BaseObject', function () {
                beforeEach(function () {
                  data = {
                    invalidObjectWithoutBaseObject: 'works'
                  };
                });
                testMapsDataIgnoringMapValue(ObjectErrorTestBaseObject);
              });
            });
          });
          describe('when a value in the static responseMap is not a string or valid object', function () {
            beforeEach(function () {
              data = {
                invalid: 'works'
              };
            });
            testMapsDataIgnoringMapValue(MapObjectErrorBaseObject);
          });
        });
      });
      test('returns passed instance', function () {
        var passedInstance = new TestBaseObject();

        var returnedInstance = TestBaseObject._populateObject({
          data: data,
          instance: passedInstance
        });

        expect(returnedInstance).toBe(passedInstance);
      });
    });
    describe('buildFromServer', function () {
      describe('when the class specifies to flattenResponse', function () {
        var classFlattenResponse;
        beforeEach(function () {
          classFlattenResponse = TestBaseObject.flattenResponse;
          TestBaseObject.flattenResponse = true;
        });
        afterEach(function () {
          TestBaseObject.flattenResponse = classFlattenResponse;
        });
        test('calls _populateObject with flat data and isDataFromServer true', function () {
          jest.spyOn(TestBaseObject, '_populateObject');
          var constructorParams = {
            more: 'params'
          };
          var data = {
            some: 'data',
            nested: {
              stuff: 'isFlat'
            }
          };
          TestBaseObject.buildFromServer(data, constructorParams);
          expect(TestBaseObject._populateObject).toBeCalledWith({
            data: (0, _utils.flattenObject)(data),
            constructorParams: constructorParams,
            instance: expect.any(TestBaseObject),
            isDataFromServer: true
          });
        });
      });
      describe('when the class does not specify to flattenResponse', function () {
        var classFlattenResponse;
        beforeEach(function () {
          classFlattenResponse = TestBaseObject.flattenResponse;
          TestBaseObject.flattenResponse = false;
        });
        afterEach(function () {
          TestBaseObject.flattenResponse = classFlattenResponse;
        });
        test('calls _populateObject with flat data and isDataFromServer true', function () {
          jest.spyOn(TestBaseObject, '_populateObject');
          var constructorParams = {
            more: 'params'
          };
          var data = {
            some: 'data',
            nested: {
              stuff: 'isFlat'
            }
          };
          TestBaseObject.buildFromServer(data, constructorParams);
          expect(TestBaseObject._populateObject).toBeCalledWith({
            data: data,
            constructorParams: constructorParams,
            instance: expect.any(TestBaseObject),
            isDataFromServer: true
          });
        });
      });
      test('returns a new, populated instance of the class', function () {
        var data = {
          some_value: 'data'
        };
        var instance = TestBaseObject.buildFromServer(data);
        expect(instance).toBeInstanceOf(TestBaseObject);
        expect(instance.someValue).toBe(data.some_value);
      });
    });
  });
});