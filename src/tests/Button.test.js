import React from 'react';
import { mount } from 'enzyme';

import Button from '../components/Button/Button';

describe('Button', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<Button />);
	});

	it('renders without errors', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('should have 1 line of text', () => {
		const mockLabel = 'mock';
		wrapper.setProps({ label: mockLabel });

		expect(wrapper.find('span').length).toEqual(1);
	});

	it('should receive proper type', () => {
		const mockType = 'submit';
		wrapper.setProps({ type: mockType });

		expect(wrapper.prop('type')).toEqual('submit');
	});

	it('should set the correct classes if the class is passed', () => {
		const mockClass = 'mockButton';
		wrapper = mount(<Button className={mockClass} />);

		expect(wrapper.find('.Button.mockButton').length).toEqual(1);
	});

	it('should fire click event when onClick', () => {
		const mockButtonCallBack = jest.fn();
		wrapper = mount(<Button onClick={mockButtonCallBack} />);

		wrapper.simulate('click');

		expect(mockButtonCallBack.mock.calls.length).toEqual(1);
	});
});
