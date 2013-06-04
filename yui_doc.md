##YUI DOC

###安装说明

###使用文档说明概要

####必须要以两个*开头：

	/**
	正确的格式
	*/
	
	/*
	YUI DOC 不认识
	*/

**`tips`** 注释里的内容才是最重要的。每个注释块都应该包含唯一的主标签，和0个或多个副标签。

####主标签

* @module
	> @module 标签描述**一组**关联的类（JS 没有类，YUIDoc只是把有构造方法也归为类）。
	如果我们用YUIDoc生成 BackboneJS的文档，那 Backbone 对象就是个module，因为它同时管理Model,Collection, View, 和 other classes。
	
	```
	/**
	@module Backbone
	*/
	var Backbone = Backbone || {};
	```
 
* @class
	> @class 标签专门描述类的。每个有@class 标签的注释块都应该有一个@static 或者 @constructor的副标签。
	
	```
	/**
	@class Model
	*/
	function Model () {}
	```


* @method
	> @method 描述类中的方法。你将会用到 @return 和 @params 副标签加以说明。

* @property
 > @property 标签说明类的属性值。 @type 和 @default副标签配合使用。

	```
	/**
	@property templateString
	*/
	this.templateString = "div";
	```
	
* @event
 > @event 描述你自定义的可触发事件。
 @event 注释快近似于 @method，但无需@return ， @param 则用于说明回调方法接收的参数

####副标签


* @submodule
	
	```
	/**
	@module Util
	@submodule array
	*/
	Util.array = {};
	```
	
* @extends

	`tips` @extends 描述类继承关系时非常有用，声明了当前类的超类是哪个：
	
	```
	/**
	@class AppView
	@extends Backbone.View
	*/
	var AppView = Backbone.View.extend({});
	```

* @constructor

	`tips` 如果一个类可被实例化，说明它得有个构造方法。
	
	```
	/**
	@class Recipe
	@constructor
	*/
	function Recipe () {}
	```

* @static

	`tips` @static是描述那些不能实例化的静态类的。 
	
	```
	/**
	@class MathHelpers
	@static
	*/
	var MathHelpers = {};
	```
	
	```
	/**
	@class Person
	@constructor
	*/
	function Person () {}
	/**
	@method all
	@static
	*/
	Person.all = function () {};	
	```
> 本示例中的Person 实例的all方法即是静态的。

* @final常量

	```
	/**
	@property DATE_FORMAT
	@final
	*/
	var DATE_FORMAT = "%B %d, %Y";
	```

* @param
	> 重要标签： @param 定义了 @method (包括@constructor) 或 @event的参数。@param 后写三个信息：name 参数名， type参数类型 (可选),，description参数描述。这三个的顺序可为name type description或者 type name description；参数类型必须用{}包括起来。
	
	```
	/**
	@method greet
	@param name {type} description
	*/
	function greet (person) {}
	```


	>参数有此可选项，放入[]中表示可选参数，后接着 =someVal 表明是默认参数 (只有可靠参数才会有默认值)。用 * 表示多个参数(name* 表示1个或者多个参数，[name]* 表示0个或者多个参数)。
	
	```
	/**
	@class Template
	@constructor
	@param name {type} description
	@param [data={}] {type} description(参数可选项)
	*/
	function Template (template, data) {}
	```

* @return
	
	```
	/**
	@method toHTML
	@param [template=Recipe.defaultTemplate] {Template} A template object
	@return {String} 返回值描述
	*/
	Recipe.prototype.toHTML = function (template) {
		return "someStrings";
	};
	```

* @type

	`tips` 如果多个用|分隔：
	
	```
	/**
	@property URL
	@type String
	*/
	URL: "http://www.xiaomi.com/",
	
	/**
	@property person
	@type String|Person|Object
	*/
	this.person = new Person();
	```

* @private / @protected 私有、受保护的
	
	```
	/**
	@method _toString
	@private
	*/
	var _toString = Object.prototype.toString.call;
	```

* @requires

	`tips`如果一个 module 依赖多个module，用 @requires 标明,可用逗号分隔表明同时依赖多个：
	
	```
	/**
	@module MyFramework.localstorage
	@requires MyFramework,MyNamespace
	*/
	```
	
* @default
	> 声明一个@property时用 @default 定义它的默认值，须配合@type用。
 
 	```
 	/**
 	@property element
 	@type String
 	@default "div"
 	*/
 	element: "div",
 	 ```


* @uses
	
	```
	/**
	@class ModalWindow
	@uses Window
	@uses DragDroppable
	*/
	var ModalWindow = new Class({
		mixes: [Window, DragDroppable],
		...
	});	
	```

* @example

	```
	/**
	@method greet
	@example
	person.greet("Jane");
	*/
	Person.prototype.greet = function (name) {};
	```

* @chainable 方法里面返回了当前对象

	```
	/**
	@method addClass
	@chainable
	*/
	jQuery.prototype.addClass = function (class) {
		// stuff;
		return this;
	}
	```

* @deprecated / @since / @beta 代码的支持性质的

	```
	/**
	@method toJSON
	@deprecated Pass the object to `JSON.parse` instead
	*/
	Something.toJSON = function () {};
	```
	> @since 标签告诉读者自哪个版起代码被加进来。 @beta 标明代码是beta;
	
	```
	/**
	@class Tooltip
	@since 1.2.3
	@constructor
	*/
	function Tooltip () {}
	```
* @extension / @extensionfor /extension_for 继承、扩展
	
	```
	/**
	@class Draggable
	@extensionfor ModalWindow
	*/
	```
* Comments and Markdown 注释和说明

	```
	/**
	The `Router` class is used for . . .
	@class Router
	@static
	*/
	var Router = {};
	```

* 项目文件配置[配合自动化构建]

	```
	{
    	"name": "Documenting JavaScript with YUIDoc",
    	"description": "A tutorial about YUIDoc, for Nettuts+",
    	"version": "1.0.0",
    	"url": "http://www.xiaomi.com/"
    }
	```
	**参数说明**
	
	* linkNatives: 设置为 “true” 则类似String 或者 Number 类型的将连接到MDN docs.
	* outdir: 输出的路径
	* paths: YUIDoc 将扫描的JS路径
	* exclude: YUIDoc会忽略生成的路径
	
	**示例**
	
	```
	{
		"name": "Documenting JavaScript with YUIDoc",
		"description": "A tutorial about YUIDoc, for Nettuts+",
		"version": "1.0.0",
		"url": "http://net.tutsplus.com",
		"options": {
			"linkNatives": "true",
			"outdir": "./docs",
			"paths": "."
		}
	}
	```

####了解更多YUI DOC

<http://yui.github.io/yuidoc/args/index.html>

<http://yui.github.io/yuidoc/>

<https://code.google.com/p/yui-doc-zh/>
