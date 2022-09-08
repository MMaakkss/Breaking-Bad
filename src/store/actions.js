import axios from 'axios';

const baseUrl = 'https://www.breakingbadapi.com';

export default {
	getEpisodes(ctx, season) {
		return new Promise(() => {
			axios
				.get(`${baseUrl}/api/episodes`)
				.then((res) => {
					if (res.status === 200) {
						let amount = [];

						res.data.forEach((item) => {
							amount = [...amount, item.season];
						});
						ctx.commit('setAmountOfSeason', Math.max(...amount));

						if (!season) {
							ctx.commit('setEpisodes', res.data);
						} else {
							ctx.commit(
								'setEpisodes',
								res.data.filter(
									(episode) => episode.season == season
								)
							);
						}
					}
				})
				.catch((err) => console.log(err.message));
		});
	},
	getSingle(ctx, id) {
		return new Promise(() => {
			axios
				.get(`${baseUrl}/api/episodes/${id}`)
				.then((res) => {
					if (res.status === 200) {
						ctx.commit('setSingle', res.data[0]);
					}
				})
				.catch((err) => console.log(err.message));
		});
	},
	getCharacters(ctx) {
		return new Promise(() => {
			axios
				.get(`${baseUrl}/api/characters`)
				.then((res) => {
					if (res.status === 200) {
						ctx.commit('setCharacters', res.data);
					}
				})
				.catch((err) => console.log(err.message));
		});
	},
	getSingleCharacter(ctx, id) {
		return new Promise(() => {
			axios
				.get(`${baseUrl}/api/characters/${id}`)
				.then((res) => {
					if (res.status === 200) {
						if (res.data[0])
							ctx.commit('setSingleCharacter', res.data[0]);
					}
				})
				.catch((err) => console.log(err.message));
		});
	},
	getDeath(ctx) {
		return new Promise(() => {
			axios
				.get(`${baseUrl}/api/death`)
				.then((res) => {
					if (res.status === 200) {
						ctx.commit('setDeath', res.data);
					}
				})
				.catch((err) => console.log(err.message));
		});
	},
	getSingleQuote(ctx, name) {
		return new Promise(() => {
			axios
				.get(`${baseUrl}/api/quote?author=${name}`)
				.then((res) => {
					if (res.status === 200) {
						ctx.commit('setSingleQuote', res.data);
					}
				})
				.catch((err) => console.log(err.message));
		});
	},
	getQuote(ctx) {
		return new Promise(() => {
			axios
				.get(`${baseUrl}/api/quotes`)
				.then((res) => {
					if (res.status === 200) {
						ctx.commit('setQuote', res.data);
					}
				})
				.catch((err) => console.log(err.message));
		});
	},
	getSerialData(ctx) {
		return new Promise(() => {
			axios
				.get(`https://www.omdbapi.com/?apikey=88e836ce&i=tt0903747`)
				.then((res) => {
					ctx.commit('setSerialData', res.data);
				})
				.catch((err) => console.log(err.message));
		});
	},
};
