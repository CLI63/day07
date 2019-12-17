//生成随机的颜色；a如果为16，则生成16进制颜色代码，不赋值则为RGB代码。
function randomColor(a) {
    var res;
    if (a == 16) {
        var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
        var res = "#";
        for (i = 0; i < 6; i++) {
            j = parseInt(Math.random() * 16);
            res += arr[j];
        }
        return res;
    } else {
        r = parseInt(Math.random() * 256);
        g = parseInt(Math.random() * 256);
        b = parseInt(Math.random() * 256);
        return res = "rgb(" + r + "," + g + "," + b + ")";
    }
}



//生成给定范围的随机数
function randomNum(a, b) {
    return parseInt(Math.random() * (b - a + 1)) + a;
}


// 冒泡排序
function maopao(arr) {
    for (j = 0; j < arr.length - 1; j++) {
        for (i = 0; i < arr.length - 1 - j; i++) {
            if (arr[i] > arr[i + 1]) {
                var a = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = a;
            }
        }
    }
    return arr;
}

// 选择排序
function xuanze(arr1) {
    for (var j = 0; j < arr1.length - 1; j++) {
        var b = j;
        for (var i = j + 1; i < arr1.length; i++) {
            if (arr1[b] > arr1[i]) {
                b = i;
            }
        }
        var tep = arr1[j];
        arr1[j] = arr1[b];
        arr1[b] = tep;
    }
    return arr1;
}



//获取dom元素
//实参可以为：#+id名   .+class名   标签名
function getEle(ele) {
    var str = ele.substr(1);
    if (ele.substr(0, 1) == "#") {
        return document.getElementById(str);
    } else if (ele.substr(0, 1) == ".") {
        return document.getElementsByClassName(str);
    } else {
        return document.getElementsByTagName(ele);
    }
}


//表单验证的对象

let menu = {
    username: (str) => {
        let reg = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
        return reg.test(str);
    },
    password: (str) => {
        let reg = /^\S{6,20}$/;
        return reg.test(str);
    },
    email: (str) => {
        let reg = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
        return reg.test(str);
    },
    tel: (str) => {
        let reg = /^1[3-9][0-9]{9}$/;
        return reg.test(str);
    },
    idcard: (str) => {
        let reg = /^\d{17}[\d|x]|\d{15}$/;
        return reg.test(str);
    }

}


//获取对象的样式
function getStyle(ele, attr) {
    var style;
    if (window.getComputedStyle) {
        style = window.getComputedStyle(ele)[attr];
    } else {
        style = ele.currentStyle[attr];
    }
    return style;
}

// 动画函数
/*
    ele---dom节点
    obj---对象，要改变属性和属性值
    callback---回调函数（动画结束之后要执行的操作）
*/
function move(ele, obj, callback) {
    let timerLen = 0;
    for (const attr in obj) {
        // 防止抖动
        clearInterval(ele[attr]);
        timerLen++;
        ele[attr] = setInterval(() => {
            let curStyle;
            if (attr === 'opacity') {
                curStyle = getStyle(ele, attr) * 100;
            } else {
                curStyle = parseInt(getStyle(ele, attr));
            }
            let speed = (obj[attr] - curStyle) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);  //取整
            if (curStyle === obj[attr]) {
                clearInterval(ele[attr]);
                timerLen--
                if (timerLen === 0) {
                    callback && callback();
                }
            } else {
                if (attr === 'opacity') {
                    ele.style[attr] = (speed + curStyle) / 100;
                } else {
                    ele.style[attr] = speed + curStyle + 'px';
                }
            }
        }, 40)
    }




}



