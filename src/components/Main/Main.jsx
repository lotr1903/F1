import React, { Component } from 'react';
import axios from 'axios';
import { API } from '../../App';
import SearchBar from '../SearchBar/SearchBar';
import ResultTab from '../ResultTab/ResultTab';

import './Main.scss';

class Main extends Component {
	// eslint-disable-next-line react/sort-comp
	constructor(props) {
		super(props);
		this.state = {
			standingsLists: [],
			showDetails: {
				season: '',
				show: false,
				checked: false
			},
			error: '',
			loading: true
		};

		this.createApiUrlByYear = this.createApiUrlByYear.bind(this);
		this.createApiRequest = this.createApiRequest.bind(this);
		this.fetchStandings = this.fetchStandings.bind(this);
	}

	// When initial render complete we can execute fetch function for api request.
	componentDidMount() {
		this.fetchStandings();
	}

	// Creates the api endpoint url with given year parameter
	createApiUrlByYear = year => `${API.BASE_URL}${year}/driverStandings.json`;

	// Creates the array of api get request with for loop.
	// As api standart we need to crete one get method for each year separately.
	createApiRequest = () => {
		const apiArray = [];

		for (let i = API.STARTYEAR; i <= API.ENDYEAR; i += 1) {
			apiArray.push(axios.get(this.createApiUrlByYear(i)));
		}

		return apiArray;
	};

	/*
	/ Makes api request to fetch season data.
	/ To make each year request I used axios.all() method to gather and resolve all promises in one time.
	/ Data fetching is a async action for that reason I used async/await pattern and to better error
	/ handling I used try/catch pattern
	*/
	async fetchStandings() {
		const fetchedStandings = [];
		const apiArray = this.createApiRequest();

		this.setState({ loading: true });

		try {
			const response = await axios.all(apiArray);

			if (
				response &&
				response[0].data.MRData &&
				response[0].data.MRData.StandingsTable &&
				response[0].data.MRData.StandingsTable.StandingsLists[0]
			) {
				response.map(responseItem =>
					fetchedStandings.push(
						responseItem.data.MRData.StandingsTable
							.StandingsLists[0]
					)
				);
			}

			this.setState({
				standingsLists: fetchedStandings,
				loading: false
			});
		} catch (error) {
			this.setState({
				error,
				loading: false
			});
		}
	}

	// to manage accordion system in the local state and to pass props to children component,
	// I bind this function to onClick
	itemOnClickHandler(season, event) {
		event.preventDefault();

		const { showDetails } = this.state;

		if (season === showDetails.season) {
			this.setState({
				showDetails: {
					show: false,
					checked: false,
					season: ''
				}
			});
		} else {
			this.setState({
				showDetails: {
					show: true,
					checked: true,
					season
				}
			});
		}
	}

	render() {
		const { standingsLists, loading, error, showDetails } = this.state;
		const standings = standingsLists.map(
			standing => standing.DriverStandings[0]
		);

		return (
			<main className="Main">
				<div className="Main__wrapper">
					<SearchBar />
					{loading && <div className="Main__spinner" />}
					<div className="Main__tabsHeader">
						<div>Season</div>
						<div>Driver&apos;s Name</div>
						<div>Position</div>
						<div>Points</div>
						<div>Wins</div>
					</div>
					<div className="Main__tabs">
						{standings.length > 0 &&
							standings.map((standing, index) => {
								const raceSeason = standingsLists[index].season;
								const keyIndex = `${standing.Driver.code}${raceSeason}`;
								return (
									<ResultTab
										className="Main__tab"
										key={keyIndex}
										ref={this.setCheckboxInputRef}
										keyIndex={keyIndex}
										standing={standing}
										showDetails={showDetails}
										raceSeason={raceSeason}
										onClick={event =>
											this.itemOnClickHandler(
												raceSeason,
												event
											)
										}
										onKeyDown={event =>
											this.itemOnClickHandler(
												raceSeason,
												event
											)
										}
									/>
								);
							})}
					</div>
					{error && (
						<div className="Main__error">{error.message}</div>
					)}
				</div>
			</main>
		);
	}
}

export default Main;
