<template>
	<ul :class="cssClass">
		<li v-for="item of items"
			:class="{ active: isActive(item) }">
			<a v-if="item.route" :href="item.route" @click="itemClicked(item, $event)">
				<span v-if="item.icon" :class="`glyphicon glyphicon-${item.icon}`"
					aria-hidden="true">&nbsp;</span>
				{{item.text}}
			</a>
			<a v-if="item.url" :href="item.url">{{item.text}}</a>
		</li>
	</ul>
</template>

<script>
import { routerData, setRoute } from '../utils/router';

export default {
	props: {
		cssClass: String,
		items: Array
	},
	data: function() {
		return { routerData };
	},
	methods: {
		isActive(item) {
			return item.route && routerData.routeName == item.route.slice(1);
		},
		itemClicked(item, event) {
			setRoute(event, item.route);
		}
	}
};
</script>

<style>
.nav-list>.active>a, .nav-list>.active>a:hover , .nav-list>.active>a:focus {
	background-color: #08c;
	color: #fff;
}
</style>