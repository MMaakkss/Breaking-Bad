import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import MainPage from '@/components/MainPage';
import EpisodesList from '@/components/EpisodesList';
import EpisodeInfo from '@/components/EpisodeInfo';
import CharactersList from "@/components/CharactersList";
import CharacterInfo from "@/components/CharacterInfo";
import SerialInfo from "@/components/SerialInfo";
import OccupationList from "@/components/OccupationList";

export const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'main',
			component: MainPage,
			children: [
				{
					path: '/info',
					name: 'info',
					component: SerialInfo,
				},{
					path: '/occupation',
					name: 'occupation',
					component: OccupationList,
				},
				{
					path: '/episodes',
					name: 'episodes',
					component: EpisodesList,
				},
				{
					path: '/episodes/:season',
					name: 'episode-season',
					component: EpisodesList,
				},
				{
					path: '/episode/:id',
					name: 'episode',
					component: EpisodeInfo,
				},
				{
					path: '/characters',
					name: 'characters',
					component: CharactersList,
				},
				{
					path: '/characters/:id',
					name: 'character',
					component: CharacterInfo,
				},
			],
		},
	],
});
