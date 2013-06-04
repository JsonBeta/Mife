# jade使用说明

## jade介绍
* jade是一种易于管理及维护的高性能模板引擎 
* [jade官网](http://jade-lang.com)
* [github上jade官方项目](https://github.com/visionmedia/jade#readme)

备注：详细请参考官方文档

## jade使用说明
### 1、Block append/prepend 介绍
 作用：jade可以通过extends继承公用模板引擎，在公用模板引擎设置block标记。
 
 base.jade基础模板
 实例：

 ```
 !!!
 html
 	head
 		meta(charset="utf-8")
		meta(name="description",content="小米手机最新发布小米2升级版小米2s售价1999元起")
		meta(name="keywords",content="小米手机,小米手机官网,小米2,小米2s,小米2a")
		block blockHead
	body
		block blockMain
 ```
 
 
### 2、includes介绍
 作用：jade可以通过include引入静态文件，如jade、less、js等等，经典例子是页眉和页脚。
 
 base.jade基础模板
 实例：
 
 ```
 !!!
 html
 	head
 		!!!
html
	head
		include ./jade/head
		block blockHead
	body
		block blockMain
		include ./jade/footer
		include ./jade/count
 ```
 
 head.jade头部公用描述信息
 实例：
 
 ```
 meta(charset="utf-8")
 meta(name="description",content="小米手机最新发布小米2升级版小米2s售价1999元起")
 meta(name="keywords",content="小米手机,小米手机官网,小米2,小米2s,小米2a")
 ```
 
 footer.jade底部公用页脚信息
 实例：
 
 ```
 .footer
	div
		| &copy;
		a(href="http://www.xiaomi.com/index.php",target="_blank",title="xiaomi.com") xiaomi.com
		span 京ICP证110507号 京ICP备10046444号 京公网安备110105018986号
		| 旗下网站：
		a(href="http://www.xiaomi.com/index.php",target="_blank",title="小米网") 小米网
		a(href="http://www.miui.com",target="_blank",title="MIUI") MIUI
		a(href="http://www.miliao.com",target="_blank",title="米聊") 米聊
		a(href="http://book.duokan.com",target="_blank",title="多看书城") 多看书城
		a(href="http://hk.xiaomi.com",target="_blank",title="繁體香港") 繁體香港
		a(href="http://tw.xiaomi.com",target="_blank",title="繁體台灣") 繁體台灣
	img(alt="",src="http://p.www.xiaomi.com/open/130514/home/footerbg.png")
 ```
 
 count.jade附加公用信息，如统计代码等
 实例：
 
 ```
 <script>var _gaq=_gaq||[];_gaq.push(['_setAccount','UA-24946561-1']);_gaq.push(['_addOrganic','baidu','word']);_gaq.push(['_addOrganic','soso','w']);_gaq.push(['_addOrganic','vnet','kw']);_gaq.push(['_addOrganic','sogou','query']);_gaq.push(['_addOrganic','youdao','q']);_gaq.push(['_addOrganic','so','q']);_gaq.push(['_setDomainName','xiaomi.com']);_gaq.push(['_setAllowLinker',true]);_gaq.push(['_trackPageview']);(function(){var ga=document.createElement('script');ga.type='text/javascript';ga.async=true;ga.src=('https:'==document.location.protocol?'https://ssl':'http://www')+'.google-analytics.com/ga.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga,s);})();</script>
 <script>(function() {var mst = document.createElement('script'); mst.type = 'text/javascript'; mst.async = true;mst.src = "http://p.www.xiaomi.com/js/mst.js?v316";var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(mst, s);})();</script>
 ```

### 3、基础句法

3.1元素标签

```
最简单标签，如div
为标签指定ID属性（不指定标签名称，默认是div）
span#test
为标签指定class属性
input.btn.redbtn
为标签指定ID及class属性
input#test.btn.renbtn
```

3.2文本内容，注意：当数字及字母时需要用“|”，否则会转义成自定义元素标签

```
p 我是文本内容
p
	| 1、你好
```

渲染结果：

```
  <p>我是文本内容</p>
  <p>1、你好</p>
```


3.3元素属性，属性放在成对的小括号()当中，每个属性用,分隔

```
a(href="http://www.xiaomi.com",target="_blank",title="小米网")
input(type="button",value="按钮")
```

渲染结果：

```
  <a href="http://www.xiaomi.com" target="_blank" title="小米网">小米网</a>
  <input type="button" value="按钮" />
```

3.4文档注释使用正双斜线

```
通用文档注释
// 我是文档注释内容
IE标记注释，如小于IE8版本
//if lt IE 8
	script(src="base.js")
```

渲染结果：

```
  <!-- 我是文档注释内容 -->
  <!-- [if lt IE 8] -->  
  	 <script src="base.js"></script>
  <![endif]-->
```

3.5文档声明

```
!!!或doctype
```

### 4、变量
定义变量
如做配置文件

```
- var purl = 'http://p.www.xiaomi.com/open/base/';
- var datepurl = 'http://p.www.xiaomi.com/open/130601/';
- var rule = 'http://www.xiaomi.cn/****';
- var title = '标题';
```

### 5、模板引擎使用

5.1基础语法包括if、for等等，渲染文本#{变量}、超文本标记语言!{变量}


```
!!!
html
	head
		meta(charset="utf-8")
		title jade expressions example
	body
		- var data = { people: [ { first_name: "Alan", last_name: "Johnson", phone: "1234567890", email: "alan@test.com", member_since: "Mar 25, 2011" },{ first_name: "Allison", last_name: "House", phone: "0987654321", email: "allison@test.com", member_since: "Jan 13, 2011" }]};
		- var jPe = data.people;
		- for (var key in jPe)
			div.person
				h2 #{jPe[key].first_name} #{jPe[key].last_name}
				.phone #{jPe[key].phone}
				.email <a href="mailto:#{jPe[key].email}">#{jPe[key].email}</a>
				.since User since #{jPe[key].member_since}
```

渲染结果：

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>jade expressions example</title>
  </head>
  <body>
    <div class="person">
      <h2>Alan Johnson</h2>
      <div class="phone">1234567890</div>
      <div class="email"><a href="mailto:alan@test.com">alan@test.com</a></div>
      <div class="since">User since Mar 25, 2011</div>
    </div>
    <div class="person">
      <h2>Allison House</h2>
      <div class="phone">0987654321</div>
      <div class="email"><a href="mailto:allison@test.com">allison@test.com</a></div>
      <div class="since">User since Jan 13, 2011</div>
    </div>
  </body>
</html>
```


5.2、jade结合handlebars一起使用

例子：


```
!!!
html
	head
		meta(charset="utf-8")
		title jade and handlebars example
		script(src="./handlebars.js")
	body
		h1 jade and handlebars example
		#list

		script#people-template(type="text/x-handlebars-template")
			{{#people}}
			.person
				h2 {{first_name}} {{last_name}}
				.phone {{phone}}
				.email
					a(href="mailto:{{email}}") {{email}}
				.since
					User since {{member_since}}
			{{/people}}

		script
			var data = { people: [ { first_name: "Alan", last_name: "Johnson", phone: "1234567890", email: "alan@test.com", member_since: "Mar 25, 2011" },{ first_name: "Allison", last_name: "House", phone: "0987654321", email: "allison@test.com", member_since: "Jan 13, 2011" }]};
			var tmpPeople = document.getElementById("people-template").innerHTML;
			var list = document.getElementById("list");
			var template = Handlebars.compile(tmpPeople);
			list.innerHTML = template(data);```

```

渲染结果：

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>jade and handlebars example</title>
    <script src="./handlebars.js"></script>
  </head>
  <body>
    <h1>jade and handlebars example</h1>
    <div id="list"></div>
    <script id="people-template" type="text/x-handlebars-template">{{#people}}
      <div class="person">
        <h2>{{first_name}} {{last_name}}</h2>
        <div class="phone">{{phone}}</div>
        <div class="email"><a href="mailto:{{email}}">{{email}}</a></div>
        <div class="since">
          <User>since {{member_since}}</User>
        </div>
      </div>{{/people}}
    </script>
    <script>
      var data = { people: [ { first_name: "Alan", last_name: "Johnson", phone: "1234567890", email: "alan@test.com", member_since: "Mar 25, 2011" },{ first_name: "Allison", last_name: "House", phone: "0987654321", email: "allison@test.com", member_since: "Jan 13, 2011" }]};
      var tmpPeople = document.getElementById("people-template").innerHTML;
      var list = document.getElementById("list");
      var template = Handlebars.compile(tmpPeople);
      list.innerHTML = template(data);
    </script>
  </body>
</html>
```

备注：handlebars渲染复杂的结构时，可能会用到拼接字符串。这里有点违背模板引擎原理。

## 安装
首先要安装node环境
安装jade插件方法如下：

```
npm install jade
```

生成html文件

```
jade -P -w ./index.jade
```



