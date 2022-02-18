String.prototype.myTrim = function () {
  return this.replace(/^\s+/g, '').replace(/\s+$/g, '')
}
console.log('  1123 12 23   '.myTrim())

function deepClone(obj) {
  let result = obj instanceof Array ? [] : {}
  for (let key in obj) {
    result[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
  }
  return result
}
console.log(
  deepClone({
    a: 12322,
    b: { a: 123 },
    c: [1, 2, 3],
    d: function () {
      console.log(111)
    },
  })
)

function curry(fn) {
  let params = []

  const next = function (...args) {
    params = [...params, ...args]
    if (params.length === fn.length) {
      return fn.apply(this, params)
    } else {
      return next
    }
  }
  return next
}
function add(a, b, c) {
  return a + b + c
}
const curryFn = curry(add)
console.log(curryFn(1)(2)(3))

function addString(a, b) {
  let maxLen = Math.max(a.length, b.length)
  a = a.padStart(maxLen, 0)
  b = b.padStart(maxLen, 0)
  let t = 0
  let f = 0
  let sum = ''
  for (let i = maxLen - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f
    f = Math.floor(t / 10)
    sum = (t % 10) + sum
  }
  if (f == 1) {
    sum = '1' + sum
  }
  return sum
}
console.log(addString('8234567899999999999', '9234567899999999999'))

function flat() {
  return this.reduce((acc, cur) => {
    return acc.concat(cur)
  }, [])
}

function flatDeep(arr, d) {
  return d > 1
    ? arr.reduce((acc, cur) => {
        return acc.concat(Array.isArray(cur) ? flatDeep(cur, d - 1) : cur)
      }, [])
    : arr.slice()
}

function flatStack(arr) {
  const result = []
  const stack = [].concat(arr)
  while (stack.length !== 0) {
    const val = stack.pop()
    if (Array.isArray(val)) {
      result.push(...val)
    } else {
      result.push(val)
    }
  }
  return result
}
console.log([1, 2, [3, 4]].flat())
console.log(flatDeep([1, 2, [3, 4, [5, 6]]], 3))
console.log(flatStack([1, 2, [3, 4, [5, 6]]], 3))

function debounce(fn, time) {
  let timeout = null
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(fn, time)
  }
}
debounce(function () {
  console.log('防抖')
}, 1000)()

function throttle(fn, wait) {
  let timeout = null

  return function () {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        fn.apply(fn)
      }, wait)
    }
  }
}
throttle(function () {
  console.log('节流')
}, 1000)()

function myReverse(str) {
  let arr = str.split('')
  let resArr = []
  arr.map((item) => {
    resArr.unshift(item)
  })
  return resArr.join('')
}
console.log(myReverse('hello'))

new RegExp()

'123'.substring(1)
JSON.stringify(JSON.parse)
JSON.stringify(JSON.parse)

var ee = 1231111

function ef() {
  let ee = 555555

  return function () {
    console.log(this.ee)
  }
}
ef()()
