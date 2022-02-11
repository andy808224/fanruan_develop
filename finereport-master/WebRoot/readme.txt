一 项目部署步骤：
1 编译项目，生成classes文件
2 将编译的classes文件下的hailian文件夹（com/fr下面）复制到
  FineReport安装目录（\WebReport\WEB-INF\classes\com\fr）下面，我的在
  F:\FineReport8.0\FineReport_8.0\WebReport\WEB-INF\classes\com\fr
3 配置自定义的servlet文件
	将项目中自配置的servlet路由（web.xml里面）复制到FineReport安装目录（\WebReport\WEB-INF）下，
	我的在F:\FineReport8.0\FineReport_8.0\WebReport\WEB-INF的web.xml里面 注意xml的字符编码编码格式
	说明：web.xml中注释在发布服务时需要释放注释
4 将自开发的页面（项目WebRoot/hailian文件夹）复制到到FineReport安装目录（\WebReport）下，我的在
   F:\FineReport8.0\FineReport_8.0\WebReport

5 启动FineReport即可


二 辅助决策登陆改造：
 1 地址：http://localhost:8075/WebReport/hailian/login.html
 2 登陆页配置：
	2.1 打开决策系统http://localhost:8075/WebReport/ReportServer?op=fs，登陆
	2.2 系统管理--外观配置--登陆方式 选择“设置登录网页”，将地址改为改造后登陆页面
	2.3 退出，配置成功

三 单点登录改造以及将辅助决策页面集成到第三方
 1 地址
	http://localhost:8075/WebReport/portalLoginServlet?Token=11111&Target=1111&__redirect__=true
	参数说明：
	Token：令牌
	Target：目标字符串
	__redirect__：固定参数 true表示认证成功之后直接进入系统首页
	
 2 返回信息说明
  2.1 如果单点登录成功，直接进行决策管理首页
  2.2 如果失败，返回页面有个json格式数据，格式{"msg":"提示信息","fail":"boolean类型，true表示失败"}
  
  
四 RTX集成
 1 引用方式
  1.1 作用机理
     设计模板时可以给控件、工具栏按钮、整个报表添加JS事件，每个事件对应一个function。
     当报表转为html页面时会将这些function加到html的头部head。当事件被触发时如点击按钮时，或者导出打印报表时，对应的function就会被执行。
  1.1 引入现成的js文件(如果使用RTX集成需引用\WebReport\hailian\js\hl_common.js)
      如果不是 所有模板统一引用而是只要某一个页面使用，可以直接进入1.2
      报表工程下所有模板统一引入外部js文件：服务器>服务器配置>引用JavaScript
      相对路径引用js：相对于报表工程目录如WebReport，如WebReport\js下有引用的js文件test.js，则相对路径为js/test.js；
      绝对路径引用js：如D:\tomcat\webapps\WebReport\WEB-INF\scripts\script.js。   
  1.2 事件编辑界面
    找到当前事件要添加的控件，按钮控件设置>事件编辑>添加点击事件便可看到事件编辑界面了
    在编辑页面需要进行的操作：
    1.2.1 如果1.1步骤没有引入hailian/js/hl_common.js，那在上方“引用JavaScript”先引入hl_common.js（注意路径问题），
    否则直接进入下一步
    1.2.2 在下方“JavaScript脚本”中加入自定义方法，方法名称固定：var result=initHlRTXReportMethod(taskImpId);
        参数 fr_task_id 引用方式 服务器--服务器配置--填报页面设置--事件-右侧“参数” --参数填写 fr_task_id 值填写 $fr_task_id 类型选择f(x)
    1.2.3 返回结果
          成功：发送RTX信息
          失败 返回错误提示信息result 格式：{fail: true, msg: "错误信息 "}
   
  

五 修改密码
 	1 引用方式
   	引入js同上（\WebReport\hailian\js\hl_common.js）
    2 事件编辑界面 
        绑定的方法名为initHlChangePassword();
        这个方法需要两个参数：
        oldpwdInputName-代表老密码输入框的控件名称
        newpwdInputName-代表新密码输入框的控件名称
    （具体名称位置：选中输入新密码的输入框--右侧选择控件“属性”--基本属性--控件名），将找到的控件名传入绑定方法即可。
    例如：var result=initHlChangePassword("textEditor11","textEditor0");textEditor11,textEditor0是我定义的输入框name
    3 响应
          修改成功，跳转决策系统首页
          修改失败返回错误提示信息result 格式：{fail: true, msg: "原密码错误 "}
 
六 注销
    1 引用方式
   	引入js同上（\WebReport\hailian\js\hl_common.js）
    2 事件编辑界面 
          绑定的方法名为var result=initHlLogout();无参数要求。
    3 响应
          成功：用户退出，跳转决策系统登陆页
           修改失败返回错误提示信息result 格式：{fail: true, msg: "错误信息 "}


