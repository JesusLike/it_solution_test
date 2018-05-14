window.onload = function() {
	var spaceMessages = new Vue({
		el: '#space-messages',
		
		data: {
			messages: []
		},

		methods: {
			loadMessages: function() {
				var loadedMessagesId = Array.prototype.map.call(document.getElementsByClassName('message'), function(message) {
					return message.id;	
				});
				loadedMessagesId.push(-1);
				var lastId = Math.max.apply(null, loadedMessagesId);
				
				var xhr = new XMLHttpRequest();
				xhr.open('GET', api.getMessages + "?last_id=" + lastId, false);
				xhr.send();
				if (xhr.status != 200) {
					alert("Http request error " + xhr.status + ": " + xhr.statusText);
				} else {
					var response = JSON.parse(xhr.responseText);
					//alert(response);
					this.messages = Array.prototype.map.call(response, function(item) {
						return item.fields;
					}).concat(this.messages);
					for (var i = 0; i < response.length; i++) {
						this.messages[i].id = response[i].pk;
						this.messages[i].jsDate = new Date(this.messages[i].date);
					}
				}
			},
		},

		created: function() {
			this.loadMessages();
			var timer = setInterval(this.loadMessages, 10000);
		}

	});
}
