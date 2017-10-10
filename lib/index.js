'use strict';

exports.__esModule = true;

var _Provider = require('./components/Provider');

Object.defineProperty(exports, 'ConfirmOverlayProvider', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Provider).default;
  }
});

var _confirmOverlay = require('./mixins/confirmOverlay');

Object.defineProperty(exports, 'confirmOverlay', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_confirmOverlay).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }