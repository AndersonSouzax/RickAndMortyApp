import axios from 'axios';

class Api{

	static getList(number){

		let url = number === 1 ? 'https://rickandmortyapi.com/api/character/' 
							   :  `https://rickandmortyapi.com/api/character/?page=${number}`;
							   
		return axios.get(url);
	}

	static getEspecific(id){

		if(!id){ return []; }

		return axios.get(`https://rickandmortyapi.com/api/character/?id=${id}`);
		// .then( resp => return resp.data.info, err => return [] );
	}

}

export default Api;