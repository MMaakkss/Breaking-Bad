<template>
	<div class="card">
		<div
			class="icon"
			:class="{ active: favourite }"
			@click="addToFavourite"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
				<path
					d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
				/>
			</svg>
		</div>
		<div class="photo card__item">
			<img :src="character.img" :alt="character.name" />
		</div>

		<div class="card__item">
			<h3>Name:</h3>
			<span>{{ character.name }}</span>
		</div>

		<div class="card__item">
			<h3>Nickname:</h3>
			<span>{{ character.nickname }}</span>
		</div>

		<div class="card__item">
			<h3>Occupation:</h3>
			<span
				class="multi-world"
				v-for="(item, idx) in character.occupation"
				:key="idx"
			>
				{{ item }}
			</span>
		</div>

		<div class="card__item">
			<h3>Season:</h3>
			<span
				class="multi-world"
				v-for="(item, idx) in character.appearance"
				:key="idx"
			>
				{{ item }}
			</span>
		</div>

		<div class="card__item wrap" v-if="quote.length">
			<h3>Quotes:</h3>
			<div v-for="(item, idx) in quote" :key="idx">
				{{ item.quote }}
			</div>
		</div>

		<div class="card__item wrap">
			<h3>Death:</h3>
			<div v-for="(item, idx) in death" :key="idx">
				<span v-if="item.responsible.includes(character.name)">{{
					item.death
				}}</span>
			</div>
		</div>

		<div class="card__item">
			<h3>Birthday:</h3>
			<span>{{ formatDate }}</span>
		</div>

		<div class="card__item wrap">
			<h3>Episodes:</h3>

			<div
				v-for="(season, seasonIdx) in character.appearance"
				:key="seasonIdx"
			>
				<span> Season{{ season }}: </span>
				<template v-for="(episode, episodeIdx) in filterEpisodes">
					<span
						class="multi-world"
						v-if="episode.season == season"
						:key="episodeIdx"
					>
						{{ episode.episode }}
					</span>
				</template>
			</div>
		</div>

		<div class="card__item wrap">
			<h3>TimeLine:</h3>
			<div
				class="timeline"
				v-for="(item, idx) in filterEpisodesDate"
				:key="idx"
			>
				<div>Season: {{ item.season }}</div>
				<div>Episode: {{ item.episode }}</div>
				<div>Date: {{ item.air_date.replaceAll('-', '.') }}</div>
			</div>
		</div>

		<div class="card__item">
			<h3>Status:</h3>
			<span>{{ character.status }}</span>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'CharacterInfo',
	data() {
		return {
			isActive: false,
		};
	},
	computed: {
		...mapGetters({
			character: 'getSingleCharacter',
			quote: 'getSingleQuote',
			death: 'getDeath',
			episodes: 'episodesList',
		}),
		formatDate() {
			return this.character?.birthday?.replaceAll('-', '.');
		},
		filterEpisodesDate() {
			let episodes = this.filterEpisodes;
			return episodes.sort(
				(a, b) => new Date(a.air_date) - new Date(b.air_date)
			);
		},
		filterEpisodes() {
			return this.episodes.filter((episode) =>
				episode.characters.includes(this.character.name)
			);
		},
		favourite() {
			if (localStorage.getItem('favourite') !== null) {
				let storage = localStorage.getItem('favourite');
				let storeData = storage.split(',');

				if (storeData.includes(String(this.character.char_id))) {
					this.toggle(true);
				} else {
					this.toggle(false);
				}
			}

			return this.isActive;
		},
	},
	methods: {
		...mapActions({
			getCharacter: 'getSingleCharacter',
			getQuote: 'getSingleQuote',
		}),
		toggle(state) {
			this.isActive = state;
		},
		addToFavourite() {
			if (localStorage.getItem('favourite') !== null) {
				let storage = localStorage.getItem('favourite');

				let storeData = storage.split(',');

				if (!storeData.includes(String(this.character.char_id))) {
					if (storage.length) {
						storage = storage + ',' + this.character.char_id;
						localStorage.setItem('favourite', storage);
					} else {
						localStorage.setItem(
							'favourite',
							this.character.char_id
						);
					}

					this.toggle(true);
				} else {
					storeData.splice(
						storeData.indexOf(String(this.character.char_id)),
						1
					);
					storeData = storeData.join();
					localStorage.setItem('favourite', storeData);

					this.toggle(false);
				}
			} else {
				localStorage.setItem('favourite', this.character.char_id);

				this.toggle(true);
			}
		},
	},
	created() {
		this.getCharacter(this.$route.params.id);
	},
	watch: {
		character() {
			this.getQuote(this.character?.name?.replaceAll(' ', '+'));
		},
	},
};
</script>

<style scoped>
.icon {
	position: absolute;
	right: 20px;
	top: 20px;
	cursor: pointer;
}

.icon svg {
	width: 20px;
	fill: #cecece;
}

.icon.active svg {
	fill: gold;
}

.card {
	color: white;
	padding: 15px;
	background: #2483f1ff;
	border-radius: 10px;
	width: 480px;
	margin: auto;
	position: relative;
}

.card__item {
	margin-bottom: 15px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.card__item.wrap {
	white-space: normal;
}

.card__item:last-child {
	margin-bottom: 0;
}

.photo {
	width: fit-content;
	margin: auto;
}

.photo img {
	border-radius: 100%;
	width: 120px;
	height: 120px;
	object-fit: cover;
}

.multi-world:after {
	content: ',';
	margin-left: -4px;
}

.multi-world:last-child:after {
	display: none;
	margin-right: 0;
}

h3 {
	display: inline;
	margin-right: 5px;
}

.timeline {
	margin-bottom: 20px;
}

.timeline:last-child {
	margin-bottom: 0;
}
</style>
