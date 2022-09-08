<template>
	<div class="wrap">
		<div class="poster">
			<img :src="serialData.Poster" :alt="serialData.Title" />
			<span class="rating">{{ serialData.imdbRating }}</span>
		</div>
		<h1 class="info">Title: {{ serialData.Title }}</h1>
		<h2 class="info">Genre: {{ serialData.Genre }}</h2>
		<h2 class="info">Writer: {{ serialData.Writer }}</h2>
		<h2 class="info">Year: {{ serialData.Year }}</h2>
		<h3 class="info">Released: {{ serialData.Released }}</h3>
		<h3 class="info">Country: {{ serialData.Country }}</h3>
		<h3 class="info">Actors: {{ serialData.Actors }}</h3>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'SerialInfo',
	methods: {
		...mapActions({ getSerialData: 'getSerialData' }),
	},
	computed: {
		...mapGetters({ serialData: 'getSerialData' }),
	},
	created() {
		this.getSerialData();
	},
};
</script>

<style scoped>
.wrap {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.poster {
	width: fit-content;
	position: relative;
	margin: auto;
}

.poster img {
	max-width: 100%;
}

.rating {
	position: absolute;
	color: #ef3131;
	background-color: gold;
	padding: 15px;
	border-radius: 100%;
	font-size: 24px;
	right: 0;
	top: 0;
	transform: rotate(-25deg) translate(50%, -20%);
}

.info {
	text-align: center;
}
</style>
