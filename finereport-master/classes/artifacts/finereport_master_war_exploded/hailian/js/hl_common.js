/**
 * Created by zuoqb on 2017年8月10日14:28:13
 */
/**
 * RTX集成相关方法 多级上报
 * taskImpId//上报流程中的任务下发出来的具体任务ID  表fr_process_task_impl
 */
function initHlRTXReportMethod(fr_task_id){
	  var result=new Object();
	  var domain=FR.serverURL+FR.servletURL;
	  var url=domain.replace("/ReportServer","");
      domain=domain.replace("/ReportServer","")+'/rtxShareServlet';
	  console.log(domain+"----"+fr_task_id)
	  FR.ajax({
      	  url: domain,
          data: FR.cjkEncodeDO({
        	  domain: url,
        	  taskImpId:fr_task_id,
          }),
          type: 'POST',
          async: false,
          error: function () {
              result.fail=true;
        	  result.msg="服务器异常！";
          },
          complete: function (res, status) {
        	  if (res.responseText != "") {
              var signResult = FR.jsonDecode(res.responseText);
	              if (signResult.fail) {
	            	  result.fail=true;
	            	  result.msg=signResult.msg;
	              } 
        	  }
          }
      });
	  return result;
};

/**
 * 修改密码
 * oldpwdInputName:老密码控件名字
 * newpwdInputName:新密码控件名字
 *   修改成功，跳转决策系统首页
          修改失败返回错误提示信息 格式：{fail: true, msg: "原密码错误 "}
 **/
function initHlChangePassword(oldpwdInputName,newpwdInputName){
	  var result=new Object();
	  oldpwdInputName=oldpwdInputName.toUpperCase();
	  newpwdInputName=newpwdInputName.toUpperCase();
	  var domain=FR.serverURL+FR.servletURL;
      domain=domain.replace("/ReportServer","")+'/changePwdServlet';
      var oldPassword=$('[name="'+oldpwdInputName+'"]').val();
      var newPassword=$('[name="'+newpwdInputName+'"]').val();
      if(oldPassword==""){
    	  result.fail=true;
    	  result.msg="请输入原密码！";
    	  return result;
      }
      if(newPassword==""){
    	  result.fail=true;
    	  result.msg="请输入新密码！";
    	  return result;
      }
	  FR.ajax({
    	  url: domain,
          data: FR.cjkEncodeDO({
        	fr_password: encodeURIComponent(newPassword),
        	oldPassword:encodeURIComponent(oldPassword)
        }),
        type: 'POST',
        async: false,
        error: function () {
        	 result.fail=true;
       	     result.msg="服务器异常！";
        },
        complete: function (res, status) {
      	  if (res.responseText != "") {
            var signResult = FR.jsonDecode(res.responseText);
	            if (signResult.fail) {
	            	result.fail=true;
	          	    result.msg=signResult.msg;
	            } else {
	            	parent.location.reload();
                   // window.location.href = signResult.msg;
                }
      	  }
        }
    });
	return result;
};


/**
 * 注销
 * @returns {___anonymous2910_2915}
 */
function initHlLogout(){
	  var result=new Object();
	  var domain=FR.serverURL+FR.servletURL;
      domain=domain.replace("/ReportServer","")+'/logoutServlet';
	  FR.ajax({
    	  url: domain,
        type: 'POST',
        async: false,
        error: function () {
        	result.fail=true;
      	    result.msg="服务器异常！";
        },
        complete: function (res, status) {
      	  if (res.responseText != "") {
            var signResult = FR.jsonDecode(res.responseText);
            if (signResult.fail) {
            	result.fail=true;
          	    result.msg=signResult.msg;
            } else {
            	var domain=FR.serverURL+FR.servletURL+'?op=fs';
               // window.location.href = domain;
            	parent.location.reload();
            } 
      	  }
        }
    });
	return result;
};



/**
 * 导入人员信息
 * @param filePath:文件路径
 * @returns {___anonymous4158_4163}
 */
function importUserInfo(filePath){
	return importExcelInfo(0,filePath);
}
/**
 * 导入组织机构信息
 * @param filePath:文件路径
 * @returns {___anonymous4219_4224}
 */
function importOrgInfo(filePath){
	return importExcelInfo(1,filePath);
}
/**
 * @param type:类型 0-人员 1-机构
 * @param filePath:文件路径
 * @returns {___anonymous4077_4082}
 */
function importExcelInfo(type,filePath){
	  var result=new Object();
	  var domain=FR.serverURL+FR.servletURL;
      domain=domain.replace("/ReportServer","")+'/importInfoServlet';
	  FR.ajax({
    	  url: domain,
    	  data: FR.cjkEncodeDO({
    		  type: encodeURIComponent(type),
    		  filePath:encodeURIComponent(filePath)
          }),
        type: 'POST',
        async: false,
        error: function () {
        	result.fail=true;
      	    result.msg="服务器异常！";
        },
        complete: function (res, status) {
      	  if (res.responseText != "") {
            var signResult = FR.jsonDecode(res.responseText);
            if (signResult.fail) {
            	result.fail=true;
          	    result.msg=signResult.msg;
            } else {
            	result.fail=false;
          	    result.msg=signResult.msg;
            } 
      	  }
        }
    });
	return result;
};
var dynamicLoading = {
	    css: function(path){
			if(!path || path.length === 0){
				throw new Error('argument "path" is required !');
			}
			var head = document.getElementsByTagName('head')[0];
	        var link = document.createElement('link');
	        link.href = path;
	        link.rel = 'stylesheet';
	        link.type = 'text/css';
	        head.appendChild(link);
	    },
	    js: function(path){
			if(!path || path.length === 0){
				throw new Error('argument "path" is required !');
			}
			var head = document.getElementsByTagName('head')[0];
	        var script = document.createElement('script');
	        script.src = path;
	        script.type = 'text/javascript';
	        head.appendChild(script);
	    }
	}