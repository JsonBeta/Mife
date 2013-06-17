/*
Copyright (c) 2013, XIAOMI! Inc. All rights reserved.
Code licensed under the BSD License:
version: 0.1.3
*/

/**
 * XIAOMI对象是唯一的全局对象(如果没有引入JQUERY)，包含设置名称空间，继承和日志等功能函数，
 * @module XIAOMI
 * @title  XIAOMI Global
 */
if (typeof XIAOMI == "undefined" || !XIAOMI) {
    /**
     * XIAOMI全局名称空间对象. 如果XIAOMI已经定义，原先的XIAOMI对象不会被覆写，所以定义过的名称空间是受保护的。     
     * @class XIAOMI
     * @static
     */
    var XIAOMI = {};
}

/**
 * 返回指定的名称空间，如果该名称空间不存在就创建它。
 * <pre>
 * XIAOMI.namespace("property.package");
 * XIAOMI.namespace("XIAOMI.property.package");
 * </pre>
 * 上述情况中的任何一个都将创建的XIAOMI.property，然后创建XIAOMI.property.package
 *
 * 命名时需小心；注意保留关键字，可能在一些浏览器无法使用。例如，下面将无法在Safari中
 * <pre>
 * XIAOMI.namespace("really.long.nested.namespace");
 * </pre>
 * 这个会有错误，是因为“long”是一个未来在ECMAScript中的保留字
 *
 * @method namespace
 * @static
 * @param {String*} 至少需要创建一个命名空间
 * @return {Object} 最后一个命名空间创建的对象的引用
 */
XIAOMI.namespace = function() {
    var a=arguments, o=null, i, j, d;
    for (i=0; i<a.length; i=i+1) {
        d=(""+a[i]).split(".");
        o=XIAOMI;

        // XIAOMI is implied, so it is ignored if it is included
        for (j=(d[0] == "XIAOMI") ? 1 : 0; j<d.length; j=j+1) {
            o[d[j]]=o[d[j]] || {};
            o=o[d[j]];
        }
    }

    return o;
};

/**
 * 给XIAOMI对象注册模块。
 * @method register
 * @static
 * @param {String}   name    要注册的模块名称 (event, slider, etc)。
 * @param {Function} mainClass 该模块的类引用， 这个类将注明版本信息。
 *                             以便当多个版本同时被加载的时候，能够确定该模块使
 *                             用的是哪个版本。
 * @param {Object}   data      模块的元数据对象，目前，至少包含build属性和version属性。
 */
XIAOMI.register = function(name, mainClass, data) {
    var mods = XIAOMI.env.modules, m, v, b, ls, i;

    if (!mods[name]) {
        mods[name] = {
            versions:[],
            builds:[]
        };
    }

    m  = mods[name];
    v  = data.version;
    b  = data.build;
    ls = XIAOMI.env.listeners;

    m.name = name;
    m.version = v;
    m.build = b;
    m.versions.push(v);
    m.builds.push(b);
    m.mainClass = mainClass;

    // 监听模块加载
    for (i=0;i<ls.length;i=i+1) {
        ls[i](m);
    }
    // 标记类
    if (mainClass) {
        mainClass.VERSION = v;
        mainClass.BUILD = b;
    } else {
        XIAOMI.log("mainClass is undefined for module " + name, "warn");
    }
};

/**
 * 说明：  XIAOMI.env 用来追踪库信息。
 * @class XIAOMI.env
 * @static
 */

XIAOMI.env = XIAOMI.env || {

    /**
     * 保存所有已经注册的模块的版本信息。
     * @property modules
     * @type Object[]
     */
    modules: [],

    /**
     * 每次模块被注册的时候执行的函数列表。
     * @property listeners
     * @type Function[]
     */
    listeners: []
};

/**
 * 提供JS语言实用功能或扩展
 * javascript扩展的语言工具，用于判别对象的类型
 * @class XIAOMI.lang
 */
XIAOMI.lang = XIAOMI.lang || {};

