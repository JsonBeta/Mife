#Mife

![Mife icon](http://p.www.xiaomi.com/zt/130531/images/logo.png)

##Javascript格式化

###基本格式化

* **缩进：**使用4个空格为一个缩进层级（设置编辑器TAB）

* **语句结尾：**JAVASCRIPT语句须以分号结尾，大多数压缩合并工具会自动添加分号

* **空行：** 
	* 在方法之间
	* 方法中局部变量与第一条语句之间
	* 行注释之前
	* 逻辑片段之前

* **命名：**
	* 变量-驼峰大小写
	* 常量-大写以下划线连接
	* 函数-驼峰首单词为动词（can,has,is,get,set…）
	* 构造函数-驼峰首字母大写
	
		**代码示例**
		
		```
		//变量-驼峰大小写
		var myName = "Jsonbeta",
			number = 30;

		//常量
		var MINI_NUM = 100,
			ORDER_URL = "http://order.xiaomi.com/";

		//函数-首单词为动词
		function getName() {
			reutrn myName;
		}

		//构造函数-驼峰首字母大写
		function Xiaomi(id){
			this.id = id;
		}

		var myId = new Xiaomi(143);
		```

* **注释**
	* 目的：自己或其他人能快速读懂代码，对文档生成工具友好**`YUI DOC`**注释遵循代码格式化；所有函数、方法、构造函数须使用文档注释
	
		`tips`:编辑器sublime text 安装DocBlockr插件, 在function上一行输入/**，然后按Tab就自动补全注释

* **语句&表达式**
	
	* 块语句须使用大括号（if,for,while,try catch….)
	* 第一个大括号在块语句第一句末尾
	* 块语句间隔-在左小括号之前和右小括号之后添加一个空格
		
		**代码示例：**
		
		```
		function Name ( obj ) {
			if( arguments ) {
				return false;
			}		
		}
	
		```
	* `for` 循环 保留对`break`,`continue`来控制数组的迭代；
	* `for in` 循环-hasOwnProperty()来过滤出实例属性且禁止使用它来遍历数组成员；
		
		```
		for ( target in object ) {
			if ( object.hasOwnProperty(target) ) {
				console.log( "value is " + object[target] );
			}
		}
		
		```		
		
	* `SWITCH` 语句
		
		* 事实上`javascrpt` 的 `switch` 语句中可以使用任意类型的值及表达式作为`case`从句；
		* 每条`case`语句相对于`switch`关键字保持一个缩进层级；
		* 从第2条`case`语句开始，每条`case`语句前后有一个空行；
		* 非特殊情况下不允许`case`语句“连续执行”，结尾须有`break`,`return`,`throw`；
		* 我们更倾向于即使没有默认行为也需要保留`default`；
		
			**代码示例：**
			
			```
			switch( condition ) {
				case "first":
					//do something
					break;
					
				case "second":
					//do someting
					break;
					
				default:
					//do someting
				
			}
			
			```
	* 禁止使用with语句
	***
	
	
###变量&函数&运算符
	
* 变量声明
* 所有变量必须使用`var`声明
* 同一作用域的变量都提前之函数的顶部，且我们推荐合并为一个`var`语句，每个变量独占一行；
		
	**代码示例**
			
			function doSomething ( obj ) {
				
				var value = 10,
					result = value + 10,
					i,
					lens;
					
				for ( i = 0, len = obj.length; i < len; i++ ){
					//dosomething
				}
			}
			
		
* 函数调用在函数声明之后，调用函数名与左括号无空格
	
	**代码示例**
		
		function doSomething ( name ) {
			console.log(name + " say:Hello world!");
		}
		
		doSomethings("jsonbeta");
		
* 即时函数（立即调用函数）必须使用小括号包裹
	
	**代码示例**
		
		var name = (function() {
			// dosomething
			return {
				value: "jsonbeta"
			}
		}());
		
* 推荐局部作用域使用严格模式 “use strict”
* 使用 === !==  避免使用 == !=
* 推荐使用对象字面量来代替原始包装类型
	
	**代码示例**
		
		//不提倡的写法
		var name = new String("jsonbeta");
		var isMan = new Boolean(true);
		var length = new Number(10);
		
		//推荐写法
		var name = "jsonbeta";
		var isMan = true;
		var length = 10;
		

###静态页面制作规范


##MVC & 自适应解决方案

###JAVASCRIPT

####handlebars.js
####namespaece(yahoo.js)
####统计代码、第三方`javascrpt`文件引入等全局解决方案

###CSS

####LESS
####960PX && 1200PX && YAHOO栅格

###HTML

####栅格系统

##前端自动化构建
###GRUNT.JS
###ANT & BUILDR.JS

