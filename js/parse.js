// ```javascript

// let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';

// parse(url)


// /* 预期结果

// {

//   user: 'anonymous',

//   id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型

//   city: '北京', // 中文需解码

//   enabled: true, // 未指定值得 key 约定为 true

// }

// */

function parse(str) {
	let data = {},
		_str = (str.split('?')[1]).split('&');

	_str.map(item => {
		let _item = item.split('='),
			_key = _item[0],
			_data = _item[1];

		if (typeof data[_key] !== 'undefined') {
			if (typeof data[_key] === 'object') {
				data[_key] = [...data[_key], _data]
			} else {
				data[_key] = [data[_key], _data]
			}

			for (let i = 0; i < data[_key].length; i++) {
				let dataItem = data[_key][i];
				if (!isNaN(dataItem)) {
					data[_key][i] = Number(dataItem)
				} else {
					data[_key][i] = dataItem.toString()
				}
			}
		} else {
			data[_key] = typeof _data !== 'undefined' ? decodeURIComponent(_data) : true
		}
	})
	return data
}
console.log(parse('http://www.domain.com/?user=anonymous&id=aaa&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'))
