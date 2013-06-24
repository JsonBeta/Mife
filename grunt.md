# Grunt Js
Grunt被称作**前端的瑞士军刀**。我可以很方便的使用它来完成对LESS实时编译，jshint对JS文件的检测，以及js和css文件的合并，压缩。

官网地址： <http://gruntjs.com/>

## 安装
Grunt 和 Gruntplugins(grunt 插件) 都是通过npm来管理和安装，npm是一个node.js<http://nodejs.org>的包管理工具。

Grunt 0.4.x 需要安装 node.js ，并且版本 >= 0.8.0。



**1、**如果你在之前安装过全局的 Grunt，那么先删除它。

	npm uninstall -g grunt  

**2、**在开始使用 Grunt 之前，你必须先安装一个全局的Grunt命令行接口（CLI）。如果是在OSX、Linux系统中，你可能需要sudo来运行；如果是在windows上，可能需要管理员权限。
	
	npm install -g grunt-cli  
	
上面这条命令会把 grunt 加入你的系统搜索路径中，所以在任何目录下都可以使用此命令。

这样可以允许在同一台机器上运行多个grunt实例。

## 如何使用Grunt

每个grunt项目都需要增加两个文件： **package.json** 和 **GruntFile**。

package.json是npm用来储存发布这个项目所需要的元数据。你需要把 grunt 和相关的 grunt插件都列在这个文件中。

GruntFile这个文件命名是 GruntFile.js 或者 GruntFile.coffee, 是用来配置或者定义grunt任务并且加载grunt插件用的。

#### package.json 
在 package.json 文件所在目录下运行 **npm install** 命令可以自动安装此文件中所列出的所有依赖包的正确版本。
	
	{  
		"name": "my-project-name",  
		"version": "0.1.0",  
		"devDependencies": {  
			"grunt": "~0.4.1",  
			"grunt-contrib-jshint": "~0.1.1",  
			"grunt-contrib-nodeunit": "~0.1.2"  
		}  
	}  
	
### GruntFile 
GruntFile.js 或者 GruntFile.coffee 都是合法的文件.

GruntFile 文件由如下几部分组成：

* wrapper function（包装函数）
* 项目和任务配置
* 加载grunt插件和任务
* 定制任务

下面是一个 GruntFile 的例子，

grunt-contrib-uglify是一个 grunt 插件，用来压缩源代码，并且可以生成一个banner注释。
	
	module.exports = function(grunt) {  
	
		// 项目配置
		grunt.initConfig({  
			pkg: grunt.file.readJSON('package.json'),  
			uglify: {  
				options: {  
					banner: '/*我是注释 */\n'  
				},  
      				build: {  
        				src: 'src/<%= pkg.name %>.js',  
        				dest: 'build/<%= pkg.name %>.min.js'  
      				}  
    			}  
  		});  
  
		// 加载 "uglify" 插件.  
		grunt.loadNpmTasks('grunt-contrib-uglify');  
  
		// 注册默认任务
		grunt.registerTask('default', ['uglify']);  
  
	};  

现在你可以看到整个 GruntFile文件了， 下面我们看看它的几个组成部分。

##### wrapper function（包装函数）

每一个GruntFile 文件都会使用下面这个基本的格式， 所有的 Grunt 代码都会在这个函数内。

	module.exports = function(grunt) {  
	
		// Do grunt-related things in here  
  		
	};  
	
##### 项目和任务的配置
大部分的 Grunt 任务都依赖于通过 grunt.initConfig 方法定义的配置。

在这个例子中， grunt.file.readJSON('package.json') 把存储在 package.json 文件中的元数据导入到 GruntFile 中。因为<% %>字符串模板可以在任何地方引用，所以像文件路径和文件列表这种配置数据可以通过这种方式来避免到处复制粘贴。

和大多数的任务一样， grunt-contrib-uglify插件的 uglify 任务需要一个同名的配置。这里定义了一个 banner 配置；同时也定义了一个 简单的uglify目标叫 build，把一个源文件压缩成另一个目标文件。

	// 项目配置
	grunt.initConfig({  
		pkg: grunt.file.readJSON('package.json'),  
		uglify: {  
			options: {  
				banner: '/*我是注释 */\n'  
			},  
			build: {  
				src: 'src/<%= pkg.name %>.js',  
				dest: 'build/<%= pkg.name %>.min.js'  
			}  
		}  
	});  
	
