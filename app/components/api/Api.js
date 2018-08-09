import axios from 'axios';

class Api{

	static getList(){

		axios.get('https://rickandmortyapi.com/api/character/')
		.then( resp => return resp.data.info, err => return [] );
	}

	static getEspecific(id){

		if(!id){ return []; }

		axios.get(`https://rickandmortyapi.com/api/character/?id=${id}`)
		.then( resp => return resp.data.info, err => return [] );
	}

}

export default Api;