// cookie对象封装
let cookie = {
    /* 
        存cookie
        name---cookie名
        str---cookie值 
        obj---一个对象，存cookie的销毁时间或存储路径 例：{expires：7，path：'/'};
    */
    setcookie(name, str, obj) {
        str = encodeURIComponent(str);
        res = `${name}=${str}`;
        if (obj) {
            if (obj.expires) {
                var date = new Date();
                date.setDate(date.getDate() + obj.expires);
                res += `;expires=${date.toUTCString()}`;
            }
            if (obj.path) {
                res += `;path=${obj.path}`;
            }
        }
        document.cookie = res;
    },


    // 取cookie
    // text---需要查询的cookie名
    // 返回值为string，cookie值
    getcookie(text) {
        var str = document.cookie
        // 按照; 吧每一条cookie切开
        var cookies = str.split('; ')
        var obj = new Object()
        // 遍历每一条cookie
        cookies.forEach(cookie => {
            // 每一条cookie按照=把key和value切开
            var arr = cookie.split('=')
            // 数组的第0项时cookie名称，数组的第一项是cokie的值
            obj[arr[0]] = decodeURIComponent(arr[1])
        })
        return obj[text];

    },

    //删除cookie
    // name---cookie名
    removecookie(name) {
        this.setcookie(name, '', { expires: -10 });
    }

}



//Ajax封装
let ajax = {
    /**ajax get请求
     * @param {string} url 请求路径
     * @param {object} query  请求携带的参数
     * @param {function} fun  请求成功的回调函数
     * @param {object} isjson 是否转化为json数据
     */
    get(url, query, fun, isjson = true) {
        if (query) {
            url += "?";
            for (var key in query) {
                url += `${key}=${query[key]}&`;
            }
            url = url.slice(0, -1);
        }
        let xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let res = isjson ? JSON.parse(xhr.responseText) : xhr.responseText;
                    //回调的常规写法，，，有fun才调用。
                    fun && fun(res);
                }
            }
        }
    },
    /**ajax post请求
         * @param {string} url 请求路径
         * @param {object} query  请求携带的参数
         * @param {function} fun  请求成功的回调函数
         * @param {object} isjson 是否转化为json数据
         */
    post(url, query, fun, isjson = true) {
        let str = "";
        if (query) {
            for (var key in query) {
                str += `${key}=${query[key]}&`;
            }
            str = str.slice(0, -1);
        }
        let xhr = new XMLHttpRequest();
        xhr.open('post', url);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(str);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let res = isjson ? JSON.parse(xhr.responseText) : xhr.responseText;
                    //回调的常规写法，，，有fun才调用。
                    fun && fun(res);
                }
            }
        }
    }
}



//jsonp跨域请求封装
/**
 * @param {string} url     请求的路径
 * @param {string} cb      回调函数名（这个函数必须是全局函数）
 * @param {object} [query] 其他参数
 */
function jsonp(url, cb, query) {
    url += `?cb=${cb}`;
    if (query) {
        for (let key in query) {
            url += `&${key}=${query[key]}`;
        }
    }
    let script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
    //添加到body执行后删除script
    document.body.removeChild(script);
}

// 基于promise的ajax请求
let fetch = {
    /**  get请求
    * @param {string} url 请求路径
    * @param {object} query  请求要携带的参数
    * @param {boolean} [isJson] 请求数据是否为json，默认值为true
    */
    get(url, query, isJson = true) {
        if (query) {
            url += '?'
            for (var key in query) {
                url += `${key}=${query[key]}&`
            }
            url = url.slice(0, -1)
        }
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest()
            xhr.open('get', url)
            xhr.send()
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(isJson ? JSON.parse(xhr.responseText) : xhr.responseText)
                    } else {
                        reject()
                    }
                }
            }
        })
    },

    /**  post请求
    * @param {string} url 请求路径
    * @param {object} query  请求要携带的参数
    * @param {boolean} [isJson] 请求数据是否为json，默认值为true
    */
    post(url, query, isJson = true) {
        let str = '';
        if (query) {
            for (var key in query) {
                str += `${key}=${query[key]}&`
            }
            str = str.slice(0, -1)
        }
        console.log(str);

        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest()
            xhr.open('post', url)
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(str)
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(isJson ? JSON.parse(xhr.responseText) : xhr.responseText)
                    } else {
                        reject()
                    }
                }
            }
        })
    }
}




