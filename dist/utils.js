"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenObject = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var flattenObject = function flattenObject(object) {
  var flatObject = {};

  _lodash["default"].forEach(object, function (value, key) {
    if (_lodash["default"].isPlainObject(value)) {
      _lodash["default"].assign(flatObject, flattenObject(value));
    } else {
      _lodash["default"].set(flatObject, key, value);
    }
  });

  return flatObject;
};

exports.flattenObject = flattenObject;