import React, { memo } from 'react';
import { string, func } from 'prop-types';
import classnames from 'classnames';

import './Button.scss';

const Button = React.forwardRef(
	(
		{
			label,
			className,
			onClick,
			onKeyDown,
			ariaLabel,
			type,
			...otherProps
		},
		ref
	) => (
		<button
			{...otherProps}
			className={classnames('Button', className)}
			onClick={onClick}
			onKeyDown={onKeyDown}
			aria-label={ariaLabel}
			ref={ref}
			type={type}
		>
			<span className="Button__label">{label}</span>
		</button>
	)
);

Button.defaultProps = {
	label: '',
	className: '',
	onClick: () => {},
	onKeyDown: () => {},
	ariaLabel: '',
	type: 'button'
};

Button.propTypes = {
	label: string,
	className: string,
	onClick: func,
	onKeyDown: func,
	ariaLabel: string,
	type: string
};

export default memo(Button);
