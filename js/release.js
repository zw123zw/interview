class EventEmitter {

	constructor() {
		this.eventName = {}
	}

	on(type, listener) {
		if (typeof this.eventName[type] === 'undefined') {
			this.eventName[type] = []
		}
		this.eventName[type].push(function (data) {
			return listener(data)
		})
	}

	trigger(type, data) {
		let _event = this.eventName[type];
		if (typeof _event !== 'undefined') {
			_event.map(item => {
				if (typeof item === 'function') {
					item(data)
				}
			})
		} else {
			console.log('no event')
		}
	}

	off(type, listener) {
		let _eventList = this.eventName[type]
		if (typeof _eventList !== 'undefind') {
			if (typeof listener !== 'undefined') {
				for (let i = 0; i < _eventList.length; i++) {
					if (_eventList[i]().toString() === listener.toString()) {
						_eventList.splice(i, 1)
					}
				}
			} else {
				delete this.eventName[type]
			}
		}
	}
}

// 下面为验收代码
var emitter = new EventEmitter();
emitter.on('name', function (e) {
	console.log('listening name event', e);
});
emitter.on('name', function (e) {
	console.log('listening name event1', e);
});
emitter.on('sex', function (e) {
	console.log('listening sex event', e);
});
emitter.trigger('name', 'John'); // 打印输出  listening name event John
emitter.trigger('sex', 'man'); // 打印输出  listening sex event man
emitter.off('name');
emitter.off('sex');
emitter.trigger('name', 'John'); // 打印输出no event
emitter.trigger('sex', 'man'); // 打印输出no event
