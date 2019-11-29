import React from 'react';
import { mount } from 'enzyme';

import SearchBar from '../components/SearchBar/SearchBar';

describe('<App />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<SearchBar />);
	});
	it('renders without errors', () => {
		wrapper.debug();
		expect(wrapper.length).toEqual(1);
	});

	it('should call formOnSubmitHandler and sets the newstate when form submitted', () => {
		const mockFormData = {
			firstInput: { elementId: 'firstInput', value: '2005' },
			secondInput: { elementId: 'secondInput', value: '2015' }
		};
		// const e = { preventDefault: jest.fn(), mockFormData };
		const instance = wrapper.instance();
		jest.spyOn(instance, 'formOnSubmitHandler');

		wrapper.setState({ formData: mockFormData });
		wrapper.find('form').simulate('submit');

		expect(instance.formOnSubmitHandler).toHaveBeenCalledTimes(1);
	});

	it('should call inputChangedHandler and sets the newstate when input value onChange triggered', () => {
		const e = { preventDefault: jest.fn(), target: { value: '2015' } };
		const instance = wrapper.instance();

		instance.inputChangedHandler(e, 'firstInput');

		// eslint-disable-next-line dot-notation
		expect(wrapper.state().formData).toEqual({
			firstInput: {
				elementId: 'firstInput',
				value: '2015'
			},
			secondInput: {
				elementId: 'secondInput',
				value: ''
			}
		});
	});
});
