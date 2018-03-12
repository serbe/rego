import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';

class BulmaButton extends Component {
  // static contextTypes = {
  //   router: PropTypes.object
  // }
  constructor(props) {
    super(props);
    // this.state = { hasError: false };
  }

  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     logged: true,
  //     open: false,
  //     auth: true,
  //   };
  // }

  render() {
    let buttonClass = "button";
    if (this.props.color) {
      buttonClass = buttonClass + ` is-${this.props.color}`;
    }
    if (this.props.size) {
      buttonClass = buttonClass + ` is-${this.props.size}`;
    }
    if (this.props.state) {
      buttonClass = buttonClass + ` is-${this.props.state}`;
    }

    let IconButton = null;
    if (this.props.icon) {
      IconButton = <bulma-icon size="this.props.size" icon="this.props.icon" position="this.props.iconPosition" color="this.props.color"/>
    }

    return (
      <div className="field">
        <p className="control">
          <a className={buttonClass} onClick="click">
            <IconButton/>
            { this.props.text }
          </a>
        </p>
      </div>
    );
  }
}

BulmaButton.propTypes = {
  // color: PropTypes.string,

};

export default BulmaButton;