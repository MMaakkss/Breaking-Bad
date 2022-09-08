export default {
	setEpisodes: (state, data) => (state.episodes = data),
	setAmountOfSeason: (state, data) => (state.seasonAmount = data),
	setSingle: (state, data) => (state.singleEpisode = data),
	setSingleCharacter: (state, data) => (state.singleCharacter = data),
	setCharacters: (state, data) => (state.characters = data),
	setDeath: (state, data) => (state.death = data),
	setSingleQuote: (state, data) => (state.singleQuote = data),
	setQuote: (state, data) => (state.quote = data),
	setSerialData: (state, data) => (state.serialData = data),
};
