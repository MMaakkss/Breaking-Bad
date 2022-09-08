<template>
	<div class="list">
		<div class="list__item" v-for="(item, idx) in topList" :key="idx">
			<div>Responsible: {{ item.responsible }}</div>
			<div>
				<span>Death: {{ item.death }}</span>
				<span class="death" v-if="item.number_of_deaths > 1"
					>(number of deaths: {{ item.number_of_deaths }})</span
				>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'TopList',
	computed: {
		...mapGetters({ death: 'getDeath' }),
		topList() {
			let data = JSON.stringify(this.death);
			data = JSON.parse(data)

			for (let i = 0; i < data.length; i++) {
				for (let j = i + 1; j < data.length; j++) {
					if (data[i].death === data[j].death) {
						let sum =
							data[i].number_of_deaths + data[j].number_of_deaths;
						data[i].number_of_deaths = sum;
						data[j].number_of_deaths = sum;
					}
				}
			}

			data.sort((a, b) => b.number_of_deaths - a.number_of_deaths);
			let newData = data.slice(0, 5);

			return newData;
		},
	},
};
</script>

<style scoped>
.list__item {
	padding: 10px;
	border: 1px solid #858585;
	border-radius: 5px;
	margin-bottom: 20px;
}

.list__item:last-child {
	margin-bottom: 0;
}

.death {
	font-style: italic;
	margin-left: 5px;
}
</style>