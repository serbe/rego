import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BulmaIcon from 'components/BulmaIcon';

export default class BulmaButton extends Component {
	static defaultProps = {
    classes: '',
		text: '',
		color: '',
		size: '',
		outlined: false,
		inverted: false,
		rounded: false,
		hovered: false,
		focused: false,
		active: false,
		loading: false,
		static: false,
		disabled: false
	};

	static propTypes = {
    classes: PropTypes.string,
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
		disabled: PropTypes.bool
	};

	render() {
    let buttonClass = 'button';
    if (!!this.props.classes) {
      buttonClass = `${this.props.classes} ${buttonClass}`;
    }
		if (!!this.props.color) {
			buttonClass = `${buttonClass} is-${this.props.color}`;
		}
		if (!!this.props.size) {
			buttonClass = `${buttonClass} is-${this.props.size}`;
		}
		if (this.props.outlined) {
			buttonClass = `${buttonClass} is-outlined`;
		}
		if (this.props.inverted) {
			buttonClass = `${buttonClass} is-inverted`;
    }
    if (this.props.rounded) {
			buttonClass = `${buttonClass} is-rounded`;
    }
    if (this.props.hovered) {
			buttonClass = `${buttonClass} is-hovered`;
    }
    if (this.props.focused) {
			buttonClass = `${buttonClass} is-focused`;
    }
    if (this.props.active) {
			buttonClass = `${buttonClass} is-active`;
    }
    if (this.props.loading) {
			buttonClass = `${buttonClass} is-loading`;
    }
    if (this.props.static) {
			buttonClass = `${buttonClass} is-static`;
    }
    if (this.props.rounded) {
			buttonClass = `${buttonClass} is-rounded`;
		}

		let IconButton;
		if (!!this.props.icon) {
			IconButton = (
				<BulmaIcon
					size={this.props.size}
					icon={this.props.icon}
					position={this.props.iconPosition}
					color={this.props.color}
				/>
			);
		}

		let ButtonText;
		if (!!this.props.text) {
			ButtonText = <React.Fragment>{this.props.text}</React.Fragment>;
		}

		return (
      <a className={buttonClass} disabled={this.props.disabled}>
        {IconButton}
        {ButtonText}
      </a>
		);
	}
}
