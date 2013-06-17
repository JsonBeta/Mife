module.exports = function ( grunt ) {
	
	//初始化GRUNT任务
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		//js语法检查任务
		jshint: {
			files: ["Gruntfile.js", "js/xm.base.test.js"]
		},

		//编译 LESS 文件
		less: {
			compile:{
				//参数选项
				options: {
					compress: false,//去空格注释
					yuicompress: true//yui压缩规则
				},
				files:{
					"dist/less.test.css": "dist/less.test.less"
				}
			}
		},

		//合并文件任务
		concat: {
			js: {
				src: ["js/xm.base.test.js", "js/xm.cart.js", "js/xm.hd.js"],
				dest: "dist/script.js"
			},
			css: {
				src: ["css/xm.base.css", "css/ui.common.css", "css/about.css"],
				dest: "dist/style.css"
			}
		},

		//css文件压缩
		cssmin: {
			combine: {

				//参数选项
				options: {
					banner: "/* custom banner */",//顶部注释
					report: "gzip"//打印压缩报告
				},
				files: {
					"dist/style.min.css": ["<%= concat.css.dest %>"]
				}
			}
		},

		//JS文件压缩
		uglify: {
			dist: {
				src: ["<%= concat.js.dest %>"],
				dest: "dist/script.min.js"
			}
		},

		//单元测试
		nodeunit: {
			all: ['jstest/xm.cart.js']
		},

		//watch任务
		watch: {
			files: "<%= jshint.files %>",
			tasks: "jshint"
		},

		//yui 生成文档
		yuidoc: {
			//pkg: grunt.file.readJSON('package.json'),
			compile: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				version: '<%= pkg.version %>',
				url: '<%= pkg.homepage %>',
				options: {
					paths: 'jstest/',
					outdir: 'dist/docs/'
				}
			}
		}

	});

	//加载PACKAGE.JSON文件中想用的插件
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-less" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-contrib-cssmin" );
	grunt.loadNpmTasks( "grunt-contrib-yuidoc" );
	grunt.loadNpmTasks( "grunt-contrib-nodeunit" );

	//注册一个任务，第二参数可以是数组或者字符串
	//默认会执行default任务
	grunt.registerTask("default",["less", "jshint", "concat", "uglify", "cssmin", "nodeunit:all", "yuidoc"]);
};