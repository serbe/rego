import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cc from 'classcat';

export default class Icon extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
		className: PropTypes.string,
    icon: PropTypes.string.isRequired,
    color: PropTypes.oneOf('info', 'success', 'warning', 'danger'),
    size: PropTypes.oneOf('small', 'medium', 'large')
  }

  static defaultProps = {
    children: null,
    className: '',
    color: "",
    size: "",
    position: "",
  }

  render() {
    return (
      <span
        {...props}
        className={cc([
					{className},
          'icon',
          {
            [`has-text-${color}`]: color,
            [`is-${size}`]: size
          }
        ])}
      >
        <i
          className={cc([
            'fas',
            {[`fa-${icon}`]: icon}
          ])}
        >
          {children}
        </i>
      </span>
    );
  }
}