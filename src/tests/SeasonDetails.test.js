import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import SeasonDetails from '../components/SeasonDetails/SeasonDetails';

const mockSeason = '2005';
const mockDriverCode = 'ALO';

// eslint-disable-next-line no-unused-vars
const mockData = [
	{
		data: {
			MRData: {
				RaceTable: {
					Races: [
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

describe('SeasonDetails', () => {
	let container;
	const setState = jest.fn();
	const useStateSpy = jest.spyOn(React, 'useState');
	useStateSpy.mockImplementation(init => [init, setState]);

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(() => {
		jest.clearAllMocks();
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});

	it('renders with initial text', () => {
		act(() => {
			render(
				<SeasonDetails season={mockSeason} champion={mockDriverCode} />,
				container
			);
		});

		expect(container.textContent).toEqual('No race results found');
	});

	// 	expect(wrapper.length).toEqual(1);
	// });

	// it('should call fetchSeasonDetails on useEffect', async () => {
	// 	jest.spyOn(axios, 'get').mockImplementation(() =>
	// 		Promise.resolve({
	// 			json: () => Promise.resolve(mockData)
	// 		})
	// 	);

	// 	await act(async () => {
	// 		render(
	// 			<SeasonDetails season={mockSeason} champion={mockDriverCode} />,
	// 			container
	// 		);
	// 	});

	// 	// await expect(fetchData()).resolves.toEqual(mockData);
	// 	// const instance = wrapper.instance();
	// 	// jest.spyOn(instance, 'fetchStandings');
	// 	expect(container.textContent).toContain(mockData);
	// });
});
