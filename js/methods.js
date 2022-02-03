(function () {
    // trim去掉字符串首尾空格
    String.prototype.myTrim = function () {
        return this.replace(/^\s+/g, '').replace(/\s+$/g, '')
    }
    console.log('  1123 12 23   '.myTrim());

    // deepClone深克隆
    function deepClone(obj, map = new Map()) {
        let result = obj
        if (typeof obj === Object && Object !== null) {
            result = Array.isArray(obj) ? [] : {}

            if (map.get(obj)) {
                return obj
            }
            map.set(obj, result)

            for (let key in obj) {
                result[key] = deepClone(obj[key])
            }
        } else {
            return result
        }
    }
    console.log(deepClone({
        a: 123,
        b: { a: 123 },
        c: [1, 2, 3],
        d: function () { console.log(111) }
    }));

    // 函数柯里化
    function curry(fn) {
        let params = []
        const next = function (...args) {
            params = [...params, ...args]
            if (params.length === fn.length) {
                return fn.call(this, ...params)
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
    console.log(curryFn(1)(2)(3));

    // 大数相加
    function addString(a, b) {
        // 找出最大数的长度
        let maxLength = Math.max(a.length, b.length)
        a = a.padStart(maxLength, 0) //数字补位
        b = b.padStart(maxLength, 0) //数字补位
        let t = 0 //当前位的累加值
        let f = 0 //当前位的进位值
        let sum = ''
        for (let i = maxLength - 1; i >= 0; i--) {
            t = parseInt(a[i]) + parseInt(b[i]) + f //得到当前位的累加值
            f = Math.floor(t / 10) //得到当前位的进位值
            sum = t % 10 + sum //拼接成实际值
        }
        if (f == 1) { //当第一个数相加后，跳出循环，此时需要在当前位的进位值大于1时补上进位值1
            sum = '1' + sum
        }
        return sum
    }
    console.log(addString("8234567899999999999", "9234567899999999999"));

    // flat数组打平
    function flat() {
        return this.reduce((arr, cyr) => arr.concat(cur), [])
    }
    function flatDeep(arr, d) {
        return d > 1 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), []) : arr.slice()
    }
    function flatStack(arr) {
        const result = []
        const stack = [].concat(arr)
        while (stack.length !== 0) {
            const val = stack.pop()
            if (Array.isArray(val)) {
                stack.push(...val)
            } else {
                result.unshift(val)
            }
        }
        return result
    }
    console.log([1, 2, [3, 4]].flat());
    console.log(flatDeep([1, 2, [3, 4, [5, 6]]], 3));
    console.log(flatStack([1, 2, [3, 4, [5, 6]]], 3));

    // debounce防抖
    function debounce(fn, time) {
        var timeout = null
        return function () {
            clearTimeout(timeout)
            setTimeout(fn.bind(fn), time);
        }
    }
    debounce(function () {
        console.log('防抖');
    }, 1000)()

    // throttle节流
    function throttle(fn, wait) {
        var timeout = null
        return function () {
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null
                    fn.apply(fn)
                }, wait);
            }
        }
    }
    throttle(function () {
        console.log('节流');
    }, 1000)()

    // reverse原理
    function myReverse(str) {
        let arr = str.split('')
        let resArr = []
        arr.map(item => {
            resArr.unshift(item)
        })
        return resArr.join('')
    }
    console.log(myReverse('hello'));

    // 数组去重
    function unique(arr) {
        return Array.from(new Set(arr))
    }
    function unique1(arr) {
        let res = []
        arr.map(item => {
            if (res.indexOf(item) === -1) {
                res.push(item)
            }
        })
        return res
    }
    console.log(unique([1, 2, 1, 3]));
    console.log(unique1([3, 4, 3, 5]));

    // slice转换数组
    function sliceFun() {
        console.log(Array.prototype.slice.apply(arguments));
    }
    sliceFun(1, 3, 5)

    // Promise的allSettled
    Promise.allSettled([Promise.resolve(111), Promise.reject(333)]).then((res) => {
        console.log(res);
    })

    // new返回对象
    function Array1(...args) {
        return args
    }
    Array.prototype.test = 123
    let c = new Array1(3, 4, 23)
    console.log(c.test);

    // 千位分隔符
    function numFormat(num) {
        num = num.toString().split('.')
        var arr = num[0].split('').reverse()
        var res = []
        arr.map((item, index) => {
            if (index % 3 === 0 && index !== 0) {
                res.push(',')
            }
            res.push(item)
        })
        res = res.reverse().join('')
        if (num[1]) {
            res = res + '.' + num[1]
        }
        return res
    }
    console.log(numFormat(1234567894532));
    console.log(numFormat(1234567894.532));

    // 回文数
    function isPalindrome(x) {
        if (x < 0) {
            return false
        }
        let str = x.toString()
        return Array.from(str).reverse().join('') === str
    }
    function isPalindrome1(str) {
        str = '' + str
        let newStr = ''
        for (let len = str.length, i = len - 1; i >= 0; i--) {
            newStr += str[i]
        }
        return newStr === str
    }
    console.log(isPalindrome(12421));
    console.log(isPalindrome1(12421));

    // 模板引擎
    function tmpl(str, data) {
        var str = document.getElementById(str).innerHTML
        var string = "var p = []; p.push('" + str.replace(/[\r\t\n]/g, '').replace(/<%=(.*?)%>/g, "');p.push($1);p.push('").replace(/<%/g, '').replace(/%>/g, 'p.push(")')
        eval(str)
        return p.join('')
    }

    // 素数
    function isPrime(num) {
        for (let i = 2; i <= num - 1; i++) {
            if (num % i === 0) {
                return false
            }
        }
        return true
    }
    console.log(isPrime(12));

    // 统计所有小于非负整数 n 的质数的数量
    function countPrimes(n) {
        let ret = [],
            flag = 1;
        if (n < 2) {
            return 0
        }
        for (let i = 1; i < n; i++) {
            for (let j = 2; j <= Math.sqrt(i); j++) {
                if (i % j == 0) {
                    flag = 0;
                    break;
                }
            }
            if (flag == 2) {
                ret.push(i)
            } else {
                flag = 2;
            }
        }
        return ret
    }
    console.log(countPrimes(12));

    // map原理
    Array.prototype.myMap = function (fn) {
        let obj = {}
        let arrSymbol = Symbol('123')
        let res = []
        obj[arrSymbol] = this
        obj[arrSymbol].forEach((item, index) => {
            res.push(fn(item, index))
        });
        return res
    }
    Array.prototype.myMap1 = function (fn) {
        const result = []
        for (let i = 0; i < this.length; i++) {
            if (!this.hasOwnProperty(i)) {
                continue
            }
            result.push(fn(this[i], i, this))
        }
        return result
    }
    let a = a1 = new Array(1, 3, 15)
    a = a.myMap(item => item * item)
    a1 = a1.myMap1(item => item * item)
    console.log(a, a1);

    // filter原理
    Array.prototype.myFilter = function (fn) {
        let result = []
        for (let i = 0; i < this.length; i++) {
            if (!this.hasOwnProperty(i)) {
                continue
            }
            if (fn(this[i], i, this)) {
                result.push(this[i])
            }
        }
        return result
    }
    let filterArr = [1, 3, 4, 9]
    console.log(filterArr.myFilter(item => item > 3));

    // reduce原理
    Array.prototype.myReduce = function (fn, initValue) {
        let result = initValue ? initValue : this[0]
        for (let i = 0; i < this.length; i++) {
            if (!this.hasOwnProperty(i)) {
                continue
            }
            result = fn(result, this[i], this)
        }
        return result
    }
    let reduceArr = [2, 3, 5]
    console.log(reduceArr.myReduce((acc, cur) => {
        acc = acc * cur
        return acc
    }, 2));

    // every原理
    Array.prototype.myEvery = function (fn) {
        let bool = true
        for (let i = 0; i < this.length; i++) {
            if (!this.hasOwnProperty(i)) {
                continue
            }
            if (!fn(this[i], i, this)) {
                bool = false
                break
            }
        }
        return bool
    }
    let everyArr = [3, 5, 19]
    console.log(everyArr.myEvery(item => item > 11));

    // some原理
    Array.prototype.mySome = function (fn) {
        let bool = false
        for (let i = 0; i < this.length; i++) {
            if (!this.hasOwnProperty(i)) {
                continue
            }
            if (fn(this[i], i, this)) {
                bool = true
                break
            }
        }
        return bool
    }
    let someArr = [11, 5, 56]
    console.log(someArr.mySome(item => item < 19));

    // find原理
    Array.prototype.myFind = function (fn) {
        let result;
        for (let i = 0; i < this.length; i++) {
            if (!this.hasOwnProperty(i)) {
                continue
            }
            if (fn(this[i], i, this)) {
                result = this[i]
                break
            }
        }
        return result
    }
    let findArr = [3, 54, 98]
    console.log(findArr.myFind(item => item > 70));

    // flat原理
    Array.prototype.myFlat = function () {
        if (!Array.isArray(this)) {
            return
        }
        return this.reduce((acc, cur) => {
            return acc.concat(Array.isArray(cur) ? this.myFlat.call(cur) : cur)
        }, [])
    }
    console.log([1, 3, [2, [3, 599], 5]].myFlat());

    // 图片懒加载
    function loadImg(imgs) {
        const handle = () => {
            imgs.forEach((img, index) => {
                const react = img.getBoundingClientRect()
                if (react.top < window.innerHeight) {
                    setTimeout(() => {
                        img.src = img.dataset.src
                        img.classList.add('on')
                    }, index * 100);
                }
            })
        }
        return handle
    }
    function loadImg1(imgs) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach((entry, index) => {
                if (entry.intersectionRatio > 0) {
                    setTimeout(() => {
                        entry.target.src = entry.target.dataset.src
                        entry.target.classList.add('on')
                        observer.unobserve(entry.target)
                    }, index * 200);
                }
            })
        })
        imgs.forEach(img => {
            observer.observe(img)
        })
    }
    loadImg1([...document.querySelectorAll('.img1')])
    document.addEventListener('scroll', loadImg([...document.querySelectorAll('.img2')]))

    // 图片预加载，创建新的Image提前加载图片
    function preloadImg(imgs) {
        let imgArr = []
        let count = 0
        imgs.forEach((item, index) => {
            const img = new Image()
            img.onload = function () {
                item.src = imgArr[index]
                count++
                if (count === imgArr.length) {
                    console.log('加载完成');
                }
            }
        })
        return {
            setSrc: function (args) {
                imgs.forEach((item, index) => {
                    item.src = args[index]
                    item.classList.add('on')
                })
                imgArr = args
            }
        }
    }
    preloadImg([...document.querySelectorAll('.img3')]).setSrc(['https://img.2125.com/20200806/img/h001/h41/img20210922095339562620.jpg', 'https://img.2125.com/20200806/img/h001/h41/img20210922095339562620.jpg', 'https://img.2125.com/20200806/img/h001/h41/img20210922095339562620.jpg'])

    // new原理
    Function.prototype.myNew = function (...args) {
        const target = Object.create(this)
        const res = this.apply(target, args)
        if (res && (typeof res === 'object' || typeof res === 'function')) {
            return res
        }
        return target
    }
    const _myNew = function (a, b) {
        return {
            a,
            b
        }
    }
    console.log(_myNew.myNew(456, 123));

    // instanceof原理
    Object.prototype.myInstanceof = function (left, right) {
        if (typeof left === 'undefined' && typeof right === 'undefined') {
            return
        }
        const rPrototype = right.prototype
        while (left = Object.getPrototypeOf(left)) {
            if (left === rPrototype) {
                return true
            }
        }
        return false
    }
    console.log(myInstanceof({ a: 123 }, Object));

    // call原理
    Function.prototype.myCall = function (context = window, ...args) {
        const fnSymbol = Symbol('fn')
        context[fnSymbol] = this
        context[fnSymbol](...args)
        delete context[fnSymbol]
    }
    let _myCall = function (b, c) {
        console.log(this.a + b + c);
    }
    _myCall.myCall({ a: 111 }, 222, 333)

    // apply原理
    Function.prototype.myApply = function (context = window, args) {
        const fnSymbol = Symbol('fn')
        if (!Array.isArray(args)) {
            console.warn('apply的第二个参数必须为数组或者类数组');
        }
        context[fnSymbol] = this
        context[fnSymbol](...Array.from(args))
        delete context[fnSymbol]
    }
    _myCall.myApply({ a: 111 }, [222, 333])

    // bind原理
    Function.prototype.myBind = function (context = window, ...args) {
        const fnSymbol = Symbol('fn')
        context[fnSymbol] = this
        return function (..._args) {
            context[fnSymbol](...args.concat(_args))
        }
    }
    _myCall = _myCall.myBind({ a: 111 }, 222, 333)
    _myCall();

    // 数据类型判断
    const type = (function () {
        const type = Object.create(null)
        const typeArr = ['String', 'Number', 'Object', 'Array', 'Null', 'Undefind', 'Boolean']
        typeArr.map(item => {
            type[`is${item}`] = function (args) {
                return Object.prototype.toString.call(args) === `[object ${item}]`
            }
        })
        return type
    })()
    console.log(type.isArray({ a: 123 }));
    console.log(type.isArray([2, 42, 64]));
    console.log(type.isNumber(123));

    // 自记忆函数---当下次调用时，如果遇到相同的参数，就直接返回缓存中的数据
    function memory(fn) {
        const cache = {}
        return function (...args) {
            const key = JSON.stringify(args)
            if (typeof cache[key] !== 'undefined') {
                console.log('自记忆函数，返回缓存中的数据');
                return cache[key]
            } else {
                cache[key] = fn.apply(fn, args)
                return cache[key]
            }
        }
    }
    const _memory = function (a, b) {
        return a + b
    }
    const _memoryTo = memory(_memory)
    console.log(_memoryTo(2, 5))
    console.log(_memoryTo(2, 5))

    // 是否存在循环引用
    function cycle(target) {
        const map = new Map()
        function _cycle(obj) {
            if (!map.has(obj)) {
                map.set(obj, obj)
            }
            let keys = Object.keys(obj)
            for (let i = 0; i < keys.length; i++) {
                if (typeof obj[keys[i]] === 'object') {
                    if (map.has(obj[keys[i]])) {
                        obj[keys[i]] = '$'
                        console.log(111);
                        continue;
                    } else {
                        map.set(obj[keys[i]], obj[keys[i]])
                    }
                }
                _cycle(obj[keys[i]])
            }
        }
        _cycle(target)
        return target
    }
    console.log(cycle({ a: 123 }));

    // 深度优先拷贝函数
    function DFSdeepClone(obj, visitedArr = []) {
        let _obj = {}
        if (typeof obj === 'object' && obj !== null) {
            let index = visitedArr.indexOf(obj)
            _obj = Array.isArray(obj) ? [] : {}
            if (~index) {
                _obj = visitedArr[index]
            } else {
                visitedArr.push(obj)
                for (let key in obj) {
                    _obj[key] = DFSdeepClone(obj[key], visitedArr)
                }
            }
        } else if (typeof obj === 'function') {
            _obj = eval('(' + obj.toString() + ')')
        } else {
            _obj = obj
        }
        return _obj
    }
    console.log(DFSdeepClone({ d: 654, m: { a: 987 }, k: function () { let a = 123 } }));

    // 广度优先拷贝函数
    function BFSdeepClone(obj) {
        let originObj = [obj], copyObj = [Array.isArray(obj) ? [] : {}], visitedOriginArr = [], visitedCopyArr = []
        while (originObj.length > 0) {
            const item = originObj.shift()
            const _obj = copyObj.shift()
            visitedOriginArr.push(item)
            if (typeof item === 'object' && item !== null) {
                for (let key in item) {
                    const val = item[key]
                    if (val.constructor === 'Object') {
                        const index = visitedOriginArr.indexOf(item[key])
                        if (~index) {
                            _obj[key] = visitedCopyArr[index]
                        } else {
                            _obj[key] = {}
                            originObj.push(val)
                            copyObj.push(_obj[key])
                        }
                    } else if (val.constructor === 'Array') {
                        _obj[key] = []
                        originObj.push(val)
                        copyObj.push(_obj[key])
                    } else if (val.constructor === 'function') {
                        _obj[key] = eval('(' + val.toString() + ')')
                    } else {
                        _obj[key] = val
                    }
                }
                visitedCopyArr.push(_obj)
            } else if (typeof item === 'function') {
                _obj = eval('(' + item.toString() + ')')
            } else {
                _obj = item
            }
        }
        return copyObj
    }
    console.log(BFSdeepClone({ d: 654, m: { a: 987 }, k: function () { let a = 123 } }));

    // Promise的all原理
    Promise.prototype._all = function (promiseList) {
        const len = promiseList.length, result = []
        let count = 0
        return new Promise((resolve, reject) => {
            promiseList.map(item => {
                item.then(res => {
                    result.push(res)
                    count++
                    if (count === len) {
                        resolve(result)
                    }
                }, err => {
                    reject(err)
                })
            })
        })
    }
    Promise.prototype._all([Promise.resolve(111), Promise.resolve(222)]).then(res => {
        console.log(res);
    })

    // Promise的race原理
    Promise.prototype._race = function (promiseList) {
        return new Promise((resolve, reject) => {
            promiseList.map(item => {
                item.then(res => {
                    return resolve(res)
                }, err => {
                    return reject(err)
                })
            })
        })
    }
    Promise.prototype._race([Promise.resolve(111), Promise.resolve(222)]).then(res => {
        console.log(res);
    })

    // Promise的finally原理
    Promise.prototype._finally = function (fn) {
        return this.then(res => {
            Promise.resolve(fn()).then(res => {
                return res
            })
        }, err => {
            Promise.reject(fn()).catch(err => {
                return err
            })
        })
    }
    Promise.resolve(123)._finally(() => {
        console.log('finally执行');
    });

    // async-await原理
    function asyncToGenerator(genF) {
        return new Promise((resolve, reject) => {
            const gen = genF()
            const step = (type, args) => {
                let next;
                try {
                    next = gen[type](args)
                } catch (e) {
                    return reject(e)
                }
                const { done, value } = next
                if (done) {
                    return resolve(value)
                }
                Promise.resolve(value).then(val => step('next', val), err => step('throw', err))
            }
            step('next')
        })
    }
    asyncToGenerator(function* helloWorldGenerator() {
        yield 'hello';
        yield 'world';
        return 'ending';
    }).then(res => {
        console.log(res);
    })

    // 发布订阅
    class MyEvent {
        constructor() {
            this._event = Object.create(null)
            this.stackArr = null
            this.stackArr && this.stackArr.forEach((fn, index) => {
                fn()
                if (index === this.stackArr.length - 1) {
                    this.stackArr = null
                }
            })

        }
    }
    MyEvent.prototype.on = function (key, fn) {
        this._event[key] = this._event[key] || []
        return this._event[key].push(fn)
    }
    MyEvent.prototype.emit = function (key, payload) {
        this._event[key] && this._event[key].forEach(fn => {
            fn.call(fn, payload)
        })
        // 用新函数包裹自定义的emit函数
        let fn = () => this.emit(this, key, payload)
        if (!this._event[key] && !this.stackArr) {
            this.stackArr = []
            this.stackArr.push(fn)
        }
    }
    MyEvent.prototype.off = function (key, callback) {
        if (callback) {
            return this._event[key] = this._event[key].filter(fn => fn != callback && callback != fn.c)
        }
        this._event[key] = []
    }
    MyEvent.prototype.once = function (key, fn) {
        const one = (payload) => {
            fn.call(fn, payload)
            this.off(key, one)
        }
        one.c = fn
        this.on(key, one)
    }
    MyEvent.prototype.ClearAllEvent = function () {
        Object.keys(this._event).forEach(key => {
            this._event = []
        })
    }
    const _eventer = new MyEvent()
    const lister = (a) => {
        console.log('发布订阅事件1', a);
    }
    const lister2 = (a) => {
        console.log('发布订阅事件2', a);
    }
    _eventer.on('test1', lister)
    _eventer.emit('test1', 666)
    _eventer.emit('test1', 666)
    _eventer.off('test1', lister)
    _eventer.emit('test1', 666)
    _eventer.once('test2', lister2)
    _eventer.emit('test2', 666)
    _eventer.emit('test2', 666)

    // 单列模式，保证一个类仅有一个实例，并提供一个访问它的全局访问点。实现方法一般是先判断实例是否存在，如果存在直接返回，如果不存在就先创建再返回
    function getSignle(fn) {
        let result;
        return function () {
            return result || (result = fn.apply(fn, arguments))
        }
    }
    let _signFn = getSignle(function (a, b) {
        return a + b
    })
    console.log(_signFn(1, 2));
    const proxy = function (fn) {
        let result;
        const handler = {
            construct: function () {
                if (!result) {
                    result = Reflect.construct(fn, arguments)
                }
                return result
            }
        }
        return new Proxy(fn, handler)
    }
    const _pr = proxy(function (a) {
        console.log(a);
    });
    new _pr('Proxy拦截')

    // Object.create原理
    Object.prototype._create = function (object) {
        function F() { }
        F.prototype = object
        return new F()
    }
    console.log(Object._create({ a: 'create原理' }).a)

    // class的原理
    function fatherFn(...arr) {
        this.some = 'parent的this属性'
        this.params = arr
    }
    fatherFn.prototype.fatherFnSome = 'parent原型对象的属性或者方法'
    function sonFn() {
        this.obkork1 = 'child的this属性'
    }
    function inheritPrototype(son, father) {
        const fatherPrototype = Object.create(father.prototype)
        son.prototype = fatherPrototype
        son.prototype.constructor = son
        Object.setPrototypeOf(son, father)
    }
    inheritPrototype(sonFn, fatherFn)
    sonFn.prototype.sonFnSome = 'child原型对象的属性或者方法'
    const sonFnInit = new sonFn()
    console.log(sonFnInit.obkork1, sonFnInit.fatherFnSome);
    console.log(sonFnInit.sonFnSome);

    // compose原理，组合合并函数，输出值
    function compose(fns) {
        return function (...args) {
            let start = fns.length - 1
            let result = [...args]
            while (start >= 0) {
                result = fns[start].apply(fns[start], Array.isArray(result) ? result : [result])
                start--;
            }
            return result
        }
    }
    const c1 = (c) => {
        return c + 3
    }
    const c2 = (d) => {
        return d + 5
    }
    const c3 = (a, b) => {
        return a + b
    }
    function compose1(fns) {
        return fns.reduce((a, b) => (...args) => a(b(...args)))
    }
    console.log(compose([c1, c2, c3])(23, 56));
    console.log(compose1([c1, c2, c3])(23, 56));

    // 异步并行函数，必须是一个Promise函数
    function asyncParallel(...fns) {
        let count = 0
        return function (...args) {
            const [cb, ...other] = args
            fns.forEach(async fn => {
                await fn.apply(fn, other)
                count++
                if (count === fns.length) {
                    cb()
                }
            })
        }
    }
    const asyncFn1 = () => {
        return new Promise((resolve, reject) => {
            console.log('异步并行1', 8888888);
            resolve(1)
        })
    }
    const asyncFn2 = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('异步并行2', 999999);
                resolve(2)
            }, 1000);
        })
    }
    const asyncFn3 = () => {
        return new Promise((resolve, reject) => {
            console.log('异步并行3', 1000000000);
            resolve(3)
        })
    }
    asyncParallel(asyncFn1, asyncFn2, asyncFn3)(
        function () {
            console.log('执行结束');
        }
    )

    // 异步串行函数
    function asyncSerial(...fns) {
        const [first, ...others] = fns
        return function (...args) {
            return others.reduce((a, b) => {
                Promise.resolve(() => a()).then(() => b(...args))
            }, first(...args))
        }
    }
    const asyncFn4 = () => {
        console.log('异步串行4');
    }
    const asyncFn5 = () => {
        console.log('异步串行5');
    }
    const asyncFn6 = () => {
        console.log('异步串行6');
    }
    asyncSerial(asyncFn4, asyncFn5, asyncFn6)()

    // 私有变量
    function Calculate() {
        let data = new WeakMap() //私有变量data
        Calculate = function () {
            data.set(this, Math.random())
        }
        //方法挂载到原型上，其实例共享
        Calculate.prototype.doSth = function () {
            return data.get(this)
        }
        return new Calculate()
    }
    let cal1 = new Calculate()
    let cal2 = new Calculate()
    console.log(cal1.doSth());
    console.log(cal2.doSth());

    function A() {
        var a = Math.random()
        A.prototype.getA = () => a
        this.getA = () => a
    }
    let aa1 = new A()
    console.log(aa1.getA());
    let aa2 = new A()
    console.log(aa2.getA());
    console.log(aa1.getA());

})()