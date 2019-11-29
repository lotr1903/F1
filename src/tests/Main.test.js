import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import axios from 'axios';
import Main from '../components/Main/Main';
import SearchBar from '../components/SearchBar/SearchBar';
import fetchData from './util/fetchData';
import SeasonDetails from '../components/SeasonDetails/SeasonDetails';

jest.mock('axios');

const mockData = [
	{
		data: {
			MRData: {
				StandingsTable: {
					StandingsLists: [
						{
							season: '2005',
							round: '19',
							DriverStandings: [
								{
									position: '1',
									positionText: '1',
									points: '133',
									wins: '7',
									Driver: {
										driverId: 'alonso',
										permanentNumber: '14',
										code: 'ALO',
										givenName: 'Fernando',
										familyName: 'Alonso'
									}
								}
							]
						}
					]
				}
			}
		}
	}
];

const mockStandingsLists = [
	{
		season: '2005',
		round: '19',
		DriverStandings: [
			{
				position: '1',
				positionText: '1',
				points: '133',
				wins: '7',
				Driver: {
					driverId: 'alonso',
					permanentNumber: '14',
					code: 'ALO',
					givenName: 'Fernando',
					familyName: 'Alonso'
				}
			}
		]
	}
];

describe('Main', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<Main />);
	});

	it('renders without errors', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('renders SearchBar without errors', () => {
		expect(wrapper.find(SearchBar).length).toEqual(1);
	});

	it('should call fetchStandings on componentDidMount', () => {
		const instance = wrapper.instance();
		jest.spyOn(instance, 'fetchStandings');
		instance.componentDidMount();
		expect(instance.fetchStandings).toHaveBeenCalledTimes(1);
	});

	it('should return with expected value when createApiUrlByYear executed', () => {
		const mockReturnValue =
			'http://ergast.com/api/f1/2015/driverStandings.json';
		const instance = wrapper.instance();
		jest.spyOn(instance, 'createApiUrlByYear');
		instance.createApiUrlByYear(2015);
		expect(instance.createApiUrlByYear).toHaveBeenCalledTimes(1);
		expect(instance.createApiUrlByYear).toHaveReturnedWith(mockReturnValue);
	});

	it('fetches successfully data from an API on fetchStandings execution', async () => {
		axios.get.mockImplementationOnce(() => Promise.resolve(mockData));

		await expect(fetchData()).resolves.toEqual(mockData);
	});

	it('fetches erroneously data from an API', async () => {
		const errorMessage = 'Network Error';
		axios.get.mockImplementationOnce(() =>
			Promise.reject(new Error(errorMessage))
		);

		await expect(fetchData()).rejects.toThrow(errorMessage);
	});

	it('should call createApiRequest on fetchStandings execution', () => {
		const instance = wrapper.instance();
		jest.spyOn(instance, 'createApiRequest');
		instance.componentDidMount();
		expect(instance.createApiRequest).toHaveBeenCalledTimes(1);
	});

	it('should call itemOnClickHandler when tabItem onClick triggered', async () => {
		const instance = wrapper.instance();
		jest.spyOn(instance, 'itemOnClickHandler');

		wrapper.setState({ standingsLists: mockStandingsLists });
		wrapper.find('.ResultTab__label').simulate('click');

		const container = document.createElement('div');
		document.body.appendChild(container);

		await act(async () => {
			render(<SeasonDetails />, container);
		});

		expect(instance.itemOnClickHandler).toHaveBeenCalledTimes(1);
	});

	it('should call itemOnClickHandler when tabItem onKeyDown triggered', async () => {
		const instance = wrapper.instance();
		jest.spyOn(instance, 'itemOnClickHandler');

		wrapper.setState({ standingsLists: mockStandingsLists });
		wrapper.find('.ResultTab__label').simulate('keydown', { key: 'Enter' });

		const container = document.createElement('div');
		document.body.appendChild(container);

		await act(async () => {
			render(<SeasonDetails />, container);
		});

		expect(instance.itemOnClickHandler).toHaveBeenCalledTimes(1);
	});

	it('should call setState when on itemOnClickHandler execution', async () => {
		const instance = wrapper.instance();
		jest.spyOn(instance, 'itemOnClickHandler');

		wrapper.setState({ standingsLists: mockStandingsLists });
		wrapper.find('.ResultTab__label').simulate('keydown', { key: 'Enter' });

		const container = document.createElement('div');
		document.body.appendChild(container);

		await act(async () => {
			render(<SeasonDetails />, container);
		});

		expect(wrapper.state().showDetails.season).toEqual('2005');

		wrapper.setState({ showDetails: { season: '2005' } });
		wrapper.find('.ResultTab__label').simulate('keydown', { key: 'Enter' });

		expect(wrapper.state().showDetails.season).toEqual('');
	});

	it('should render spinner when loading', () => {
		wrapper.setState({ loading: true });

		expect(wrapper.find('div.Main__spinner').length).toEqual(1);
	});

	it('should render error message when error received', () => {
		wrapper.setState({ error: 'mockError' });

		expect(wrapper.find('div.Main__error').length).toEqual(1);
	});
});