七 导入信息
  强调：因为表设置外键关系，所以必须先导入机构信息，才可以导入人员信息。在生成机构与人员对应关系时，
  需要写入一个职位字段值，目前写死默认，导入员工的默认职务ID（变量DEFAULT_POST） 表名：FR_T_POST 在Constants类中。这个字段值
  必须在FR_T_POST表中存在，否则导入失败。
 需要切换数据库配置地址：Constants常量类里面
   方式一：js引用
   1 引用方式
   	引入js同上（\WebReport\hailian\js\hl_common.js）
    2 事件编辑界面 
          导入人员信息绑定的方法名为var result=importUserInfo(filePath);需要一个参数 filePath:文件路径。
          比如    importUserInfo(" D:\\test.xlsx")
           导入组织机构绑定的方法名为var result=importOrgInfo(filePath);需要一个参数 filePath:文件路径。
          比如    importOrgInfo(" D:\\test.xlsx")
    3 响应
          成功：导入数据库，并返还信息
          失败返回错误提示信息result 格式：{fail: true, msg: "错误信息 "}
   方式二：访问页面操作
   http://localhost:8075/WebReport/hailian/importInfo.html
   
   
 八 工作流（待办已办任务）
  
  1 对外访问地址：http://ip:port/Service/TaskWebService?wsdl
     说明：ip为本项目发布服务器IP
       port:可以在常量中通过变量WebService_Port设置，目前默认8888
       
  2 入参格式：{"flag":"1","page":1,"pageSize":10,"startTime":"2017-01-22","title":"流程","type":"1","uid":"47"}
  
  3 参数说明
  	uid：用户账号
	type：请求类型	1:待办事宜；2：已办事宜
	flag：是否查询明细	1：是；0：否（当为1时需返回具体的记录内容；当为0时只需返回查询结果的总条数）
	startTime：流程发起时间	返回流程发起时间在starttime至今之间的数据（为null时查询所有）
	title：流程标题	返回标题中带有title的数据（为null时查询所有）
	page：//第几页	根据page请求第几页的数据。
	pageSize：每页大小	每页请求的条数（例如每页10条）
	
  4 返回结果(JSON格式)
	  请求成功：
	  {
	    "count": 2,
	    "memo": "获取数据成功！",
	    "result": 1,
	    "moreUrl": "",
	    "viewEntries": [
	        {
	            "fromDept": "销售部",
	            "fromUser": "31",
	            "fromUserName": "zhangshan",
	            "sendTime": "2017-08-15 11:25:03",
	            "source": "1",
	            "startTime": "2017-08-15 11:24:51",
	            "subject": "添加流程2",
	            "tel": "",
	            "urgentLevel": "普通",
	            "url": "%2FrtxSecurityServlet%3FuserId%3D32%26sign%3Dd%25252FLWhfP96RBD5eWLLRoJezGZecZkrgZweFR0KQclwL0Jyw7jFIMnfu0H5XgH1P%25252BdFi3%25252Bs1btBjM5%25250D%25250Aq56U3lbHrS56%25252BvtTEMxkYsTOok2HWzE75kyyWTb2tg%25253D%25253D%26hl_url%3D%2FWebReport%2FReportServer%3Freportlet%3Ddoc%2FForm%2FCutpage%2FCutpage.cpt%40%40op%3Dwrite%40%40__cutpage__%3Dnull%40%40__processtaskid__%3D58%40%40__allprocesstaskid__%3D18"
	        }
	    ]
	}
	其中url使用前需要decode，格式utf-8


九
强调：其他注意项 
发布程序前需要修改基本配置com.fr.hailian.core.Constants文件中：
 1 辅助决策系统权限目前默认写成222（正式发布需要改，否则所有认证都会返回没有权限的提示）
 com.fr.hailian.core.Constants文件中的AUXILIARYROLE_ID
 2 数据库配置改成正式
 3 finereport.js
 FR.servletURL = '/WebReport/ReportServer'文件路径相应做修改如果没有WebReport则改为'/ReportServer'
 4 项目服务IP 端口切换
 Constants常量
    public static final String CTX_PATH = "/WebReport";//帆软项目根目录 如果没有则为""
	public static final String CTX_PORT = "8075";//帆软项目端口 
	
	

十 主题使用
 1 必须移除“天空主题”之后才可以使用
 2 将项目中以com.fr.solution.* 开头的包（4个，同时选中 ctrl+鼠标左键）export为jar包，名称必须为plugin-com.fr.solution.theme.sky-0.jar，将导出
 的jar放到FineReport安装目录下WebReport\WEB-INF\lib
 
 上述四个包（src下面）分别是：
com.fr.solution.theme.sky
com.fr.solution.theme.sky.files
com.fr.solution.theme.sky.files.fonts
com.fr.solution.theme.sky.files.image
 
 3 将项目中WEB-INF下面文件夹plugin-com.fr.solution.theme.sky复制到FineReport安装包
 WebReport\WEB-INF\plugins下面
 4 找到FineReport安装包WebReport\WEB-INF\plugins下面的pluginconfig.xml将
 <p><![CDATA[plugin-com.fr.solution.theme.sky]]></p> 复制到
 </installedPlugins>
</PluginConfigManager>前面
 5重启FineReport
 
 
 项目组织结构：
  	--src                                                 后台代码部分
	  	   --com.fr.hailian.action						  	对FineAPI的重写包
	  	   --com.fr.hailian.core							核心包，目前存有数据库操作服务
	  	   --com.fr.hailian.excel							操作excel工具包
	  	   --com.fr.hailian.filter							项目拦截器 ：全局拦截 发布wsdl
	  	   --com.fr.hailian.model							实体类
	  	   --com.fr.hailian.rtxWebService					RTX集成引用的webservice接口
	  	   --com.fr.hailian.service							操作数据库service
	  	   --com.fr.hailian.util							系统常用工具栏
	  	   --com.fr.hailian.wsdl							对外提供的WebService接口
	  --WebRoot											          前端页面 css  js以及项目配置文件 jar包
	  	   --hailian										自定义开发文件
	  	     --css											自定义样式
	  	     --img											自定义图片
	  	     --js											自定义js
	  	   --WEB-INF
	  	     --lib											项目引用jar
	  	     --web.xml										项目配置文件
	  	   --readme.txt										项目结构 部署说明
