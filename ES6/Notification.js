export class Notification {
	constructor(emoji, message , isInfo = true) {
		this.emoji = emoji;
		this.message = message;
		if(message == "sw")
			this.message = "New Version Available";
		this.isInfo = isInfo;
	}

	show(worker = undefined) {
		$('.notify p').text(this.message);
		$('.notify .emoji').text(this.emoji);
		if (this.isInfo)
			$('.notify .update').css('display','none');
		$('.notification').fadeIn(500);
	}

	showWithTime() {
		$('.notify p').text(this.message);
		$('.notify .emoji').text(this.emoji);
		if (this.isInfo)
			$('.notify .update').css('display','none');
		$('.notification').fadeIn(500, () => {
			setTimeout(() => {
				$('.notification').slideUp(500);
			},5000)
		});
	}
	setWorker(worker) {
		$('.update').on('click', () => {
			worker.postMessage({action:'skipWaiting'})
		})
	}
	static emoji_sad() {
		return '😓';
	}

	static emoji_excited() {
		return '🤗';
	}


}

