<template>
	<div class="card" @click="characterInfo(data.char_id)">
		<div class="photo card__item">
			<img :src="data.img" :alt="data.name" />
		</div>

		<div class="title card__item">
			<span class="bold">Name:</span>
			<span>{{ data.name }}</span>
		</div>

		<div class="nickname card__item">
			<span class="bold">Nickname:</span>
			<span>{{ data.nickname }}</span>
		</div>

		<div class="date card__item">
			<span class="bold">Birthday:</span>
			<span>{{ formatDate }}</span>
		</div>

		<div class="season card__item">
			<span class="bold">Season:</span>
			<span
				class="appearance"
				v-for="(item, idx) in data.appearance"
				:key="idx"
			>
				{{ item }}
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CharacterItem',
	props: {
		data: {
			type: [Array, Object],
			default: () => [],
		},
	},
	computed: {
		formatDate() {
			return this.data?.birthday?.replaceAll('-', '.');
		},
	},
	methods: {
		characterInfo(id) {
			this.$router.push({ name: 'character', params: {id: id} });
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
	width: 30%;
	cursor: pointer;
	transition: 0.2s ease-out;
}

.card:hover {
	box-shadow: 0 0 25px -10px rgba(51, 51, 51, 1);
}

.card__item {
	margin-bottom: 15px;
}

.card__item:last-child {
	margin-bottom: 0;
}

.photo img {
	border-radius: 100%;
	width: 80px;
	height: 80px;
	object-fit: cover;
}

.title {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.appearance:after {
	content: ',';
	margin-left: -4px;
}

.appearance:last-child:after {
	display: none;
	margin-right: 0;
}

.bold {
	font-weight: 500;
	margin-right: 5px;
}

@media (max-width: 992px) {
	.card {
		width: 45%;
	}
}
@media (max-width: 615px) {
	.card {
		width: 100%;
	}
}
</style>
