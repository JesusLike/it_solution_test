function loadMessages(vue) {
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
		vue.messages = vue.messages.concat(Array.prototype.map.call(response, function(item) {
			return item.fields;
		}));
		for (var i = vue.messages.length - response.length; i < vue.messages.length; i++) {
			vue.messages[i].id = response[i - vue.messages.length + response.length].pk;
		}
	}
}