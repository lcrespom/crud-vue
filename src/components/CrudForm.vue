<template>
	<h3>ToDo: Form...</h3>
</template>

<script>
import { validateTypes } from '../utils/cmp-helpers';


export default {
	props: {
		data: Object,
		config: {
			validator:
				cfg => validateTypes('CrudForm', 'config', cfg, {
					fields: {
						required: true,
						type: 'Array'
					},
					labels: { type: 'Array' },
				})
		}
	}
};
</script>

<style>
</style>