(function() {


var L = XIAOMI.lang,

    OP = Object.prototype,
    ARRAY_TOSTRING = '[object Array]',
    FUNCTION_TOSTRING = '[object Function]',
    OBJECT_TOSTRING = '[object Object]',
    NOTHING = [],

    HTML_CHARS = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
        '`': '&#x60;'
    },

    // ADD = ["toString", "valueOf", "hasOwnProperty"],
    ADD = ["toString", "valueOf"],

    OB = {

    /**
     * 判断提供的对象是否为数组
     * @method isArray
     * @param {any} o 被测试的对象
     * @return {boolean} 布尔值
     */
    isArray: function(o) {
        return OP.toString.apply(o) === ARRAY_TOSTRING;
    },

    /**
     * 判断提供的对象是否为布尔值
     * @method isBoolean
     * @param {any} o 被测试的对象
     * @return {boolean} 布尔值
     */
    isBoolean: function(o) {
        return typeof o === 'boolean';
    },

    /**
     * 判断提供的对象是否为函数；IE认为某些function为对象
     *
     * var obj = document.createElement("object");
     * XIAOMI.lang.isFunction(obj.getAttribute) // false in IE
     *
     * var input = document.createElement("input"); // append to body
     * XIAOMI.lang.isFunction(input.focus) // false in IE
     *
     * 如果这些功能对你不起作用，你将不得不进行其他的判断。
     *
     * @method isFunction
     * @param {any} o 被测试的对象
     * @return {boolean} 布尔值
     */
    isFunction: function(o) {
        return (typeof o === 'function') || OP.toString.apply(o) === FUNCTION_TOSTRING;
    },

    /**
     * 判断提供的对象是否为null
     * @method isNull
     * @param {any} o 被测试的对象
     * @return {boolean} 布尔值
     */
    isNull: function(o) {
        return o === null;
    },

    /**
     * 判断提供的对象是否为整数
     * @method isNumber
     * @param {any} o 被测试的对象
     * @return {boolean} 布尔值
     */
    isNumber: function(o) {
        return typeof o === 'number' && isFinite(o);
    },

    /**
     * 判断提供的对象是否为 object 或 function
     * @method isObject
     * @param {any} o The object being testing
     * @return {boolean} the result
     */
    isObject: function(o) {
        return (o && (typeof o === 'object' || L.isFunction(o))) || false;
    },

    /**
     * 判断提供的对象是否为字符串
     * @method isString
     * @param {any} o 被测试的对象
     * @return {boolean} 布尔值
     */
    isString: function(o) {
        return typeof o === 'string';
    },

    /**
     * 判断提供的对象是否未定义
     * @method isUndefined
     * @param {any} o 被测试的对象
     * @return {boolean} 布尔值
     */
    isUndefined: function(o) {
        return typeof o === 'undefined';
    },


    /**
     * IE不会枚举衍生对象的本地函数,即使该本地函数被重写了。如果我们想避免继承对象原型函数，这是个好办法。
     * 专门针对IE的，意思是修复枚举的功能。咱们考虑到传入的可能会是”toString”或者”valueOf”，
     * 这两个在IE中并不把它当成是一个自定义的属性值，简单地说就是一个bug;IE对toString的双重标准
     * http://leegorous.net/blog/2010/11/11/tostring-in-ie/
     * 
     * @property _IEEnumFix
     * @param {Function} r  接受属性的对象。
     * @param {Function} s  提供属性的对象。
     * @static
     * @private
     */
    _IEEnumFix: (!-[1,]) ? function(r, s) {
            var i, fname, f;
            for (i=0;i<ADD.length;i=i+1) {

                fname = ADD[i];
                f = s[fname];

                if (L.isFunction(f) && f!=OP[fname]) {
                    r[fname]=f;
                }
            }
    } : function(){},

    /**
     * <p>
     * 将字符串经过 html 转义得到适合在页面中显示的内容, 例如替换 < 为 &lt;
     * 数组 HTML_CHARS 里面的特殊字符将被转义
     * <code>&amp; &lt; &gt; &quot; &#x27; &#x2F; &#x60;</code>
     * </p>
     *
     * @method escapeHTML
     * @param {String} 需要转义的HTML字符串
     * @return {String} 经过转义的字符串
     * @static
     * @since 0.1.3
     */
    escapeHTML: function (html) {
        return html.replace(/[&<>"'\/`]/g, function (match) {
            return HTML_CHARS[match];
        });
    },

    /**
     * 用于从一个对象上扩展出另一个对象，模拟了类的继承的方式，但不同的是，
     * 在创建子对象时，父对象的构造函数不会自动调用。
     * 父对象的引用存放在了子对象的superc中，构成了一个链状继承关系。
     *
     * @method extend
     * @static
     * @param {Function} subc   将要继承的子类函数
     * @param {Function} superc 继承自的父类函数
     * @param {Object} overrides 要重写的属性/方法
     */
    extend: function(subc, superc, overrides) {
        if (!superc||!subc) {
            throw new Error("extend failed, please check that all dependencies are included.");
        }
        var F = function() {}, i;
        F.prototype=superc.prototype;
        subc.prototype=new F();
        subc.prototype.constructor=subc;
        subc.superclass=superc.prototype;
        if (superc.prototype.constructor == OP.constructor) {
            superc.prototype.constructor=superc;
        }

        if (overrides) {
            for (i in overrides) {
                if (L.hasOwnProperty(overrides, i)) {
                    subc.prototype[i]=overrides[i];
                }
            }

            L._IEEnumFix(subc.prototype, overrides);
        }
    },

    /**
     * 实现了用一个对象source的属性/方法对另一个对象result的扩展，
     * 使obj1也能拥有自己没有但在obj2中有的属性/方法。
     * 而且可以通过多个可选的参数来处理重写。
     * 通常用于合并配置对象与默认配置对象。
     *
     * @method augmentObject
     * @static
     * @since 0.1.3
     * @param {Function} r  将要扩充的函数
     * @param {Function} s  扩充来源函数或对象. 非函数对象时复制的就是 s 的成员.
     * @param {String*|boolean}  
     *        布尔值 设置是否覆盖，如果是 true 的话，那么 source 中所有属性会覆盖 result 中已有的属性；
     *        字符串集合 指定要覆盖属性的列表，source 参数后为要覆盖属性名称的列表
     *        且即使result中没有而source中有的属性或方法也不扩展
     *        例如覆盖 result 中的 toString 和 valueOf，那么可以调用 
     *        augmentObject(result, source, "toString", "valueOf"）来实现。
     */
    augmentObject: function(r, s) {
        if (!s||!r) {
            throw new Error("Absorb failed, verify dependencies.");
        }
        var a=arguments, i, p, overrideList=a[2];
        if (overrideList && overrideList!==true) { // only absorb the specified properties
            for (i=2; i<a.length; i=i+1) {
                r[a[i]] = s[a[i]];
            }
        } else { // take everything, overwriting only if the third parameter is true
            for (p in s) {
                if (overrideList || !(p in r)) {
                    r[p] = s[p];
                }
            }

            L._IEEnumFix(r, s);
        }

        return r;
    },

    /**
     * 与 augmentObject 调用方式和实现原理基本相同，只不过后者是处理对象，而前者是处理函数的 prototype
     * @see XIAOMI.lang.augmentObject
     * @method augmentProto
     * @static
     * @param {Function} r  将要扩充的函数
     * @param {Function} s  扩充来源函数或对象. 非函数对象时复制的就是 s 的成员.
     * @param {String*|boolean}  
     *        布尔值 设置是否覆盖，如果是 true 的话，那么 source 中所有属性会覆盖 result 中已有的属性；
     *        字符串集合 指定要覆盖属性的列表，source 参数后为要覆盖属性名称的列表
     *        且即使result中没有而source中有的属性或方法也不扩展
     *        例如覆盖 result 中的 toString 和 valueOf，那么可以调用 
     *        augmentObject(result, source, "toString", "valueOf"）来实现。
     */
    augmentProto: function(r, s) {
        if (!s||!r) {
            throw new Error("Augment failed, verify dependencies.");
        }
        //var a=[].concat(arguments);
        var a=[r.prototype,s.prototype], i;
        for (i=2;i<arguments.length;i=i+1) {
            a.push(arguments[i]);
        }
        L.augmentObject.apply(this, a);

        return r;
    },

    /**
     * 返回对象或数组的字符串表达式。
     * 其他形式的对象将被原样返回， 数组会被索引。
     * 用对象符号来表示关联数组。
     * @method dump
     * @since 0.1.3
     * @param o {Object} 要转化的对象。
     * @param d {int} 要转化的子对象深度, 默认转化 3 级子对象。
     * @return {String} 转化结果。
     */
    dump: function(o, d) {
        var i,len,s=[],OBJ="{...}",FUN="f(){...}",
            COMMA=', ', ARROW=' => ';

        // Cast non-objects to string
        // Skip dates because the std toString is what we want
        // Skip HTMLElement-like objects because trying to dump
        // an element will cause an unhandled exception in FF 2.x
        if (!L.isObject(o)) {
            return o + "";
        } else if (o instanceof Date || ("nodeType" in o && "tagName" in o)) {
            return o;
        } else if  (L.isFunction(o)) {
            return FUN;
        }

        // dig into child objects the depth specifed. Default 3
        d = (L.isNumber(d)) ? d : 3;

        // arrays [1, 2, 3]
        if (L.isArray(o)) {
            s.push("[");
            for (i=0,len=o.length;i<len;i=i+1) {
                if (L.isObject(o[i])) {
                    s.push((d > 0) ? L.dump(o[i], d-1) : OBJ);
                } else {
                    s.push(o[i]);
                }
                s.push(COMMA);
            }
            if (s.length > 1) {
                s.pop();
            }
            s.push("]");
        // objects {k1 => v1, k2 => v2}
        } else {
            s.push("{");
            for (i in o) {
                if (L.hasOwnProperty(o, i)) {
                    s.push(i + ARROW);
                    if (L.isObject(o[i])) {
                        s.push((d > 0) ? L.dump(o[i], d-1) : OBJ);
                    } else {
                        s.push(o[i]);
                    }
                    s.push(COMMA);
                }
            }
            if (s.length > 1) {
                s.pop();
            }
            s.push("}");
        }

        return s.join("");
    },

    /**
     * 先在字符串里放一些替代变量. 该方法将扫描整个字符串寻找包在{}之间的占位表达式 。
     * 如果该表达式存在，这个表达式将被看作对象的key，如果该表达式里有空格，那么空格前的单词被看作key ，
     * 其余部分被当做参数传递给一个可选的函数来运算出结果值value（假如还有额外的信息来确定最终值的时候）。
     * 如果对象中该key的value或者通过函数运算出的结果value是个字符串，数字，或者对象值，
     * 该value值将替换占位表达式，然后重复执行自身方法直到替换完，
     * 如果该值是个对象，并且已经被覆写了，就调用toString方法，否则就用dump方法转化为key/value对。
     * @method substitute
     * @since 0.1.3
     * @param s {String} 要替换的字符串。
     * @param o {Object} 包含替代值的对象。
     * @param f {Function} （可选）该函数将在每个匹配成功的时候，
     *                     接收key，value，还有占位表达式空格后面的参数值，然后运算出结果。
     * @return {String} 替换后的字符串。
     */
    substitute: function (s, o, f, recurse) {
        var i, j, k, key, v, meta, saved=[], token, lidx=s.length,
            DUMP='dump', SPACE=' ', LBRACE='{', RBRACE='}',
            dump, objstr;

        for (;;) {
            i = s.lastIndexOf(LBRACE, lidx);
            if (i < 0) {
                break;
            }
            j = s.indexOf(RBRACE, i);
            if (i + 1 > j) {
                break;
            }

            //Extract key and meta info
            token = s.substring(i + 1, j);
            key = token;
            meta = null;
            k = key.indexOf(SPACE);
            if (k > -1) {
                meta = key.substring(k + 1);
                key = key.substring(0, k);
            }

            // lookup the value
            v = o[key];

            // if a substitution function was provided, execute it
            if (f) {
                v = f(key, v, meta);
            }

            if (L.isObject(v)) {
                if (L.isArray(v)) {
                    v = L.dump(v, parseInt(meta, 10));
                } else {
                    meta = meta || "";

                    // look for the keyword 'dump', if found force obj dump
                    dump = meta.indexOf(DUMP);
                    if (dump > -1) {
                        meta = meta.substring(4);
                    }

                    objstr = v.toString();

                    // use the toString if it is not the Object toString
                    // and the 'dump' meta info was not found
                    if (objstr === OBJECT_TOSTRING || dump > -1) {
                        v = L.dump(v, parseInt(meta, 10));
                    } else {
                        v = objstr;
                    }
                }
            } else if (!L.isString(v) && !L.isNumber(v)) {
                // This {block} has no replace string. Save it for later.
                v = "~-" + saved.length + "-~";
                saved[saved.length] = token;

                // break;
            }

            s = s.substring(0, i) + v + s.substring(j + 1);

            if (recurse === false) {
                lidx = i-1;
            }

        }

        // restore saved {block}s
        for (i=saved.length-1; i>=0; i=i-1) {
            s = s.replace(new RegExp("~-" + i + "-~"), "{"  + saved[i] + "}", "g");
        }

        return s;
    },

    /**
     * 该方法返回一个首尾去除空格的字符串，如果输入的不是字符串，将被原样输出 。
     * @method trim
     * @since 0.1.3
     * @param s {string} 要处理的字符串。
     * @return {string} 处理后的字符串。
     */
    trim: function(s){
        try {
            return s.replace(/^\s+|\s+$/g, "");
        } catch(e) {
            return s;
        }
    },

    /**
     *  返回一个包含所有提供对象的所有属性的新对象。
     *  后面对象的属性将覆盖前面对象的属性。
     * @method merge
     * @since 0.1.3
     * @param arguments {Object*} 需要合并的对象。
     * @return 合并后的新对象。
     */
    merge: function() {
        var o={}, a=arguments, l=a.length, i;
        for (i=0; i<l; i=i+1) {
            L.augmentObject(o, a[i], true);
        }
        return o;
    },

    /**
     * 在指定的t（毫秒）后，在提供的对象上执行某函数， 如果periodic被设置为true，则每隔t（毫秒）重复执行该函数。
     * @method later
     * @since 0.1.3
     * @param when {int} 执行该函数的延迟时间（毫秒为单位） 。
     * @param o 上下文环境对象。
     * @param fn {Function|String} 将要执行的函数名称或者对象“o”的方法。
     * @param data [Array]  传递给函数的参数. 最好是个简单的元素或者数组，
     *                      如果是数组，函数将遍历执行数组中的每个元素，而且数组需要用[]的形式。
     * @param periodic {boolean} 如果设置为true，函数将按照指定的时间间隔重复执行，直到被取消 。
     * @返回一个定时器对象，该对象执行cancel()方法可以停止定时器 。
     */
    later: function(when, o, fn, data, periodic) {
        when = when || 0;
        o = o || {};
        var m=fn, d=data, f, r;

        if (L.isString(fn)) {
            m = o[fn];
        }

        if (!m) {
            throw new TypeError("method undefined");
        }

        if (!L.isUndefined(data) && !L.isArray(d)) {
            d = [data];
        }

        f = function() {
            m.apply(o, d || NOTHING);
        };

        r = (periodic) ? setInterval(f, when) : setTimeout(f, when);

        return {
            interval: periodic,
            cancel: function() {
                if (this.interval) {
                    clearInterval(r);
                } else {
                    clearTimeout(r);
                }
            }
        };
    },

    /**
     * 检测合法的非空值的方法。
     * null,undefined,NaN返回false,其他值返回true，包括（0,false,''） 。
     * @method isValue
     * @since 0.1.3
     * @param o {any} 需要检测的元素。
     * @return {boolean} 如果是 null，undefined，NaN，返回true，其他都返回 false。
     */
    isValue: function(o) {
        // return (o || o === false || o === 0 || o === ''); // Infinity fails
        return (L.isObject(o) || L.isString(o) || L.isNumber(o) || L.isBoolean(o));
    }

};

/**
 * 检测某个属性是不是对象自身的，如果对象不存在该属性或者该属性是从原型继承的则返回false，
 * 这个抽象方法可以让Safari 1.3.x浏览器也具有hasOwnProperty功能。
 * XIAOMI.lang.hasOwnProperty和Object.prototype.hasOwnProperty也存在一些差异，
 * 当某个属性同时被添加到实体和原型上的时候，返回的结果是不一样的。
 * <pre>
 * var A = function() {};
 * A.prototype.foo = 'foo';
 * var a = new A();
 * a.foo = 'foo';
 * alert(a.hasOwnProperty('foo')); // true
 * alert(XIAOMI.lang.hasOwnProperty(a, 'foo')); // false when using fallback
 * </pre>
 * @method hasOwnProperty
 * @param {any} o 待检测对象。
 * @param prop {string} 待检测的属性。
 * @return {boolean} 结果。
 */
L.hasOwnProperty = (OP.hasOwnProperty) ?
    function(o, prop) {
        return o && o.hasOwnProperty && o.hasOwnProperty(prop);
    } : function(o, prop) {
        return !L.isUndefined(o[prop]) &&
                o.constructor.prototype[prop] !== o[prop];
    };

// new lang wins
OB.augmentObject(L, OB, true);

/**
 * 和 XIAOMI.lang.augmentObject一样, 只是该方法只执行原型属性，该方法是 augmentProto的别名。
 * 请查看 XIAOMI.lang.augmentObject。
 * @method augment
 * @static
 * @param {Function} r  接收属性的对象。
 * @param {Function} s  提供属性的方法。
 * @param {String*|boolean}  可以指定提供对象的某个或多个添加给接收对象的属性和方法 。
 *        如果没有指定该参数，提供属性的对象的所有属性将被添加给接收对象，如果接收对象本来已经有了某个属性，则不添加该属性。
 *        如果该参数是true，所有提供对象的属性和方法将被添加到接收对象，如果接收对象已经有了某个属性则覆盖原有属性。
 */
L.augment = L.augmentProto;

/**
 * XIAOMI.lang.augment的别名。
 * @method augment
 * @static
 * @param {Function} r  接收属性的对象。
 * @param {Function} s  提供属性的对象。
 * @param {String*|boolean}  可以指定提供对象的某个或多个添加给接收对象的属性和方法 。
 *        如果没有指定该参数，提供属性的对象的所有属性将被添加给接收对象，如果接收对象本来已经有了某个属性，则不添加该属性。
 *        如果该参数是true，所有提供对象的属性和方法将被添加到接收对象，如果接收对象已经有了某个属性则覆盖原有属性。
 */
XIAOMI.augment = L.augmentProto;

/**
 * XIAOMI.lang.extend的别名。
 * @method extend
 * @static
 * @param {Function} subc   待修改的对象（子对象）。
 * @param {Function} superc 继承的对象（父对象）。
 * @param {Object} overrides  添加到子类原型中的额外属性和方法，如果该属性
 *                              和方法已经存在则覆盖原有属性或方法。
 */
XIAOMI.extend = L.extend;

})();
XIAOMI.register("XIAOMI", XIAOMI, {version: "0.1.3", build: "2800"});