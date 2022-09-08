<template>
	<div class="card" @click="episodeInfo(episode.episode_id)">
		<div class="card__item">
			<span class="bold">Title:</span>
			<span>{{ episode.title }}</span>
		</div>
		<div class="season card__item">
			<span class="bold">Season:</span>
			<span>{{ episode.season }}</span>
		</div>
		<div class="card__item">
			<span class="bold">Date:</span>
			<span>{{ formatDate }}</span>
		</div>
		<div class="characters-list card__item">
			<span class="bold">Characters:</span>
			<span
				class="character"
				v-for="(item, idx) in episode.characters"
				:key="idx"
			>
				{{ item }}
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'EpisodeItem',
	props: {
		episode: {
			type: [Array, Object],
			default: () => [],
		},
	},
	computed: {
		formatDate() {
			return this.episode?.air_date?.replaceAll('-', '.')
		}
	},
	methods: {
		episodeInfo(id) {
			this.$router.push({ name: 'episode', params: {id: id} });
		},
	},
};
</script>

<style scoped>
.card {
	color: white;
	padding: 15px;
	background: #2483f1ff;
	border-radius: 10px;
}

.card__item {
	margin-bottom: 15px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.card__item:last-child {
	margin-bottom: 0;
}

.characters-list {
	display: flex;
	flex-wrap: wrap;
}

.character {
	font-style: italic;
}

.character:after {
	content: ',';
	margin-left: -4px;
}

.character:last-child:after {
	display: none;
}

.bold {
	font-weight: 500;
	margin-right: 5px;
}
</style>