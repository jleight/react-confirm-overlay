import React, { Component } from 'react';
import PropTypes from 'prop-types';

const defaultState = {
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
  const bounds = element.getBoundingClientRect();
  const { pageXOffset = 0, pageYOffset = 0 } = window;
  return {
    top: bounds.top + pageYOffset,
    right: bounds.right,
    bottom: bounds.bottom,
    left: bounds.left + pageXOffset,
    width: bounds.width,
    height: bounds.height,
    lineHeight: `${bounds.height}px`
  };
}

export default class ConfirmOverlayProvider extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      ...defaultState
    };

    this.handleOverlay = this.handleOverlay.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  getChildContext() {
    return {
      overlay: this.handleOverlay
    };
  }

  handleOverlay(wrapper, callback) {
    this.setState({
      isActive: true,
      container: {
        ...this.state.container,
        style: {
          ...this.state.container.style,
          ...getBounds(wrapper)
        }
      },
      callback
    });
  }

  handleSubmit() {
    this.setState({ isActive: false });
    this.state.callback();
  }

  handleCancel() {
    this.setState({ isActive: false });
  }

  render() {
    const {
      isActive,
      container,
      form,
      label,
      submit,
      cancel,
      overlay
    } = this.state;

    return (
      <div>
        {this.props.children}
        {isActive &&
          <div className={container.className} style={container.style}>
            <form
              action={form.action}
              method={form.method}
              className={form.className}
              style={form.style}
            >
              {label.display &&
                <label htmlFor={submit.name} style={label.style}>
                  {label.text}
                </label>}
              <button
                type={submit.type}
                className={submit.className}
                style={submit.style}
                name={submit.name}
                value={submit.value}
                onClick={this.handleSubmit}
              >
                {submit.text}
              </button>
              {cancel.display &&
                <button
                  type={cancel.type}
                  className={cancel.className}
                  style={cancel.style}
                  name={cancel.name}
                  value={cancel.value}
                  onClick={this.handleCancel}
                >
                  {cancel.text}
                </button>}
            </form>
            <div className={overlay.className} style={overlay.style} />
          </div>}
      </div>
    );
  }
}

ConfirmOverlayProvider.childContextTypes = {
  overlay: PropTypes.func.isRequired
};
