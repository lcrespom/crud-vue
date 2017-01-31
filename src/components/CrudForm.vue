<template>
	<form class="form-horizontal" @submit="submit">
		<template v-for="(field, idx) of config.fields">
		<div class="form-group">
			<label class="col-sm-3 control-label">{{config.labels[idx]}}</label>
			<div class="col-sm-9">
				<input class="form-control" v-model="data[field]">
			</div>
		</div>
		</template>

		<div class="form-group">
			<div class="col-sm-12 text-center">
				<button class="btn btn-primary" type="submit">
					<span aria-hidden="true" class="glyphicon glyphicon-ok"></span>
					Save
				</button>
				&nbsp;&nbsp;
				<a class="btn btn-info" @click="cancel">
					<span aria-hidden="true" class="glyphicon glyphicon-remove"></span>
					Cancel
				</a>
			</div>
		</div>
	</form>
</template>

<script>
import { validateTypes } from '../utils/cmp-helpers';
import { backRoute } from '../utils/router';


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
	},
	methods: {
		cancel() {
			backRoute();
		},
		submit(event) {
			event.preventDefault();
			this.$emit('submit');
		}
	}
};
</script>

<style>
</style>
