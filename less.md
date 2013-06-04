# Less
一种 **动态** 样式 **语言**.  

LESS 将 CSS 赋予了动态语言的特性，如 变量， 继承， 运算， 函数. LESS 既可以在 客户端 上运行 (支持IE 6+, Webkit, Firefox)，也可以借助Node.js或者Rhino在服务端运行。

-----------------------
## 第三方工具
koala一款桌面编译工具，完美兼容Win，Linux，Mac

<http://koala-app.com/index-zh.html>

## 变量
变量允许我们单独定义一系列通用的样式，然后在需要的时候去调用。所以在做全局样式调整的时候我们可能只需要修改几行代码就可以了。
##### less
	@color :  #4D926F;
	
	.box {
		color : @color;
	}
	
##### css
	.box {
		color : #4D926F;
	}
## 变量嵌入字符串
变量可以用类似 ruby 和 php 的方式嵌入到字符串中
##### less
	@base-url: "http://p.xiaomi.com";
	.box {
		background-image: url("@{base-url}/images/bg.png");
	}
##### css
	.box {
		background-image:url("http://p.xiaomi.com/images/bg.png");
	}
## 混合
在 LESS 中我们可以定义一些通用的属性集为一个 class，然后在另一个 class 中去调用这些属性。
##### less
	// 定义通用属性
	.public {
		border : 1px solid #fff; 
		padding : 20px 10px;
	}
	
	// 在另一个class中调用
	.box { 
		.public;
		color : #f60;
	}
##### css
	// .public 的属性就会在.box中出现
	.box {
		border : 1px solid #fff; 
		padding : 20px 10px;
		color : #f60;
	}
	
## 带参数的混合
在 LESS 中，你还可以像函数一样定义一个带参数的属性集合
##### less
	.border-radius(@radius) {
		border-radius : @radius;
	}
	// 然后在其他class中调用
	.box {
		border-radius(5px);
	}
	// 还可以给参数设置默认值，像这样
	.border-radius(@radius : 5px) {
		border-radius : @radius;
	}
	// 然后就可以这样调用它
	.box {
		border-radius;
	}
##### css
	.box {
		border-radius : 5px;
	}

如果你想隐藏这个属性集合，不让它暴露到 CSS 中去，但是你还想在其他的属性集合中引用，可以这样：
##### 	less
	.public () {
		font-size : 14px;
		color : #f60;
		background : #eee;
	}
	
	.box { .public; }
#####  css
	.box {
		font-size : 14px;
		color : #f60;
		background : #eee;
	}

@arguments 变量

@arguments包含了所有传递进来的参数。 如果你不想单独处理每一个参数的话就可以像这样写：
##### less
	.box-shadow(@x:0,@y:0,@blur:1px,@color:#000){
		box-shadow : @arguments;
	}
	.box-shadow : (2px , 5px)
##### css
	.box-shadow : 2px 5px 1px #000;

## 嵌套规则
LESS 可以让我们以 **嵌套** 的方式编写层叠样式。 让我们先看下下面这段 CSS：

##### css
	.header {
		color : #999;
	}
	.header .logo {
		width : 60px;
		height : 60px;
	}
	.header .menu {
		font-size:14px;
	}
	.header .menu a {
		color : #f60;
	}
	.header .menu a:hover {
		text-decoration : none;
	}
##### less
	.header {
		color : #999;
		.logo {
			width : 60px;
			height : 60px;
		}
		.menu {
			font-size : 14px;
			a {
				color : #f60;
				&:hover {
					text-decoration : none;
				}
			}
		}
	}
代码更简洁了，而且感觉跟 DOM 结构格式有点像。

注意 **&** 符号的使用 ! 如果你想写串联选择器，而不是后代选择器，就可以用到 & 了。这点对伪类尤其有用如 :hover 和 :focus。
##### less
	.box {
		&.miui {
			float : left;
		}
		.hd {
			height : 30px;
		}
	}
##### css
	.box.miui {
		float : left;
	}
	.box .hd {
		height : 30px;
	}
## 嵌套 Media Queries
Media queries 允许像选择器那样进行嵌套。
##### less
	.one {
    		@media (width: 400px) {
    			font-size: 1.2em;
    		}
    		@media print and color {
    			color: blue;
    		}
	 }
##### css
	@media (width: 400px) {
    		.one {
   			 font-size: 1.2em;
    		}
    	}
    @media (width: 400px) and print and color {
    		.one {
    			color: blue;
    		}
    }
 
##  运算
任何数字、颜色或者变量都可以参与运算
##### 	less
	@baseFontsize : 14px;
	@fontSizeLarge : @baseFontsize * 2;
	@borderWidth : 1px;
	.box {
		width : 100% / 2;
		border : (@borderWidth * 2) solid #ccc;
		color : #888 + #111;
		font-size: @fontSizeLarge ;
	}
	
##### css
	.box {
		width: 50%;
		border: 2px solid #cccccc;
		color: #999999;
		font-size: 28px;
	}
