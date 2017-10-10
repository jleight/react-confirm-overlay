'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultState = {
  isActive: false,
  container: {
    className: null,
    style: {
      position: 'absolute',
      textAlign: 'center'
    }
  },
  overlay: {
    className: null,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=50)',
      opacity: 0.5,
      zIndex: 99
    }
  },
  form: {
    action: null,
    method: null,
    className: null,
    style: {
      position: 'relative',
      color: '#fff',
      zIndex: 100
    }
  },
  label: {
    display: true,
    text: 'Are you sure?',
    style: {
      marginRight: 5
    }
  },
  submit: {
    type: 'button',
    // className: null,
    className: 'btn btn-danger btn-xs',
    style: null,
    text: 'Confirm',
    name: null,
    value: null
  },
  cancel: {
    display: true,
    type: 'button',
    // className: null,
    className: 'btn btn-default btn-xs',
    style: {
      marginLeft: 5
    },
    text: 'Cancel',
    name: null,
    value: null
  }
};

function getBounds(element) {
  var bounds = element.getBoundingClientRect();
  var _window = window,
      _window$pageXOffset = _window.pageXOffset,
      pageXOffset = _window$pageXOffset === undefined ? 0 : _window$pageXOffset,
      _window$pageYOffset = _window.pageYOffset,
      pageYOffset = _window$pageYOffset === undefined ? 0 : _window$pageYOffset;

  return {
    top: bounds.top + pageYOffset,
    right: bounds.right,
    bottom: bounds.bottom,
    left: bounds.left + pageXOffset,
    width: bounds.width,
    height: bounds.height,
    lineHeight: bounds.height + 'px'
  };
}

var ConfirmOverlayProvider = function (_Component) {
  _inherits(ConfirmOverlayProvider, _Component);

  function ConfirmOverlayProvider(props, context) {
    _classCallCheck(this, ConfirmOverlayProvider);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.state = _extends({}, defaultState);

    _this.handleOverlay = _this.handleOverlay.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    return _this;
  }

  ConfirmOverlayProvider.prototype.getChildContext = function getChildContext() {
    return {
      overlay: this.handleOverlay
    };
  };

  ConfirmOverlayProvider.prototype.handleOverlay = function handleOverlay(wrapper, callback) {
    this.setState({
      isActive: true,
      container: _extends({}, this.state.container, {
        style: _extends({}, this.state.container.style, getBounds(wrapper))
      }),
      callback: callback
    });
  };

  ConfirmOverlayProvider.prototype.handleSubmit = function handleSubmit() {
    this.setState({ isActive: false });
    this.state.callback();
  };

  ConfirmOverlayProvider.prototype.handleCancel = function handleCancel() {
    this.setState({ isActive: false });
  };

  ConfirmOverlayProvider.prototype.render = function render() {
    var _state = this.state,
        isActive = _state.isActive,
        container = _state.container,
        form = _state.form,
        label = _state.label,
        submit = _state.submit,
        cancel = _state.cancel,
        overlay = _state.overlay;


    return _react2.default.createElement(
      'div',
      null,
      this.props.children,
      isActive && _react2.default.createElement(
        'div',
        { className: container.className, style: container.style },
        _react2.default.createElement(
          'form',
          {
            action: form.action,
            method: form.method,
            className: form.className,
            style: form.style
          },
          label.display && _react2.default.createElement(
            'label',
            { htmlFor: submit.name, style: label.style },
            label.text
          ),
          _react2.default.createElement(
            'button',
            {
              type: submit.type,
              className: submit.className,
              style: submit.style,
              name: submit.name,
              value: submit.value,
              onClick: this.handleSubmit
            },
            submit.text
          ),
          cancel.display && _react2.default.createElement(
            'button',
            {
              type: cancel.type,
              className: cancel.className,
              style: cancel.style,
              name: cancel.name,
              value: cancel.value,
              onClick: this.handleCancel
            },
            cancel.text
          )
        ),
        _react2.default.createElement('div', { className: overlay.className, style: overlay.style })
      )
    );
  };

  return ConfirmOverlayProvider;
}(_react.Component);

exports.default = ConfirmOverlayProvider;


ConfirmOverlayProvider.childContextTypes = {
  overlay: _propTypes2.default.func.isRequired
};