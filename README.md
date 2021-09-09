一、准备
	1）、建议使用uniapp官网推荐的编译器 
		下载地址：https://www.dcloud.io/hbuilderx.html

​	2）、当前项目使用了scss/sass，需要下载相应插件
​		工具——插件安装——安装新插件——前往插件市场安装——搜索scss（使用HBuilderX）导入插件

​    3）、需要配置小程序IDE安装路径
​		工具——设置——运行配置——小程序运行配置——微信开发者工具路径
​		工具——设置——运行配置——小程序运行配置——支付宝开发者工具路径

​	4）、微信开发者工具设置
​		微信开发者工具——设置——安全设置——安全——开启服务端口

​	5）、测试账号
​		dev环境：ydbcs01		ydbcs01		ydbcs
​		devol环境：ydbcs01  	 ydbcs01  	 ydbcs
​		ecs环境：ydbb01 	  ydbb01	  ydbb

	6）、环境配置
		dev环境："domain": "https://dev-gateway.iuctrip.com/destination-applet-service/",
				"merchantId": 10000184,
		devol环境："domain": "https://devol-gateway.iuctrip.com/destination-applet-service/",
				"merchantId": 10000157,
		ecs环境："domain": "https://d-applet.iuctrip.com",
				"merchantId": 406,
				
	7)、灰度配置
		Api --> request.js --> 搜 gray-version

二、项目运行
​	1）、项目运行
​		微信：HBuilderX——运行——运行到小程序模拟器——微信开发者工具 (若打开失败、建议先打开微信开发者工具，再走以下流程)
		支付宝：HBuilderX——运行——运行到小程序模拟器   根据终端提示打开对应项目（注意检查是否存在ext.json文件，及文件内容是否正确）

三、项目发版部署 （注意检查是否存在ext.json文件，及文件内容是否正确）
	1)、 发现——小程序 微信	【unpackage/dist/build/mp-weixin】
	     发现——小程序 支付宝	【unpackage/dist/build/mp-alipay】