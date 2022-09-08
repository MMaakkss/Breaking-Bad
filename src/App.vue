<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>

export default {
	name: 'App',
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
}

*,
*::before,
*::after {
	margin: 0;
	padding: 0;
	border: none;
	box-sizing: border-box;
}

html,
body {
	height: 100%;
}

a {
	text-decoration: none;
}

li {
	list-style: none;
}
</style>
