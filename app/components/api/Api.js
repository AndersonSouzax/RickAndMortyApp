import axios from 'axios';

class Api{

	//To get page by page of results
	static getList(number){

		let url = number === 1 ? 'https://rickandmortyapi.com/api/character/' 
							   :  `https://rickandmortyapi.com/api/character/?page=${number}`;
							   
		return axios.get(url);
	}

	// To get a specific character
	static getEspecific(id){

		if(!id){ return []; }

		return axios.get(`https://rickandmortyapi.com/api/character/?id=${id}`);
	}

	// To get a complete list of episodes informations
	static getCharEpisodes(episodes){
		
		if(episodes.length > 0){

			let promisses = [], i = 0;

			for(i; i < episodes.length;i++){
				promisses.push( axios.get(episodes[i]) );
			}

			return Promise.all(promisses);
		}

		return [];
	}

}

export default Api;