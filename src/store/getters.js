export default {
	episodesList: (state) => {
		return state.episodes;
	},
	amountOfSeason: (state) => {
		return state.seasonAmount;
	},
	getSingleEpisode: (state) => {
		return state.singleEpisode;
	},
	getSingleCharacter: (state) => {
		return state.singleCharacter;
	},
	getCharacters: (state) => {
		return state.characters;
	},
	getDeath: (state) => {
		return state.death;
	},
	getSingleQuote: (state) => {
		return state.singleQuote;
	},
	getQuote: (state) => {
		return state.quote;
	},
	getSerialData: (state) => {
		return state.serialData;
	},
};
