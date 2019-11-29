import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/Header/Header';

describe('Header', () => {
	it('renders without errors', () => {
		const wrapper = shallow(<Header />);
		expect(wrapper.length).toEqual(1);
	});
});
