Vue.component('vue-table', {
	props: {
		tableData: {
			type: Array						//let there be first row always headers and last always for functions
		},
		editable: {
			type: Boolean,
			default: true
		},
		header: {
			type: String
		},
		tableClass: {
			type: String
		}
	},

	methods: {
		addRow: function() {
			this.tableData.splice(-1, 0, Array.apply(null, 
					{length: this.tableData[0].length}).map(function(element) {
						return {
							data: ""
						};	
					}));
		},
		removeRow: function() {
			this.tableData.splice(-2, 1);
		}
	},

	template: '\
	<div class="table-container">\
		<h1>{{ header }}</h1>\
		<button id="add-row" v-on:click="addRow" v-if="editable">Добавить</button>\
		<button id="remove-row" v-on:click="removeRow" v-if="editable">Удалить</button>\
		<table v-bind:class="tableClass">\
			<tr v-for="(row, rowIndex) in tableData">\
				<td v-for="(cell, colIndex) in row">\
					<input v-bind:disabled="true"\
					type="text" \
					v-if="typeof(cell.data) == \'function\'"\
					v-bind:value="cell.data(tableData, colIndex)">\
					<input v-else\
					v-bind:disabled="!editable || rowIndex == 0 || rowIndex == tableData.length - 1"\
					type="text"\
					v-model="cell.data">\
				</td>\
			</tr>\
		</table>\
	</div>'
});
