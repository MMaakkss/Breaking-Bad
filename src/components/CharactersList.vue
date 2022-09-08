<template>
	<div class="list">
		<CharacterItem
			v-for="(item, idx) in characters"
			:key="idx"
			:data="item"
		/>
	</div>
</template>

<script>
import CharacterItem from '@/components/CharacterItem';

import { mapGetters } from 'vuex';

export default {
	name: 'CharactersList',
	components: {
		CharacterItem,
	},
	computed: {
		...mapGetters({ characters: 'getCharacters' }),
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
</style>
