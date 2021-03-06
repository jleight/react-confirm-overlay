import PropTypes from 'prop-types';
import React from 'react';
import { Children, Component } from 'react';
import ReactDOM from 'react-dom';

class Connect extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      node: null
    };
  }

  componentDidMount() {
    this.setState({
      node: ReactDOM.findDOMNode(this)
    });
  }

  render() {
    return React.cloneElement(Children.only(this.props.children), {
      ...this.props.mapper(callback =>
        this.context.overlay(this.state.node, callback)
      )
    });
  }
}

Connect.contextTypes = {
  overlay: PropTypes.func.isRequired
};

export default mapper => Component => props => {
  return (
    <Connect mapper={mapper}>
      <Component {...props} />
    </Connect>
  );
};
