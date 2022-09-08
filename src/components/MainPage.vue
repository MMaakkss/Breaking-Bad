<template>
	<div class="wrapper">
		<header class="header">
			<div class="header__wrap container">
				<nav class="header__menu menu">
					<ul class="menu__list">
						<li class="menu__item">
							<router-link to="/info" class="menu__link">
								Serial Info
							</router-link>
						</li>
						<li class="menu__item">
							<router-link to="/episodes" class="menu__link">
								Episodes
							</router-link>
						</li>
						<li class="menu__item">
							<router-link to="/characters" class="menu__link">
								Characters
							</router-link>
						</li>
						<li class="menu__item">
							<router-link to="/occupation" class="menu__link">
								Occupation
							</router-link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
		<main class="container">
			<router-view />
		</main>
	</div>
</template>

<script>
export default {
	name: 'MainPage',
};
</script>

<style scoped>
.wrapper {
	padding-bottom: 100px;
}
.container {
	max-width: 1440px;
	padding: 0 20px;
	margin: auto;
}

.header {
	padding: 20px 0;
	margin-bottom: 40px;
}

.menu__list {
	display: flex;
	justify-content: center;
	gap: 20px;
}

.menu__link {
	color: #1e1e1e;
	font-size: 18px;
	transition: 0.2s ease-out;
}

.menu__link:hover {
	color: #858585;
}
</style>
