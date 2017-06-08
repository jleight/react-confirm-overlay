import React, { Component, Children } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

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
        this.context.blackout(this.state.node, callback)
      )
    });
  }
}

Connect.contextTypes = {
  blackout: PropTypes.func.isRequired
};

export default mapper => Component => props => {
  return (
    <Connect mapper={mapper}>
      <Component {...props} />
    </Connect>
  );
};
