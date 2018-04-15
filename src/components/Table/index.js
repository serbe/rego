import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cc from 'classcat';

export default class BulmaTable extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
		className: PropTypes.string,
		bordered: PropTypes.bool,
		striped: PropTypes.bool,
		narrow: PropTypes.bool,
		hoverable: PropTypes.bool,
		fullwidth: PropTypes.bool
	};

	static defaultProps = {
		children: null,
    className: '',
		bordered: false,
		striped: false,
		narrow: false,
		hoverable: false,
		fullwidth: false
	};

	render() {
    const {
			children,
			className,
			bordered,
      striped,
      narrow,
      hoverable,
      fullwidth,
			...props
		} = this.props;

		return (
      <table
        {...props}
        className={cc([
					{className},
					'button',
					{
						'is-bordered': bordered,
						'is-striped': striped,
						'is-narrow': narrow,
						'is-hoverable': hoverable,
						'is-fullwidth': fullwidth
					}
        ])}
      >
        {children}
      </table>
		);
	}
}
