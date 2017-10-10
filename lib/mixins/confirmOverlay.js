'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Connect = function (_Component) {
  _inherits(Connect, _Component);

  function Connect(props, context) {
    _classCallCheck(this, Connect);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.state = {
      node: null
    };
    return _this;
  }

  Connect.prototype.componentDidMount = function componentDidMount() {
    this.setState({
      node: _reactDom2.default.findDOMNode(this)
    });
  };

  Connect.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.cloneElement(_react.Children.only(this.props.children), _extends({}, this.props.mapper(function (callback) {
      return _this2.context.overlay(_this2.state.node, callback);
    })));
  };

  return Connect;
}(_react.Component);

Connect.contextTypes = {
  overlay: _propTypes2.default.func.isRequired
};

exports.default = function (mapper) {
  return function (Component) {
    return function (props) {
      return _react2.default.createElement(
        Connect,
        { mapper: mapper },
        _react2.default.createElement(Component, props)
      );
    };
  };
};