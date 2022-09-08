<template>
	<div>
		<div v-for="(occupation, idx) in occupation" :key="idx">
			<span class="title">{{ occupation }} : </span>
			<template v-for="(item, idx) in characters">
				<span class="item" v-if="item.occupation.includes(occupation)" :key="idx">
					{{ item.name }}
				</span>
			</template>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'OccupationList',
	data() {
		return {
			occupationList: [],
			test: [],
		};
	},
	computed: {
		...mapGetters({ characters: 'getCharacters' }),
		occupation() {
			let occupationList = [];

			this.characters.forEach((item) => {
				item.occupation.forEach((elem) => {
					occupationList.push(elem);
				});
				occupationList = [...new Set(occupationList)];
			});

			occupationList = [...new Set(occupationList)];

			return occupationList;
		},
	},
	methods: {
		...mapActions({ getCharacters: 'getCharacters' }),
	},
	created() {
		this.getCharacters();
	},
};
</script>

<style scoped>
hr {
	width: 100%;
	height: 2px;
	background-color: black;
}

.title {
	font-weight: 500;
}
.item::after {
	content: '/';
}
.item:last-child::after {
	display: none;
}
</style>