##  命名空间
有时候，你可能为了更好组织 CSS 或者单纯是为了更好的封装，将一些变量或者混合模块打包起来，你可以像下面这样定义一些属性集之后可以重复使用
#####  less
	.box {
		.hd {…}
		.bd {...}		
		.button (){
			display : block;
			border : 1px solid #ccc;
			background : #eee;
			&:hover {
				background : #fff;
			}			
		}
	}
	
	只需要在其他选择器中这样调用 .button
	.box2 {
		.box > .button;
	}
##### css
	.box2 {
		display: block;
		border: 1px solid #ccc;
		background: #eee;
	}
	.box2:hover {
		background: #fff;
	}
## 作用域
LESS 中的作用域跟其他编程语言非常类似，首先会从本地查找变量或者混合模块，如果没找到的话会去父级作用域中查找，直到找到为止。

	@var: red;

    	#page {
    		@var: white;
    		#header {
    			color: @var; // white
    		}
    	}

    	#footer {
    		color: @var; // red
    	 }
	
### 注释
CSS 的注释格式在 LESS 中是依然保留的

	/* Hello, I'm a CSS-style comment */
    .class { color: #000 }
    
LESS 同样也支持双斜线的注释，但是编译成 CSS 的时候自动过滤掉

	// Hi, I'm a silent comment, I won't show up in your CSS
    .class { color: #fff }
    
## Importing
你可以在 main 文件中通过下面的格式导入 .less 文件， .less 后缀可带可不带
##### 	less
	@import "lib.less";
	@import "lib";
   	
如果你想导入一个 CSS 文件而且不想 LESS 对它进行处理，只需要使用 .css 后缀就可以
##### css
	@import "lib.css";
	
这样 LESS 就会跳过它不去处理它。

为了避免重复导入文件，使用 @import-once 限制文件只允许被导入一次（LESS 1.4.0 版将默认执行 @import-once）。

	@import-once "lib.less";
	@import-once "lib.less";   // 将被忽略
	
## 函数
LESS 提供了多种函数用于控制颜色变化、处理字符串、算术运算等等。<br> 详见：<http://www.lesscss.net/#reference>

	escape(@string);                             // 通过 URL-encoding 编码字符串

	unit(@dimension, [@unit: ""]);               // 移除或替换属性值的单位
	color(@string); 	                         // 将字符串解析为颜色值

	ceil(@number); 	                             // 向上取整
	floor(@number);					             // 向下取整
	percentage(@number);                         // 将浮点数转换为百分比，例如 0.5 -> 50%
	round(number, [places: 0]);                  // 四舍五入取整

	rgb(@r, @g, @b);                             // 转换为颜色值
	rgba(@r, @g, @b, @a);                        // 转换为颜色值
	argb(@color);                                // 创建 #AARRGGBB 格式的颜色值
	hsl(@hue, @saturation, @lightness);          // 创建颜色值
	hsla(@hue, @saturation, @lightness, @alpha); // 创建颜色值
	hsv(@hue, @saturation, @value);              // 创建颜色值
	hsva(@hue, @saturation, @value, @alpha);     // 创建颜色值

	hue(@color);                                 // 从颜色值中提取 `hue` 值
	saturation(@color);                          // 从颜色值中提取 `saturation` 值
	lightness(@color);                           // 从颜色值中提取 'lightness' 值
	red(@color);                                 // 从颜色值中提取 'red' 值
	green(@color);                               // 从颜色值中提取 'green' 值
	blue(@color);                                // 从颜色值中提取 'blue' 值
	alpha(@color);                               // 从颜色值中提取 'alpha' 值
	luma(@color);                                // 从颜色值中提取 'luma' 值

	saturate(@color, 10%);                       // 饱和度增加 10%
	desaturate(@color, 10%);                     // 饱和度降低 10%
	lighten(@color, 10%);                        // 亮度增加 10%
	darken(@color, 10%);                         // 亮度降低 10%
	fadein(@color, 10%);                         // 透明度增加 10%
	fadeout(@color, 10%);                        // 透明度降低 10%
	fade(@color, 50%);                           // 设定透明度为 50%
	spin(@color, 10);                            // 色相值增加 10
	mix(@color1, @color2, [@weight: 50%]);       // 混合两种颜色
	greyscale(@color);                           // 完全移除饱和度，输出灰色
	
	contrast(@color1, [@darkcolor: black], [@lightcolor: white], [@threshold: 43%]); 
                                             	 // 如果 @color1 的 luma 值 > 43% 输出 @darkcolor
                                                 // 否则输出 @lightcolor

	multiply(@color1, @color2);
	screen(@color1, @color2);
	overlay(@color1, @color2);
	softlight(@color1, @color2);
	hardlight(@color1, @color2);
	difference(@color1, @color2);
	exclusion(@color1, @color2);
	average(@color1, @color2);
	negation(@color1, @color2);