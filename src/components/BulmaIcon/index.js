import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BulmaIcon extends Component {
  static defaultProps = {
    icon: "",
    color: "",
    size: "",
    position: "",
  }

  static propTypes = {
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.string,
    position: PropTypes.string,
  }

  render() {
    let iconClass = `fas fa-${this.icon}`;

    let spanClass = "icon";
    if (!!this.props.color) {
      spanClass = spanClass + ` is-${this.props.color}`;
    }
    if (!!this.props.size) {
      spanClass = spanClass + ` is-${this.props.size}`;
    }
    if (!!this.props.position) {
      spanClass = spanClass + ` is-${this.props.position}`;
    }
    return (
      <span className={spanClass}>
        <i className={iconClass}></i>
      </span>
    );
  }
}
