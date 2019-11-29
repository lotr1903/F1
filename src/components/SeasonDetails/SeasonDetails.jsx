import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { string } from 'prop-types';
import classnames from 'classnames';
import { API } from '../../App';
import './SeasonDetails.scss';

const SeasonDetails = ({ season, champion }) => {
	const [seasonDetails, setSeasonDetails] = useState([]);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setError] = useState('');

	// fetches the season details with using season prop
	const fetchSeasonDetails = async () => {
		let fetchedDetails = [];

		setLoading(true);

		try {
			const response = await axios.get(
				`${API.BASE_URL}${season}/results/1.json`
			);

			if (
				response &&
				response.data.MRData &&
				response.data.MRData.RaceTable &&
				response.data.MRData.RaceTable.Races
			) {
				fetchedDetails = response.data.MRData.RaceTable.Races;
			}

			setSeasonDetails(fetchedDetails);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	// When initial render complete in component lifecycle calls the fetchSeasonDetails.
	useEffect(() => {
		fetchSeasonDetails();
	}, []);

	const isError = errorMessage && (
		<div className="Main__error">{errorMessage.message}</div>
	);
	const isLoading = loading && <div className="Main__spinner" />;

	return (
		<>
			{isError}
			{isLoading}
			{seasonDetails.length > 0 ? (
				<ul className="SeasonDetails__list">
					{seasonDetails.map((race, index) => {
						const keyIndex = `${race.Results[0].date}-${index}`;
						const results = race.Results[0];
						const raceTitle = `${race.season} ${race.raceName}`;
						return (
							<li
								className="SeasonDetails__listItem"
								key={keyIndex}
							>
								<div className="SeasonDetails__header">
									<div className="SeasonDetails__race">
										{raceTitle}
									</div>
									<div className="SeasonDetails__title">
										<div>Position</div>
										<div>No</div>
										<div>Driver</div>
										<div>Constructor</div>
										<div>Laps</div>
										<div>Grid</div>
										<div>Time</div>
										<div>Status</div>
										<div>Points</div>
									</div>
								</div>
								<div
									className={classnames(
										'SeasonDetails__content',
										{
											'SeasonDetails--champion':
												champion === results.Driver.code
										}
									)}
								>
									<div className="SeasonDetails__driverPosition">
										{results.position}
									</div>
									<div className="SeasonDetails__driverNumber">
										{results.number}
									</div>
									<div className="SeasonDetails__driverName">
										{`${results.Driver.givenName} ${results.Driver.familyName}`}
									</div>
									<div className="SeasonDetails__constructorName">{`${results.Constructor.name}`}</div>
									<div className="SeasonDetails__laps">
										{results.laps}
									</div>
									<div className="SeasonDetails__grid">
										{results.grid}
									</div>
									<div className="SeasonDetails__time">
										{results.Time.time}
									</div>
									<div className="SeasonDetails__status">
										{results.status}
									</div>
									<div className="SeasonDetails__points">
										{results.points}
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			) : (
				<div>No race results found</div>
			)}
		</>
	);
};

SeasonDetails.propTypes = {
	season: string,
	champion: string
};

SeasonDetails.defaultProps = {
	season: '',
	champion: ''
};

export default SeasonDetails;