##### 加载grunt插件和任务
只要一个插件在 package.json 中定义了依赖关系，并且已经通过 npm install 安装好了，就可以在 GruntFile 文件中通过下面这个命令来启用。

	grunt.loadNpmTasks('grunt-contrib-uglify');  

##### 定制任务
你可以通过定义一个 default 任务来让grunt默认运行某些任务。下面这个例子中，运行 grunt 命令不指定任何任务的话，会默认运行 uglify 任务。运行 grunt 和 运行 grunt uglify 或者 grunt default 在功能上是完全等价的。你可以在数组中定义任意数量的任务。

	grunt.registerTask('default', ['uglify']);  


## 	配置Grunt任务
任务配置都定义在GruntFile 文件中的 grunt.initConfig 方法中。这个配置一般都是一些以任务名命名的属性，但是也可以包含任意其他的数据。如果一个属性没有被任何任务用到，就会被忽略。

因为这是 JavaScript 文件，任何合法的 JS 代码都可以写，而不是仅仅局限于 JSON。如果有必要，你甚至可以用代码动态生成配置。

	grunt.initConfig({
		concat: {
			 // concat task configuration goes here.
		 },
		 uglify: {
			 // uglify task configuration goes here.
		 },
		// Arbitrary non-task-specific properties.
		my_property: 'whatever',
		my_src_files: ['foo/*.js', 'bar/*.js'],
	});
	
##### 任务配置和任务目标
当一个任务运行时，Grunt 会自动寻找配置中的同名属性。可以通过自定义的“targets”属性来配置多个任务。在下面这个例子中，concat 任务有 foo 和 bar 两个目标，而 uglify 只有一个 bar 目标。

	grunt.initConfig({
		concat: {
			foo: {
      				// concat task "foo" target options and files go here.
			},
			bar: {
				 // concat task "bar" target options and files go here.
			 },
	 	},
		uglify: {
			bar: {
				// uglify task "bar" target options and files go here.
			 },
		 },
	});

指定任务名和目标名，比如 grunt concat:foo 或者 grunt concat:bar 只运行目标名指定的配置；如果直接运行 grunt concat 则会顺序执行所有的目标。

##### 默认配置
在一个任务配置里，可以通过 options 属性来覆盖默认配置。任务中的每一个目标也都可以有一个与之对应的 options 属性。目标中的options配置会覆盖任务中的options。

options属性是可选的，如果没有必要可以省略。

	grunt.initConfig({
		concat: {
			options: {
				// Task-level options may go here, overriding task defaults.
			},
			foo: {
				options: {
					// "foo" target options may go here, overriding task-level options.
				},
			},
			bar: {
				// No options specified; this target will use task-level options.
			},
		},
	});
	
##### 文件
因为大部分的任务都是执行文件操作，所以Grunt对所要操作的文件有很强的抽象。有几种方式可以实现源文件到目标文件的映射，包括：简洁格式、对象格式、数组格式。

所有的文件的格式都支持”src“和”dest“，但是”简洁“和”数组“两种格式还支持如下一些附加属性：

* filter：过滤器，任意一个合法的 fs.stats 方法名<http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats>，或者任何一个接受 src 作为文件路径并返回 True 或者 False的方法都可以。
* nonull：非空，如果没有任何一个匹配被找到，那么就返回一个包含这个模式本身的列表。否则，返回一个空列表。这个选项可以结合grunt的 --verbose 参数来帮助调试文件路径问题。
* dot：可以让模式匹配一个以句点开头的文件名，即使模式没有显式地指定一个句点。
* matchBase：只匹配base路径，如果设置了这个参数，那么不会匹配子目录。比如 a?b 会匹配 /xyz/123/acb 但是不会匹配 /xyz/acb/123。
* expand：拓展，执行一个动态的 源文件到目标文件的映射，其他所有的参数都会被当做配置参数传给底层库.

######  简洁格式
这种模式一般用在只读任务中，只需要一个 src 属性而不需要 dest属性。简洁格式 也支持附加属性。

	grunt.initConfig({
		jshint: {
			foo: {
      				src: ['src/aa.js', 'src/aaa.js']
    			},
		},
		concat: {
			bar: {
				src: ['src/bb.js', 'src/bbb.js'],
				dest: 'dest/b.js',
			},
		},
	});

