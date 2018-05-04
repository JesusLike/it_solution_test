window.onload = function() {
	var creditCalc = new Vue({
		el: "#credit-calc",

		data: {
			creditData: [],	//data for table
			interestRate: 0,
			interestDate: 0,
			interestFlowData: [],	//calculated data
			interestFlowCalculated: false
		},

		method: {
			addRow: function() {

			},
			calculate: function() {

			}
		}

		created: function() {
			//get data from server
		}
	});
}