import React from 'react';
import { shallow } from 'enzyme';

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import App from '../App';

describe('<App />', () => {
	it('renders without errors', () => {
		const wrapper = shallow(<App />);

		expect(wrapper.length).toEqual(1);
	});

	it('renders underlying components', () => {
		const wrapper = shallow(<App />);

		expect(wrapper.find(Header).length).toEqual(1);
		expect(wrapper.find(Main).length).toEqual(1);
	});
});
