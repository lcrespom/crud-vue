<template>
	<ul :class="cssClass">
		<li v-for="item of items"> <!--  routerLinkActive="active" -->
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
	}
};
</script>
