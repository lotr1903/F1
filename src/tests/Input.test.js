import React from 'react';
import { mount } from 'enzyme';

import Input from '../components/Input/Input';

describe('Input', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<Input />);
	});

	it('renders without errors', () => {
		wrapper = mount(<Input />);

		expect(wrapper.length).toEqual(1);
	});

	it('should receive proper type', () => {
		const mockType = 'text';
		wrapper.setProps({ type: mockType });

		expect(wrapper.prop('type')).toEqual('text');
	});

	it('should receive proper maxLength prop', () => {
		const mockLength = '4';
		wrapper.setProps({ maxLength: mockLength });

		expect(wrapper.prop('maxLength')).toEqual('4');
	});

	it('should set the correct value if the label is passed', () => {
		const mockContent = 'mockInput';
		wrapper = mount(<Input label={mockContent} />);

		expect(wrapper.prop('label')).toEqual('mockInput');
	});

	it('should call onChange prop with input value', () => {
		const onChangeMockCallback = jest.fn();
		wrapper = mount(
			<Input onChange={onChangeMockCallback} value="mock value" />
		);

		wrapper.find('input').simulate('change');
		expect(onChangeMockCallback.mock.calls.length).toEqual(1);
	});
});