###### 文件对象格式
这种格式可以在一个目标中配置多个 源文件到目标文件的映射。属性名是目标文件，属性值是源文件。对每个目标文件可以定义任意数量的源文件，但是不支持附加属性

	grunt.initConfig({
		concat: {
			foo: {
				files: {
					'dest/a.js': ['src/aa.js', 'src/aaa.js'],
					'dest/a1.js': ['src/aa1.js', 'src/aaa1.js'],
				},
			},
			bar: {
				files: {
					'dest/b.js': ['src/bb.js', 'src/bbb.js'],
					'dest/b1.js': ['src/bb1.js', 'src/bbb1.js'],
				},
		 	},
		},
	});

###### 文件数组格式

这种格式也可以在一个目标中配置多个 源文件到目标文件的映射。而且可以使用附加属性。

	grunt.initConfig({
		 concat: {
			foo: {
				files: [
					{src: ['src/aa.js', 'src/aaa.js'], dest: 'dest/a.js'},
					{src: ['src/aa1.js', 'src/aaa1.js'], dest: 'dest/a1.js'},
				],
			},
			bar: {
				files: [
					{src: ['src/bb.js', 'src/bbb.js'], dest: 'dest/b/', nonull: true},
					{src: ['src/bb1.js', 'src/bbb1.js'], dest: 'dest/b1/', filter: 'isFile'},
				],
			},
		},
	});
	
####  globbing 模式
有时候很难把所有的源文件都一一列举出来，所以 Grunt 支持 通过 node-glob<https://github.com/isaacs/node-glob> 和 minimatch<https://github.com/isaacs/minimatch>来进行文件名描述（又称 globbing）。

在一个文件路径中：

* "*" 匹配任意字符，除了 "/"
* "?" 匹配按个字符，除了"/"
* "**" 匹配任意字符，包括"/"
* "{}" 一个以 逗号分隔的 “或”逻辑
* "!" 在模式的开头表示否定

foo/\*.js 会匹配 foo/ 目录下以 .js 结尾的任何文件（但是不包括子目录），而 foo/*\*/\*.js 会匹配foo以及其子目录下的任何以 .js 结尾的文件。

并且，为了简化复杂的globbing 模式，Grunt 允许在一个列表中写多个 globbing 模式。这些模式会按顺序被处理。

关于 glob 模式语法，参见 node-glob<https://github.com/isaacs/node-glob> 和 minimatch<https://github.com/isaacs/minimatch>

#### 动态创建文件
如果你想处理大量的单个文件，可以用一些附加属性来帮助动态创建文件。这些属性在“简洁格式“和”文件数组格式“下都可用。

* expand：设为 true 来启用下面这些属性。
* cwd：所有的 src 都相对于此路径（但是不包含）。
* src：需要匹配的模式，相对于cwd。
* dest：目标文件。
* ext：在dest中的所有文件后缀都替换掉。
* flatten：在dest中的所有路径的片段都替换掉。
* rename：每当匹配到一个src时，都会调用此方法（在ext和flatten执行之后）。dest和src属性会被当参数传入，这个函数必须返回一个新的dest值。如果相同的dest被返回超过一次，每一个用它的src都会被添加到一个源数组。

在下面这个例子中，名为 minify 的任务static_mapping和 dynamic_mapping 执行的完全相同的任务。

	grunt.initConfig({
		minify: {
			static_mappings: {
				files: [
					{src: 'lib/a.js', dest: 'build/a.min.js'},
					{src: 'lib/b.js', dest: 'build/b.min.js'},
					{src: 'lib/subdir/c.js', dest: 'build/subdir/c.min.js'},
					{src: 'lib/subdir/d.js', dest: 'build/subdir/d.min.js'},
				],
			},
			dynamic_mappings: {
				files: [
						{
          					expand: true,     
          					cwd: 'lib/',      
          					src: ['**/*.js'], 
          					dest: 'build/',    
          					ext: '.min.js',         
          				 },
      				],
    			},
		},
	});
	
任何静态和动态的方式都可以结合使用。