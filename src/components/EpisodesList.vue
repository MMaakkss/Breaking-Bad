<template>
	<div>
		<div class="seasons">
			<span
				class="seasons__item"
				v-for="idx in amountOfSeason"
				:key="idx"
				@click="changeSeason(idx)"
			>
				Season {{ idx }}
			</span>
		</div>
		<div class="search">
			<input class="input" v-model="search" placeholder="Search" />
		</div>
		<h2 class="title" v-if="getEpisodeList.length">Episodes</h2>
		<div class="list">
			<EpisodeItem
				class="list__item"
				v-for="(item, idx) in getEpisodeList"
				:key="idx"
				:episode="item"
			/>
		</div>
		<div v-if="charactersList.length">
			<h2 class="title">Characters</h2>
			<div class="list">
				<CharacterItem
					class="list__item"
					v-for="(item, idx) in charactersList"
					:key="idx"
					:data="item"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import EpisodeItem from '@/components/EpisodeItem';
import CharacterItem from '@/components/CharacterItem';

import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'EpisodesList',
	components: {
		EpisodeItem,
		CharacterItem,
	},
	data() {
		return {
			search: '',
			list: '',
			charactersList: [],
			quotesList: [],
			deathList: [],
		};
	},
	computed: {
		...mapGetters({
			episodesList: 'episodesList',
			amountOfSeason: 'amountOfSeason',
			characters: 'getCharacters',
			quotes: 'getQuote',
			death: 'getDeath',
		}),
		getEpisodeList() {
			if (this.list) {
				return this.list;
			} else {
				return this.episodesList;
			}
		},
	},
	methods: {
		...mapActions({
			episodes: 'getEpisodes',
			getCharacters: 'getCharacters',
			getQuote: 'getQuote',
			getDeath: 'getDeath',
		}),
		changeSeason(idx) {
			if (this.$route.params.season !== idx) this.$router.push({ name: 'episode-season', params: { season: idx },});
		},
	},
	created() {
		this.episodes(this.$route.params.season);
		this.getCharacters();
		this.getQuote();
		this.getDeath();
	},
	watch: {
		$route() {
			this.episodes(this.$route.params.season);
		},
		episodesList() {
			this.list = this.episodesList;
			this.charactersList = [];
			this.search = '';
		},
		search() {
			//filter for episodes
			this.list = this.episodesList.filter((episode) =>
				episode.title.toLowerCase().includes(this.search.toLowerCase())
			);
			this.episodesList.forEach((episode) => {
				episode.characters.forEach((item) => {
					if (
						item.toLowerCase().includes(this.search.toLowerCase())
					) {
						this.list = [...this.list, episode];
					}
				});
			});

			//filter for characters
			this.charactersList = this.characters.filter((character) =>
				character.name.toLowerCase().includes(this.search.toLowerCase())
			);

			//filter for quotes
			this.quotesList = this.quotes.filter((quote) =>
				quote.quote.toLowerCase().includes(this.search.toLowerCase())
			);

			this.quotesList.forEach((quote) => {
				this.characters?.forEach((character) => {
					if (
						character.nickname === quote.author ||
						character.name === quote.author
					)
						this.charactersList = [
							...this.charactersList,
							character,
						];
				});
			});

			//filter for death
			this.deathList = this.death.filter((death) => {
				return death.death
					.toLowerCase()
					.includes(this.search.toLowerCase());
			});

			this.deathList.forEach((death) => {
				this.characters.forEach((character) => {
					if (death.responsible.includes('and')) {
						let responsibles = death.responsible.split('and');
						responsibles.forEach((responsible) => {
							if (character.name === responsible.trim()) this.charactersList = [...this.charactersList, character,];
						});
					} else {
						if (character.name === death.responsible)
							this.charactersList = [
								...this.charactersList,
								character,
							];
					}
				});
			});

			this.charactersList = [...new Set(this.charactersList)];
			this.list = [...new Set(this.list)];
		},
	},
};
</script>

<style scoped>
.seasons {
	width: fit-content;
	margin: 0 auto 40px;
}

.seasons__item {
	cursor: pointer;
	padding: 0 10px;
	border-right: 1px solid #cecece;
}

.seasons__item:last-child {
	border: none;
}

.seasons__item:hover {
	color: #858585;
}

.search {
	text-align: center;
}

.title {
	margin-top: 50px;
	margin-bottom: 20px;
	text-align: center;
}

.input {
	padding: 10px 20px;
	width: 400px;
	background-color: #efefef;
}

.list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 30px;
}

.list__item {
	flex-basis: 30%;
	cursor: pointer;
	transition: 0.2s ease-out;
}

.list__item:hover {
	box-shadow: 0 0 25px -10px rgba(51, 51, 51, 1);
}
</style>