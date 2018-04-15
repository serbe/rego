import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cc from 'classcat';
// import BulmaIcon from 'components/BulmaIcon';

export default class Button extends PureComponent {
	static propTypes = {
    children: PropTypes.node,
		className: PropTypes.string,
		href: PropTypes.string,
		onClick: PropTypes.func,
		color: PropTypes.oneOf('white', 'light', 'dark', 'text', 'primary', 'link', 'info', 'success', 'warning', 'danger'),
		size: PropTypes.oneOf('small', 'medium', 'large'),
		outlined: PropTypes.bool,
		inverted: PropTypes.bool,
		rounded: PropTypes.bool,
		hovered: PropTypes.bool,
		focused: PropTypes.bool,
		active: PropTypes.bool,
		loading: PropTypes.bool,
		isStatic: PropTypes.bool,
		disabled: PropTypes.bool
	};

	static defaultProps = {
		children: null,
    className: '',
		href: '',
		onClick: () => null,
		color: null,
		size: null,
		outlined: false,
		inverted: false,
		rounded: false,
		hovered: false,
		focused: false,
		active: false,
		loading: false,
		isStatic: false,
		disabled: false
	};

	render() {
		const {
			children,
			className,
			href,
			onClick,
			color,
			size,
			outlined,
			inverted,
			rounded,
			hovered,
			focused,
			active,
			loading,
			isStatic,
			disabled,
			...props
		} = this.props;
		let Button = isStatic ? 'span' : 'a';

		return (
			<Button
				{...props}
				disabled={disabled}
				onClick={disabled ? undefined : onClick}
				className={cc([
					{className},
					'button',
					{
						[`is-${color}`]: color,
						[`is-${size}`]: size,
						'is-outlined': outlined,
						'is-inverted': inverted,
						'is-rounded': rounded,
						'is-hovered': hovered,
						'is-focused': focused,
						'is-active': active,
						'is-loading': loading,
						'is-static': isStatic
					}
				])}
			>
        {children}
      </Button>
		);
	}
}
