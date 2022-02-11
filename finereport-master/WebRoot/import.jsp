<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>数据决策系统</title>
     <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="author" content="FineReport">
    <meta name="Copyright" content="FineReport">
    <meta name="description" content="FineReport--Web Reporting Tool">
    <meta name="keywords" content="FineReport,Web Reporting Tool">
</head>
<body>
<form id='myupload' action='/importByFormServlet' method='post' enctype='multipart/form-data'>
<div class="demo">
<div class="btn">
    <span>添加附件${ctx }</span>
    <input id="fileupload" type="file" name="file1">
</div>
<div>
<label><input name="type" type="radio" value="0" checked/>人员信息 </label> 
<label><input name="type" type="radio" value="1" />组织机构 </label> 
</div>
<!-- <div class="progress">
    <span class="bar"></span><span class="percent">0%</span>
</div> -->
<!-- 显示已上传的文件名 -->
<div class="files"></div>
<!-- 显示已上传的图片-->
<div class="showimg"></div>
</div>
<input type="submit" onclick="gosubmit2()"/>
</form>
<script type="text/javascript" src="/hailian/js/jquery-2.2.4.js"></script>
<script type="text/javascript" src="/hailian/js/jquery-form.js"></script>
<script type="text/javascript">
    var bar = $('.bar');//进度条
    var percent = $('.percent');//获取上传百分比
    var showimg = $('.showimg');//显示图片的div
    var progress = $('.progress');//显示进度的div
    var files = $('.files');//文件上传控件的input元素
    var btn = $('.btn span'); //按钮文本
    function gosubmit2(){
        $("#myupload").ajaxSubmit({
            dataType :'json',//返回数据类型
            beforeSend:function(){
                showimg.empty();
                progress.show();
                var percentVal = '0%';
                bar.width(percentVal);
                percent.html(percentVal);
                btn.html('上传中..');
            },
            //更新进度条事件处理代码
            uploadProgress:function(event,position,total,percentComplete){
                var percentVal = percentComplete + '%';
                bar.width(percentVal);
                percent.html(percentVal);
            },
            success:function(data){//图片上传成功时
                //获取服务器端返回的文件数据
               // alert(data);                
            },
            error:function(xhr){
                btn.html(上传失败);
                bar.width('0');
                files.html(xhr.responseText);
            }
        });
    }
</script>
</body>
</html>