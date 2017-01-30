<template>
	<table class="table table-hover crud-table">
		<colgroup v-if="hasButtons">
			<col style="width: 1px" />
		</colgroup>
		<thead>
			<tr>
				<th v-if="hasButtons" class="text-center">Action</th>
				<th v-for="(col, idx) of config.labels" :class="getHeaderClass(idx)">{{col}}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="row of data">
				<td v-if="hasButtons" class="text-center nowrap">
					<template v-for="button of config.buttons">
						<a @click="action(button.event, row)" :class="`btn btn-${button.style} btn-sm`">
							<span :class="`glyphicon glyphicon-${button.icon}`" aria-hidden="true"></span>
							{{button.text}}
						</a>
						<span /> <!-- some breathing space between buttons -->
					</template>
				</td>
				<crud-table-cell v-for="(col, idx) of config.fields"
					:row="row" :col="col" :config="config" :idx="idx" />
			</tr>
		</tbody>
	</table>
</template>

<script>
import { validateTypes } from '../utils/cmp-helpers';
import CrudTableCell from './crud-table-cell';


export default {
	components: { CrudTableCell },
	props: {
		data: Array,
		config: {
			validator:
				cfg => validateTypes('CrudTable', 'config', cfg, {
					fields: {
						required: true,
						type: 'Array'
					},
					labels: { type: 'Array' },
					buttons: { type: 'Array' }
				})
		}
	},

	computed: {
		hasButtons() {
			return this.config.buttons.length > 0;
		}
	},

	methods: {
		action(event, row) {
			this.$emit(event, row);
		},
		getHeaderClass(idx) {
			let hdrClasses = this.config.hdrClasses || [];
			return hdrClasses[idx] || '';
		}
	},

	helpers: {
		editButton: {
			style: 'warning', icon: 'pencil', text: 'Edit', event: 'edit'
		},
		removeButton: {
			style: 'danger', icon: 'trash', text: 'Remove', event: 'remove'
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	table.crud-table > tbody > tr> td {
		vertical-align: middle;
	}
	.nowrap {
		white-space: nowrap;
	}
</style>
