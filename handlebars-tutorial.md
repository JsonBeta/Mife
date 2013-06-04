#JavaScript 语义模板库 handlebars 教程

##前言

Web 应用开发正在处于一个快速发展的时期，随着 HTML5 规范的落实和普及，相信会有越来越多的优秀的 web 应用呈现出来。JavaScript 是 web 应用开发中是非常重要的语言，该语言有很多流行的库供大家使用。本期给大家介绍语义模板库 Handlebars 的使用方法。

本文示例代码已经全部上传 GitHub：[https://github.com/DaweiCheng/handlebarstutor](https://github.com/DaweiCheng/handlebarstutor) 也欢迎大家积极贡献更多示例代码。

##目录

1. Handlebars 介绍
2. 安装和使用
3. 使用 expressions
4. 使用 helpers
5. partials

##内容
###1. Handlbars 介绍
Handlebars 是 JavaScript 一个语义模板库，通过对 view 和 data 的分离来快速构建 Web 模板。它采用 "Logic-less template"（无逻辑模版）的思路，在加载时被预编译，而不是到了客户端执行到代码时再去编译，这样可以保证模板加载和运行的速度。Handlebars 兼容 Mustache，你可以在 Handlebars 中导入 Mustache 模板。

###2. 安装和使用
Handlebars 的安装非常简单，你只需要从 Github [下载最新版本](https://github.com/wycats/handlebars.js/downloads)，你也可访问下面网址获取最新信息：[http://handlebarsjs.com/](http://handlebarsjs.com/)。 目前 handlebars.js 已经被许多项目广泛使用了，handlebars 是一个纯 JS 库，因此你可以像使用其他 JS 脚本一样用 script 标签来包含 handlebars.js：

	<script type="text/javascript" src="script/handlebars-1.0.0.beta.6.js"></script>

###3. 使用 expressions
Handlebars expressions 是 handlebars 模板中最基本的单元，使用方法是加两个花括号码 `{{value}}`， handlebars 模板会自动匹配相应的数值，对象甚至是函数。

**基本 expressions 使用方法：**

在 HTML 网页中，添加需要使用模板的地方（目前 Handlebars 仅支持 id 操作）：

	<script id="people-template" type="text/x-handlebars-template">
	  {{#people}}
	    <div class="person">
	      <h2>{{first_name}} {{last_name}}</h2>
	      <div class="phone">{{phone}}</div>
	      <div class="email"><a href="mailto:{{email}}">{{email}}</a></div>
	      <div class="since">User since {{member_since}}</div>
	    </div>
	  {{/people}}
	</script>

在 JavaScript 文件中添加预编译函数和数据：

	$(document).ready(function() {
	  
	  // compile our template
	  var template = Handlebars.compile($("#people-template").html());
	  
	  var data = {
	    people: [
	      { first_name: "Alan", last_name: "Johnson", phone: "1234567890", email: "alan@test.com", member_since: "Mar 25, 2011" },
	      { first_name: "Allison", last_name: "House", phone: "0987654321", email: "allison@test.com", member_since: "Jan 13, 2011" },
	      { first_name: "Nick", last_name: "Pettit", phone: "9836592272", email: "nick@test.com", member_since: "Apr 9, 2009" },
	      { first_name: "Jim", last_name: "Hoskins", phone: "7284927150", email: "jim@test.com", member_since: "May 21, 2010" },
	      { first_name: "Ryan", last_name: "Carson", phone: "8263729224", email: "ryan@test.com", member_since: "Nov 1, 2008" }
	    ]
	  };
	  
	  $('#list').html(template(data));
	});

完整的 demo 代码：

	<!DOCTYPE html>
	<html>
	  <head>
	    <title>Handlebars Expressions Example</title>
	  </head>
	  <body>
	    <h1>Handlebars Expressions Example!</h1>
		<!-- this is a list which will rendered by handlebars template. --> 
	    <div id="list">
	    </div>
	    
	    <script type="text/javascript" src="script/jquery.js"></script>
	    <script type="text/javascript" src="script/handlebars-1.0.0.beta.6.js"></script>
	    
	    <script id="people-template" type="text/x-handlebars-template">
	      {{#people}}
	        <div class="person">
	          <h2>{{first_name}} {{last_name}}</h2>
	          <div class="phone">{{phone}}</div>
	          <div class="email"><a href="mailto:{{email}}">{{email}}</a></div>
	          <div class="since">User since {{member_since}}</div>
	        </div>
	      {{/people}}
	    </script>
	    
	    <script type="text/javascript">
	      $(document).ready(function() {
	        
	        // compile our template
	        var template = Handlebars.compile($("#people-template").html());
	        
	        var data = {
	          people: [
	            { first_name: "Alan", last_name: "Johnson", phone: "1234567890", email: "alan@test.com", member_since: "Mar 25, 2011" },
	            { first_name: "Allison", last_name: "House", phone: "0987654321", email: "allison@test.com", member_since: "Jan 13, 2011" },
	            { first_name: "Nick", last_name: "Pettit", phone: "9836592272", email: "nick@test.com", member_since: "Apr 9, 2009" },
	            { first_name: "Jim", last_name: "Hoskins", phone: "7284927150", email: "jim@test.com", member_since: "May 21, 2010" },
	            { first_name: "Ryan", last_name: "Carson", phone: "8263729224", email: "ryan@test.com", member_since: "Nov 1, 2008" }
	          ]
	        };
	        
	        $('#list').html(template(data));
	      });
	    </script>
	  </body>
	</html>

**Block expressions 使用方法**

使用 Block expressions 可以改变 js 的上下文来调用/渲染模板。

例如，我们使用 helper 创建一个 HTML list

	<script id="people-template" type="text/x-handlebars-template">
	    {{#list people}}
	        {{first_name}} {{last_name}}  {{phone}} {{email}} {{member_since}}
	    {{/list}}
	</script>

JavaScript 文件中数据如下：

	var template = Handlebars.compile($("#people-template").html());
	Handlebars.registerHelper('list', function (items, options) {
		var out = "<div>";
		for (var i = 0, l = items.length; i < l; i++) {
			out = out + "<div>" + options.fn(items[i]) + "</div>";
		}
		return out + "</div>";
	});

添加一个名叫 list 的 helper，`funcitons(items, options)` 传入两个参数， data 中的 people 作为第一个参数传入，options 作为第二个参数传入，options 附带属性 fn，使用 fn 可以调用该模块的内容。

完整的 demo 代码：

	<!DOCTYPE html>
	<html>
	  <head>
	    <title>Handlebars Block Expressions Example</title>
	  </head>
	  <body>
	    <h1>Handlebars Expressions Example!</h1>
	<!--this is a list which will rendered by handlebars template.    --> 
	    <div id="list">
	    </div>
	    
	    <script type="text/javascript" src="script/jquery.js"></script>
	    <script type="text/javascript" src="script/handlebars-1.0.0.beta.6.js"></script>
	    
	    <script id="people-template" type="text/x-handlebars-template">
	        {{#list people}}
	            {{first_name}} {{last_name}}  {{phone}} {{email}} {{member_since}}
	        {{/list}}
	    </script>
	    
	    <script type="text/javascript">
	      $(document).ready(function() {
	        
	        // compile our template
	        var template = Handlebars.compile($("#people-template").html());
	
	        Handlebars.registerHelper('list', function (items, options) {
	            var out = "<div>";
	
	            for (var i = 0, l = items.length; i < l; i++) {
	                out = out + "<div>" + options.fn(items[i]) + "</div>";
	            }
	
	            return out + "</div>";
	        });
	
	        var data = {
	          people: [
	            { first_name: "Alan", last_name: "Johnson", phone: "1234567890", email: "alan@test.com", member_since: "Mar 25, 2011" },
	            { first_name: "Allison", last_name: "House", phone: "0987654321", email: "allison@test.com", member_since: "Jan 13, 2011" },
	            { first_name: "Nick", last_name: "Pettit", phone: "9836592272", email: "nick@test.com", member_since: "Apr 9, 2009" },
	            { first_name: "Jim", last_name: "Hoskins", phone: "7284927150", email: "jim@test.com", member_since: "May 21, 2010" },
	            { first_name: "Ryan", last_name: "Carson", phone: "8263729224", email: "ryan@test.com", member_since: "Nov 1, 2008" }
	          ]
	        };
	        
	        $('#list').html(template(data));
	      });
	    </script>
	  </body>
	</html>

**With Expressions 使用方法**

一般情况下，Handlebars 模板会在编译的阶段的时候进行 context 传递和赋值。使用 with 的方法，我们可以将 context 转移到数据的一个 section 里面（如果你的数据包含 section）。这个方法在操作复杂的 template 时候非常有用。直接看完整的 demo 代码：

	<!DOCTYPE html>
	<html>
	  <head>
	    <title>Handlebars Block "with" Expressions Example</title>
	  </head>
	  <body>
	    <h1>Handlebars Expressions Example!</h1>
	<!--this is a list which will rendered by handlebars template.    --> 
	    <div id="list">
	    </div>
	    
	    <script type="text/javascript" src="script/jquery.js"></script>
	    <script type="text/javascript" src="script/handlebars-1.0.0.beta.6.js"></script>
	    
	    <script id="people-template" type="text/x-handlebars-template">
	      {{#people}}
	        <div class="person">
	          <p>{{title}}
	          {{#with author}}
	              By {{first_name}} {{last_name}}</p>
	          {{/with}}
	        </div>
	      {{/people}}
	    </script>
	    
	    <script type="text/javascript">
	      $(document).ready(function() {
	        
	        // compile our template
	        var template = Handlebars.compile($("#people-template").html());
	
	        var data = {
	          people: [
	            { title: "first people: ", author: {first_name: "Alan", last_name: "Johnson"},  },
	            { title: "second people: ", author: {first_name: "Jack", last_name: "een"},  },
	            { title: "third people: ", author: {first_name: "Tom", last_name: "Peter"},  },
	            { title: "fourth people: ", author: {first_name: "Asn", last_name: "Smith"},  },
	          ]
	        };
	        
	        $('#list').html(template(data));
	      });
	    </script>
	  </body>
	</html>

###4. 使用 Helpers

使用 Helpers 用户可以操作 handlebars 模板中的数据，添加相应的逻辑等等。

**用户自定义 Helpers**

如本例中，添加 formatPhoneNumber helpers，来对电话号码进行格式统一化。

Template 中代码如下：

	{{#people}}
	<div class="person">
	  <h2>{{first_name}} {{last_name}}</h2>
	  <div class="phone">{{formatPhoneNumber phone}}</div>
	  <div class="email"><a href="mailto:{{email}}">{{email}}</a></div>
	  <div class="since">User since {{member_since}}</div>
	</div>
	{{/people}}

JavaScript 中，需要使用 `Handlebars.registerHelper` 来注册 helpers，代码：

	// add the formatPhoneNumber helper
	Handlebars.registerHelper("formatPhoneNumber", function(phoneNumber) {
	  phoneNumber = phoneNumber.toString();
	  return "(" + phoneNumber.substr(0,3) + ") " + phoneNumber.substr(3,3) + "-" + phoneNumber.substr(6,4);
	});

完整 demo 代码：

	<!DOCTYPE html>
	<html>
	  <head>
	    <title>Handlebars Helpers Example</title>
	  </head>
	  <body>
	    <h1>Handlebars Helpers Example!</h1>
	    
	    <div id="list">
	    </div>
	    
	    <script type="text/javascript" src="script/jquery.js"></script>
	    <script type="text/javascript" src="script/handlebars-1.0.0.beta.6.js"></script>
	    
	    <script id="people-template" type="text/x-handlebars-template">
	      {{#people}}
	      <div class="person">
	        <h2>{{first_name}} {{last_name}}</h2>
	        <div class="phone">{{formatPhoneNumber phone}}</div>
	        <div class="email"><a href="mailto:{{email}}">{{email}}</a></div>
	        <div class="since">User since {{member_since}}</div>
	      </div>
	      {{/people}}
	    </script>
	    
	    <script type="text/javascript">
	      $(document).ready(function() {
	        
	        // compile our template
	        var template = Handlebars.compile($("#people-template").html());
	        
	        // add the formatPhoneNumber helper
	        Handlebars.registerHelper("formatPhoneNumber", function(phoneNumber) {
	          phoneNumber = phoneNumber.toString();
	          return "(" + phoneNumber.substr(0,3) + ") " + phoneNumber.substr(3,3) + "-" + phoneNumber.substr(6,4);
	        });
	        
	        var data = {
	          people: [
	            { first_name: "Alan", last_name: "Johnson", phone: "1234567890", email: "alan@test.com", member_since: "Mar 25, 2011" },
	            { first_name: "Allison", last_name: "House", phone: "0987654321", email: "allison@test.com", member_since: "Jan 13, 2011" },
	            { first_name: "Nick", last_name: "Pettit", phone: "9836592272", email: "nick@test.com", member_since: "Apr 9, 2009" },
	            { first_name: "Jim", last_name: "Hoskins", phone: "7284927150", email: "jim@test.com", member_since: "May 21, 2010" },
	            { first_name: "Ryan", last_name: "Carson", phone: "8263729224", email: "ryan@test.com", member_since: "Nov 1, 2008" }
	          ]
	        };
	        
	        $('#list').html(template(data));
	      });
	    </script>
	  </body>
	</html>

**If helpers 用法**

if helpers 使用方法很简单，只需要在 template 中添加 `{{if}}`， 如果有 else，也一样，添加 `{{else}}`。Template 中代码如下：

	{{#people}}
	  <div class="person">
	    <p>{{title}}
	    {{#if author}}
	       {{author.first_name}} {{author.last_name}}</p>
	    {{else}}
	       Unknown Author</p>
	    {{/if}}
	  </div>
	{{/people}}

**Each helpers 用法**

使用 each 方法，可以在 template 中添加 `{{this}}`， 用 each 来遍历在 data 中是所有数据。Template 中代码如下：

	{{#each people}}
	  <div class="person">
	      {{this}}
	  </div>
	{{/each}}

###5. 使用 partials

当你想要复用模板的一部分，或者将长模板分割成为多个模板方便维护时，partials 就派上用场了。直接看代码比较直接，母模板定义如下：其中用 `> partials` 来包含相应的子模板。

	<script id="people-template" type="text/x-handlebars-template">
	  {{#each people}}
	    {{> person}}
	  {{/each}}
	</script>

子模板代码：

	<script id="person-partial" type="text/x-handlebars-template">
	  <div class="person">
	    <h2>{{first_name}} {{last_name}}</h2>
	    <div class="phone">{{phone}}</div>
	    <div class="email"><a href="mailto:{{email}}">{{email}}</a></div>
	    <div class="since">User since {{member_since}}</div>
	  </div>
	</script>

JavaScript 中需要用 `Handlebars.registerPartial` 对子模板进行注册，代码如下：

	// compile our template
	var template = Handlebars.compile($("#people-template").html());
	
	// add the person partial
	Handlebars.registerPartial("person", $("#person-partial").html());
	
	var data = {
	  people: [
	    { first_name: "Alan", last_name: "Johnson", phone: "1234567890", email: "alan@test.com", member_since: "Mar 25, 2011" },
	    { first_name: "Allison", last_name: "House", phone: "0987654321", email: "allison@test.com", member_since: "Jan 13, 2011" },
	    { first_name: "Nick", last_name: "Pettit", phone: "9836592272", email: "nick@test.com", member_since: "Apr 9, 2009" },
	    { first_name: "Jim", last_name: "Hoskins", phone: "7284927150", email: "jim@test.com", member_since: "May 21, 2010" },
	    { first_name: "Ryan", last_name: "Carson", phone: "8263729224", email: "ryan@test.com", member_since: "Nov 1, 2008" }
	  ]
	};
	
	$('#list').html(template(data));

所有 demo 代码下载地址：[https://github.com/DaweiCheng/handlebarstutor](https://github.com/DaweiCheng/handlebarstutor)

([via](http://software.intel.com/zh-cn/articles/html5handlebars))

##相关资源

- 官方网站 [http://handlebarsjs.com/](http://handlebarsjs.com/)
- GitHub [https://github.com/wycats/handlebars.js](https://github.com/wycats/handlebars.js)


