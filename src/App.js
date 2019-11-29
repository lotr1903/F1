import React from 'react';

import Header from './components/Header/Header';
import Main from './components/Main/Main';

import './App.scss';

export const API = {
	BASE_URL: 'http://ergast.com/api/f1/',
	STARTYEAR: 2005,
	ENDYEAR: 2015
};

const App = () => (
	<div className="App">
		<Header />
		<Main />
	</div>
);

export default App;
