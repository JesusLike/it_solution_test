Vue.component('message-item', {
	props: ['message'],

	methods: {
		markRead: function(messageId) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', api.markRead + "?id=" + messageId, false);
			xhr.send()

			if (xhr.status != 200) {
				alert("Http request error " + xhr.status + ": " + xhr.statusText);
			} else {
				this.message.is_read = true;
			}
		}
	},

	template:
	'<transition name="fade">\
		<li class="message row alert alert-info" :id="message.id" v-show="!message.is_read">\
			<div class="col-8 col-xs-6 message-text">\
				<p>{{ message.text }}</p>\
			</div>\
			<div class="col-2 col-xs-4 align-self-center message-date">\
				<em>{{ message.jsDate.getHours() }}:\
				{{ message.jsDate.getMinutes() >= 10 ? message.jsDate.getMinutes() : "0" + message.jsDate.getMinutes() }}\
				 {{ message.jsDate.toLocaleDateString("en-US", {day: "numeric", month: "short"}) }}</em>\
			</div>\
			<div class="col-2 col-xs-2 align-self-center mark-read text-center">\
				<button class="btn btn-info" :id="\'mark-read-\' + message.id" @click="markRead(message.id)">Read</button>\
			</div>\
		</li>\
	</transition>'
});