import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cc from 'classcat';

export default class componentName extends PureComponent {
  static propTypes = {
		className: PropTypes.string,
		// onClick: PropTypes.func,
		type: PropTypes.oneOf('text', 'password', 'email', 'tel'),
		value: PropTypes.string,
		placeholder: PropTypes.string,
		color: PropTypes.oneOf('primary', 'info', 'success', 'warning', 'danger'),
		size: PropTypes.oneOf('small', 'medium', 'large'),
		rounded: PropTypes.bool,
		hovered: PropTypes.bool,
		focused: PropTypes.bool,
		disabled: PropTypes.bool,
    readonly: PropTypes.bool,
		isStatic: PropTypes.bool
  };

	static defaultProps = {
    className: '',
		// onClick: () => null,
		type: 'text',
		value: '',
		placeholder: null,
		color: null,
		size: null,
		rounded: false,
		hovered: false,
		focused: false,
		disabled: false,
		readonly: false,
		isStatic: false
  };

  render() {
		const {
			className,
			// onClick,
			type,
			value,
			placeholder,
			color,
			size,
			rounded,
			hovered,
			focused,
			disabled,
			readonly,
			isStatic,
			...props
		} = this.props;

    return (
			<input
				{...props}
				type={type}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				readonly={readonly}
				className={cc([
					{className},
					'input',
					{
						[`is-${color}`]: color,
						[`is-${size}`]: size,
						'is-rounded': rounded,
						'is-hovered': hovered,
						'is-focused': focused,
						'is-active': active,
						'is-static': isStatic,
					}
				])}
      />
    )
  }
}
