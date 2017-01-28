<template>
	<table class="table table-hover crud-table">
		<colgroup v-if="hasButtons">
			<col style="width: 1px" />
		</colgroup>
		<thead>
			<tr>
				<th v-if="hasButtons" class="text-center action-col">Action</th>
				<th v-for="col of config.labels">{{col}}</th>
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
				<td v-for="col of config.fields">{{row[col]}}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
function checkObject(cname, pname, prop, reqs) {
	function reject(msg) {
		console.error(`Error in property "${pname}" of component ${cname}: ${msg}`);
		return false;
	}
	function typeOf(obj) {
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1];
	}
	for (let k of Object.keys(reqs)) {
		if (reqs[k].required && !prop[k])
			return reject(`property "${k}" is required`);
		if (!prop[k]) continue;
		if (reqs[k].type && typeOf(prop[k]) != reqs[k].type)
			return reject(`property "${pname}.${k}" should be of type ${reqs[k].type}`);
	}
	return true;
}

function ucfirst(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export default {
	props: {
		data: Array,
		config: {
			validator:
				cfg => checkObject('CrudTable', 'config', cfg, {
					fields: {
						required: true,
						type: 'Array'
					},
					labels: { type: 'Array' },
					buttons: { type: 'Array' }
				})
		}
	},

	data: function() {
		let cfg = this.config;
		cfg.buttons = cfg.buttons || [];
		cfg.labels = cfg.labels || cfg.fields.map(ucfirst);
		return {
			hasButtons: cfg.buttons.length > 0
		};
	},

	methods: {
		action(event, row) {
			this.$emit(event, row);
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
