function columnSum(table, j) {
	var tmp = 0;
	for (var i = 0; i < table.length; i++) {
		tmp += !isNaN(parseFloat(table[i][j].data)) ? parseFloat(table[i][j].data) : 0;  
	}
	return tmp.toFixed(2);
}

window.onload = function() {
	var creditCalc = new Vue({
		el: "#credit-calc",

		data: {
			creditData: [
				[{data: "Дата"}, {data: "Поступление основного долга"}, {data: "Погашение основного долга"}],
				[{data: ""}, {data: ""}, {data: ""}],
				[{data: ""}, {data: columnSum}, {data: columnSum}]],
			interestRate: 0,
			interestDate: 0,
			interestFlowData: [],	//calculated data
			interestFlowCalculated: false,
			inputHeader: "Таблица основного долга",
			inputTableClass: "input-table",
			calculatedHeader: "Таблица начисленных процентов",
			calculatedTableClass: "calculated-table"
		},

		methods: {
			calculate: function() {
				if (this.creditData[this.creditData.length - 1][1].data(this.creditData, 1) ==
					this.creditData[this.creditData.length - 1][2].data(this.creditData, 2)) {
					xhr = new XMLHttpRequest();
					xhr.open("POST", apiCalculateURL, true);
					xhr.setRequestHeader("X-CSRFToken", Cookies.get("csrftoken"));
					xhr.send(JSON.stringify({
						creditData: this.creditData.slice(1, this.creditData.length - 1),
						interestDate: this.interestDate,
						interestRate: this.interestRate
					}));
					xhr.onreadystatechange = function() {
						if (xhr.readyState == 4 && xhr.status == 200) {
							flowData = Array.prototype.map.call(JSON.parse(xhr.responseText), function(item) {
								return item.fields;
							});
							creditCalc.interestFlowData = [	[{data: "Дата начисления процентов"},
															{data: "Начислено за месяц"}]];
							for (var i = 0; i < flowData.length; i++) {
								console.log(typeof(flowData[i].date) + ": " + flowData[i].date);
								var jsDate = new Date(flowData[i].date);
								creditCalc.interestFlowData.push([
									{data: 	(jsDate.getDate() > 9 ? jsDate.getDate() : "0" + jsDate.getDate()) + "." +
											(jsDate.getMonth() > 8 ? jsDate.getMonth() + 1 : "0" + (jsDate.getMonth() + 1)) + "." +
											jsDate.getFullYear()}, 
									{data: flowData[i].flow.toFixed(2)}]);
							}
							creditCalc.interestFlowData.push([{data: ""}, {data: columnSum}]);
							creditCalc.interestFlowCalculated = true;
						}	
					};
				} else {
					this.interestFlowCalculated = false;
					alert("Суммы поступлений и погашений не сходятся.");
				}
			}
		},

		created: function() {
			//get data from server
		}
	});
}