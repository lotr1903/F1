import axios from 'axios';
import { API } from '../../App';

const fetchData = async () => {
	const url = `${API}/2015/driverStandings.json`;

	const response = await axios.get(url);
	return response;
};

export default fetchData;
