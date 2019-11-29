import React from 'react';
import { string, func, object } from 'prop-types';
import classnames from 'classnames';
import SeasonDetails from '../SeasonDetails/SeasonDetails';
import './ResultTab.scss';

const ResultTab = ({
	standing,
	raceSeason,
	keyIndex,
	showDetails,
	onClick,
	onKeyDown,
	className
}) => (
	<div
		className={classnames(
			'ResultTab',
			{
				'ResultTab--selected':
					showDetails.checked && showDetails.season === raceSeason
			},
			className
		)}
		key={keyIndex}
	>
		<label
			className="ResultTab__label"
			htmlFor={keyIndex}
			role="button"
			onClick={onClick}
			onKeyDown={onKeyDown}
		>
			<div className="ResultTab__raceSeason">{raceSeason}</div>
			<div className="ResultTab__driverName">{`${standing.Driver.givenName} ${standing.Driver.familyName}`}</div>
			<div className="ResultTab__driverPosition">{standing.position}</div>
			<div className="ResultTab__driverPoints">{standing.points}</div>
			<div className="ResultTab__driverWins">{standing.wins}</div>
		</label>
		<div className="ResultTab__tabContent">
			{showDetails.show && showDetails.season === raceSeason && (
				<SeasonDetails
					season={showDetails.season}
					champion={standing.Driver.code}
				/>
			)}
		</div>
	</div>
);

ResultTab.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	standing: object,
	keyIndex: string,
	// eslint-disable-next-line react/forbid-prop-types
	showDetails: object,
	raceSeason: string,
	onClick: func,
	onKeyDown: func
};

ResultTab.defaultProps = {
	standing: [],
	keyIndex: '',
	onClick: () => {},
	onKeyDown: () => {},
	showDetails: object,
	raceSeason: ''
};

export default ResultTab;
