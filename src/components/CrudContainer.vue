<template>
	<h3>Current route: {{routerData.route}}</h3>
</template>

<script>
import { routerData } from '../utils/router';

const container = {
	data: _ => ({
		routerData
	})
};
export default container;
</script>

<style>
</style>