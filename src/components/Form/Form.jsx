import React, { memo } from 'react';
import { string, node, func } from 'prop-types';
import classnames from 'classnames';
import './Form.scss';

const Form = ({ className, action, method, children, onSubmit }) => (
	<form
		className={classnames('Form', className)}
		action={action}
		method={method}
		onSubmit={onSubmit}
	>
		{children}
	</form>
);

Form.defaultProps = {
	className: '',
	action: '',
	method: 'post',
	onSubmit: null
};

Form.propTypes = {
	className: string,
	method: string,
	action: string,
	children: node.isRequired,
	onSubmit: func
};

export default memo(Form);
