<template>
	<div class="list">
		<div class="list__item" v-for="(item, idx) in characters" :key="idx">
			<CharacterItem :data="item" />
		</div>
	</div>
</template>

<script>
import CharacterItem from '@/components/CharacterItem';

import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'CharactersList',
	components: {
		CharacterItem,
	},
	computed: {
		...mapGetters({ characters: 'getCharacters' }),
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
.list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 30px;
}

.list__item {
	max-width: 30%;
	flex: 1 1 30%;
}
</style>
