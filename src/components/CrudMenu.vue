<template>
	<ul :class="cssClass">
		<li v-for="item of items"
			@click="selected = item"
			:class="{ active: isActive(item) }">
			<a v-if="item.route" :href="item.route">
				<span v-if="item.icon" :class="`glyphicon glyphicon-${item.icon}`"
					aria-hidden="true">&nbsp;</span>
				{{item.text}}
			</a>
			<a v-if="item.url" :href="item.url">{{item.text}}</a>
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		cssClass: String,
		items: Array
	},
	data: function() {
		return { selected: null };
	},
	methods: {
		isActive(item) {
			return this.selected
				? this.selected == item
				: item.route == location.hash;
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