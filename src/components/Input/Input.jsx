import React from 'react';
import { string, func } from 'prop-types';
import classnames from 'classnames';

import './Input.scss';

const Input = React.forwardRef(
	(
		{
			type,
			id,
			value,
			onChange,
			label,
			ariaLabel,
			placeholder,
			className,
			pattern,
			maxLength,
			...otherProps
		},
		ref
	) => (
		<div className={classnames('Input', className)}>
			<label htmlFor={id} className="Input__label">
				<span className="Input__text">{label}</span>
				<input
					{...otherProps}
					id={id}
					className="Input__element"
					type={type}
					value={value}
					ref={ref}
					pattern={pattern}
					maxLength={maxLength}
					placeholder={placeholder}
					onChange={onChange}
					aria-label={ariaLabel}
				/>
			</label>
		</div>
	)
);

Input.defaultProps = {
	type: 'text',
	id: '',
	value: '',
	onChange: () => {},
	label: '',
	ariaLabel: '',
	placeholder: '',
	className: '',
	maxLength: '4',
	pattern: '[0-9]{4}'
};

Input.propTypes = {
	type: string,
	id: string,
	value: string,
	onChange: func,
	label: string,
	ariaLabel: string,
	placeholder: string,
	className: string,
	maxLength: string,
	pattern: string
};

export default Input;
