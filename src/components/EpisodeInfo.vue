<template>
	<div>
		<h1 class="title">
			Title of episode:
			<span class="episode-title">{{ episode.title }}</span>
		</h1>
		<h2 class="title">Date: {{ episode.air_date.replaceAll('-', '.') }}</h2>

		<div class="death-wrap">
			<h2 class="title" v-if="filterDeath.length">Number Of Death</h2>
			<div class="death" v-for="(item, idx) in filterDeath" :key="idx">
				<div>
					<span>Name:</span>
					<span>{{ item.death }}</span>
				</div>
				<div>
					<span>Number of death:</span>
					<span>{{ item.number_of_deaths }}</span>
				</div>
			</div>
		</div>

		<h2 class="title">Characters</h2>
		<div class="characters__list">
			<CharacterItem
				v-for="(item, idx) in filterCharacters"
				:key="idx"
				:data="item"
			/>
		</div>
	</div>
</template>

<script>
import CharacterItem from '@/components/CharacterItem';

import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'EpisodeInfo',
	components: {
		CharacterItem,
	},
	computed: {
		...mapGetters({
			episode: 'getSingleEpisode',
			characters: 'getCharacters',
			death: 'getDeath',
		}),
		filterCharacters() {
			let arr = [];
			this.episode?.characters?.forEach((episodeCharacter) => {
				let filtered = this.characters.filter(
					(character) => character.name === episodeCharacter
				);
				if (filtered[0]) arr = [...arr, filtered[0]];
			});
			return arr;
		},
		filterDeath() {
			return this.death?.filter(
				(death) =>
					death.season == this.episode.season &&
					death.episode == this.episode.episode
			);
		},
	},
	methods: {
		...mapActions({
			episodeInfo: 'getSingle',
		}),
	},
	created() {
		this.episodeInfo(this.$route.params.id);
	},
};
</script>

<style scoped>
.title {
	width: fit-content;
	margin: auto auto 20px;
}

.episode-title {
	font-weight: 500;
	font-style: italic;
}

.characters__list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 30px;
}

.death-wrap {
	margin-bottom: 20px;
}

.death {
	margin: auto;
	width: fit-content;
	border-bottom: 1px solid #858585;
	padding: 10px 0;
}
</style>
