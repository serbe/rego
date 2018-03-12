import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';

class BulmaButton extends Component {
  static defaultProps = {
    text: "",
    color: "",
    size: "",
    outlined: false,
    inverted: false,
    rounded: false,
    hovered: false,
    focused: false,
    active: false,
    loading: false,
    static: false,
    disabled: false,
  }

  static propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    outlined: PropTypes.bool,
    inverted: PropTypes.bool,
    rounded: PropTypes.bool,
    hovered: PropTypes.bool,
    focused: PropTypes.bool,
    active: PropTypes.bool,
    loading: PropTypes.bool,
    static: PropTypes.bool,
    disabled: PropTypes.bool,
  }

  render() {
    let buttonClass = "button";
    if (!!this.props.color) {
      buttonClass = buttonClass + ` is-${this.props.color}`;
    }
    if (!!this.props.size) {
      buttonClass = buttonClass + ` is-${this.props.size}`;
    }
    if (!!this.props.state) {
      buttonClass = buttonClass + ` is-${this.props.state}`;
    }

    let IconButton = <React.Fragment></React.Fragment>;
    // if (!!this.props.icon) {
    //   IconButton = <bulma-icon size={this.props.size} icon={this.props.icon} position={this.props.iconPosition} color={this.props.color}/>
    // }

    let ButtonText = <React.Fragment></React.Fragment>
    // if (!!this.props.text) {
    //   ButtonText = <React.Fragment>{this.props.text}</React.Fragment>
    // }

                // <IconButton/>
            // <ButtonText/>

    return (
      <div className="field">
        <p className="control">
          <a className={buttonClass} disabled={this.props.disabled}>
            <ButtonText/>
          </a>
        </p>
      </div>
    );
  }
}

export default BulmaButton;