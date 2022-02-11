if(window.FS==null){window.FS={}}FS.Widget=function(a){this.init(a)};$.extend(FS.Widget.prototype,{init:function(){},resize:function(a){if(a){this.element.width(a.width).height(a.height)}else{var b=this.element.parent();this.element.width(b.width()).height(b.height())}}});FS.extend=function(b,c){var a=function(){b.apply(this,arguments)};$.extend(a.prototype,b.prototype,c);return a};$.extend(FS,{importThemeStyle:function(c){var b=".fui-seb{background-color: "+c.background+";}"+".fui-fbc{color: "+c.font+";}"+".fui-fbt{text-shadow: 0 0 1px "+c.font+";}"+".fui-fhc{color: "+c.highlight+";}"+".fui-fht{text-shadow: 0 0 3px "+c.highlight+";}"+".fui-bsb{background-color: "+c.tint+";}"+".fui-bsc{color: "+c.tint+";}"+".fui-bsd{border-color: "+c.tint+";}";
var a=$('style[name="theme"]');if(a&&a.length>0){a.remove()}$('<style name="theme" type="text/css">'+b+"</style>").appendTo("head")},isPlatForm:function(){return false},setConfig:function(a){this.config=a;this.configured=true},isConfigured:function(){return this.configured===true},loadModule:function(c,b){if(!FS.isConfigured()){var a=null;FR.ajax({url:FR.servletURL+"?op=fs_manager&cmd=get_config_param",type:"POST",async:false,complete:function(e,d){if(d==="success"){a=FR.jsonDecode(e.responseText)
}}});if(a&&a.embModuleSuccess){this.setConfig(a)}else{window.console&&console.error("FS not configured")}}switch(b){case"report":FS.Design.reportManager(c);break;case"user":FS.Design.userManager(c);break;case"privilege":FS.Design.showPrivilegeManager(c);break;case"schedule":FS.Design.showScheduleSetting(c);break;case"sysmgr":FS.Design.systemManager(c);break;case"lookandfeel":FS.Design.lookAndFeelSetting(c);break;case"register":FS.Design.registerManager(c);break;case"monitor":FS.Design.monitorManager(c);
break;case"mobile":FS.Design.showMobileDevSetting(c);break;default:break}},adminPwdModule:function(){var a=[[{el:{type:"llabel",value:FR.i18nText("FS-Generic-Simple_Username")}},{el:{type:"text",widgetName:"usernameText",allowBlank:false,value:FS.config.username}},null,{el:{type:"llabel",widgetName:"usernameError",levelStyle:0,fontfamily:"SimSun",invisible:true,color:"#EB000B",fontsize:"13px",value:FR.i18nText("FS-User-Username_Can_Not_Be_Null")}}],[{el:{type:"llabel",value:FR.i18nText("FS-Admin-Old_Password")}},{el:{type:"password",widgetName:"oldPwdText"}},null,{el:{type:"llabel",widgetName:"oldPwdError",levelStyle:0,fontfamily:"SimSun",invisible:true,color:"#EB000B",fontsize:"13px",value:FR.i18nText("FS-Admin-Old_Password_Error")}}],[{el:{type:"llabel",value:FR.i18nText("FS-Admin-Enter_New_Password")}},{el:{type:"password",widgetName:"newPwdText"}},null,{el:{type:"llabel",widgetName:"enterNewPwdError",levelStyle:0,fontfamily:"SimSun",invisible:true,color:"#EB000B",fontsize:"13px",value:FR.i18nText("FS-Admin-Please_Enter_Newpwd")}}],[{el:{type:"llabel",value:FR.i18nText("FS-Admin-Verify_New_Password")}},{el:{type:"password",widgetName:"verifyPwdText"}},null,{el:{type:"llabel",widgetName:"pwdNotMatchError",levelStyle:0,fontfamily:"SimSun",invisible:true,color:"#EB000B",fontsize:"13px",value:FR.i18nText("FS-Admin-Passwords_Not_Match")}}]];
var b={title:FR.i18nText("FS-Admin-Simple_Account"),content:{type:"confirm",doSize:true,text4OK:FR.i18nText("FS-Generic-Simple_Save"),text4Cancel:null,btnsAlignment:"left",closeAfterAction:false,firstBtnMargin:0,onOK:function(){var d=this.getWidgetByName("usernameText"),l=this.getWidgetByName("oldPwdText"),j=this.getWidgetByName("verifyPwdText"),c=this.getWidgetByName("newPwdText"),k=this.getWidgetByName("usernameError"),o=this.getWidgetByName("oldPwdError"),f=this.getWidgetByName("enterNewPwdError"),h=this.getWidgetByName("pwdNotMatchError");
k.setVisible(false);o.setVisible(false);f.setVisible(false);h.setVisible(false);var n=l.getValue(),m=c.getValue(),g=d.getValue(),e={};if(!d.checkValid()){k.setVisible(true);return false}if(g!=FS.config.username){e.username=g}if(!FR.isEmpty(n)){if(FR.isEmpty(m)){f.setVisible(true);return false}if(m!=j.getValue()){h.setVisible(true);return false}e.oldp=encodeURIComponent(n);e.np=encodeURIComponent(m)}var i=FS.Trans.changePW(e);if(i.success){FS.signOut()}else{o.setVisible(true);return false}return true
},onCancel:function(){},width:800,height:206,contentWidget:{type:"tablelayout",widgetName:"userInfoTablelayout",columnSize:[FR.i18nTextWidth("FS-Admin-Verify_New_Password",6.5)>120?180:131,122,6,"fill"],rowSize:[21,21,21,21],vgap:19,items:a}}};return b},isAdmin:function(){return FS.config.isAdmin===true},canModifyPassword:function(){return FS.config.isTableDataUser!="true"||FS.isAdmin()},isGradeAuthorityOpen:function(){return this.config.gradeAuthority=="true"},hasGradeAuthority:function(){return this.config.hasGradeAuthority=="true"
},isEditReportAuthorityOpen:function(){return this.config.editReportAuthority=="true"},setEditReportAuthority:function(a){this.config.editReportAuthority=a},setGradeAuthorityOpen:function(a){this.config.gradeAuthority=a},setTemplatePrivilegeType:function(a){this.config.templatePrivilegeType=a},isDataConnectionAuthorityOpen:function(){return this.config.dataConnectionAuthority=="true"},setDataConnectionAuthorityOpen:function(a){this.config.dataConnectionAuthority=a},getShowText:function(c,e,f,a){var d=$('<span style="font-size: '+f+"px;font-family:"+a+'"></span>').appendTo("body");
d.html(c);var b=false;while(c.length>0&&d[0].offsetWidth>e){c=c.substr(0,c.length-1);d.html(c);b=true}if(b){c+="..."}d.remove();return c},Design:{op:{initialled:false},initOP:function(){if(this.op.initialled){return}$.extend(this.op,{initialled:true,2:function(a){return this.reportManager(a)},3:function(a){return this.userManager(a)},18:function(a){return this.showPrivilegeManager(a)},16:function(a){return this.showScheduleSetting(a)},5:function(a){return this.systemManager(a)},14:function(a){return this.lookAndFeelSetting(a)
},8:function(a){return this.registerManager(a)},17:function(a){return this.showMobileDevSetting(a)},15:function(a){return this.showBIDataSettings(a)},999:function(a){return this.accountSetting(a)}})},showDesign:function(a){FS.tabPane.addItem(a)},resize:function(){},accountSetting:function(a){FR.$defaultImport("/com/fr/fs/web/js/manager/fs_password.js","js");FS.PASSWORD.init(a)},reportManager:function(a){FR.$defaultImport("/com/fr/fs/web/js/manager/fs_reportmgr.js","js");FS.REPORTMGR.init(a)},userManager:function(a){FR.$defaultImport("/com/fr/fs/web/js/manager/fs_usermgr.js","js");
FS.USERMGR.init(a)},showPrivilegeManager:function(a){FR.$defaultImport("/com/fr/fs/web/js/manager/fs_privilegemanager.js","js");return FS.PRIVILEGEMANAGER.init(a)},showScheduleSetting:function(a){FR.$defaultImport("/com/fr/fs/web/js/manager/fs_schedule.js","js");return FS.SCHEDULEMANAGER.init(a)},systemManager:function(a){FR.$defaultImport("/com/fr/fs/web/js/manager/fs_sysmgr.js","js");FS.SYSMGR.init(a)},lookAndFeelSetting:function(a){FR.$defaultImport("/com/fr/fs/web/js/manager/fs_configsetting.js","js");
FS.CONFIGSETTING.init(a)},registerManager:function(a){FR.$defaultImport("/com/fr/fs/web/js/manager/fs_register.js","js");FS.REGISTER.init(a)},monitorManager:function(a){FR.$defaultImport("/com/fr/fs/web/js/manager/fs_sysmonitor.js","js");FS.SYSMONITOR.init(a)},showMobileDevSetting:function(a){FR.$defaultImport("/com/fr/fs/web/js/manager/fs_mobileplate.js","js");return FS.MOBILEPLATE.init(a)},showBIDataSettings:function(a){var b=FR.servletURL+"?op=fr_bi_configure&cmd=init_configure_pane";$("<iframe/>").css({height:"100%",width:"100%"}).attr({frameborder:0,src:b}).appendTo(a)
}},Trans:{ajax:function(b){var a=this,c;b.data=$.extend(b.data,{serverID:FS.serverID});FR.ajax({url:b.url,async:false,data:b.data,type:b.type?b.type:"POST",beforeSend:b.beforeSend,error:b.error,complete:function(e,d){try{c=b.returnString?e.responseText:FR.jsonDecode(e.responseText)}catch(f){FR.Msg.toast("AnalysisData Error!")}}});return c},_dealWithSrc:function(a){var b="";var d=/[a-zA-z]+:\/\/[^\s]*/;var c=/\/[^\s]*/;if(a.startWith("&fr_check_url")){b=""}else{if(a.match(d)||a.match(c)||a.startWith("about:blank")){b=a
}else{b="http://"+a}}return b},savePrivileges:function(a){return this.ajax({returnString:true,url:FR.servletURL+"?op=fs_set&cmd=auth_save",data:a})},signOut:function(){return this.ajax({returnString:true,url:FR.servletURL+"?op=fs_load&cmd=logout"})},getCompanyRoleAuth:function(b,a){var c={};if(b){c.departmentId=b}if(a){c.postId=a}return this.ajax({data:c,url:FR.servletURL+"?op=fs_set&cmd=auth_getjroleauth"})},getCustomRoleAuth:function(a){return this.ajax({data:a,url:FR.servletURL+"?op=fs_set&cmd=auth_getsroleauth"})
},removeRole:function(b){var a=FR.servletURL+"?op=fs_set&cmd=";if(b.postid!=null||b.departmentid!=null){a+="auth_removejrole"}else{a+="auth_removesrole"}FR.ajax({data:{id:b.id,_:new Date().getTime()},url:a,complete:function(){b.id=-1}})},updateRoleUsers:function(a){return this.ajax({data:a,url:FR.servletURL+"?op=fs_set&cmd=auth_updatesroleusers"})},addDepart:function(a){return this.ajax({data:{depart:a},url:FR.servletURL+"?op=fs_set&cmd=auth_adddepart"})},removeDepart:function(a){this.ajax({data:{id:a},url:FR.servletURL+"?op=fs_set&cmd=auth_removedepart"})
},addPost:function(a){return this.ajax({returnString:true,data:{post:a},url:FR.servletURL+"?op=fs_set&cmd=auth_addpost"})},addEmployee:function(a){return this.ajax({returnString:true,data:{employee:a},url:FR.servletURL+"?op=fs_set&cmd=auth_addemployee"})},removeEmployee:function(a){return this.ajax({data:a,url:FR.servletURL+"?op=fs_set&cmd=auth_removeemployee"})},addUser:function(a){var b={};$.each(a,function(c,d){b[encodeURIComponent(c)]=encodeURIComponent(d)});return this.ajax({data:{user:b},url:FR.servletURL+"?op=fs_set&cmd=auth_adduser"})
},removeUser:function(a){this.ajax({data:{id:a},url:FR.servletURL+"?op=fs_set&cmd=auth_removeuser"})},getEntryRoles:function(a){return this.ajax({url:FR.servletURL+"?op=fs_set&cmd=auth_getEntryRoles",data:{entryId:a}})},getPrivilegeSetting:function(){return this.ajax({url:FR.servletURL+"?op=fs_set&cmd=auth_getTemplatePrivilege"})},savePrivilegeSetting:function(a){return this.ajax({returnString:true,url:FR.servletURL+"?op=fs_set&cmd=auth_saveTemplatePrivilege",data:a})},addPostsToDepart:function(a){return this.ajax({data:a,url:FR.servletURL+"?op=fs_set&cmd=auth_addjrole_post"})
},removePostsFromDepart:function(a){return this.ajax({data:a,url:FR.servletURL+"?op=fs_set&cmd=auth_removejrole_post"})},changePW:function(a){return this.ajax({data:a,url:FR.servletURL+"?op=fs_main&cmd=user_changepw"})},closeTableDataSync:function(){return this.ajax({url:FR.servletURL+"?op=fs_manager&cmd=closeTableDataSync"})},getTableDataSyncState:function(){return this.ajax({url:FR.servletURL+"?op=fs_manager&cmd=getTableData_sync_state"})},saveTableDataSync:function(a){return this.ajax({url:FR.servletURL+"?op=fs_manager&cmd=editTabledataSync",data:{res:a}})
},getLdapAttrs:function(){return FS.Trans.ajax({url:FR.servletURL+"?op=fs_load&cmd=loginLdapAttrs",returnString:true})}},Async:{ajax:function(b,a){b.data=$.extend(b.data,{serverID:FS.serverID});FR.ajax({url:b.url,data:b.data,type:b.type?b.type:"POST",beforeSend:b.beforeSend,error:b.error,success:b.success,complete:a})},addFavorite:function(b,a){this.ajax({data:{id:b},url:FR.servletURL+"?op=fs_main&cmd=module_addfavorite"},a)},removeFavorite:function(b,a){this.ajax({data:{ids:b},url:FR.servletURL+"?op=fs_main&cmd=module_removefavorite"},a)
},getReportTreeById:function(b,a){this.ajax({data:{id:b},url:FR.servletURL+"?op=fs_main&cmd=module_getrootreports"},a)},getModuleTreeById:function(b,a){this.ajax({url:FR.servletURL+"?op=fs_main&cmd=getmoduleitems",data:{id:b}},a)},setTheme:function(b,a){this.ajax({url:FR.servletURL+"?op=fs_manager&cmd=settheme",data:b},a)},saveTheme:function(b,a){this.ajax({url:FR.servletURL+"?op=fs_manager&cmd=save_theme",data:b},a)},getCustomThemeList:function(a){this.ajax({url:FR.servletURL+"?op=fs_manager&cmd=gettheme"},a)
},getLoginStyleList:function(a){this.ajax({url:FR.servletURL+"?op=fs_load&cmd=setting",type:"POST"},a)}},Sync:{ajax:function(a){a.data=$.extend(a.data,{serverID:FS.serverID});var b="";FR.ajax({url:a.url,async:false,data:a.data,type:a.type?a.type:"POST",beforeSend:a.beforeSend,error:a.error,complete:function(d,c){try{b=FR.jsonDecode(d.responseText)}catch(e){FR.Msg.toast("AnalysisData Error!")}}});return b},getFavorite:function(){return this.ajax({url:FR.servletURL+"?op=fs_main&cmd=module_getfavorite"})
}},Plugin:{}});
FS.Plugin=FS.Plugin||{};FS.Plugin.MessageHelper={version:1,items:[]};FS.Plugin.SystemMessageProvider={version:1,items:[]};FS.Plugin.ReportManagerAddon={};FS.Plugin.DirectoryContentEditor=[];FS.Plugin.EntrySupporter=[];FS.Plugin.SystemItems=[];FS.Plugin.LookAndFeelSettings=[];FS.Plugin.UserManagerItems=[];FS.Plugin.UserManagerTools={};FS.Plugin.ScheduleOutput={};FS.Plugin.ScheduleOutputActionProvider={version:1,items:[]};FS.Plugin.OutputformatProvider={version:1,items:[]};FS.Plugin.MultiLevelReport=[];
FS.Plugin.GradeAuthority={};FS.Plugin.GradeAuthority.Operation={version:1,item:{version:1,action:function(a){}}};FS.Plugin.GradeAuthority.Tools={version:1,item:{version:1,action:function(a){}}};FS.Plugin.SystemMonitor=[];FS.Plugin.AuthenticateTypePool=[];FS.Plugin.CustomIcon=[];FS.Plugin.TableTreeConfigProcessor={version:1};FS.Plugin.PrivilegeManageTabProvider={version:1,indexOffset:2,items:[]};
FS.Plugin.GradeAuthority.Operation.item.action=function(c){var b=this;var a=function(){var d=new FR.IconButton({imgsrc:Constants.addCustomRoleButtonCls,height:24,width:220,text:"&#43;",handler:function(){var e=b.createUnRepeatName();FSPM.VIEW._createCustomRoleDialog({name:e})}});return d.element};if(FS.isAdmin()){c.push({el:a()})}};FS.Plugin.GradeAuthority.Tools.item.action=function(a){var b=[{name:"view",width:20}];if(FS.isGradeAuthorityOpen()){b.unshift({name:"design",width:20})}if(FS.isEditReportAuthorityOpen()){b.unshift({name:"edit",width:20})
}$.extend(a,{tools:b,alwaysShowTools:true,toolMargin:10,tooltype:"check",itemCanBeSelect:false,onItemToolClick:function(c,f,d,i){var g=FSPM.VIEW.tabPane.getWidgetByName(Constants.positionAndCustomRoleInsideTabWD);var h=g.getWidgetByName(Constants.customRoleListWD);if(c===b.length-1&&!d){if(FS.isGradeAuthorityOpen()){h.options.listItems[f].doUnselect(c-1)}if(FS.isEditReportAuthorityOpen()){h.options.listItems[f].doUnselect(0)}}if(FS.isGradeAuthorityOpen()&&c===b.length-2){if(d){h.options.listItems[f].doSelect(b.length-1)
}else{if(FS.isEditReportAuthorityOpen()&&!d){h.options.listItems[f].doUnselect(0)}}}if(FS.isEditReportAuthorityOpen()&&c<b.length-1&&d){h.options.listItems[f].doSelect(b.length-1);if(FS.isGradeAuthorityOpen()){h.options.listItems[f].doSelect(b.length-2)}}FSPM.VIEW.saveEntryCustomRoleCache(h.options.listItems[f])}})};
/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php).
 *
 * Version: 0.2.5
 * 
 */
(function(a){a.fn.extend({slimScroll:function(c){var b=c;this.each(function(){var A,u,i,p,v,j="<div></div>",x=30,r=30,q=b||{},w=q.width||"auto",s=q.height||"250px",m=q.position||"static",n=q.size||"7px",t=q.color||"#000",g=q.opacity||0.4,l=q.alwaysVisible===true;var D=a(this);var h=a(j).css({position:m,overflow:"hidden",width:w,height:s}).attr({"class":"slimScrollDiv"});
D.css({overflow:"hidden",width:w,height:s});var d=a(j).css({width:"10px",height:"100%",position:"absolute",top:0});var y=a(j).attr({"class":"slimScrollBar ",style:"border-radius: "+n}).css({background:t,width:n,position:"absolute",top:0,opacity:g,display:l?"block":"none",BorderRadius:n,MozBorderRadius:n,WebkitBorderRadius:n,zIndex:99});var e={right:"0"};d.css(e);y.css(e);D.wrap(h);D.parent().append(y);D.parent().append(d);y.draggable({cursor:"default",axis:"v",onStartDrag:function(o){i=true;o.stopEvent()
},onDrag:function(F){var G=F.data.top;var o=D.outerHeight()-a(this).outerHeight();if(G<0){F.data.top=0;return false}else{if(G>o){F.data.top=o;return false}}z(0,a(this).position().top,false)},onStopDrag:function(){i=false;k()}});d.hover(function(){f()},function(){k()});y.hover(function(){u=true},function(){u=false});D.hover(function(){A=true;f();k()},function(){A=false;k()});var C=function(o){if(!A){return}var o=o||window.event;var F=0;if(o.wheelDelta){F=-o.wheelDelta/120}if(o.detail){F=o.detail/3
}z(0,F,true);if(o.preventDefault){o.preventDefault()}o.returnValue=false};var z=function(o,I,F){var H=I;if(F){H=y.position().top+I*r;H=Math.max(H,0);var G=D.outerHeight()-y.outerHeight();H=Math.min(H,G);y.css({top:H+"px"})}percentScroll=parseInt(y.position().top)/(D.outerHeight()-y.outerHeight());H=percentScroll*(D[0].scrollHeight-D.outerHeight());D.scrollTop(H);f()};var B=function(){if(window.addEventListener){this.addEventListener("DOMMouseScroll",C,false);this.addEventListener("mousewheel",C,false)
}else{document.attachEvent("onmousewheel",C)}};B();var E=function(){v=Math.max((D.outerHeight()/D[0].scrollHeight)*D.outerHeight(),x);y.css({height:v+"px"})};E();var f=function(){E();clearTimeout(p);if(v>=D.outerHeight()){return}y.fadeIn("fast")};var k=function(){if(!l){p=setTimeout(function(){if(!u&&!i){y.fadeOut("slow")}},1000)}}});return this}});a.fn.extend({slimscroll:a.fn.slimScroll})})(jQuery);
if(FS.Tools==null){FS.Tools={}}$.extend(FS.Tools,{getCssColor:function(a){return"rgb("+a.r+","+a.g+","+a.b+")"},getColor:function(b){var a=b.match(/\d+/g);return{r:a[0],g:a[1],b:a[2]}},createUserOptPane:function(f){var k=function(n,o){var q=$('<a href="#"/>').data("user",n);if(o){q.addClass("fs-usermgr-seluser")}else{q.addClass("fs-usermgr-alluser")}var p=(n.realname||"")+"("+n.username+")";$("<span/>").text(p).attr("title",p).appendTo(q);return q};var g={index:0,list:[],need2Scroll:false,isSel:true};
var j={index:0,list:[],need2Scroll:false,isSel:false};var h=false,i=200;var e=[],c=[];var m=function(r,q,n,s){r.dellist=e.join(",");r.addlist=c.join(",");var o=function(y,v){if(v=="success"){if($.isFunction(s)){s.call()}var u=FR.jsonDecode(y.responseText);var t=u.length;g={index:0,list:[],need2Scroll:false,isSel:true};j={index:0,list:[],need2Scroll:false,isSel:false};for(var x=0;x<t;x++){var w=u[x];if(w.inDepart){g.list.push(w);if(g.index<i){g.index++;k(w,true).appendTo(q)}else{g.need2Scroll=true
}}else{j.list.push(w);if(j.index<i){j.index++;k(w,false).appendTo(n)}else{j.need2Scroll=true}}}}};var p={url:FR.servletURL+"?op=fs_set&cmd=auth_getfilterusers",type:"POST",data:r};FS.Async.ajax(p,o)};var b=$('<div class="fs-usermgr-userpane"/>');var d=function(q,r){if(r.need2Scroll&&$(q).scrollTop()+$(q).height()>=q.scrollHeight){if(h){return}h=true;var n=r.index+50;if(n>=r.list.length){n=r.list.length;r.need2Scroll=false}for(var p=r.index;p<n;p++){k(r.list[p],r.isSel).appendTo($(q))}r.index=n;h=false
}};var l=$('<div class="fs-usermgr-selpane"/>').appendTo(b).click(function(r){if(f.viewOnly){return}var q=r.target;var p=$(q).closest(".fs-usermgr-seluser");if(p.length){p.hide();var o=p.data("user");e.push(o.id);c.remove(o.id);if(p.data("sel")){p.data("sel").removeClass("fs-usermgr-disabled").data("selected",false)}else{var n=k(o,false).data("del",p).appendTo(a);p.data("sel",n)}}}).scroll(function(){d(this,g)});var a=$('<div class="fs-usermgr-allpane"/>').appendTo(b).click(function(r){if(f.viewOnly){return
}var q=r.target;var o=$(q).closest(".fs-usermgr-alluser");if(o.length){if(o.data("selected")===true){return}else{var n=o.data("user");c.push(n.id);e.remove(n.id);o.addClass("fs-usermgr-disabled");if(o.data("del")){o.data("del").appendTo(l).show()}else{var p=k(n,true).data("sel",o).appendTo(l);o.data("del",p)}o.data("selected",true)}}}).scroll(function(){d(this,j)});b.seluser=l;b.alluser=a;b.refresh=m;b.getAddlist=c;b.getDellist=e;$("<div/>").text(FR.i18nText("FS-User-Simple_Unselected")).appendTo(a);
m(f,l,a);return b},getColsByTableDataName:function(b){var a=FS.Sync.ajax({url:FR.servletURL+"?op=fs_manager&cmd=get_tabledatacolname",type:"POST",data:{name:b}});return a}});
(function(b){var a={BIStyle:{config4frame:{resizable:false,south:{visible:true}},config4Gallery:{region:"east"},config4MenuTree:{onNodeExpand:function(c,d,e){return c.level!==0},onNodeClick:function(d,c,e){FS.$wrapper&&FS.$wrapper.empty();return false},onAfterInit:null},config4tabPane:{style:"alpha",region:"south",isCollapsible:true,hasHomepageBtn:false}}};b.extend(FS,{NAV:{"MESSAGE":4,"ACCOUNT":5,"FAVORITE":6,"UNREG":7},CONSTS:{ModuleIcons:{2:"reportmgr",3:"usermgr",5:"sysmgr",8:"register",9:"monitor",14:"plate",16:"schedule",17:"mobile",18:"privilege"}},THEME:{config4frame:{resizable:true,north:{height:60,visible:true},south:{visible:false},west:{width:230},east:{}},config4Gallery:{region:null},config4MenuTree:{region:"west",insertNodes:null,onAfterInit:function(){var c=b('<div class="fs-menu-hide"/>').click(function(){var d=FS.CONSTS.Regions["west"].width();
FS.CONSTS.Regions["west"].css("width",0);FS._doResize();var e=b('<div class="fs-menu-show"/>').click(function(){b(this).remove();FS.CONSTS.Regions["west"].css("width",d);FS._doResize()}).appendTo(FS.CONSTS.Regions["east"])}).appendTo(FS.CONSTS.Regions["west"])}},config4tabPane:{style:"bravo",region:"east",isCollapsible:false,hasHomepageBtn:true},config4navigation:{onBeforeInit:null,onAfterInit:null,naviComponents:null}},_init:function(d){this.config=d;var e=d["theme"];b.extend(FS.THEME,e);if(!e.isCustom&&e.name!=="default"){FS.THEME=b.extend(true,FS.THEME,a.BIStyle)
}FS.serverID=d["serverID"];var c=this;this._initHeader(FS.THEME.config4navigation);this._initFrame(FS.THEME.config4frame);this._initTabPane(FS.THEME.config4tabPane);this._initMenuTree(FS.THEME.config4MenuTree);this._initGallery(FS.THEME.config4Gallery,this.$body);this._initBackGroundImg(d["isBackgroundImg"],d["backgroundImageID"],d["backgroundColor"]);this._doResize();b(window).resize(function(){if(c.timer!=null){clearTimeout(c.timer)}c.timer=setTimeout(function(){c._doResize();c.lastTimer=null},200)
})},_initFrame:function(c){this.$footer=b("#fs-frame-footer").text(FS.config.company);this.$header.css("height",c.north.height||60);if(!c.north.visible){this.$header.hide()}if(!c.south.visible){this.$footer.hide()}this.$body=b("#fs-frame-body");this.$menu=b("#fs-frame-menu").width(c.west.width);this.$content=b("#fs-frame-content");FS.CONSTS.Regions={north:FS.$header,south:FS.$footer,west:FS.$menu,east:FS.$content};this._makeResizable(c)},_makeResizable:function(d){if(d.resizable){var c=this,e=b("body");
this.$menu.resizable({handles:"e",onStartResize:function(f){if(!c.pmask){c.pmask=b('<div class="fs-resize-mask"/>').insertAfter(c.$menu)}c.pmask.css({zIndex:FR.widget.opts.zIndex++});if(!c.proxy){c.proxy=b('<div class="fs-resize-line"/>').insertAfter(c.$menu)}c.proxy.css({zIndex:FR.widget.opts.zIndex++,left:f.data.width,top:f.data.top});c.proxy._outerWidth(f.data.width);c.proxy._outerHeight(f.data.height)},onResize:function(f){c.proxy.css({left:f.data.width,top:f.data.top});c.proxy._outerWidth(f.data.width);
c.proxy._outerHeight(f.data.height);return false},onStopResize:function(f){c._doResize();c.pmask.remove();c.pmask=null;c.proxy.remove();c.proxy=null}})}},_needGallery:function(){return this.THEME.config4tabPane.region==="south"},_initHeader:function(d){var c=this;FR.applyFunc(this,d.onBeforeInit,[],false);this.$header=b("#fs-frame-header");this.$banner=b("#fs-frame-banner");if(FS.config.bannerType>1){var f=FS.config.logoImageID4FS;f=FR.servletURL+(f?"?op=fr_attach&cmd=ah_image&id="+f+"&isAdjust=false":"?op=resource&resource=/com/fr/fs/resources/images/logo.png");
b('<img class="fs-banner-logo"/>').attr("src",f).appendTo(this.$banner)}if(FS.config.bannerType<3){b('<span class="fs-banner-title"/>').text(FS.config.company).appendTo(this.$banner)}FS.MsgBox={};if(!FS.isAdmin()){if(FS.config.forceMessage||FS.config.supportModules.indexOf("reportprocess")!=-1){FR.$defaultImport("/com/fr/fs/web/js/manager/fs_sysmsg.js","js");FR.$defaultImport("/com/fr/fs/web/css/manager/fs_sysmsg.css","css");FS.SYSMSG.sendSysMsgConn(60000)}}var e=this._initDefaultNaviComponents(d);
b.each(e,function(g,i){if(i.visible){var h=i.renderEl;if(b.isFunction(i.render)){i.render.apply(c,[h])}if(h&&b.isFunction(i.onClick)){h.bind("click",i.onClick.createDelegate(c))}}});FR.applyFunc(this,d.onAfterInit,[],false)},_initDefaultNaviComponents:function(f){var e=this;var c={renderEl:b('<ul id="fs-frame-navi"/>'),render:function(j){var i=b(j).appendTo(this.$header);var k=b('<li id="fs-navi-message" class="fs-navibar-item"/>');b('<i class="icon-navi-message"/>').appendTo(k);b('<span class="fs-navi-msgnum fui-bsc"/>').text("0").appendTo(k);
var m=b('<li id="fs-navi-admin" class="fs-navibar-item"/>');b('<i class="icon-navi-admin"/>').appendTo(m);b("<span/>").text(FS.config.username).appendTo(m);var l=b('<li id="fs-navi-favorite" class="fs-navibar-item"/>');b('<i class="icon-navi-favorite"/>').appendTo(l);k.data("NAV",FS.NAV.MESSAGE).appendTo(i);m.data("NAV",FS.NAV.ACCOUNT).appendTo(i);l.data("NAV",FS.NAV.FAVORITE).appendTo(i);this._bindNaviBarEvts(i)},visible:true};var d={renderEl:b('<div id="fs-frame-search"/>'),render:function(j){var k=b(j).appendTo(this.$header);
b("<i/>").addClass("icon-navi-search").appendTo(k);var l=b("<input/>").appendTo(k);var i=b("<div/>").addClass("search-result-wrapper").appendTo(k).click(function(o){var m=b(o.target).closest("a");if(m&&m.length>0){var n=m.data("ENTRY");e.loadContentByEntry(n)}e.$searchBar.val("");b(this).hide()}).hide();this.$searchBar=l.attr("placeholder",FR.i18nText("FS-Frame-Enter_Entry_Name")).focus(function(){k.addClass("focus")}).blur(function(){k.removeClass()}).keyup(function(){var n=this.value;i.empty().hide();
if(FR.isEmpty(n)){return}var o=[];e._filterReportlets(FS.Cache.entries,n,o);var m=o.length;if(m>0){b.each(o,function(q,p){p.appendTo(i)});i.css({"z-Index":FR.widget.opts.zIndex++}).show();b(document).bind("mousedown.search",function(q){var p=b(q.target);if(!p.isChildAndSelfOf("#fs-frame-search")){i.hide();b(document).unbind("mousedown.search")}})}}).appendTo(k)},visible:true};var g={renderEl:b('<div id="fs-frame-reg"/>'),render:function(i){if(FS.config.isRegiste!==true){b(i).data("NAV",FS.NAV.UNREG).text(FR.i18nText("FS-Reg-Simple_Unregistered")).appendTo(this.$header)
}},visible:true,onClick:function(){if(FS.config.hasRegistePrivilege==="true"){var i={"id":8,"text":FR.i18nText("FS-Module-Simple_Register"),"isModule":true};this.tabPane.addItem(i)}}};var h=f.naviComponents||[];h.unshift(f.navi||c,f.search||d,f.reg||g);return h},_filterReportlets:function(c,e,f){if(!c){return}var d=this;b.each(c,function(i,l){if(l.isModule){return}if(l.hasChildren){d._filterReportlets(l.ChildNodes,e,f)}else{var i=l.text.indexOf(e);if(i>-1){var h=b('<a href="#" class="search-res-item"/>').data("ENTRY",l);
var k=e.length,m=l.text,g=m.length;var j="<span>"+l.text.substr(0,i)+'<span class="search-match">'+l.text.substr(i,k)+"</span>"+l.text.substr(i+k,g-(i+k))+"</span>";b(j).appendTo(h);f.push(h)}}})},_bindNaviBarEvts:function(d){var e=this.NAV,c=this;d.unbind();var f=function(i){var j=i.target;var k=b(j).closest("li");if(k&&k.length>0){var h=i.type;var g=k.data("NAV");if(h==="mouseover"){b(j).closest("a").addClass("fui-bsb");k.addClass("fui-seb")}else{if(h==="mouseout"){b(j).closest("a").removeClass("fui-bsb");
k.removeClass("fui-seb")}else{if(h==="click"){if(k.hasClass("fui-bsc")){return}else{b(".fs-navibar-item",d).removeClass("fui-bsc");k.addClass("fui-bsc")}switch(g){case e.MESSAGE:c._showMsgCombo(k,"fast");break;case e.ACCOUNT:c._showAdminCombo(k,"fast");break;case e.FAVORITE:c._showFavoriteCombo(k,"fast");break;default:break}b(document).bind("mouseover.navi",function(n){var m=n.target;if(!b(m).isChildAndSelfOf(k)){var l=k.data("COMBO");l&&l.slideUp("fast",function(){k.removeClass("fui-bsc");k.children("span").removeClass("fui-bsd")
});b(document).unbind("mouseover.navi")}})}}}}};d.bind("mouseover",f).bind("mouseout",f).bind("click",f)},_showMsgCombo:function(g,f){var d=this;var e=g.data("COMBO");if(!e){e=b('<div class="fs-message-combo"/>').hide().appendTo(g);g.data("COMBO",e)}e.empty().css({"z-Index":FR.widget.opts.zIndex++});if(FS.isAdmin()){b('<div class="fs-message-combo-title"/>').text(FR.i18nText("FS-Msg-No_Message")).appendTo(e);if(FR.i18nTextWidth("FS-Msg-No_Message")>120){e.css("width",(FR.i18nTextWidth("FS-Msg-No_Message")+16)+"px")
}}else{if(this.MsgBox.msgs&&this.MsgBox.msgs.length>0){FR.applyFunc(this,this.MsgBox.onMsgShow,[e],false)}var c=b('<div class="fs_sysmsg_combo_more fui-bsc"/>').appendTo(e);b("<div/>").text(FR.i18nText("FS-Msg-View_All")).appendTo(c).click(function(){FS.SYSMSG.dealAllMsg(d.MsgBox.msgs)})}g.children("span").addClass("fui-bsd");e.slideDown(f)},_showFavoriteCombo:function(j,i){var d=this;var h=j.data("COMBO");if(!h){h=b('<div class="fs-favorite-combo"/>').hide().appendTo(j);j.data("COMBO",h)}var g=FS.THEME.config4frame.north.visible?(FS.THEME.config4frame.north.height||60):0;
var f=FS.THEME.config4frame.south.visible?30:0;h.empty().css({height:document.body.clientHeight-g-f,"z-Index":FR.widget.opts.zIndex++});b('<div class="fs-favorite-combo-title"/>').text(FR.i18nText("FS-Generic-Simple_Favorite")).appendTo(h);var e=b('<div class="fs-favorite-combo-list"/>').appendTo(h);var c=this.Control.getFavoriteNodes();if(c&&c.length>0){b.each(c,function(m,n){var k=b('<a href="#"/>').attr("title",n.entry.text).data("FAVORITE",n).appendTo(e);b("<span/>").text(n.entry.text).appendTo(k);
var l=b('<i class="icon-remove-favorite"/>').hide().appendTo(k);k.hover(function(){l.show()},function(){l.hide()})});h.click(function(n){var k=b(n.target);var l=k.closest("a");var m=l.data("FAVORITE");if(l&&l.length>0){if(k.hasClass("icon-remove-favorite")){d.Control.removeFavoriteNode(m.id,function(){l.remove()})}else{h.hide();d.loadContentByEntry(m.entry)}}})}e.slimscroll({position:"relative",width:"260px",height:(document.body.clientHeight-122)+"px"});h.slideDown(i)},_showAdminCombo:function(f,e){var d=f.data("COMBO");
if(d&&d.length>0){d.slideDown(e)}else{var c=this;d=b('<div class="fs-admin-combo"/>').css({width:130,"z-Index":FR.widget.opts.zIndex++});f.data("COMBO",d);if(FS.canModifyPassword()){b('<a href="#"/>').text(FR.i18nText("FS-Admin-Account_Setting")).appendTo(d).click(function(){var g=b("<div/>").addClass("fs_design_container");d.hide();c.loadContentByEntry({text:FS.isAdmin()?FR.i18nText("FS-Admin-Simple_Account"):FR.i18nText("FS-Admin-Account_Setting"),contentEl:g,isModule:true,id:999})})}b('<a href="#"/>').text(FR.i18nText("FS-Admin-Simple_Exit")).appendTo(d).click(function(){c.signOut()
});FR.ajax({url:FR.servletURL+"?op=fs_mobile_main&cmd=initdata",type:"POST",complete:function(i,g){var j=FR.jsonDecode(i.responseText);if(j&&j.qrcodeid){var h=FR.servletURL+("?op=fr_attach&cmd=ah_image&id="+j.qrcodeid+"&isAdjust=false");b("<img/>").attr("src",h).prependTo(d)}d.hide().appendTo(f).slideDown(e)}})}},_initTabPane:function(d){var e;if(this._needGallery()){var c=this.$footer.position();e=b("<div/>").appendTo("body").css({position:"absolute",top:c.top,left:c.left})}else{if(FR.isEmpty(d.region)){return
}e=b("<div/>").appendTo(FS.CONSTS.Regions[d.region])}d.renderEl=e;this.tabPane=new FS.QuickTab(d)},_initMenuTree:function(f){if(FR.isEmpty(f.region)){return}var d=this,j=FS.CONSTS.Regions[f.region];var e=b('<div class="fs-frame-scroll"/>').appendTo(j);var c=b('<div id="fs-frame-menu-south"></div>');c.appendTo(j);var h=FS.THEME.config4frame.scrollHeight?FS.THEME.config4frame.scrollHeight:"100%";e.slimscroll({position:"relative",width:"100%",height:h});var i=this._needGallery();if(i){var g=b('<a class="fs-menu-home fs-menu-item select fui-seb fui-fht"/>').click(function(){b(".fs-menu-item.select",j).removeClass("select fui-seb fui-fht");
b(this).addClass("select fui-seb fui-fht");d._hideContentWrapper();d.$home&&d.$home.show()}).hover(function(){b(this).addClass("fui-seb fui-fht")},function(){if(!b(this).hasClass("select")){b(this).removeClass("fui-seb fui-fht")}}).appendTo(e);this.createIconFont("icon-menu-home-a","icon-menu-home-b").appendTo(g);b("<span/>").text(FR.i18nText("FS-Setting-Home_Page")).appendTo(g);b('<div class="fs-frame-split"/>').appendTo(e)}FS.Async.getReportTreeById(-1,function(n,k){d.Cache.entries=FR.jsonDecode(n.responseText)||[];
var l=d.Cache.entries||[];if(FS.THEME.config4MenuTree.insertNodes){b.each(FS.THEME.config4MenuTree.insertNodes,function(p,q){if(b.isFunction(q)){var o=q.apply();o&&l.push(o)}else{l.push(q)}})}var m=FS.config.roots.modules;if(m&&m.length>0){l.push({text:FR.i18nText("FS-Generic-Manager_System"),id:m[0].id,isModule:true,hasChildren:true})}f.renderEl=b("<div/>").appendTo(e);f.nodes=l;new FS.MenuTree(f)})},refreshMsgBox:function(d,e){var c=0;if(d){c=d.length}b(".fs-navi-msgnum").text(c);this.MsgBox={msgs:d,onMsgShow:function(f){if(e){e(f)
}}}},doDisplayChildNodes:function(d){if(!this._needGallery()){return}this.$home&&this.$home.hide();this._showContentWrapper();if(d==null){return}var e=this.$wrapper,c=this;var f=b('<div class="fs-group-content"/>').appendTo(e);b.each(d,function(g,j){if(j.hasChildren){if(!j.ChildNodes){return}var i=b('<div class="fs-group-title fui-fbt"/>').appendTo(e);b('<span class="fs-group-title-d fui-bsd"/>').appendTo(i);b("<span/>").text(j.text).appendTo(i);var h=b('<div class="fs-group-content"/>').appendTo(e);
c._collectAllChildNodes(j,h)}else{var k;if(j.isModule){k=c._createModuleNodeCard(j)}else{k=c._createCoverNodeCard(j)}k.appendTo(f)}})},_collectAllChildNodes:function(e,d){var c=this;b.each(e.ChildNodes,function(f,h){if(h.hasChildren){c._collectAllChildNodes(h,d)}else{var g=c._createCoverNodeCard(h);g.appendTo(d)}})},_createCoverNodeCard:function(e){var f=b('<div class="fs-content-card"/>').data("ENTRY",e);var c=e.mobileCoverId;if(!c){c=String.fromCharCode(Math.floor(Math.random()*26)+"a".charCodeAt(0))
}var d=FR.servletURL+(c.length<2?"?op=resource&resource=/com/fr/fs/resources/images/mobile/cover/"+c+".png":"?op=fs_main&cmd=get_report_cover&id="+c);b("<img/>").attr("src",d).appendTo(f);b("<div/>").attr("title",e.text).text(e.text).appendTo(f);return f},_createModuleNodeCard:function(c){c.isModule=true;var d=b('<div class="fs-content-card"/>').data("ENTRY",c);b("<img/>").attr("src",FR.servletURL+"?op=resource&resource=/com/fr/fs/resources/images/frame/fsmodule"+c.id+".png").appendTo(d);b("<div/>").attr("title",c.text).text(c.text).appendTo(d);
return d},createIconFont:function(e,d){var c=b("<span/>").addClass("fs-menu-icon");b("<i/>").addClass(e).addClass("icon-menu-a").appendTo(c);b("<i/>").addClass(d).addClass("icon-menu-b fui-fhc").appendTo(c);return c},_initGallery:function(e){if(FR.isEmpty(e.region)){return}var c=this,f=FS.CONSTS.Regions[e.region];if(this._needGallery()){var d=this.config.homePageUrl;if(d){this.$home=b('<iframe id="fs-frame-home"/>').attr({src:encodeURI(FS.Trans._dealWithSrc(d))}).appendTo(f)}}this.$wrapper=b('<div id="fs-frame-wrapper"/>').hide().appendTo(f);
this.$wrapper.click(function(h){var i=h.target;var j=b(i).closest(".fs-content-card");if(j&&j.length>0){var g=j.data("ENTRY");c.loadContentByEntry(g)}});this.$wrapper.slimscroll({height:"100%"});this._hideContentWrapper();this._bindContentEvents()},_bindContentEvents:function(d){var c=this;var e=function(g){var f=g.type;if(c.$wrapper){if(f==="mouseover"){c.$wrapper.addClass("scroll-content-hover")}else{if(f==="mouseout"){c.$wrapper.removeClass("scroll-content-hover")}}}};this.$wrapper.bind("mouseover",e).bind("mouseout",e).bind("click",e)
},_hideContentWrapper:function(){this.$wrapper.hide();if(this.$wrapper.parent().hasClass("slimScrollDiv")){this.$wrapper.parent().hide()}},_showContentWrapper:function(){if(this.$wrapper.parent().hasClass("slimScrollDiv")){this.$wrapper.parent().show()}this.$wrapper.empty().show()},loadContentByEntry:function(c){this.tabPane.addItem(c)},_doResize:function(){var f=FS.THEME.config4frame.north.visible?(FS.THEME.config4frame.north.height||60):0;var e=FS.THEME.config4frame.south.visible?30:0;var h=document.body.clientWidth;
var d=document.body.clientHeight;this.$body.css({height:d-f-e,top:f});var c=this.$menu.width();this.$content.css({left:c,width:h-c});this.$footer.css({top:d-e});if(this.tabPane){var g=this.tabPane.element.height()-e;if(this.tabPane.isExpanded()){g=0}this.tabPane.element.css("top",g);this.tabPane.doResize()}},_initBackGroundImg:function(e,c,g){var f=b("body");if(e===false){f.addClass("fs-style-pure").css({"background":g})}else{var d=FR.servletURL+((c&&c!="null")?("?op=fr_attach&cmd=ah_image&id="+c+"&isAdjust=false"):"?op=resource&resource=/com/fr/fs/resources/images/fsbg.jpg");
f.css({"background-image":'url("'+d+'")'})}},signOut:function(){FR.ajax({url:FR.servletURL+"?op=fs_load&cmd=logout",type:"POST",success:function(d,c){window.location.href=d}})},Control:{addFavoriteNode:function(e,f){var d=this;var c=function(i,h){if(h==="success"){var g=FR.jsonDecode(i.responseText);d.getFavoriteNodes().push({"id":g.id,"entry":e});FR.applyFunc(d,f,[],false)}};FS.Async.addFavorite(e.id,c)},removeFavoriteNode:function(e,d){var c=function(h,f){if(f==="success"){var g=null;b.each(FS.Control.getFavoriteNodes(),function(j,k){if(k.id===e){g=j;
return false}});if(g!==null){FS.Control.getFavoriteNodes().splice(g,1)}FR.applyFunc(self,d,[],false)}};FS.Async.removeFavorite(e,c)},getFavoriteNodes:function(){if(FS.Cache.favorites===null){FS.Cache.initFavoriteCache()}return FS.Cache.favorites}},Cache:{entries:[],favorites:null,initFavoriteCache:function(){this.favorites=FS.Sync.getFavorite()}}})})(jQuery);
(function(a){FS.QuickTab=FR.extend(FR.Widget,{NAV:{"BACK":0,"MORE":1,"ITEM":2,"HOMEPAGE":3,"MOREITEM":4,"CLOSEALL":5,"CLOSEOTHER":6,"FULLSCREEN":7,"EXITFULLSCREEN":8},_defaultConfig:function(){return a.extend(FS.QuickTab.superclass._defaultConfig.apply(this,arguments),{baseCls:"fs-tab",style:"alpha",tabWidth:150,tabHeight:30,dropBoxWidth:150,isCollapsible:true,hasHomepageBtn:false,onCreateTab:null,onSelectTab:null,onCloseTab:null,afterLoadTab:null})},_init:function(){FS.QuickTab.superclass._init.apply(this,arguments);
this.element.addClass(this.options.style);this.$float=a('<div class="fs-tab-float"/>').css({"z-Index":FR.widget.opts.zIndex++}).appendTo(this.element);this.$btns=this._createBtns();this.$contentMask=this._createContentMask().hide().appendTo(this.element);this.$content=a('<div class="fs-tab-content"/>').appendTo(this.element);this.loadedEntries=[];this._createHomepageBtn();this._bindBtnEvts();this.visibleTabCount=0;this.currentTabWidth=this.options.tabWidth;this.dropdownLeft=Math.floor((this.options.tabWidth-this.options.dropBoxWidth)/2);
this.doResize();this.isExpand=true;if(this.options.isCollapsible===true){this.setExpand(false);this.isExpand=false;this.element.hide()}},_resizeTabs:function(){var d=this;var g=this.element.width(),b=this.element.height();var i=g-40;if(this.options.isCollapsible){i-=60}if(this.options.hasHomepageBtn){i-=60}this.$tabs.width(i);var f=this.$tabs.children();var e=Math.floor(i/this.options.tabWidth)+1;var c=this.options.tabWidth;if(f.length>=e){c=Math.floor(i/e)}this.visibleTabCount=e;if(c!==this.currentTabWidth){this.dropdownLeft=Math.floor((c-this.options.dropBoxWidth)/2);
a.each(f,function(j,k){a(k).outerWidth(c);a(".fs-tab-item-label",a(k)).outerWidth(c-20)});this.currentTabWidth=c}this.$content.width(g).height(b-this.options.tabHeight);if(this.isFullScreen()){this.$content.width(g).height(b)}this.fireEvent("resize",{width:g,height:b-this.options.tabHeight});var h=this._getSelectedTab();if(h!==null){this._doSelectTab(h)}},_createContentMask:function(){var b=this;return a('<div class="fs-tab-content-mask"/>').click(function(c){if(b._isMenuExpanded()){b._expandMenu(false);
c.stopEvent()}}).css({"z-Index":FR.widget.opts.zIndex++})},_createBtns:function(){var c=this;this.tagpane=a('<div class="fs-tag-pane" style="width: 100%;height:30px;position: absolute;z-index: 2;"/>').appendTo(this.element);var b=a('<div class="fs-tab-btns fui-seb"/>').appendTo(this.tagpane);if(this.options.isCollapsible){a('<div class="fs-tab-back fui-bsb nav-btn"/>').append(a('<i class="icon-tab-dashboard"/>')).data("NAV",this.NAV.BACK).appendTo(b)}if(this.options.hasHomepageBtn){a('<div class="fs-tab-homepage fui-seb nav-btn"/>').append(a('<i class="icon-tab-home"/>')).data("NAV",this.NAV.HOMEPAGE).appendTo(b)
}this.$tabs=a('<ul class="fs-tab-names"/>').appendTo(b);a('<div class="fs-tab-more nav-btn"/>').append(a('<i class="icon-tab-menu"/>')).data("NAV",this.NAV.MORE).appendTo(b);this.$menu=a('<div class="fs-tab-menu-wrapper fui-bcb lower"/>').css({"top":this.options.tabHeight}).hide().appendTo(this.$float);var d=a('<div class="fs-tab-menu-options">').appendTo(this.$menu);a('<div class="fs-tab-menu-item nav-btn"/>').append(a("<span/>").text(FR.i18nText("FS-Frame-Full_Screen"))).data("NAV",this.NAV.FULLSCREEN).appendTo(d);
a('<div class="fs-tab-menu-item nav-btn"/>').append(a("<span/>").text(FR.i18nText("FS-Frame-Close_All"))).data("NAV",this.NAV.CLOSEALL).appendTo(d);a('<div class="fs-tab-menu-item nav-btn"/>').append(a("<span/>").text(FR.i18nText("FS-Frame-Close_Other_Tabs"))).data("NAV",this.NAV.CLOSEOTHER).appendTo(d);this.$menuItems=a('<ul class="fs-tab-menu-items"/>').appendTo(this.$menu);return b},_bindBtnEvts:function(){var c=this.NAV,b=this;var d=function(g){var h=g.target;var f=g.type;var i=a(h).closest(".nav-btn");
if(i&&i.length>0){var e=i.data("NAV");if(f==="mouseover"){switch(e){case c.CLOSEALL:case c.CLOSEOTHER:case c.FULLSCREEN:case c.EXITFULLSCREEN:case c.MOREITEM:i.addClass("fui-fbc fui-bsb");break;default:break}a(".icon-tab-close",i).show()}else{if(f==="mouseout"){switch(e){case c.CLOSEALL:case c.CLOSEOTHER:case c.FULLSCREEN:case c.EXITFULLSCREEN:case c.MOREITEM:i.removeClass("fui-fbc fui-bsb");break;default:break}a(".icon-tab-close",i).hide()}else{if(f==="click"){switch(e){case c.BACK:if(b.isFullScreen()){b.exitFullscreen()
}b.setExpand(!b.isExpanded());b._expandMenu(false);break;case c.HOMEPAGE:b.setExpand(true);b._doSelectHomepage();break;case c.MOREITEM:case c.ITEM:if(i.hasClass("fs-tab-menu-item")){i=b._findLoadedTabFromEntry(i.data("ENTRY"))}b._doSelectTab(i);b.setExpand(true);b._expandMenu(false);break;case c.MORE:b._expandMenu(true);break;case c.CLOSEALL:b._doCloseAllTabs();b._expandMenu(false);break;case c.CLOSEOTHER:b._doCloseOtherTabs();b._expandMenu(false);break;case c.FULLSCREEN:if(!b.isExpanded()){b.setExpand(true)
}b._displayFullScreen(true,i);b._expandMenu(false);break;case c.EXITFULLSCREEN:b._expandMenu(false);b._displayFullScreen(false,i);break;default:break}}}}}};this.$btns.unbind();this.$btns.bind("click",d).bind("mouseover",d).bind("mouseout",d);this.$float.unbind();this.$float.bind("click",d).bind("mouseover",d).bind("mouseout",d)},_doSelectTab:function(e){var b=this._getTabIndex(e);if(b<0){return}var d=this._getTabEntry(e);var c=e.data("CONTENT");if(FR.applyFunc(this,d.onSelect,[e,c,d],false)===false){FR.applyFunc(this,this.options.onSelectTab,[e,c,d],false)
}var f=this.visibleTabCount-1;if(b>f){this._moveTabByIndex(b,f)}if(!e.hasClass("select")){a(".select",this.$btns).removeClass("select fui-bsb");e.addClass("select fui-bsb")}if(c&&c.is(":hidden")){a(".fs-tab-content-item",this.$content).hide();c.show()}this._refreshMenu()},_doCloseTab:function(g){var k=this;var i=this._getTabIndex(g);var e=this._getSelectedTab();var d=this._getTabIndex(e);var b=g.data("CONTENT");if(b){var h=this._getTabEntry(g);var f=FR.applyFunc(this,h.onClose,[g,b,h],false);if(!f){f=FR.applyFunc(this,this.options.onCloseTab,[g,b,h],false)
}if(!f&&this._needToClose(b)){b.detach()}else{return}}var j=function(){var l=k._getTabIndex(g);g.remove();k.loadedEntries.splice(l,1);if(k.loadedEntries.length===0){if(k.options.hasHomepageBtn){k._doSelectHomepage()}else{var m=function(){if(k.loadedEntries.length===0){k.element.hide()}};k.setExpand(false,m)}}k._refreshMenu()};a(".fs-tab-item-dropdown-wrapper",k.$float).remove();g.animate({width:"-="+this.options.tabWidth},"fast",j);var c=null;if(i!==d){c=e}else{if(i+1<this.loadedEntries.length){c=this._getTabByIndex(i+1)
}else{c=this._getTabByIndex(this.loadedEntries.length-2)}}this._doSelectTab(c)},_needToClose:function(f){if(f.length>0&&f[0].contentWindow){if(f[0].nodeName==="IFRAME"){return true}var e=f[0].contentWindow;var b=e.onbeforeunload||(e.document&&e.document.body.onbeforeunload);if(a.isFunction(b)){var d=b.call();if(d){var c=window.confirm(d+"\n"+FR.i18nText("FS-Frame-Sure_To_Leave"));if(!c){return false}}}}return true},_doCloseAllTabs:function(){var b=this;if(b.isFullScreen()){b.exitFullscreen()}a.each(this.$tabs.children(),function(c,d){b._doCloseTab(a(d))
})},isFullScreen:function(){var b=false;if(document.msFullscreenElement!==undefined){b=document.msFullscreenElement!==null}else{b=document.fullscreen||document.webkitIsFullScreen||document.mozFullScreen}return b},exitFullscreen:function(){var b=document;if(b.webkitCancelFullScreen){b.webkitCancelFullScreen()}else{if(b.mozCancelFullScreen){b.mozCancelFullScreen()}else{if(b.cancelFullScreen){b.cancelFullScreen()}else{if(b.exitFullscreen){b.exitFullscreen()}else{if(b.msExitFullscreen){b.msExitFullscreen()
}else{FR.Msg.toast(FR.i18nText("FS-Frame-Full_Screen_Tip"))}}}}}},fullScreenEventsBind:function(){for(var c=0;c<a(".fs-tab-content-toolbar").size();c++){var b=a(".fs-tab-content-toolbar").eq(c).contents();a(".fs-tab-content-top-toolbar",b).bind("mouseenter",this.mouseEnterEvent).bind("mouseleave",this.mouseLeaveEvent)}this.tagpane.bind("mouseenter",this.mouseEnterEvent).bind("mouseleave",this.mouseLeaveEvent)},fullScreenEventsUnBind:function(){for(var c=0;c<a(".fs-tab-content-toolbar").size();c++){var b=a(".fs-tab-content-toolbar").eq(c).contents();
a(".fs-tab-content-top-toolbar",b).unbind()}this.tagpane.unbind()},_displayFullScreen:function(c,i){var e=this;var b=e.mouseEnterEvent=function(){if(e.timer){clearTimeout(e.timer)}e.$btns.show();e.$content.css("top","30px")};var d=e.mouseLeaveEvent=function(){if(e.timer){clearTimeout(e.timer)}e.timer=setTimeout(function(){e.$btns.hide();e.$content.css("top","0px")},1000)};var g=a(document).data("events");if(!g||!(g["fullscreenchange"]||g["webkitfullscreenchange"]||g["mozfullscreenchange"])){a(document).bind("fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange",function(){if(e.isFullScreen()){e.$content.css("top","0px");
i.children().text(FR.i18nText("FS-Frame-Exit_Full_Screen"));i.data("NAV",e.NAV.EXITFULLSCREEN);e.fullScreenEventsBind()}else{e.$content.css("top","30px");i.children().text(FR.i18nText("FS-Frame-Full_Screen"));i.data("NAV",e.NAV.FULLSCREEN);clearTimeout(e.timer);e.$btns.show();e.fullScreenEventsUnBind()}})}var f=e.element[0];var h=function(j){if(j.webkitRequestFullScreen){j.webkitRequestFullScreen();d()}else{if(j.mozRequestFullScreen){j.mozRequestFullScreen();d()}else{if(j.requestFullScreen){j.requestFullscreen();
d()}else{if(j.msRequestFullscreen){j.msRequestFullscreen();d()}else{FR.Msg.toast(FR.i18nText("FS-Frame-Full_Screen_Tip"))}}}}};if(c){h(f)}else{e.exitFullscreen()}},closeActiveTab:function(){this._doCloseTab(this._getSelectedTab())},_doCloseOtherTabs:function(){var b=this;var c=this._getSelectedTab();a.each(this.$tabs.children(),function(d,e){if(c.context!==e){b._doCloseTab(a(e))}})},_getSelectedTab:function(){var b=null;a.each(this.$tabs.children(),function(c,d){if(a(d).hasClass("select")){b=a(d);
return false}});return b},_getTabIndex:function(b){if(FR.isNull(b)){return -1}return a.inArray(b.get(0),this.$tabs.children())},_getTabByIndex:function(b){return a(this.$tabs.children().get(b))},_getTabEntry:function(b){return this.loadedEntries[this._getTabIndex(b)]},_moveTabByIndex:function(d,c){var b=this.$tabs.children();b.splice(c,0,b.splice(d,1)[0]);this.$tabs.append(b);this.loadedEntries.splice(c,0,this.loadedEntries.splice(d,1)[0])},_addNewTabFromEntry:function(d){var c=this;var e=a('<li class="fs-tab-item nav-btn"/>').data("NAV",this.NAV.ITEM).hover(function(){a(".fs-tab-item-dropdown-wrapper",c.$float).remove();
if(a(this).hasClass("select")&&c.isExpanded()){var g={top:c.options.tabHeight,left:a(this).offset().left-c.element.offset().left};var f=c._createTabDropdownWrapper(d).offset(g).appendTo(c.$float);f.data("TAB",a(this))}},function(){}).appendTo(this.$tabs);e.outerWidth(this.currentTabWidth);var b=a('<div class="fs-tab-item-label">').outerWidth(this.currentTabWidth-20).append(a("<span/>").text(d.text).attr("title",d.text)).appendTo(e);a('<i class="icon-tab-close"/>').click(function(f){c._doCloseTab(a(this).closest(".fs-tab-item"));
f.stopEvent()}).hide().appendTo(b);if(FR.applyFunc(this,d.onCreate,[e,d],false)===false){FR.applyFunc(this,this.options.onCreateTab,[e,d],false)}this.loadedEntries.push(d);this._resizeTabs();this._doSelectTab(e);return e},_createHomepageBtn:function(){var b=this;if(this.options.hasHomepageBtn){var c=FS.config.homePageUrl;var d=a(".fs-tab-homepage.nav-btn",this.$btns);d.hover(function(){a(".fs-tab-item-dropdown-wrapper",b.$float).remove();if(a(this).hasClass("select")&&b.isExpanded()){var f={top:b.options.tabHeight,left:a(this).offset().left-b.element.offset().left-45};
var e=b._createTabDropdownWrapper().offset(f).addClass("homepage-drop").appendTo(b.$float);e.data("TAB",a(this))}},function(){});a(".fs-tab-content-item",this.$content).hide();this.setExpand(true,function(){var e=a('<iframe class="fs-tab-content-item"/>').attr("src",encodeURI(FS.Trans._dealWithSrc(c))).appendTo(b.$content);d.data("CONTENT",e);b._doSelectHomepage()})}},_doSelectHomepage:function(){var c=a(".fs-tab-homepage.nav-btn",this.$btns);if(!c.hasClass("select")){a(".select",this.$btns).removeClass("select fui-bsb");
c.addClass("select fui-bsb")}var b=c.data("CONTENT");if(b&&b.is(":hidden")){a(".fs-tab-content-item",this.$content).hide();b.show()}},_createTabDropdownWrapper:function(e){var d=this;var c=false;if(e&&e.id){c=this._isEntryStarred(e)}var g=1;var f=a('<div class="fs-tab-item-dropdown-wrapper"/>').css({"position":"absolute","left":e?this.dropdownLeft:0,"z-Index":FR.widget.opts.zIndex++});if(e&&!e.isModule&&e.showFavorite!=="no"){g++}var h=a('<div class="fs-tab-item-dropdown"/>').appendTo(f);a('<span class="arrow"/>').appendTo(f);
this._createRefreshBtn().appendTo(h);if(g>1){h.addClass("double-size");a('<span class="splitter"/>').appendTo(h);this._createStarBtn(c).appendTo(h);if(FR.i18nTextWidth("FS-Frame-Button_Unstar")>48){h.css("width","171px");a(".dropdown-star",h).css("width","95px")}}var b=function(i){if(!a(i.target).closest(".fs-tab-item-dropdown-wrapper").length>0&&!a(i.target).closest(".nav-btn.select").length>0){a(".fs-tab-item-dropdown-wrapper",d.$float).remove();a("body").unbind()}};a("body").bind("mouseover",b);
return f},_isEntryStarred:function(c){var b=false;a.each(FS.Control.getFavoriteNodes(),function(d,e){if(e.entry.id===c.id){b=true;return false}});return b},_getFavoriteNodeByEntry:function(b){var c=null;a.each(FS.Control.getFavoriteNodes(),function(d,e){if(e.entry.id===b.id){c=e;return false}});return c},_createDropdownBtn:function(c){var b=this;return a('<div class="fs-tab-item-dropdown-btn"/>').addClass(c.btnCls).append(a("<i/>").addClass(c.iconCls)).append(a("<span/>").text(c.text)).click(function(g){var f=a(this).closest(".fs-tab-item-dropdown-wrapper").data("TAB");
var d=b.loadedEntries[b._getTabIndex(f)];c.op(g,f,d)})},_createRefreshBtn:function(){var b=this;var c={"btnCls":"dropdown-refresh","iconCls":"icon-tab-refresh","text":FR.i18nText("FS-Frame-Button_Refresh"),"op":function(f,d){b._refreshTab(d);a(".fs-tab-item-dropdown-wrapper",d).eq(0).hide()}};return this._createDropdownBtn(c)},_refreshTab:function(e,g){var c=e.data("CONTENT");var b=e.data("COMPLETE");if(c&&c.size()>0){var f=c[0];if(f&&f.src){f.src=g?encodeURI(g):f.src;FR.applyFunc(self,b,[c],false)
}else{if(a(f).hasClass("fs_design_container")){var d=this._getTabEntry(e);d.contentEl.children().remove();this._loadPlainPaneFromEntry(d,e)}}}},_createStarBtn:function(b){var c=this;var e={"btnCls":"dropdown-star","iconCls":"icon-tab-star","op":function(k,i,h){var j=k.target;var g=a(j).closest(".fs-tab-item-dropdown-btn");if(!h&&!h.id){k.stopEvent();return}if(g&&g.length>0){var l=g.data("isStarred");if(l===true){var f=c._getFavoriteNodeByEntry(h);if(f!==null){FS.Control.removeFavoriteNode(f.id,function(){c._replaceStarBtn(!l)
})}}else{FS.Control.addFavoriteNode(h,function(){c._replaceStarBtn(!l)})}}k.stopEvent()}};e.text=b?FR.i18nText("FS-Frame-Button_Unstar"):FR.i18nText("FS-Frame-Button_Star");var d=this._createDropdownBtn(e);a(".icon-tab-star",d).html(b?"\ue603":"\ue61e");d.data("isStarred",b);return d},_replaceStarBtn:function(c){var e=this.$float.find(".dropdown-star");if(e.data("isStarred")!==c){var d=a(".icon-tab-star",e);var b=a("span",e);if(c){d.html("\ue603");b.text(FR.i18nText("FS-Frame-Button_Unstar"))}else{d.html("\ue61e");
b.text(FR.i18nText("FS-Frame-Button_Star"))}e.data("isStarred",c)}},_findLoadedTabFromEntry:function(c){var b=this;var d=null;a.each(b.loadedEntries,function(e,f){if(b._compareEntry(c,f)){d=a(b.$tabs.children()[e]);return false}});return d},_compareEntry:function(c,b){if(FR.isNull(c)||FR.isNull(b)){return c==undefined&&b==undefined||c==null&&b==null}if(c===b){return true}else{if(typeof c=="object"&&typeof b=="object"){if(FR.isNull(c.id)){return c.text===b.text}else{return c.id===b.id}}}return false
},_expandMenu:function(d,e){var c=this;var b=this._isMenuExpanded();if(this.isFullScreen()){if(d){clearTimeout(c.timer);c.$btns.show();c.fullScreenEventsUnBind()}else{if(b){c.fullScreenEventsBind();c.mouseLeaveEvent()}}}if(d===b){return}e=e||50;if(d){this.$contentMask.show();this.$menu.css({"z-Index":FR.widget.opts.zIndex++}).slideDown(e)}else{this.$contentMask.hide();this.$menu.slideUp(e)}},_isMenuExpanded:function(){return this.$menu.is(":visible")},_refreshMenu:function(){var b=this;var c=this.loadedEntries.slice(this.visibleTabCount);
this.$menu.children(".slimScrollDiv").detach();this.$menu.children(".fs-tab-menu-items").detach();this.$menuItems=a('<div class="fs-tab-menu-items"/>').appendTo(this.$menu);var d=this.element.height()-100;var e=0;a.each(c,function(g,h){e+=30;var f=b._addMenuItemFromEntry(h);b.$menuItems.append(f)});if(e>d){this.$menuItems.slimScroll({position:"relative",height:d+"px"})}},_addMenuItemFromEntry:function(d){var b=this;var c=a('<a class="fs-tab-menu-item nav-btn"/>').data("NAV",this.NAV.MOREITEM).data("ENTRY",d).appendTo(this.$menuItems);
a("<span/>").text(d.text).attr("title",d.text).appendTo(c);a('<i class="icon-tab-close"/>').click(function(h){var f=a(this).closest(".fs-tab-menu-item");var g=b._findLoadedTabFromEntry(f.data("ENTRY"));b._doCloseTab(g);h.stopEvent()}).hide().appendTo(c);return c},_loadIframePaneFromEntry:function(e,f){var d,c="",b=this;this.element.show();if(e.src){d=e.src}else{if(e.bilink){d=e.bilink}else{if(e.url){d=e.url;FR.ajax({async:false,data:{serverID:FS.serverID},url:FR.servletURL+"?op=fs_main&cmd=entry_report&id="+e.id+"&isTree=true",complete:function(i,h){c=(d.indexOf("?")>-1?"&":"?")+"fr_check_url="+i.responseText
}})}}}var g=d?d+c:"?op=fs_main&cmd=entry_report&id="+e.id;if(e.bi_edit){g+="&edit=_bi_edit_"}if(FS.serverID){g+=("&serverID="+FS.serverID)}a(".fs-tab-content-item",this.$content).hide();this.setExpand(true,function(){var h=a('<iframe class="fs-tab-content-item fs-tab-content-toolbar"/>').attr("src",encodeURI(g)).appendTo(b.$content);f.data("CONTENT",h);f.data("COMPLETE",e.afterLoad);b._doSelectTab(f);if(FR.applyFunc(b,e.afterLoad,[f,h,e],false)===false){FR.applyFunc(b,b.options.afterLoadTab,[f,h,e],false)
}})},_loadPlainPaneFromEntry:function(c,d){var b=this;this.element.show();a(".fs-tab-content-item",this.$content).hide();this.setExpand(true,function(){var e=a('<div class="fs-tab-content-item"/>');if(c.contentEl){e=c.contentEl.addClass("fs-tab-content-item").appendTo(b.$content)}d.data("CONTENT",e);d.data("COMPLETE",c.afterLoad);b._doSelectTab(d);if(FR.applyFunc(b,c.afterLoad,[d,e,c],false)===false){FR.applyFunc(b,b.options.afterLoadTab,[d,e,c],false)}})},doResize:function(b){if(b){this.element.width(b.width).height(b.height)
}this._resizeTabs(b)},isExpanded:function(){return this.isExpand},setExpand:function(b,d){if(this.isExpand==b){FR.applyFunc(this,d,[],false);return}if(!b&&!this.options.isCollapsible){this.element.hide();return}if(b&&this.element.is(":hidden")&&this.loadedEntries.length>0){this.element.show()}this.isExpand=b;var c=0;if(!b){c=this.element.height()-this.options.tabHeight}this.element.animate({top:c},"fast",d);if(b){this.$menu.css({"top":this.options.tabHeight});this.$contentMask.css({"top":0})}else{this.$menu.css({"top":-this.$menu.height()-2});
this.$contentMask.css({"top":this.options.tabHeight-document.body.clientHeight})}},addItem:function(c){if(!c.text){c.text=c.title}var d=this._findLoadedTabFromEntry(c);if(d===null){d=this._addNewTabFromEntry(c)}else{this._doSelectTab(d);this._refreshTab(d,c.src);this.setExpand(true);return}if(c.isModule){var b=a("<div/>").addClass("fs_design_container");c.contentEl=b;FS.Design.initOP();var e=FS.Design.op;c.afterLoad=function(){if(e[c.id]){e[c.id].apply(FS.Design,[b])}};this._loadPlainPaneFromEntry(c,d)
}else{if(c.contentEl){this._loadPlainPaneFromEntry(c,d)}else{this._loadIframePaneFromEntry(c,d)}}}})})(jQuery);
/*
 * Copyright (c) 2001-2014,FineReport Inc, All Rights Reserved.
 */


/**
 * 开关控件
 *
 *      @example
 *      var $div = $('<div>').appendTo('body');
 *      var button = new FS.SwitchButton({
 *              renderEl : $div,
 *              value : true
 *      });
 *
 * @class FS.SwitchButton
 * @extends FR.Widget
 */
FS.SwitchButton = FR.extend(FR.Widget, {
    _defaultConfig: function () {
        return $.extend(FS.SwitchButton.superclass._defaultConfig.call(), {
            width: 128,
            height: 25,
            value: false,
            hoverCls: "fs_siwthbutton_hover",
            onTurnOn: function () {
                return true;
            },
            onTurnOff: function () {
                return true;
            }
        });
    },

    _init: function () {
        FS.SwitchButton.superclass._init.apply(this, arguments);
        var self = this;
        var o = this.options;
        var buttonBody = $("<div/>").attr("id", "fs_switchbutton_body").appendTo(this.element);
        var leftPart = $("<div/>").attr("id", "fs_switchbutton_left").appendTo(buttonBody)
            .hover(function () {
                if (!self.options.value) {
                    $(buttonBody).addClass(o.hoverCls);
                }
            }, function () {
                $(buttonBody).removeClass(o.hoverCls);
            }).click(function () {
                $(buttonBody).removeClass(o.hoverCls);
                if (FR.applyFunc(self, o.onTurnOn, [], false) !== false) {
                    self.setValue(true);
                }
            });
        var rightPart = $("<div/>").attr("id", "fs_switchbutton_right").appendTo(buttonBody)
            .hover(function () {
                if (self.options.value) {
                    $(buttonBody).addClass(o.hoverCls);
                }
            }, function () {
                $(buttonBody).removeClass(o.hoverCls);
            }).click(function () {
                $(buttonBody).removeClass(o.hoverCls);
                if (FR.applyFunc(self, o.onTurnOff, [], false) !== false) {
                    self.setValue(false);
                }
            });
        this.textAreaL = $("<div/>").addClass("fs_switchbutton_textarea").appendTo(leftPart);
        this.textAreaR = $("<div/>").addClass("fs_switchbutton_textarea").appendTo(rightPart);
        this.setValue(this.options.value);
    },

    /**
     * 更新按钮状态
     * @private
     */
    _refreshButton: function () {
        if (this.options.value) {
            //开启状态
            this.element.removeClass("fs_switchbutton_off");
            this.element.addClass("fs_switchbutton_on");
            this.textAreaL.text(FR.i18nText("FS-Generic-Simple_Opened"));
            this.textAreaR.text(FR.i18nText("FS-Generic-Turn_Off"));
        } else {
            //关闭状态
            this.element.removeClass("fs_switchbutton_on");
            this.element.addClass("fs_switchbutton_off");
            this.textAreaL.text(FR.i18nText("FS-Generic-Turn_On"));
            this.textAreaR.text(FR.i18nText("FS-Generic-Simple_Closed"));
        }
    },

    /**
     * 设置按钮开启/关闭
     */
    setValue: function (value) {
        var o = this.options;
        o.value = value;
        this._refreshButton();
        if (arguments[1] === true) {
            if (value) {
                if ($.isFunction(o.onTurnOn)) {
                    o.onTurnOn.call();
                }
            } else {
                if ($.isFunction(o.onTurnOff)) {
                    o.onTurnOff.call();
                }
            }
        }
    },

    /**
     * 获取按钮是否选中
     */
    getValue: function () {
        return this.options.value;
    }
});
$.shortcut("switch", FS.SwitchButton);

/**
 * 决策平台中所是用的Tab控件，用于展示多标签页
 *
 * @class FS.LTabPane
 * @extends FR.Widget
 */
FS.LTabPane = FR.extend(FR.Widget, {
    _defaultConfig: function () {
        return $.extend(FS.LTabPane.superclass._defaultConfig.call(), {
            height: 500,
            width: 400,
            headerCls: 'fs_ltabpane_tabs',
            baseCls: 'fs_ltabpane',
            tabsCls: 'fs_ltabpane_tabs_general',//选项卡标签类，用于管理标签普通样式
            selectedTabCls: 'fs_ltabpane_tabs_selected',//被选中的标签类
            hoverTabCls: 'fs_ltabpane_tabs_hover',//悬浮在选项卡标签上的效果类
            unselectedContentCls: 'fs_ltabpane_content_unselected',//隐藏的选项卡内容类
            selectedContentCls: 'fs_ltabpane_content_selected',//显示的选项卡内容类
            defaultIdx: 0,//初始化时，默认选中的标签,默认为第一个标签
            type: "ltabpanel",
            style: null,
            items: [],
            vgap: 25, //整个标签部分与内容部分的上下间距
            initAfterActions: [],  //标签第一次被点击后才开始加载内部元素，首次加载后事件
            initAfterAction: null, //标签第一个被点击时的事件，参数为点击的tab索引
            opAfterActions: [],  //标签每一次被点击后的操作
            tabLeft: 21,    //标签的left属性，21为第一个标签的left
            tabDistance: 35,
            marginLeft: 20
        });
    },
    _init: function () {
        FS.LTabPane.superclass._init.apply(this, arguments);
        var o = this.options;
        var self = this;
        if (o.widgetName) {
            this.element.attr("widgetName", o.widgetName);
        }
        this.element.addClass(o.baseCls);
        var n = o.items.length;
        //标签部分
        if (n > 0) {
            this.tabs = $('<div/>').addClass(o.headerCls);
            this.tabs.appendTo(this.element);
        }
        this.tabs.css('margin-bottom', o.vgap + 'px');
        //内容部分
        for (var i = 0; i < n; i++) {
            var tabDiv = this._createTabDiv(i);
            //注册点击事件
            tabDiv.on('click', function () {
                self.tabDivOnClick(this);
            });
            //注册悬浮事件
            tabDiv.on('mouseover', function () {
                //被选中的标签无hover效果
                if ($(this).hasClass(o.selectedTabCls)) {
                    return;
                }
                $(this).addClass(o.hoverTabCls);
            });
            //注册移出事件
            tabDiv.on('mouseout', function () {
                $(this).removeClass(o.hoverTabCls);
            });
            tabDiv.appendTo(this.tabs);
            var tabOuterWidth = tabDiv.outerWidth();
            if (o.items[i].width) {
                tabOuterWidth = o.items[i].width;
            }
            o.tabLeft += tabOuterWidth + o.tabDistance;
        }
        this.tabs.find('.' + o.tabsCls + '[tabindex=' + o.defaultIdx + ']').trigger('click');
    },

    tabDivOnClick: function (tabElement) {
        //点击后标签切换
        var o = this.options;
        if ($(tabElement).hasClass(o.selectedTabCls)) {
            return false;
        }
        this.removeSelected();
        var tabindex = $(tabElement).attr("tabindex");
        $(tabElement).addClass(o.selectedTabCls);
        //点击后内容切换
        this._contentSwitchTo(tabindex);
        return true;
    },

    _createTabDiv: function (index) {
        var o = this.options;
        return $('<div/>').attr('tabindex', index)
            .attr('unselectable', 'on')
            .css({left: o.tabLeft})
            .addClass(o.tabsCls).text(o.items[index].title);
    },

    removeSelected: function () {
        var o = this.options;
        var $selected = this.tabs.find('.' + o.selectedTabCls);
        if ($selected.length > 0) {
            $selected.css({left: $selected.get(0).oldValue});
            $selected.removeClass(o.selectedTabCls);
        }
    },

    getSelectedIndex: function () {
        var o = this.options;
        var selected = this.tabs.find('.' + o.selectedTabCls);
        if (selected.length > 0) {
            return parseInt(selected.attr("tabindex"));
        }
        return null;
    },

    /**
     * 点击标签后内容进行切换
     * @param idx : tab的下标
     */
    _contentSwitchTo: function (idx) {
        var o = this.options;
        if (!this._isLoaded(idx) || this.options.loadEveryTime === true) {
            this.element.children('div[contentindex=' + idx + ']').remove();
            var contentPane = $('<div/>')
                .attr('contentindex', idx)
                .css({'margin-left': o.marginLeft})
                .addClass(o.selectedContentCls)
                .appendTo(this.element);
            if (o.items[idx].content instanceof $) {
                o.items[idx].content.appendTo(contentPane);
            } else {
                o.items[idx].content.renderEl = contentPane;
                o.items[idx].content.style = o.style;   //往下传递style属性，以后可以用来统一样式
                this.container = FR.createWidget($.extend(o.items[idx].content, {
                    resultWidgets: this.options.resultWidgets
                }));
            }
            if ($.isFunction(o.initAfterActions[idx])) {
                o.initAfterActions[idx].apply(this);
            }
            if ($.isFunction(o.initAfterAction)) {
                o.initAfterAction.apply(this, [idx]);
            }
        }
        if ($.isFunction(o.opAfterActions[idx])) {
            o.opAfterActions[idx].apply(this);
        }
    },

    /**
     * 判断tab是否已经被加载过了
     * @param idx : tab的下标
     * @return boolean
     */
    _isLoaded: function (idx) {
        var o = this.options;
        var content = this.element.children('div[contentindex=' + idx + ']');
        //隐藏
        this.element.children('.' + o.selectedContentCls).addClass(o.unselectedContentCls).removeClass(o.selectedContentCls);
        //如果不是第一次加载，则直接显示；否则开始动态加载内容
        if (content.length !== 0) {
            //显示
            content.removeClass(o.unselectedContentCls).addClass(o.selectedContentCls);
            return true;
        }
        return false;
    }
});
$.shortcut("ltab", FS.LTabPane);

/**
 * 决策平台中各个标签页内部用到的Tab控件
 * @class FS.InsideTabPane
 * @extends FS.LTabPane
 */
FS.InsideTabPane = FR.extend(FS.LTabPane, {
    _defaultConfig: function () {
        return $.extend(FS.InsideTabPane.superclass._defaultConfig.call(), {
            baseCls: 'fs_inside_tabpane',
            headerCls: 'fs_inside_tab_header',
            tabsCls: 'fs_inside_tab',
            selectedTabCls: 'fs_inside_tab_selected',
            selectedContentCls: 'fs_inside_content_selected',
            tabNoRightBorderCls: 'fs_inside_tab_no_right_border',
            tabNoLeftBorderCls: 'fs_inside_tab_no_left_border',
            tabLeft: 0,    //标签的left属性，21为第一个标签的left
            tabDistance: 0,
            vgap: 0,
            marginLeft: 0,
            elementMarginLeft: 0
        });
    },

    _init: function () {
        FS.InsideTabPane.superclass._init.call(this, arguments);
        if (this.options.elementMarginLeft) {
            this.element.css('marginLeft', this.options.elementMarginLeft);
        }
    },

    tabDivOnClick: function (tabElement) {
        var o = this.options;
        var tabindex = parseInt($(tabElement).attr("tabindex"));
        if (o.items[tabindex].keepActive === true) {
            return;
        }
        var activeChanged = FS.InsideTabPane.superclass.tabDivOnClick.call(this, arguments);
        if (!activeChanged) {
            return;
        }
        if (o.afterTabClick && $.isFunction(o.afterTabClick[tabindex])) {
            o.afterTabClick[tabindex].apply(this);
        }
        var nextTab = o.items[tabindex + 1];
        var keepActiveTab;
        if (nextTab && nextTab.keepActive === true) {
            //下一个如果是一直激活状态的话，中间的border去掉。
            $(tabElement).addClass(o.tabNoRightBorderCls);
            keepActiveTab = this.tabs.find('.' + o.tabsCls + '[tabindex=' + (tabindex + 1) + ']');
            keepActiveTab.addClass(o.tabNoLeftBorderCls);
            this.fixTabWidth(keepActiveTab, false, true);
        } else if (nextTab) {
            //先简单处理，目前使用的一直保持激活态的tab都在最右
            keepActiveTab = this.tabs.find('.' + o.tabNoLeftBorderCls);
            if (keepActiveTab.length > 0) {
                this.fixTabWidth(keepActiveTab, true, true);
            }
            this.tabs.find('.' + o.tabsCls).removeClass(o.tabNoRightBorderCls);
            this.tabs.find('.' + o.tabsCls).removeClass(o.tabNoLeftBorderCls);
        }
        this.fixTabWidth($(tabElement), true);
    },

    fixTabWidth: function (element, isGetActive, isKeepActive) {
        var o = this.options;
        var width = element.width();
        if (isGetActive) {
            //变成激活态的tab，宽度-2/-1
            if (isKeepActive || element.hasClass(o.tabNoRightBorderCls) || element.hasClass(o.tabNoRightBorderCls)) {
                element.width(width - 1);
            } else {
                element.width(width - 2);
            }
        } else {
            //失去激活态的tab，宽度+2/+1
            if (isKeepActive || element.hasClass(o.tabNoRightBorderCls) || element.hasClass(o.tabNoRightBorderCls)) {
                element.width(width + 1);
            } else {
                element.width(width + 2);
            }
        }
    },

    _createTabDiv: function (index) {
        var o = this.options;
        var keepActive = this.isTabKeepActive(index);
        var tabDiv = $("<div/>").attr('tabindex', index)
            .attr('unselectable', 'on').attr('keepActive', keepActive)
            .css({left: o.tabLeft}).addClass(o.tabsCls);
        if (o.items[index].title instanceof $) {
            tabDiv.append(o.items[index].title);
        } else {
            tabDiv.text(o.items[index].title);
        }
        if (keepActive) {
            tabDiv.addClass(o.selectedTabCls);
        }
        if (o.items[index].width) {
            //放到布局里，布局没在页面呈现前就开始初始化里面的控件了，outerWidth根本就取不到啊... 先这么处理了。
            tabDiv.width(o.items[index].width - (o.items[index].borderWidth ? o.items[index].borderWidth : 0));
        }
        return tabDiv;
    },

    removeSelected: function () {
        var o = this.options;
        var $selected = this.tabs.find('.' + o.selectedTabCls);
        if ($selected.length > 0) {
            for (var i = 0, len = $selected.length; i < len; i++) {
                var selectedElement = $($selected.get(i));
                selectedElement.css({left: $selected.get(i).oldValue});
                if (selectedElement.attr("keepActive") != "true") {
                    selectedElement.removeClass(o.selectedTabCls);
                    this.fixTabWidth(selectedElement, false);
                }
            }
        }
    },

    isTabKeepActive: function (index) {
        return this.options.items[index].keepActive === true;
    },

    getActiveIndex: function () {
        var o = this.options;
        return parseInt(this.tabs.find('.' + o.selectedTabCls).attr("tabindex"));
    },

    getActiveTab: function () {
        var o = this.options;
        return this.element.find('.' + o.selectedContentCls);
    }
});
$.shortcut("insidetab", FS.InsideTabPane);

/**
 * 下拉设置面板
 * @class FS.FloatPane
 * @extends FR.Widget
 */
FS.FloatPane = FR.extend(FR.Widget, {
    _defaultConfig: function () {
        return $.extend(FS.FloatPane.superclass._defaultConfig.apply(this, arguments), {
            baseCls: 'fs-floatpane',
            width: 815,
            anchor: null,
            confirm: true,
            contentWidget: null,
            contentHeight: 260
        });
    },
    _init: function () {
        FS.FloatPane.superclass._init.apply(this, arguments);
        var o = this.options, self = this;
        this.element.appendTo(o.anchor);
        this.$content = $('<div class="fs-floatpane-content"/>')
            .css({
                height: o.contentHeight,
                width: o.width - 10
            }).hide().appendTo(this.element);
        var widget = FR.createWidget($.extend(o.contentWidget, {
            renderEl: $('<div/>').appendTo(this.$content),
            resultWidgets: o.resultWidgets
        }));
        var settingsMarginLeft = parseInt(FR.i18nText("FS-System-Settings_Button_Margin_Left") || 55);
        var settingsButtonWidth = parseInt(FR.i18nText("FS-System-Settings_Button_Width") || 50);
        var $btn = $('<div class="fs-floatpane-btn"/>').css({
            'margin-left': o.width - settingsMarginLeft,
            width: settingsButtonWidth
        }).click(
            function () {
                self.doSlide();
            }
        ).appendTo(this.element);
        this.$icon = $('<a class="fs-floatpane-icon fs-floatpane-down"/>').text(FR.i18nText("FS-System-Simple_Settings")).appendTo($btn);
    },
    doSlide: function () {
        this.$icon.switchClass("fs-floatpane-down", "fs-floatpane-up");
        this.$content.slideToggle('fast');
    }
});
$.shortcut('floatpane', FS.FloatPane);

/**
 * 下拉展开控件
 *
 *      @example
 *      var $div = $('<div style="position:absolute;width:400px;height:400px">').appendTo('body');
 *      var accordion = new FS.Accordion({
 *          renderEl : $div,
 *          items : [
 *              {
 *                  menu : '选项一',
 *                  content : {
 *                      type : 'llabel',
 *                      value : '选项一的内容'
 *                  }
 *              },
 *              {
 *                  menu : '选项二',
 *                  content : {
 *                      type : 'llabel',
 *                      value : '选项二的内容'
 *                  }
 *              }
 *          ]
 *      });
 *
 * @class FS.Accordion
 * @extends FR.Widget
 */
FS.Accordion = FR.extend(FR.Widget, {
    _defaultConfig: function () {
        return $.extend(FS.Accordion.superclass._defaultConfig.apply(this, arguments), {
            baseCls: 'fs-accordion',
            width: 731,
            items: []
        });
    },
    _init: function () {
        FS.Accordion.superclass._init.apply(this, arguments);
        var o = this.options;
        for (var i = 0, len = o.items.length; i < len; i++) {
            var menu = o.items[i].menu;
            var content = o.items[i].content;
            var $menu = $('<div/>').addClass('fs-accordion-menu').click(
                function () {
                    $(this).children('div').toggleClass('fs-accordion-icon-fold');
                    $(this).next().slideToggle('fast');
                }
            ).appendTo(this.element);
            $('<div/>').addClass('fs-accordion-icon-unfold').appendTo($menu);
            $('<span/>').text(menu).appendTo($menu);
            var $context = $('<div/>').addClass('fs-accordion-content').hide().appendTo(this.element);
            var widget = FR.createWidget($.extend(content, {
                resultWidgets: o.resultWidgets
            }));
            widget.element.appendTo($context);
        }
    }
});
$.shortcut('accordion', FS.Accordion);

/**
 * 表格容器面板，主要为了解决是用TableLayout效率问题
 *
 *      @example
 *      var $div = $('<div style="position:absolute;width:400px;height:400px">').appendTo('body');
 *      var table = new FS.TablePane({
 *          renderEl : $div,
 *          rowSize : [30, 30],
 *          colSize : [120, 'fill'],
 *          items : [
 *              [{type : 'llabel', value : '第一行'}, {type : 'text', value : '用户名1'}],
 *              [{type : 'llabel', value : '第二行'}, {type : 'text', value : '用户名2'}],
 *              [{type : 'llabel', value : '第三行'}, {type : 'text', value : '用户名3'}]
 *          ]
 *      });
 *
 * @class FS.TablePane
 * @extends FR.Widget
 */
FS.TablePane = FR.extend(FR.Widget, {
    _defaultConfig: function () {
        return $.extend(FS.TablePane.superclass._defaultConfig.apply(this, arguments), {
            rowSize: [],
            colSize: [],
            hgap: 0,
            vgap: 0,
            items: []
        });
    },
    _init: function () {
        FS.TablePane.superclass._init.apply(this, arguments);
        this.$rows = [];
        var o = this.options;
        for (var i = 0, size = o.rowSize.length; i < size; i++) {
            var $row = $('<div class="fr-tablepane-row"/>').appendTo(this.element);
            var utem = o.items[i];
            if (utem.style) {
                $row[0].style.cssText = utem.style;
            }
            for (var j = 0, len = o.colSize.length; j < len; j++) {
                var $cell = $('<div class="fr-tablepane-item"/>').appendTo($row);
                var item = o.items[i][j];
                if (!item) {
                    continue;
                }
                if (item.style) {
                    $cell[0].style.cssText = item.style;
                }
                if (!item.type) {
                    $cell.css({width: o.colSize[j], height: o.rowSize[i]}).append(item);
                } else {
                    var widget = FR.createWidget($.extend(item, {
                        resultWidgets: this.options.resultWidgets,
                        width: item.width ? item.width : o.colSize[j],
                        height: item.height ? item.height : o.rowSize[i],
                        renderEl: $cell
                    }));
                }
                if (i > 0) {
                    $cell.css({'margin-left': o.hgap});
                }
            }
            if (i > 0) {
                $row.css({'margin-top': o.vgap});
            }
            this.$rows.push($row);
        }
    },
    /**
     * 获取指定行的dom元素
     * @param index 行索引，从0开始
     */
    getRowAt: function (index) {
        return this.$rows[index];
    },

    /**
     * 设置指定的行的可见性
     * @param {Array} rowIdxs 需要改变可见性的行编号组成的数组
     * @param {Boolean} isVisible 是否可见
     */
    setRowVisible: function (rowIdxs, isVisible) {
        for (var i = 0, len = rowIdxs.length; i < len; i++) {
            if (isVisible) {
                this.$rows[rowIdxs[i]].show();
            } else {
                this.$rows[rowIdxs[i]].hide();
            }
        }
    }
});
$.shortcut('tablepane', FS.TablePane);

/**
 * 决策平台下可对单独选项禁用选取的多选组合框
 *
 *      @example
 *      var $div = $('<div style="position:absolute;width:400px;height:400px">').appendTo('body');
 *      var button = new FS.FSCheckBoxGroup({
 *              renderEl : $div,
 *              items : [{text : "第一", value : '0', text : "第二", value : '1'}]
 *      });
 *
 * @class FS.FSCheckBoxGroup
 * @extends FR.CheckBoxGroup
 */
FS.FSCheckBoxGroup = FR.extend(FR.CheckBoxGroup, {
    _init: function () {
        FS.FSCheckBoxGroup.superclass._init.apply(this, arguments);
    },

    _setItems: function (items) {
        var records = items || [];
        var self = this;
        $.each(records, function (idx, it) {
            if (self.options.adaptive) {
                var outter = $("<span></span>")
                    .addClass(self.sbox_class)
                    .appendTo(self.$container);
            } else {
                var outter = $("<span/>").addClass(self.sbox_class);
                var gridElement = {
                    column: idx % self.gridConfig.columns,
                    row: Math.floor(idx / self.gridConfig.columns),
                    el: outter
                };
                self.gridConfig.items.push(gridElement);
            }
            self.buttonArray[idx] = new FR.CheckBox({
                renderEl: $("<div/>").appendTo(outter),
                disabled: self.options.disabled || it.options.data.disabled,
                text: it.getShowValue(),
                fieldValue: it.getValue(),
                sessionID: self.options.sessionID,
                widgetName: self.options.widgetName,
                fontSize: self.options.fontSize
            });
            self.buttonArray[idx].on(FR.Events.BEFORESTATECHANGE,
                function () {
                    self.fireEvent(FR.Events.BEFORESTATECHANGE);
                });
            self.buttonArray[idx].on(FR.Events.STATECHANGE, function () {
                self.fireEvent(FR.Events.STATECHANGE, idx, this
                    .selected());
                if (self.options.chooseAll) {
                    var selectedItems = $('.fr-checkbox-checkon', self.$container);
                    var checkonCount = selectedItems.length - self.innerCheckBox.isSelected();
                    if (checkonCount === self.buttonArray.length) {
                        self.innerCheckBox.setSelectedWithoutEvent(true);
                    } else {
                        self.innerCheckBox.setSelectedWithoutEvent(false);
                    }
                }
                self.fireEvent(FR.Events.AFTEREDIT);
            });
        });
        this._checkChooseAll();
    }
});
$.shortcut('fscheckboxgroup', FS.FSCheckBoxGroup);


/**
 * 决策平台管理页面经常需要使用的标签，用于显示一般的文字
 *
 *      @example
 *      var $div = $('<div>').appendTo('body');
 *      var button = new FS.LLabel({
 *              renderEl : $div,
 *              value : "我是一个标签"
 *      });
 *
 * @class FS.LLabel
 * @extends FR.Label
 */
FS.LLabel = FR.extend(FR.Label, {
    _defaultConfig: function () {
        return $.extend(FS.LLabel.superclass._defaultConfig.call(), {
            levelStyle: 2,   //默认为二级标题，因为在FS中使用更为频繁
            firstStyleWidth: 730, //一级标题下划线长度
            verticalcenter: true,
            style: null
        });
    },

    _init: function () {
        var opts = this.options;
        switch (opts.levelStyle) {
            case 0:
                break;
            case 1:
                opts.fontfamily = 'SimSun';
                opts.color = '#676767';
                opts.fontsize = '14px';
                break;
            case 2:
                opts.fontfamily = 'Microsoft YaHei,STXihei,SimSun,sans-serif';
                opts.color = '#202020';
                opts.fontsize = '13px';
                break;
            default:
                break;
        }
        FS.LLabel.superclass._init.apply(this, arguments);
        if (opts.levelStyle === 1) {
            this.element.addClass('first_level_style');
            this.element.css('width', opts.firstStyleWidth);
        }
    }
});
$.shortcut("llabel", FS.LLabel);

/**
 * 可刷新，添加参数的列表控件
 * @class FS.ParameterGrid
 * @extends FR.Widget
 */
FS.ParameterGrid = FR.extend(FR.Widget, {
    _init: function () {
        FS.ParameterGrid.superclass._init.apply(this, arguments);
        this.createGrid();
    },

    createGrid: function () {
        var self = this;
        var gridConfig = {
            widgetName: this.options.widgetName,
            intervalColor: false,
            isHeadShow: true,
            items: [],
            columnsConfig: [
                {
                    key: 'name',
                    value: FR.i18nText('FS-Generic-WF_Name'),
                    width: 80,
                    onCellClick: function (rowIdx, colIdx, item, colCfg, $cell) {
                        self.text2widegt(78, item, 'name', $cell);
                    }
                }, {
                    key: 'type',
                    value: FR.i18nText("FS-Generic-Simple_Type"),
                    width: 88,
                    onCellCreate: function (rowIdx, colIdx, item, colCfg) {
                        var $combo = new FR.ComboBoxEditor({
                            width: 88,
                            height: 25,
                            directEdit: false,
                            allowBlank: false,
                            value: item.type,
                            items: [
                                {value: "String", text: FR.i18nText("FS-Generic-Parameter_String")},
                                {value: "Integer", text: FR.i18nText("FS-Generic-Parameter_Integer")},
                                {value: "Double", text: FR.i18nText("FS-Generic-Parameter_Double")},
                                {value: "Boolean", text: FR.i18nText("FS-Generic-Parameter_Boolean")},
                                {value: "Formula", text: FR.i18nText("FS-Generic-Parameter_Formula")}
                            ],
                            listeners: [
                                {
                                    eventName: FR.Events.STOPEDIT,
                                    action: function () {
                                        item.type = this.getValue();
                                    }
                                }
                            ]
                        });
                        return $combo.element;
                    }
                }, {
                    key: 'value',
                    value: FR.i18nText("FS-Generic-Simple_Value"),
                    width: 120,
                    onCellClick: function (rowIdx, colIdx, item, colCfg, $cell) {
                        self.text2widegt(118, item, 'value', $cell);
                    }
                }, {
                    width: 40,
                    onHeadCellCreate: function (colIdx, colCfg) {
                        return $('<div class="refresh_parameter"/>').attr('title', FR.i18nText('FS-Template_Refresh_Parameter'))
                            .hover(function () {
                                $(this).addClass('refresh_blue-hover');
                            }, function () {
                                $(this).removeClass('refresh_blue-hover').removeClass('refresh_blue-click');
                            }).mousedown(function () {
                                $(this).addClass('refresh_blue-click');
                            }).mouseup(function () {
                                if (!self.reportletPath) {
                                    return;
                                }
                                $(this).removeClass('refresh_blue-click');
                                var parameters;
                                try {
                                    parameters = FS.Sync.ajax({
                                        url: FR.servletURL + "?op=fs_entry&cmd=genparameters",
                                        type: 'POST',
                                        data: {
                                            reportPath: self.reportletPath
                                        }
                                    });
                                } catch (e) {
                                    FR.Msg.toast("Parameter parse error!");
                                    return;
                                }
                                self.grid.refresh(parameters);
                            });
                    }
                }, {
                    width: 40,
                    onCellCreate: function (rowIdx, colIdx, item, colCfg) {
                        var self = this;
                        return $('<div class="delete_item"/>')
                            .hover(function () {
                                $(this).addClass('delete_item-hover');
                            }, function () {
                                $(this).removeClass('delete_item-hover').removeClass('delete_item-click');
                            }).mousedown(function () {
                                $(this).addClass('delete_item-click');
                            }).mouseup(function () {
                                $(this).removeClass('');
                                self.options.items.splice(rowIdx, 1);
                                self.refresh();
                            });
                    },
                    onHeadCellCreate: function (colIdx, colCfg) {
                        var self = this;
                        return $('<div class="add_parameter"/>').attr('title', FR.i18nText('FS-Template_Add_Parameter'))
                            .hover(function () {
                                $(this).addClass('add_blue-hover');
                            }, function () {
                                $(this).removeClass('add_blue-hover').removeClass('add_blue-click');
                            })
                            .mousedown(function () {
                                $(this).addClass('add_blue-click');
                            })
                            .mouseup(function () {
                                    $(this).removeClass('add_blue-click');
                                    self.addRowData({
                                        name: '',
                                        type: 'String',
                                        value: ''
                                    });
                                }
                            );
                    }
                }
            ]
        };
        self.grid = new FR.QuickGrid(gridConfig);
        self.grid.element.appendTo(this.element);
    },

    /**
     * 参数转换成可编辑控件
     * @param width 控件宽度
     * @param item 数据
     * @param key 字段
     * @param $cell 单元格dom
     */
    text2widegt: function (width, item, key, $cell) {
        if (!$cell.data('editing')) {
            $cell.hide();
            var editor = new FR.TextEditor({
                renderEl: $('<div/>').insertBefore($cell),
                width: width,
                height: 25,
                value: item[key],
                listeners: [
                    {
                        eventName: FR.Events.STOPEDIT,
                        action: function () {
                            var val = this.getValue();
                            item[key] = val;
                            $cell.html(val).show();
                            this.destroy();
                            $cell.data('editing', false);
                        }
                    }
                ]
            });
            $cell.data('editing', true);
            editor.select();
        }
    },

    /**
     * 展现数据
     * @param data 要展现的数据
     */
    popData: function (data) {
        var self = this;
        if (data) {
            $.each(data, function (idx, item) {
                self.grid.addRowData(item);
            });
        }
    },

    /**
     * 获取数据
     */
    getData: function () {
        var data = [];
        $.each(this.grid.getValue(), function (i, item) {
            var resultItem = item;
            resultItem.value = FR.encodePrecentPlus(resultItem.value);
            data.push(resultItem);
        });
        return data;
    }
});
$.shortcut("parametergrid", FS.ParameterGrid);

/**
 * 颜色选择控件
 *
 *      @example
 *      var $div = $('<div style="position:absolute;left:20px;top:20px;width:400px;height:400px">').appendTo('body');
 *      var picker = new FS.ColorPicker({
 *          renderEl : $div
 *      });
 *
 * @class FS.ColorPicker
 * @extends FR.Widget
 */
FS.ColorPicker = FR.extend(FR.Widget, {
    _defaultConfig: function () {
        return $.extend(FS.ColorPicker.superclass._defaultConfig.apply(this, arguments), {
            baseCls: 'fs-colorpicker',
            width: 300,
            height: 100,
            barWidth: 204,
            onColorPick: null
        });
    },
    _init: function () {
        FS.ColorPicker.superclass._init.apply(this, arguments);
        this.redBar = this._createColorBar('cp-red');
        this.greenBar = this._createColorBar('cp-green');
        this.blueBar = this._createColorBar('cp-blue');
        var val = this.options.value;
        if (val) {
            this.setValue(val);
        }
    },

    _createColorBar: function (colorCls) {
        var o = this.options, self = this;
        var $wrap = $('<div class="picker-item"/>').appendTo(this.element);
        var $bar = $('<div class="picker-bar"/>')
            .width(o.barWidth).appendTo($wrap);
        $wrap.$color = $('<div class="picker-fill"/>').addClass(colorCls).appendTo($bar);
        $wrap.$spliter = $('<div class="picker-spliter"/>').appendTo($bar);
        var isEdge, edgeLeft = 0;
        $wrap.$spliter.draggable({
            axis: 'h',
            onDrag: function (e) {
                var left = e.data.left;
                left = left || 0;
                var w = left + 8;
                var val = parseInt(w / o.barWidth * 255);
                isEdge = false;
                if (val < 0) {
                    val = 0;
                    w = 0;
                    isEdge = true;
                } else if (val > 255) {
                    val = 255;
                    w = o.barWidth;
                    isEdge = true;
                }
                left = w - 8;
                $wrap.$color.width(w);
                $wrap.$input.val(val);
                if (isEdge) {
                    edgeLeft = left;
                    return false;
                }
                FR.applyFunc(self, o.onColorPick, [], false);
            },
            onStopDrag: function (e) {
                if (isEdge) {
                    $wrap.$spliter.css({left: edgeLeft + 'px'});
                    return false;
                }
            }
        });
        $wrap.$input = $('<input class="picker-rgb"/>')
            .val(0)
            .keyup(function (e) {
                if (FR.isEmpty(this.value)) {
                    this.value = 0;
                } else if (/\d+/.test(this.value)) {
                    var n = parseInt(this.value, 10);
                    if (n < 0) {
                        n = 0;
                    } else if (n > 255) {
                        n = 255;
                    }
                    this.value = n;
                }
            }).blur(function () {
                var value = parseInt(this.value, 10);
                if (!$.isNumeric(value)) {
                    value = 0;
                    $(this).val(0);
                }
                value = value / 255 * o.barWidth;
                $wrap.$spliter.css({left: value - 8 + 'px'});
                $wrap.$color.width(value);
                FR.applyFunc(self, o.onColorPick, [], false);
            }).appendTo($wrap);
        return $wrap;
    },

    /**
     * 设置选中值
     * @param {String} color 颜色
     * @param value 值
     */
    setColorValue: function (color, value) {
        var o = this.options, self = this;
        var barObj;
        switch (color) {
            case 'red':
                barObj = this.redBar;
                break;
            case 'green':
                barObj = this.greenBar;
                break;
            case 'blue':
                barObj = this.blueBar;
                break;
            default :
                break;
        }
        barObj.$input.val(value);
        value = value / 255 * o.barWidth;
        barObj.$spliter.css({left: value - 8 + 'px'});
        barObj.$color.width(value);
    },

    /**
     * 设置RGB值
     * @param {Object} value RGB对象
     */
    setValue: function (value) {
        this.redBar.$input.val(value.r);
        this.setColorValue('red', value.r);
        this.greenBar.$input.val(value.g);
        this.setColorValue('green', value.g);
        this.blueBar.$input.val(value.b);
        this.setColorValue('blue', value.b);
    },

    /**
     * 获取RGB对象
     * @returns {{r: Number, g: Number, b: Number}}
     */
    getValue: function () {
        return {
            r: parseInt(this.redBar.$input.val()),
            g: parseInt(this.greenBar.$input.val()),
            b: parseInt(this.blueBar.$input.val())
        };
    },

    /**
     * 获取RGB字符串
     * @returns {String} rgb格式的字符串
     */
    getText: function () {
        var r = this.redBar.$input.val(),
            g = this.greenBar.$input.val(),
            b = this.blueBar.$input.val();
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
});
$.shortcut("fscolorpicker", FS.ColorPicker);

/**
 * 配色选择控件
 *
 *      @example
 *      var $div = $('<div style="position:absolute;left:20px;top:20px;width:400px;height:400px">').appendTo('body');
 *      var color = new FS.ColorSchemeRadio({
 *          renderEl : $div,
 *          colorScheme : [
 *              {r : 1, g : 1, b : 1},
 *              {r : 100, g : 100, b : 100},
 *              {r : 40, g : 40, b : 40}
 *          ]
 *      });
 * @class FS.ColorSchemeRadio
 * @extends FR.RadioButton
 */
FS.ColorSchemeRadio = FR.extend(FR.RadioButton, {
    _defaultConfig: function () {
        return $.extend(FS.ColorSchemeRadio.superclass._defaultConfig.apply(), {
            height: 55,
            width: 80,
            left: 20,
            index: 0,
            colorBlockWidth: 40,
            colorScheme: [],
            colorSelectable: false,
            beforeSelect: null,
            onColorSelected: null
        });
    },

    _init: function () {
        FS.ColorSchemeRadio.superclass._init.apply(this, arguments);
        var o = this.options,
            $el = this.element;
        var width = Math.max(o.width, o.colorBlockWidth * o.colorScheme.length);
        $el.css({
            'height': o.height,
            'width': width,
            'position': 'relative',
            'float': 'left',
            'margin-left': o.left
        });
        this.$colorWrapper = $('<div class="fs-scheme-color-group"/>').appendTo($el);
        this.$borderContainer = $('<div class="fs-scheme-border-container"/>').appendTo($el);
        this.$selected = null;
        this._initColorBlocks();
    },

    _initColorBlocks: function () {
        var self = this;
        var left = 0;
        $.each(this.options.colorScheme, function (i, scheme) {
            var color = FS.Tools.getCssColor(scheme);
            var $block = $('<div class="fs-scheme-color"/>').css({
                'left': left,
                'background-color': color
            }).data('COLOR', scheme).appendTo(self.$colorWrapper);
            var $border = $('<div class="fs-scheme-color-border"/>').css({
                'left': left - 3
            }).hide().appendTo(self.$borderContainer);
            $block.data('BORDER', $border);
            left += self.options.colorBlockWidth;
            $block.click(function (e) {
                self.setSelected(true);
                self.selectColorBlock($block);
            });
        });
    },

    /**
     * 设置选中的颜色块
     * @param {jQuery} $block 颜色块
     */
    selectColorBlock: function ($block) {
        if (this.options.colorSelectable) {
            $('.fs-scheme-color-border', this.$borderContainer).hide();
            $block.data('BORDER').show();
            if (this.$selected) {
                this.$selected.removeClass('selected');
            }
            this.$selected = $block;
            this.$selected.addClass('selected').css({'width': 40});
            // 传递选中块颜色参数
            FR.applyFunc(this, this.options.onColorSelected, [$block.data('COLOR'), $block], false);
        }
    },

    /**
     * 改变选中状态
     * @param selected 选中状态
     */
    setSelected: function (selected) {
        if (this.isSelected() === selected) {
            return;
        }
        if (FR.applyFunc(this, this.options.beforeSelect, [selected], false) === false) {
            if (selected === false) {
                $('.fs-scheme-color-border', this.$borderContainer).hide();
                if (this.$selected) {
                    this.$selected.removeClass('selected');
                    this.$selected = null;
                }
            } else {
                if (!this.$selected) {
                    this.selectColorBlock(this.$colorWrapper.children().eq(0));
                }
            }
            FS.ColorSchemeRadio.superclass.setSelected.apply(this, [selected]);
        }
    },

    /**
     * 批量设置颜色
     * @param {Array} scheme 颜色数组
     */
    setColorScheme: function (scheme) {
        this.element.empty();
        this.options.colorScheme = scheme;
        this._init();
    },

    /**
     * 设置被选中色块的颜色
     * @param {Object} color 颜色的CSS参数,以rgb数值表示
     */
    setSelectedColor: function (color) {
        this.$selected.css({
            'background-color': FS.Tools.getCssColor(color)
        }).data('COLOR', color);
    },

    /**
     * 获取选中的颜色
     * @returns {Object} 以rgb格式表示的颜色值
     */
    getSelectedColor: function () {
        return this.$selected.data('COLOR');
    },

    /**
     *获取配色组合
     * @returns {Array} 控件色块的颜色数组
     */
    getColorScheme: function () {
        var results = [];
        $.each(this.$colorWrapper.children(), function (index, block) {
            var color = $(block).data('COLOR');
            results.push(FS.Tools.getCssColor(color));
        });
        return results;
    },

    /**
     * 获取选中的颜色块的索引
     * @returns {Number} 选中的索引
     */
    getIndex: function () {
        return this.options.index;
    }
});
$.shortcut("colorschemeradio", FS.ColorSchemeRadio);

/**
 * 标签面板
 *
 *      @example
 *      var $div = $('<div>').appendTo('body');
 *      var button = new FS.TagPane({
 *              renderEl : $div,
 *              items : [
 *                  {key:'index1',value:'xxx'},
 *                  {key:'index2',value:'ccc'},
 *                  {key:'index3',value:'zzz'}
 *              ]
 *              _renderTag: func
 *      });
 *
 * @class FS.TagPane
 * @extends FR.Widget
 *
 * @cfg {JSON} options 配置属性
 * @cfg {String} options.baseCls            控件基础类
 * @cfg {Object} options.async              异步属性配置
 * @cfg {String} options.async.url          异步请求地址
 * @cfg {String} options.async.type         异步请求方式
 * @cfg {Object} options.async.data         异步请求参数
 * @cfg {Function} options.onAsyncSuccess   请求成功回调
 * @cfg {Function} options.onAsyncError     请求失败回调
 * @cfg {Function} options.renderTag        Tag项渲染，参数为item值
 * @cfg {Array} options.items               tag项
 * @cfg {String} options.items[index].key   tag项key
 * @cfg {String} options.items[index].value tag项value
 *
 */
FS.TagPane = FR.extend(FR.Widget, /**@class FR.TagPane*/{
    /**
     * 初始的配置属性
     * @returns {*}
     * @private
     */
    _defaultConfig: function () {
        return $.extend(FS.TagPane.superclass._defaultConfig.apply(), {
            autoSize: false,
            baseCls: "fs-tagpane",
            width: "auto",
            height: "auto",
            async: null,
            isInitWithData: true,
            onAsyncSuccess: null,
            onAsyncError: null,
            items: []
        });
    },

    _init: function () {
        var o = this.options;
        FS.TagPane.superclass._init.apply(this, arguments);
        if (o.isInitWithData) {
            this.refresh();
        }
    },

    _renderTag: function (item) {
        var opts = this.options;
        var self = this;
        var $tag = $('<span/>');
        if (typeof opts.renderTag === 'function') {
            $(opts.renderTag(item)).appendTo($tag);
        } else {
            $tag = $('<span/>').addClass("fs-tagpane-seltag").attr('key', item.key);
            $('<span/>').text(item.value).appendTo($tag);
        }
        if (typeof opts.tagClick === 'function') {
            $tag.click(function (e) {
                opts.tagClick.call(self, e);
            });
        }
        $tag.appendTo(this.element);
    },

    _reBuild: function () {
        var items = this.options.items;
        var self = this;
        if ($.isArray(items)) {
            $(this.element).empty();
            _.forEach(items, function (item) {
                if (_.isUndefined(item.key) || _.isUndefined(item.value)) {
                    console.warn('Options.item in Widget TagPane need key and value property.');
                    return;
                }
                self._renderTag(item);
            });
        }
    },

    _findItem: function (key) {
        return _.find(this.options.items, function (item) {
            return item.key === key;
        });
    },

    setValue: function (items) {
        if ($.isArray(items)) {
            this.options.items = items;
            this._reBuild();
        }
    },

    getValue: function () {
        return this.options.items;
    },

    /**
     * 添加项
     * @param {object} item 待添加的项
     */
    addItem: function (item) {
        if (!_.isUndefined(item.key) && !this.contains(item)) {
            this.options.items.push(item);
            this._renderTag(item);
        }
    },

    contains: function (value) {
        if (_.isUndefined(value.key)) {
            return false;
        }
        return _.find(this.options.items, function (item) {
                return item.key === value.key;
            }) !== undefined;
    },

    /**
     * 删除值相关的项
     * @param {object|string} val 待删除的值
     */
    delItem: function (val) {
        var resultItem;
        if (_.isObject(val) && !_.isUndefined(val.key)) {
            resultItem = this._findItem(val.key);
        } else {
            resultItem = this._findItem(val);
        }
        if (!_.isUndefined(resultItem)) {
            this.options.items.remove(resultItem);
            this._reBuild();
        }
    },

    refresh: function () {
        var o = this.options;
        var async = o.async;
        var self = this;
        if (async) {
            FS.Async.ajax({
                url: async.url,
                type: async.type ? async.type : 'POST',
                data: async.data,
                success: function (res, status) {
                    if (typeof o.onAsyncSuccess === 'function') {
                        o.onAsyncSuccess.call(self, res, status);
                    }
                    self._reBuild();
                },
                error: function (res, status) {
                    if (typeof o.onAsyncSuccess === 'function') {
                        o.onAsyncSuccess.call(self, res, status);
                    }
                }
            });
        } else {
            this._reBuild();
        }
    }
});
$.shortcut("tagpane", FS.TagPane);

/**
 * 穿梭框面板
 * @class FS.Transfer
 * @extends FR.Widget
 */
FS.Transfer = FR.extend(FR.Widget, /**@class FR.Transfer*/{

    Constants: {
        SelectedPaneWD: 'SelectedPane',
        UnselectedPaneWD: 'UnselectedPane'
    },
    /**
     * 初始的配置属性
     * @returns {*}
     * @private
     */
    _defaultConfig: function () {
        return $.extend(FS.Transfer.superclass._defaultConfig.apply(), {
            needSearch: false,
            autoSize: false,
            baseCls: "fs-transfer",
            width: "auto",
            height: "auto"
        });
    },

    _init: function () {
        FS.Transfer.superclass._init.apply(this, arguments);
        this.initTagPane();
    },

    initTagPane: function () {
        var self = this;
        var valueArr = this.options.value;
        if (valueArr !== 'undefined') {
            this.setValue(valueArr);
        }

        var $container = this.element;
        // vito:目前只提供上下结构
        var panelOpts = {
            type: 'absolute',
            items: [
                {
                    el: {
                        type: 'tagpane',
                        baseCls: 'fs-editfw-selpane',
                        widgetName: this.Constants.SelectedPaneWD,
                        width: 515,
                        height: 90,
                        renderTag: function (item) {
                            var $tag = $('<span/>').addClass("fs-tagpane-seltag").data('value', item);
                            $('<span/>').text(item.value).appendTo($tag);
                            return $tag;
                        },
                        tagClick: function (e) {
                            var target = e.target;
                            var seltag = $(target).closest('.fs-tagpane-seltag');
                            if (seltag.length > 0) {
                                var value = $(seltag[0]).data('value');
                                self.delSelectedItem(value);
                                self.addToUnselectedPane(value);
                            }
                        }
                    }, x: 0, y: 0
                },
                {
                    el: {
                        type: 'tagpane',
                        baseCls: 'fs-editfw-allpane',
                        widgetName: this.Constants.UnselectedPaneWD,
                        width: 515,
                        height: 180,
                        renderTag: function (item) {
                            var $tag = $('<span/>').addClass("fs-tagpane-alltag").data('value', item);
                            $('<span/>').text(item.value).appendTo($tag);
                            return $tag;
                        },
                        tagClick: function (e) {
                            var target = e.target;
                            var alltag = $(target).closest('.fs-tagpane-alltag');
                            if (alltag.length > 0) {
                                var value = $(alltag[0]).data('value');
                                self.delUnselectedItem(value);
                                self.addToSelectedPane(value);
                            }
                        }
                    }, x: 0, y: 112
                }

            ]
        };
        this.pane = FR.createWidget(panelOpts);
        $container.append(this.pane.element);
    },

    addToSelectedPane: function (value) {
        this.pane.getWidgetByName(this.Constants.SelectedPaneWD).addItem(value);
    },

    delSelectedItem: function (value) {
        this.pane.getWidgetByName(this.Constants.SelectedPaneWD).delItem(value);
    },

    addToUnselectedPane: function (value) {
        this.pane.getWidgetByName(this.Constants.UnselectedPaneWD).addItem(value);
    },

    delUnselectedItem: function (value) {
        this.pane.getWidgetByName(this.Constants.UnselectedPaneWD).delItem(value);
    },

    _contains: function (arr, value) {
        return _.find(arr, function (item) {
                return item.key === value.key;
            }) !== undefined;
    },

    /**
     * 设置控件值
     * @param {Object} value 控件值123
     * @param {Array} [value.selectedValue] 选中框的控件值
     * @param {Array} [value.unSelectedValue] 未选中框的控件值
     */
    setValue: function (value) {
        if (!value) {
            return;
        }
        if ($.isArray(value.selectedValue)) {
            this.setSelectedValue(value.selectedValue);
            this.selectedValue = value.selectedValue;
        }
        if ($.isArray(value.unSelectedValue)) {
            this.setUnSelectedValue(value.unSelectedValue);
            this.unSelectedValue = value.unSelectedValue;
        }
    },

    getValue: function () {
        var result = {};
        var self = this;
        var selValue = this.pane.getWidgetByName(this.Constants.SelectedPaneWD).getValue();
        var unSelValue = this.pane.getWidgetByName(this.Constants.UnselectedPaneWD).getValue();
        if ($.isArray(this.selectedValue) && $.isArray(this.unSelectedValue)) {
            _.forEach(selValue, function (item) {
                if (!self._contains(self.selectedValue, item)) {
                    self.selectedValue.push(item);
                }
                if (self._contains(self.unSelectedValue, item)) {
                    self.unSelectedValue.push(item);
                }
            });
            _.forEach(unSelValue, function (item) {
                if (!self._contains(self.unSelectedValue, item)) {
                    self.unSelectedValue.push(item);
                }
                if (self._contains(self.selectedValue, item)) {
                    self.selectedValue.remove(item);
                }
            });
            result.selectedValue = _.map(this.selectedValue, function (val) {
                return val.value;
            }).join('|');
        }
        return result;
    },

    setSelectedValue: function (value) {
        this.pane.getWidgetByName(this.Constants.SelectedPaneWD).setValue(value);
    },
    setUnSelectedValue: function (value) {
        this.pane.getWidgetByName(this.Constants.UnselectedPaneWD).setValue(value);
    },

    search: function (keyword) {
        if (keyword === '') {
            this.setSelectedValue(this.selectedValue);
            this.setUnSelectedValue(this.unSelectedValue);
            return;
        }
        function itemFilter(item) { // String.indexOf
            return item.key.indexOf(keyword) !== -1 || item.value.indexOf(keyword) !== -1;
        }

        this.setSelectedValue(_.filter(this.selectedValue, itemFilter));
        this.setUnSelectedValue(_.filter(this.unSelectedValue, itemFilter));
    },

    /**
     *
     * @param arr 待删除的数据
     */
    removeValues: function (arr) {
        var self = this;
        _.forEach(arr, function (item) {
            if (self._contains(self.selectedValue, item)) {
                self.delSelectedItem(item);
            }
            if (self._contains(self.unSelectedValue, item)) {
                self.delUnselectedItem(item);
            }
        });
    }
});
$.shortcut("transfer", FS.Transfer);
(function(a){FS.TableTree=FR.extend(FR.Widget,{_defaultConfig:function(){var b=false;if(FS.Plugin.TableTreeConfigProcessor.item&&FR.Plugin.validLevel(FS.Plugin.TableTreeConfigProcessor,FS.Plugin.TableTreeConfigProcessor.item)&&FS.Plugin.TableTreeConfigProcessor.item.getXScroll){b=FS.Plugin.TableTreeConfigProcessor.item.getXScroll.call(this)}return a.extend(FS.TableTree.superclass._defaultConfig.apply(this,arguments),{widgetName:"fstabletree",treeID:"tabletree",setting:{},Nodes:null,width:200,height:300,fit:false,tools:[],alwaysShowTools:true,itemHoverCls:null,onItemToolClick:null,hasXScroll:b,scrollWidth:16,toolMargin:0,toolDisableCls:"fs_tool_disabled"})
},exRebuild:function(b){a.extend(true,this.options,b);this._init()},showToolByIndex:function(b){this.element.find("td[toolid="+b+"]").show();this.options.tools[b].invisible=false},hideToolByIndex:function(b){this.element.find("td[toolid="+b+"]").hide();this.options.tools[b].invisible=true},_init:function(){FS.TableTree.superclass._init.apply(this,arguments);FR.$defaultImport("/com/fr/fs/web/platform/js/jquery.zTree.js","js");FR.$defaultImport("/com/fr/fs/web/css/zTreeStyle/zTreeStyle.css","css");
var b=this.options;this.childrenKey=b.setting.data.key?b.setting.data.key.children:"children";this.$table=a('<table class="ztree" cellspacing="0" cellpadding="0"/>');this.$tbody=a("<tbody/>").attr("id",b.treeID);this.$table.append(this.$tbody).appendTo(this.element);if(b.fit===true){var c=this.element.parent();b.width=c.width();b.height=c.height()}this.element.css({width:b.width,height:b.height,overflow:"auto"});this._toolsInit();this.zTree=a.fn.zTree.init(this.$tbody,b.setting,b.Nodes)},_getNodeIndex:function(d){var b=0;
var c=d.getPreNode();while(c!==null){b++;c=c.getPreNode()}return b},sortable:function(b){var d=this;var f,h,i,c;var g=false;var e=[];this.$tbody.sortable({delay:200,exclude:"level0",itemSelector:"tr",handler:"tr",placeholder:"<tr/>",onDragStart:function(u,q,v,j){v(u,q);var s=u.attr("id");var n=d.getNodeById(s);g=n.open;e=[];function m(w){return(w.level==n.level)}var t=d.getNodesByFilter(m);for(var o=0;o<t.length;o++){if(t[o][d.childrenKey]){d.expandNode(t[o],false);e.push(t[o])}}f=n;var l=f.level;
var p=f.getParentNode();if(p){var r=a("tr."+p.tId+"_ul");i=r.index(u)}else{var k=a("tr.level"+l,d.element);i=k.index(u)}},onDrag:function(q,p,r,j){p.left=0;var l=q.attr("class").match(/((?:dirmgrTableTree_\d+))_ul/);if(l&&l.length>1){var k=a("tr."+l[0],d.element);var n=a("#"+l[1],d.element);var m=n.position().top+n.height(),o=n.position().top+k.height()*k.size();if(p.top<m){p.top=m}else{if(p.top>o+k.height()*0.6){p.top=o}}j.pageY=q.offsetParent().offset().top+p.top}r(q,p)},onDrop:function(w,k,y,j){y(w);
var v=f.level;var l=w.next();if(l.length<1||(d.getNodeById(l.attr("id")).level!==v)){var z=w.prev();h=d.getNodeById(z.attr("id"))}else{h=d.getNodeById(l.attr("id"))}for(var q=0;q<e.length;q++){var p=d.transformToArray(e[q][d.childrenKey]);var u=a("tr[id="+e[q].tId+"]",d.element);for(var r=0;r<p.length;r++){var x=a("tr[id="+p[r].tId+"]",d.element);u.after(x);u=x}d.expandNode(e[q],true)}var o=f.level;var s=f.getParentNode();if(s){var t=a("tr."+s.tId+"_ul");c=t.index(w)}else{var n=a("tr.level"+o,d.element);
c=n.index(w)}if(a.isFunction(b)){b.call(d,f,h,i,c)}}})},_toolsInit:function(){var b=this;var e=this.options;if(!e.hasXScroll){this.element.css({"overflow-x":"hidden","overflow-y":"auto"})}var d=function(f,n,p){var j=a("#"+p.tId,b.element);if(e.tools&&e.tools.length>0){p.toolName=[];p.toolDiv=[];for(var m=0;m<e.tools.length;m++){(function(s){if(!p.getParentNode()&&e.tools[s].rootToolHide){a('<td width="20px"/>').html("&nbsp;").appendTo(j);return}var v=e.tools[s];var t=v.name;var r=a("<div/>").data("nodeID",p.tId).data("tool",v);
if(b.options.toolMargin){r.css("margin-right",b.options.toolMargin+"px")}if(e.tooltype==="check"){p.toolName.push(t);p.toolDiv.push(r);if((p.toolDisAbleIndex&&p.toolDisAbleIndex==s)||(p.hasChildren&&p.isEnable===false)){r.addClass(b.options.toolDisableCls)}r.addClass("fs_tool_checkoff");if(e.toolUnEditAble){r.addClass("fs_tool_disabled")}r.click(function(i){b.onToolDivClick(s,i,this,p);if(a.isFunction(e.onItemToolClick)){e.onItemToolClick.call(this,p)}})}if(v.iconCls){r.addClass(v.iconCls);if(v.clickCls){r.mousedown(function(){a(this).addClass(a(this).data("tool").clickCls)
}).mouseup(function(){a(this).removeClass(a(this).data("tool").clickCls)})}if(v.onToolClick){r.click(function(i){a(this).data("tool").onToolClick.call(this,i)})}if(v.hoverCls){r.data("hoverCls",v.hoverCls);r.hover(function(){a(this).addClass(a(this).data("hoverCls"))},function(){a(this).removeClass(a(this).data("hoverCls"))})}}var u=a("<td/>").attr("toolid",s).appendTo(j).append(r);if(v.invisible){u.hide()}})(m)}if(!e.alwaysShowTools){if(FS.Plugin.TableTreeConfigProcessor.item&&FR.Plugin.validLevel(FS.Plugin.TableTreeConfigProcessor,FS.Plugin.TableTreeConfigProcessor.item)&&FS.Plugin.TableTreeConfigProcessor.item.hoverShowTools){FS.Plugin.TableTreeConfigProcessor.item.hoverShowTools.call(this,j)
}else{j.find("div").css({"display":"none"});j.hover(function(){a(this).find("div").show()},function(){a(this).find("div").hide()})}}}else{a("<td/>").appendTo(j)}if(e.itemHoverCls){j.hover(function(){a(this).addClass(e.itemHoverCls)},function(){a(this).removeClass(e.itemHoverCls)})}if(!e.hasXScroll){var o=e.width?e.width:b.element.width();var g=o-(p.level+1)*20;var l=0;if(e.tools&&e.tools.length>0){l=e.tools.length*(16+b.options.toolMargin)}var h=16;if(FR.Browser.isIE()){h=20}var k=g-l-b.options.scrollWidth-h;
var q=b.options.titleMaxWidth;k=q?Math.min(q,k):k;j.find("a").css({width:k})}};var c={view:{selectedMulti:false},callback:{onNodeCreated:d}};a.extend(true,c,e.setting);e.setting=c},onToolDivClick:function(c,j,f,g,b){var d=this.options;if(d.toolUnEditAble||a(f).hasClass(this.options.toolDisableCls)){return}var h=false;if(b===true){h=true;this.selectNodeWithCascade(g,true,c)}else{if(b===false){this.cancelSelectedNodeWithCascade(g,c)}else{if(g[g.toolName[c]]===1){this.cancelSelectedNodeWithCascade(g,c)
}else{h=true;this.selectNodeWithCascade(g,true,c)}}}a(f).data("tool").onToolClick.call(f,j,g,h)},hasNodeSelect:function(d){var g=this.options;if(g.tooltype!=="check"){return false}var c=this.getNodes();for(var e=0,b=c.length;e<b;e++){var f=c[e];if(f[f.toolName[d]]){return true}}return false},selectAll:function(d){var f=this.options;if(f.tooltype!=="check"){return}var c=this.getNodes();for(var e=0,b=c.length;e<b;e++){this.onToolDivClick(d,new a.Event(),c[e].toolDiv[d],c[e],true)}},deSelectAll:function(d){var f=this.options;
if(f.tooltype!=="check"){return}var c=this.getNodes();for(var e=0,b=c.length;e<b;e++){this.onToolDivClick(d,new a.Event(),c[e].toolDiv[d],c[e],false)}},getAllChildrenAttrs:function(f,b){b=b||"id";if(!f){return[]}var d=f[this.childrenKey];var e=[f[b]];if(!d||d.length===0){return e}for(var c=0;c<d.length;c++){var g=d[c];e=e.concat(this.getAllChildrenAttrs(g,b))}return e},getSelectNodesAttrs:function(d){d=d||"id";var c=[];var e=this.getSelectedNodes();for(var f=0,b=e.length;f<b;f++){c.push(e[f][d])}return c
},getAllParentAttrs:function(e,b){b=b||"id";if(!e){return[]}var d=e.getParentNode();if(!d){return[]}var c=[d[b]];return c.concat(this.getAllParentAttrs(d,b))},getNodeRelationAttrs:function(c,b){return this.getAllChildrenAttrs(c,b).concat(this.getAllParentAttrs(c,b))},cascade:function(f,c,b){var e=f[this.childrenKey];if(!e||e.length===0){return}for(var d=0;d<e.length;d++){var g=e[d];if(c){this.selectNode(g,true,b)}else{this.cancelSelectedNode(g,b)}this.cascade(e[d],c,b)}},bubble:function(e,b,f){if(!e){return
}var j=e.getParentNode();if(!j){return}if(b){var d=j[this.childrenKey];var h=true;for(var g=0;g<d.length;g++){var c=d[g];if(c[c.toolName[f]]!==1){h=false;break}}if(!h||j.isEnable===false){while(j){this.selectNode(j,true,f);j[j.toolName[f]]=2;j.toolDiv[f].addClass("fs_tool_checkhalf");j=j.getParentNode()}}else{this.selectParentNode(j,f)}}else{var d=j[this.childrenKey];var k=true;for(var g=0;g<d.length;g++){var c=d[g];if(c[c.toolName[f]]){k=false;break}}if(!k){while(j){this.selectNode(j,true,f);j[j.toolName[f]]=2;
j.toolDiv[f].addClass("fs_tool_checkhalf");j=j.getParentNode()}}else{this.cancelSelectedNode(j,f);this.bubble(j,false,f)}}},selectParentNode:function(c,b){this.selectNode(c,true,b);this.bubble(c,true,b)},getTreeObj:function(){var b=this.options.treeID;return a.fn.zTree.getZTreeObj(b)},getNodeById:function(b){return this.getTreeObj().getNodeByTId(b)},getSelectedNodes:function(){return this.getTreeObj().getSelectedNodes()},getFullSelectedNodes:function(){var c=this.getSelectedNodes();if(this.options.tooltype==="check"&&this.options.tools.length===1){var b=[];
a.each(c,function(d,e){if(!e.toolDiv[0].hasClass("fs_tool_checkhalf")&&e.toolDiv[0].hasClass("fs_tool_checkon")){b.push(e)}});return b}else{return c}},getNodeNameById:function(b){return this.getNodeById(b).name},removeSelectedNodes:function(){var b=this.getTreeObj();var d=b.getSelectedNodes();for(var c=0;c<d.length;c++){b.removeNode(d[c],false)}},removeNode:function(c){var b=this.getTreeObj();b.removeNode(c,false)},addNodes:function(c,d,f){var b=this.getTreeObj();var e=FR.isArray(d)?d:[d];return b.addNodes(c,e,f)
},addSingleNode:function(i,e,c){var k=FR.isArray(e)?e:[e];if(k.length>1){throw ("wrong way to use this method,function addSingleNode can only add one node!")}var d=this.addNodes(i,k,c)[0];var h=a("tr[id="+d.tId+"]",this.element);var g=d.getPreNode();if(g&&g.open&&g[this.childrenKey]&&g[this.childrenKey].length>0){var b=g.level;var j=a("tr[id="+d.tId+"]",this.element);while(j.next().length>0){j=j.next();var f=this.getNodeById(j.attr("id"));if(f.level<=b){j.before(h);return d}}j.after(h)}return d},updateNode:function(c){var b=this.getTreeObj();
b.updateNode(c)},selectNode:function(e,d,c){var b=this.getTreeObj();b.selectNode(e,d);if(this.options.tooltype==="check"){e[e.toolName[c]]=1;e.toolDiv[c].removeClass("fs_tool_checkhalf");e.toolDiv[c].addClass("fs_tool_checkon")}},selectNodeWithCascade:function(d,c,b){this.selectNode(d,c,b);this.cascade(d,true,b);this.bubble(d,true,b)},selectNodesByData:function(f){var c=this.getTreeObj();var d=c.transformToArray(c.getNodes());for(var b=0;b<f.length;b++){for(var e=0;e<d.length;e++){if(f[b].id===d[e].id){for(var g=0;
g<this.options.tools.length;g++){if(f[b][this.options.tools[g].name]===1){this.selectNodeWithCascade(d[e],true,g)}}break}}}},getNodeByNodeID:function(e){var b=this.getTreeObj();var c=b.transformToArray(b.getNodes());for(var d=0;d<c.length;d++){if(e===c[d].id){return c[d]}}},selectNodesByPath:function(f){var c=this.getTreeObj();var d=c.transformToArray(c.getNodes());for(var b=0;b<f.length;b++){for(var e=0;e<d.length;e++){if(f[b].path===d[e].path){for(var g=0;g<this.options.tools.length;g++){if(f[b][this.options.tools[g].name]===1){this.selectNodeWithCascade(d[e],true,g)
}}break}}}},getNodeByPath:function(e){var b=this.getTreeObj();var c=b.transformToArray(b.getNodes());for(var d=0;d<c.length;d++){if(e==c[d].path){return c[d]}}},cancelSelectedNode:function(f,d){var c=this.getTreeObj();var e=true;for(var b=0;b<this.options.tools.length;b++){if(d===b){continue}if(f[this.options.tools[b].name]){e=false}}if(e){c.cancelSelectedNode(f)}if(this.options.tooltype==="check"){if(f.toolName){f[f.toolName[d]]=0;f.toolDiv[d].removeClass("fs_tool_checkhalf");f.toolDiv[d].removeClass("fs_tool_checkon")
}}},cancelSelectedNodeWithCascade:function(c,b){this.cancelSelectedNode(c,b);this.cascade(c,false,b);this.bubble(c,false,b)},clearState:function(){var c=this.getSelectedNodes();for(var d=0;d<c.length;d++){for(var b=0;b<this.options.tools.length;b++){this.cancelSelectedNode(c[d],b)}}},getAllSelectedLeafNodes:function(){var c=[];var d=this.getSelectedNodes();for(var e=0,b=d.length;e<b;e++){if(!d[e].isParent){c.push(d[e])}}return c},getNodes:function(){var b=this.getTreeObj();return b.getNodes()},transformToArray:function(c){var b=this.getTreeObj();
return b.transformToArray(c)},expandNode:function(f,g,e,c,d){var b=this.getTreeObj();b.expandNode(f,g,e,c,d)},getNodesByFilter:function(e,c,d,g,f){var b=this.getTreeObj();return b.getNodesByFilter(e,c,d,g,f)}});a.shortcut("fstabletree",FS.TableTree)})(jQuery);
(function(a){FS.MenuTree=FR.extend(FR.Widget,{_defaultConfig:function(){return a.extend(FS.MenuTree.superclass._defaultConfig.apply(this,arguments),{baseCls:"fs-menutree",nodes:[],onDataFilter:null,onBeforeNodeClick:null,onNodeClick:null,onAfterNodeClick:null,onBeforeNodeCreate:null,onNodeCreate:null,onAfterNodeCreate:null,onBeforeNodeExpand:null,onNodeExpand:null,onAfterNodeExpand:null,onBeforeNodeCollapse:null,onNodeCollapse:null,onAfterNodeCollapse:null,onBeforeDisplayNodes:null,onDisplayNodes:null,onAfterDisplayNodes:null,onBeforeInit:null,onAfterInit:null})
},_init:function(){FS.MenuTree.superclass._init.apply(this,arguments);var c=this.options;var b={hasChildren:true,ChildNodes:c.nodes,level:0};FR.applyFunc(this,c.onBeforeInit,[this.element],false);FR.applyFunc(this,c.onDataFilter,[b,b.ChildNodes],false);this.expandNode(b,null,this.element);this._bindEvts();FR.applyFunc(this,c.onAfterInit,[this.element],false)},_bindEvts:function(){var b=this;var c=function(f){var g=f.target;var h=a(g).closest("a.menutree-node");if(h&&h.length>0){var d=f.type;if(d==="mouseover"){h.addClass("fui-seb fui-fht")
}else{if(d==="mouseout"){if(!h.hasClass("select")){h.removeClass("fui-seb fui-fht")}}else{if(d==="click"){var e=h.data("NODE");b.clickNode(e,h)}}}}};this.element.bind("mouseover",c).bind("mouseout",c).bind("click",c)},_onNodeCreate:function(e,g){var f=this.options;var c=a('<a class="menutree-node"/>').data("NODE",e);FR.applyFunc(this,f.onBeforeNodeCreate,[e,c,g],false);if(FR.applyFunc(this,f.onNodeCreate,[e,c,g],false)===false){if(e.level===1){c.addClass("fs-menu-item").attr("title",e.text).appendTo(g);
if(e.isModule){FS.createIconFont("icon-menu-setting-a","icon-menu-setting-b").appendTo(c)}else{var d=FS.config.folderIcons[parseInt(e.id,10)];d=d?d:"e642";if(d.indexOf(".png")==-1){FS.createIconFont("icon-"+d+"-a","icon-"+d+"-b").appendTo(c)}else{if(FS.Plugin.CustomIcon.length>0){a.each(FS.Plugin.CustomIcon,function(h,i){if(a.isFunction(i.getMenuNodeCustomIcon)){i.getMenuNodeCustomIcon(d).appendTo(c)}})}else{FS.createIconFont("icon-e642-a","icon-e642-b").appendTo(c)}}}a("<span/>").text(e.text).appendTo(c)
}else{c.addClass("fs-menu-item menutree-child").attr("title",e.text).css({"padding-left":(e.level-1)*14+12}).appendTo(g);var b=a('<i class="tree-icon"/>').appendTo(c);if(e.hasChildren){if(e.isexpand){b.html("\ue624")}else{b.html("\ue61f")}}else{b.addClass("icon-tree-leaf icon-tree-"+e.nodeicon)}a('<span class="menutree-text"/>').text(e.text).appendTo(c)}}FR.applyFunc(this,f.onAfterNodeCreate,[e,c,g],false);return c},clickNode:function(e,c){var g=this.options,b=this;var f=c.parent("li");FR.applyFunc(this,g.onBeforeNodeClick,[e,c,f],false);
if(FR.applyFunc(this,g.onNodeClick,[e,c,f],false)===false){var d=FS.CONSTS.Regions[g.region];a(".fs-menu-item.select",d).removeClass("select fui-seb fui-fht");c.addClass("select fui-seb fui-fht");if(e.hasChildren){if(!e.ChildNodes){if(e.isModule){FS.Async.getModuleTreeById(e.id,function(j,h){e.ChildNodes=[];var i=FR.jsonDecode(j.responseText).ChildNodes;a.each(i,function(k,l){l.isModule=true;l.nodeicon=FS.CONSTS.ModuleIcons[l.id];e.ChildNodes.push(l)});FR.applyFunc(b,g.onDataFilter,[e,e.ChildNodes],false);
b._displayChildNodes(e,c,f)})}else{FS.Async.getReportTreeById(e.id,function(i,h){e.ChildNodes=FR.jsonDecode(i.responseText)||[];FR.applyFunc(b,g.onDataFilter,[e,e.ChildNodes],false);b._displayChildNodes(e,c,f)})}}else{this._displayChildNodes(e,c,f)}}else{FS.loadContentByEntry(e)}}FR.applyFunc(this,g.onAfterNodeClick,[e,c,f],false)},_displayChildNodes:function(c,b,d){var e=this.options;FR.applyFunc(this,e.onBeforeDisplayNodes,[c,b,d],false);if(FR.applyFunc(this,e.onDisplayNodes,[c,b,d],false)===false){FS.doDisplayChildNodes(c.ChildNodes);
if(c.isexpand){this.collapseNode(c,b,d);b.find(".tree-icon").html("\ue61f")}else{this.expandNode(c,b,d);b.find(".tree-icon").html("\ue624")}}FR.applyFunc(this,e.onAfterDisplayNodes,[c,b,d],false)},expandNode:function(b,d,f){var c=this,g=this.options,h=b.level;FR.applyFunc(this,g.onBeforeNodeExpand,[b,d,f],false);if(FR.applyFunc(this,g.onNodeExpand,[b,d,f],false)===false){if(h===1){if(this.selNode){this.collapseNode(this.selNode.node,this.selNode.$node,this.selNode.wrapper)}this.selNode={node:b,$node:d,wrapper:f}
}if(b.hasChildren&&b.ChildNodes){if(b.isLoaded){f.children("ul").slideDown("fast")}else{var e=a("<ul/>").appendTo(f);a.each(b.ChildNodes,function(i,j){j.level=b.level+1;var l=a("<li/>").appendTo(e);var k=c._onNodeCreate(j,l);if(j.isexpand){c.expandNode(j,k,l)}});b.isLoaded=true}}}b.isexpand=true;FR.applyFunc(this,g.onAfterNodeExpand,[b,d,f],false)},collapseNode:function(b,c,d){var e=this.options;FR.applyFunc(this,e.onBeforeNodeCollapse,[b,c,d],false);if(FR.applyFunc(this,e.onNodeCollapse,[b,c,d],false)===false){d.children("ul").slideUp("fast")
}b.isexpand=false;FR.applyFunc(this,e.onAfterNodeCollapse,[b,c,d],false)}})})(jQuery);
$.extend(FS.Plugin.ReportManagerAddon,{reportProcessButton:function(c){var a=this;if(FS.config.supportModules.indexOf("reportprocess")!=-1){var b={iconCls:"fs_reportmgr_rp_icon",width:21,height:21,hover:[function(){$(this).addClass("fs_reportmgr_rp_icon_hover")},function(){$(this).removeClass("fs_reportmgr_rp_icon_hover")}],handler:{mousedown:function(){$(this).addClass("fs_reportmgr_rp_icon_click")},mouseleave:function(){$(this).removeClass("fs_reportmgr_rp_icon_hover");$(this).removeClass("fs_reportmgr_rp_icon_click")
},mouseup:function(){$(this).removeClass("fs_reportmgr_rp_icon_click");if(!FS.REPORTMGR.DIR.dirTabletree.getSelectedNodes()[0]||FS.REPORTMGR.DIR.dirTabletree.getSelectedNodes()[0].pId==="0-2"){FR.Msg.alert(FR.i18nText("FS-Generic-Simple_Alert"),FR.i18nText("FS-Report-No_Dir_Selected"));return}var g=FR.i18nText("FS-Report-RP_AddLabel");var d=function(){return a.DIR._addOrEditRP()};var f=function(){};var e=null;a.rpDialog=a.createRPDialog(g,d,f,e);a.rpDialog.setVisible(true)}}};c.push(b)}}});
(function(){FS.Plugin.MessageHelper.items.push({version:1,action:function(a){if(a.taskId!=null){FS.tabPane.addItem({title:FR.i18nText("FS-Report-RP_MyTask"),src:FR.servletURL+"?reportlet="+FR.cjkEncode(a.url)+"&op=write&__processtaskid__="+a.taskId+"&__allprocesstaskid__="+a.alltaskId})}}});FS.Plugin.SystemMessageProvider.items.push({version:1,action:function(b){var a={title:FR.i18nText("FS-System-Report_Message"),messageType:["process_alert","process_remind"]};return this.createMsgPaneConfig(b,a)
}})})(jQuery);
$.extend(FS.Design.op,{9:function(a){FS.SYSMONITOR.init(a)}});FS.SYSMONITOR={init:function(b){FR.$defaultImport("/com/fr/fs/web/css/manager/fs_sysmonitor.css","css");var a=[this.logInfoModule(),this.visitMgrModule(),this.sysUsageDetail(),this.logCleanModule(),this.sysStateModule(),this.sysExamModule()];$.each(FS.Plugin.SystemMonitor,function(c,d){var e=d.extraPane;if($.isFunction(e)){a.push(e.apply(this))}});this.sysmonitor=new FS.LTabPane({width:"100%",height:"100%",items:a,style:"blue",marginLeft:40,vgap:21,renderEl:b});
this.createSetPane(b)},createSetPane:function(b){var a=this;var c=FR.createWidget({type:"floatpane",anchor:b,contentHeight:220,contentWidget:{type:"confirm",fit:true,doSize:true,closeAfterAction:false,btnsAlignment:"left",needSeparate:8,onOK:function(){var f={isRecordToLogDB:c.getWidgetByName("LOGSTATE").getValue(),loglevel:c.getWidgetByName("LOGLEVEL").getValue()};var d=function(h,g){if(g==="success"){FR.Msg.toast(FR.i18nText("FS-Generic-Simple_Successfully"))}};var e={url:FR.servletURL+"?op=fs_monitor&cmd=sc_log_set",type:"POST",data:f};
FS.Async.ajax(e,d);var d=function(h,g){if(g==="success"){c.doSlide();FR.Msg.toast(FR.i18nText("FS-Generic-Simple_Successfully"))}}},onCancel:function(){a.popSetData(c);c.doSlide()},contentWidget:{type:"tablelayout",rowSize:[0,90,50],columnSize:[20,660],vgap:20,items:[[null,{el:$("<div/>")}],[null,{el:{widgetName:"LOGSETTABLE",type:"tablelayout",columnSize:[75,FR.i18nTextWidth("FS-Monitor_Export_To_DB",6.5)>110?(FR.i18nTextWidth("FS-Monitor_Export_To_DB",6.5)+50):131,140],rowSize:[25,23],vgap:8,items:[[{el:{type:"llabel",value:FR.i18nText("FS-Monitor-Log_Setting")}},{el:{type:"llabel",value:FR.i18nText("FS-Monitor_Export_To_DB")}},{el:{type:"switch",widgetName:"LOGSTATE"}}],[null,{el:{type:"llabel",value:FR.i18nText("FS-Monitor-Log_Level")}},{el:{type:"combo",widgetName:"LOGLEVEL",allowBlank:false,items:[{text:"SEVERE",value:"SEVERE"},{text:"WARNING",value:"WARNING"},{text:"INFO",value:"INFO"},{text:"DEBUG",value:"DEBUG"}]}}]]}}]]}}});
this.popSetData(c)},popSetData:function(d){var b=this;var a=function(f,e){if(e=="success"){var g=FR.jsonDecode(f.responseText);d.getWidgetByName("LOGSTATE").setValue(g.isRecordToLogDB);d.getWidgetByName("LOGLEVEL").setValue(g.loglevel)}};var c={url:FR.servletURL+"?op=fs_monitor&cmd=sc_log_get",type:"POST"};FS.Async.ajax(c,a)},logInfoModule:function(){var a=this;var b={title:FR.i18nText("FS-Monitor-Log_View"),content:{type:"absolute",items:[{el:{type:"panel",width:500,height:25,doSize:true,contentWidget:{type:"tablepane",colSize:[FR.i18nTextWidth("FS-Schedule-Start_Date")+9,165,FR.i18nTextWidth("FS-Schedule-End_Date")+20,165,20,60],rowSize:[21],items:[[{type:"llabel",value:FR.i18nText("FS-Schedule-Start_Date")},{type:"datetime",value:new Date(),format:"yyyy-MM-dd",widgetName:"STARTDATE"},{type:"llabel",value:FR.i18nText("FS-Schedule-End_Date"),textalign:"center"},{type:"datetime",value:new Date(),format:"yyyy-MM-dd",widgetName:"ENDDATE"},$("<div/>"),{type:"quickbutton",text:FR.i18nText("FS-Generic-Simple_Query"),style:"blue",handler:function(){var e=a.sysmonitor.getWidgetByName("ERRORGRID");
var d=a.sysmonitor.getWidgetByName("STARTDATE").getValue(),c=a.sysmonitor.getWidgetByName("ENDDATE").getValue();e.options.async={url:FR.servletURL+"?op=fs_monitor&cmd=sc_get_loginfo",type:"POST",data:{startTime:d,endTime:c}};e.refresh()}}]]}},x:40,y:70},{el:{type:"asygngrid",isInitWithData:false,widgetName:"ERRORGRID",page:true,pageCount:15,columnsConfig:[{key:"error",value:FR.i18nText("FS-Monitor-Simple_Error_Message"),width:260},{key:"detailError",value:" ",width:40,onCellCreate:function(e,g,d,c){var f=$('<div class="fs-sysmonitor-detail"/>').text(FR.i18nText("FS-System-Detail_Info")).hover(function(){$(this).addClass("fs-sysmonitor-detail-hover")
},function(){$(this).removeClass("fs-sysmonitor-detail-hover")}).click(function(){var h=$('<div class="fs-sysmonitor-detailmsg"/>').append($("<span/>").text(d.detailError));h.appendTo($("body")).css({position:"absolute",left:$(this).offset().left+$(this).width(),top:$(this).offset().top+$(this).height(),"z-index":FR.widget.opts.zIndex++});$(document).bind("mousedown.tip",function(j){var i=j.target;if(!$(i).isChildAndSelfOf(".fs-sysmonitor-detailmsg")){h.remove();$(document).unbind("mousedown.tip")
}})});return f}},{key:"logtime",value:FR.i18nText("FS-Monitor-Error_Time"),width:190},{key:"reportname",value:FR.i18nText("FS-Monitor-Error_Template"),width:200}]},x:40,y:100}]}};return b},visitMgrModule:function(){var a={title:FR.i18nText("FS-Module-Access_Info"),content:{type:"panel",width:800,height:750,doSize:true,contentWidget:this._createVisitorViewTable()}};return a},_createVisitorViewTable:function(){var a={widgetName:"visitorViewModel",type:"tablelayout",items:[[{el:{type:"llabel",levelStyle:1,value:FR.i18nText("FS-System-Visit_Times")}},null],[{el:this._createTimePaneForChart()},null],[{el:this._createTimeChartPane()},null],[{el:{type:"llabel",levelStyle:1,value:FR.i18nText("FS-System-Report_Visit_Detail")}},null],[{el:this._createTimeQueryPane()},null],[{el:this._createVisitorInfoShowTable()},null],[{el:this._createVisitorDetailInfoShowTable()},null]],columnSize:[761,"fill"],rowSize:[28,28,245,28,40,460,460],vgap:10};
return a},_createTimePaneForChart:function(){var a=this;var c=new Date();var b={widgetName:"timePaneForChart",type:"panel",width:760,height:35,doSize:true,contentWidget:{widgetName:"timePaneAbsolute",type:"absolute",items:[{x:250,y:0,type:"iconbutton",width:25,baseClass:"fr-grid-foot-first",handler:function(){var e=a.sysmonitor.getWidgetByName("statisticChartTime");var d=e.getValue();a.chartTime=a.getDateByFormat(d,0);e.setValue(a.chartTime);a._refreshIframe()}},{x:290,y:0,type:"iconbutton",width:25,baseClass:"fr-grid-foot-prev",handler:function(){var e=a.sysmonitor.getWidgetByName("statisticChartTime");
var d=e.getValue();a.chartTime=a.getDateByFormat(d,1);e.setValue(a.chartTime);a._refreshIframe()}},{x:320,y:0,type:"datetime",value:c,format:"yyyy-MM",height:21,width:140,widgetName:"statisticChartTime",listeners:[{eventName:"afteredit",action:function(){a.chartTime=this.getValue();a._refreshIframe()}}]},{x:460,y:0,type:"iconbutton",width:25,baseClass:"fr-grid-foot-next",handler:function(){var e=a.sysmonitor.getWidgetByName("statisticChartTime");var d=e.getValue();a.chartTime=a.getDateByFormat(d,2);
e.setValue(a.chartTime);a._refreshIframe()}},{x:495,y:0,type:"iconbutton",width:25,baseClass:"fr-grid-foot-last",handler:function(){var e=a.sysmonitor.getWidgetByName("statisticChartTime");var d=e.getValue();a.chartTime=a.getDateByFormat(d,3);e.setValue(a.chartTime);a._refreshIframe()}}]}};return b},_createTimeQueryPane:function(){var a=this;var b=new Date();var c={type:"panel",width:760,height:35,doSize:true,renderEl:$("<div/>"),contentWidget:{widgetName:"timeQueryAbsolute",type:"absolute",items:[{type:"llabel",value:FR.i18nText("FS-Schedule-Start_Date"),x:0,y:4,height:21,width:26},{type:"datetime",value:new Date(b.getTime()-1000*60*60*24),format:"yyyy-MM-dd",x:26,y:4,height:21,width:165,widgetName:"startdate"},{type:"llabel",value:FR.i18nText("FS-Schedule-End_Date"),textalign:"center",x:190,y:4,height:21,width:35},{type:"datetime",value:b,format:"yyyy-MM-dd",x:224,y:4,height:21,width:165,widgetName:"enddate"},{type:"quickbutton",text:FR.i18nText("FS-Generic-Simple_Query"),x:407,y:4,height:21,width:60,handler:function(){var e=a.sysmonitor.getWidgetByName("startdate").getValue();
var d=a.sysmonitor.getWidgetByName("enddate").getValue();a.getVisitorInfo(e,d);a.popOrRefreshData()}},{type:"quickbutton",text:FR.i18nText("FS-Generic-Export_And_Output"),x:486,y:4,height:21,width:FR.i18nTextWidth("FS-Generic-Export_And_Output")+20,handler:function(){var e=a.sysmonitor.getWidgetByName("startdate").getValue();var d=a.sysmonitor.getWidgetByName("enddate").getValue();FR.ajax({url:FR.servletURL+"?op=fs_main&cmd=check_admin",type:"POST",complete:function(h,g){var f=FR.jsonDecode(h.responseText);
if(f.isAdmin===true){a.exportVisitorInfo(e,d)}else{FR.Msg.toast(FR.i18nText("FS-Prompt_Need_Admin_Privilege"))}}})}},{type:"checkbox",widgetName:"isShowDetail",text:FR.i18nText("FS-System_View_Detail"),value:true,x:646,y:4,height:28,width:Math.max(100,FR.i18nTextWidth("FS-System_View_Detail")+52),handler:function(){var e=a.sysmonitor.getWidgetByName("isShowDetail").getValue();if(e===true){var d=a.sysmonitor.getWidgetByName("visitorViewModel");d.setRowVisible(5,true);d.setRowVisible(6,false);d.doLayout();
return}else{var d=a.sysmonitor.getWidgetByName("visitorViewModel");d.setRowVisible(5,false);d.setRowVisible(6,true);d.doLayout();return}}}]}};return c},_refreshIframe:function(){var a;a=this.chartTime+"-01";var b=FR.servletURL+"?op=fr_server&cmd=sc_report_op_timemap&__showtoolbar__=false&chartTime="+a;$("#fs_visitor_manager_iframe").attr("src",b)},_createTimeChartPane:function(){var d;var b=new Date();d=FR.date2Str(b,"yyyy-MM")+"-01";var a=FS&&FS.serverID?"&serverID="+FS.serverID:"";var c={type:"panel",width:760,height:245,renderEl:$("<div/>"),doSize:true,contentHtml:$('<iframe id="fs_visitor_manager_iframe" '+'style="height:245px;width:760px;border:0px" '+"src="+FR.servletURL+"?op=fr_server&cmd=sc_report_op_timemap&__showtoolbar__=false&chartTime="+d+a+"/>")};
return c},_createVisitorDetailInfoShowTable:function(){var a={widgetName:"infoTable",renderEl:$("<div/>"),page:true,pageCount:10,type:"quickgrid",columnsConfig:[{key:"templateName",value:FR.i18nText("FS-Monitor-Visit_Template"),width:178},{key:"path",value:FR.i18nText("FS-Monitor-Visit_Path"),width:200},{key:"opType",value:FR.i18nText("FS-Monitor_Action_In_Detail"),width:100},{key:"times",value:FR.i18nText("FS-Monitor-Visit_Times"),width:142},{key:"times",value:FR.i18nText("FS-Monitor-Visit_Times"),width:80}],items:[]};
return a},_createVisitorInfoShowTable:function(){var a={widgetName:"detailTable",type:"quickgrid",page:true,pageCount:10,columnsConfig:[{key:"path",value:FR.i18nText("FS-System-Visit_Template"),width:140},{key:"logtime",value:FR.i18nText("FS-System-Visit_Time"),width:150},{key:"ip",value:FR.i18nText("FS-System-Visit_IP"),width:130},{key:"opType",value:FR.i18nText("FS-Monitor-Form_Action"),width:100},{key:"userrole",value:FR.i18nText("FS-Generic-Simple_Role"),width:100},{key:"username",value:FR.i18nText("FS-Generic-Simple_User"),width:100}],items:[]};
return a},getVisitorInfo:function(b,g){var j=this;var a=FR.servletURL+"?op=fs_manager&cmd=getVisitorInfo";var c={startTime:b+" 00:00:00",endTime:g+" 23:59:59"};var d=FS.Sync.ajax({url:a,type:"POST",data:c});j.infos=d.infos;j.statisticsInfos=d.statisticsInfos;for(var f=0,h=j.infos.length;f<h;f++){var e=parseInt(j.infos[f]["opType"]);j.infos[f]["opType"]=j.convertOpType(e)}for(var f=0,h=j.statisticsInfos.length;f<h;f++){var e=parseInt(j.statisticsInfos[f]["opType"]);j.statisticsInfos[f]["opType"]=j.convertOpType(e)
}},exportVisitorInfo:function(b,a){window.location=FR.servletURL+"?op=fs_manager&cmd=exportVisitorInfo&startTime="+b+"&endTime="+a},convertOpType:function(b){var a;switch(b){case 0:a=FR.i18nText("FS-Generic-Simple_Pagination")+FR.i18nText("FS-Privilege-Simple_Preview");break;case 1:a=FR.i18nText("FS-Privilege-Simple_Preview");break;case 2:a=FR.i18nText("FS-Generic-Face_Write")+FR.i18nText("FS-Privilege-Simple_Preview");break;case 3:a=FR.i18nText("FS-Generic-Simple_Form")+FR.i18nText("FS-Privilege-Simple_Preview");
break;default:a=FR.i18nText("FS-Privilege-Simple_Preview")}return a},popOrRefreshData:function(){var a=this.sysmonitor.getWidgetByName("visitorViewModel");a.getWidgetByName("detailTable").refresh(this.infos);a.getWidgetByName("infoTable").refresh(this.statisticsInfos);var b=this.sysmonitor.getWidgetByName("isShowDetail").getValue();if(b===true){var a=this.sysmonitor.getWidgetByName("visitorViewModel");a.setRowVisible(5,true);a.setRowVisible(6,false);a.doLayout();return}else{var a=this.sysmonitor.getWidgetByName("visitorViewModel");
a.setRowVisible(5,false);a.setRowVisible(6,true);a.doLayout();return}},getDateByFormat:function(f,b){var a;var d=f.split("-");var c=parseInt(d[0]);var e=parseInt(d[1]);switch(b){case 0:a=(--c)+"-"+(e<10?"0":"")+e;break;case 1:if(e===1){a=(--c)+"-"+"12";break}else{a=c+"-"+(--e<10?"0":"")+e;break}break;case 2:if(e===12){a=(++c)+"-"+"01";break}else{a=c+"-"+(++e<10?"0":"")+e;break}case 3:a=(++c)+"-"+(e<10?"0":"")+e;break}return a},sysStateModule:function(){return{title:FR.i18nText("FS-Generic-System_Status"),content:{type:"accordion",items:[{menu:FR.i18nText("FS-Generic-Server_Usage"),content:{type:"tablepane",colSize:[220,460,24],vgap:5,rowSize:[21,"auto"],items:[[{type:"llabel",value:FR.i18nText("FS-System-Current_Number_of_Users_Online"),levelStyle:0,fontfamily:"SimSun",fontsize:"14px",color:"#1483FF",fontweight:"bold"},{type:"llabel",value:"0",widgetName:"CURUSERNUMBER",levelStyle:0,fontfamily:"SimSun",fontsize:"14px",color:"#1483FF",fontweight:"bold"},{type:"iconbutton",width:24,height:24,imgsrc:"fs-sysmonitor-refresh",handler:function(){this.getWidgetByName("VISITINFOGRID").refresh()
}}],[null,{type:"quickgrid",widgetName:"VISITINFOGRID",page:true,pageCount:15,async:{url:FR.servletURL+"?op=fs_set&cmd=sc_get_monitorinfo",type:"POST",data:{serverID:FS.serverID}},columnsConfig:[{key:"reportName",value:FR.i18nText("FS-Monitor-Visited_Report"),width:200},{key:"userIP",value:FR.i18nText("FS-Monitor-Visitor_IP"),width:170},{key:"userName",value:FR.i18nText("FS-Monitor-Visitor_User"),width:160},{key:"visitStartTime",value:FR.i18nText("FS-Monitor-Visit_Start_Time"),width:160}],onAsyncSuccess:function(c,b){var a=FR.jsonDecode(c);
this.options.items=a.visitinfo;this.getWidgetByName("CURUSERNUMBER").setValue(a.userCount)}},null]]}},{menu:FR.i18nText("FS-Generic-Memory_Usage"),content:{type:"quickgrid",marginLeft:20,marginRight:20,isHeadShow:false,async:{url:FR.servletURL+"?op=fr_server&cmd=sc_get_memoryinfo",type:"POST",data:{serverID:FS.serverID}},onAsyncSuccess:function(c,b){var a=FR.jsonDecode(c);this.options.items=[{key:FR.i18nText("FS-Monitor-Free_Memory"),value:a.freeMemory+"MB"},{key:FR.i18nText("FS-Monitor-Total_Memory"),value:a.totalMemory+"MB"},{key:FR.i18nText("FS-Monitor-Max_Memory"),value:a.maxMemory+"MB"}]
},columnsConfig:[{key:"key",value:"key",width:160,css:{"font-weight":"bold"}},{key:"value",value:"value",width:160}]}},{menu:FR.i18nText("FS-Setting-Config_File_Detection"),content:{type:"quickgrid",marginLeft:20,marginRight:20,isHeadShow:false,async:{url:FR.servletURL+"?op=fs_sysexam&cmd=configfile",type:"POST",data:{serverID:FS.serverID}},onAsyncSuccess:function(c,b){var a=FR.jsonDecode(c);this.options.items=[{key:FR.i18nText("FS-System-Deploy_Type"),value:a.deploy_type},{key:FR.i18nText("FS-Monitor-Resource_Path_Is"),value:a.resource_path}]
},columnsConfig:[{key:"key",value:"key",width:220,css:{"font-weight":"bold"}},{key:"value",value:"value",width:400}]}},{menu:FR.i18nText("FS-System-Connection_Pool"),content:{type:"quickgrid",marginLeft:20,marginRight:20,isHeadShow:false,async:{url:FR.servletURL+"?op=fs_set&cmd=sc_get_monitorinfo",type:"POST",data:{serverID:FS.serverID}},onAsyncSuccess:function(f,c){var b=FR.jsonDecode(f);var d=[];for(var e=0,a=b.poolinfo.length;e<a;e++){for(var g in b.poolinfo[e]){d.push({key:FR.i18nText(g),value:b.poolinfo[e][g]})
}}this.options.items=d},onAfterRowCreate:function(a,c,b){if(c%5===0&&c!==0){a.css({"border-top":"2px solid #1C8AD0"})}},columnsConfig:[{key:"key",value:"key",width:220,css:{"font-weight":"bold"}},{key:"value",value:"value",width:400}]}}]}}},sysExamModule:function(){var a={title:FR.i18nText("FS-Module-System_Exam"),content:{type:"accordion",items:[{menu:FR.i18nText("FS-Monitor-Server_Setting_Detection"),content:{type:"quickgrid",marginLeft:20,marginRight:20,async:{url:FR.servletURL+"?op=fs_sysexam&cmd=server",type:"POST",data:{serverID:FS.serverID}},onAsyncSuccess:function(d,c){var b=FR.jsonDecode(d);
this.options.items=[];if(b.currentMemory){this.options.items.push({problem:FR.i18nText("FS-Monitor-Memory_Low"),suggestion:FR.i18nText("FS-Monitor-Server_Max_Memory_Is")+b.currentMemory+"M"+FR.i18nText("FS-Monitor_Suggestion_Comma")+FR.i18nText("FS-Monitor-Not_Less_Than")+b.idealMemory+"M"})}},columnsConfig:[{key:"problem",value:FR.i18nText("FS-Monitor-Simple_Problem"),width:220},{key:"suggestion",value:FR.i18nText("FS-Monitor-Simple_Suggestion"),width:400},{key:"refresh",value:"",width:30,onHeadCellCreate:function(e,b){var d=this;
var c=new FR.IconButton({width:24,height:24,imgsrc:"fs-sysmonitor-refresh",handler:function(){d.refresh()}});return c.element}}]}},{menu:FR.i18nText("FS-System-Report_Manager_Detection"),content:{type:"quickgrid",marginLeft:20,marginRight:20,async:{url:FR.servletURL+"?op=fs_sysexam&cmd=report",type:"POST",data:{serverID:FS.serverID}},onAsyncSuccess:function(e,c){var b=FR.jsonDecode(e);var d=[];$.each(b.unExistFiles,function(f,g){d.push({problem:b.workDirectory+"/"+g+FR.i18nText("FS-Monitor-Not_Exist"),suggestion:FR.i18nText("FS-Monitor-Suggestion_FS_Report")})
});this.options.items=d},columnsConfig:[{key:"problem",value:FR.i18nText("FS-Monitor-Simple_Problem"),width:220},{key:"suggestion",value:FR.i18nText("FS-Monitor-Simple_Suggestion"),width:400},{key:"refresh",value:"",width:30,onHeadCellCreate:function(e,b){var d=this;var c=new FR.IconButton({width:24,height:24,imgsrc:"fs-sysmonitor-refresh",handler:function(){d.refresh()}});return c.element}}]}},{menu:FR.i18nText("FS-Monitor-Global_Properties_detection"),content:{type:"quickgrid",marginLeft:20,marginRight:20,async:{url:FR.servletURL+"?op=fs_sysexam&cmd=globalattr",type:"POST",data:{serverID:FS.serverID}},onAsyncSuccess:function(e,c){var b=FR.jsonDecode(e);
var d=[];$.each(b,function(f,g){if(g!==false){d.push({problem:g.cpt_name+FR.i18nText("FS-Monitor-No_Global_Style")+'"'+g.style_name+'"',suggestion:FR.i18nText("FS-Monitor-Suggestion_Add_Name")+'"'+g.style_name+'"'+FR.i18nText("FS-Monitor-Suggestion_Of_Global_Style")})}else{d.push({problem:g.cpt_name+FR.i18nText("FS-Monitor-Has_Error"),suggestion:FR.i18nText("FS-Monitor-Error_When_Read_Template")})}});this.options.items=d},columnsConfig:[{key:"problem",value:FR.i18nText("FS-Monitor-Simple_Problem"),width:220},{key:"suggestion",value:FR.i18nText("FS-Monitor-Simple_Suggestion"),width:400},{key:"refresh",value:"",width:30,onHeadCellCreate:function(e,b){var d=this;
var c=new FR.IconButton({width:24,height:24,imgsrc:"fs-sysmonitor-refresh",handler:function(){d.refresh()}});return c.element}}]}}]}};return a},sysUsageDetail:function(){var a=this;var c=FR.createWidget({type:"quickbutton",width:FR.i18nTextWidth("FS-Monitor-Model_Process_Export")+30,height:17,style:"blue",text:FR.i18nText("FS-Monitor-Model_Process_Export"),widgetName:"functionexporter",handler:function(){FR.ajax({url:FR.servletURL+"?op=fs_main&cmd=check_admin",type:"POST",complete:function(f,e){var d=FR.jsonDecode(f.responseText);
if(d.isAdmin===true){window.location=FR.servletURL+"?op=product_improve&cmd=get_func_msg&start=1"}else{FR.Msg.toast(FR.i18nText("FS-Prompt_Need_Admin_Privilege"))}}})}});var b={title:FR.i18nText("FS-Monitor-Use_Detail"),content:{type:"panel",width:751,height:640,doSize:true,contentWidget:{widgetName:"usageViewModule",type:"tablelayout",items:[[{el:{type:"llabel",levelStyle:1,value:FR.i18nText("FS-Monitor-Templet_Lifecycle")}}],[{el:this._createTempleteLCPane()}],[{el:{type:"tablelayout",rowSize:[25],columnSize:[729-c.options.width,"fill"],vgap:2,items:[[{el:{type:"llabel",levelStyle:1,value:FR.i18nText("FS-Monitor-Model_Process")}},{el:$('<div id="exportDiv" class="first_level_style"/>').append(c.element)}]]}}],[{el:this._createModelProcess()}],[{el:{type:"label",listeners:[{eventName:"afterinit",action:function(){var d=function(h,g){if(g==="success"){var f=FR.jsonDecode(h.responseText);
$.each(f.usingFuncs,function(j,k){$("#using-funcs").append(a.createUserWrap(k))});$.each(f.unusedFuncs,function(j,k){$("#unused-funcs").append(a.createUserWrap(k))});var i=a.sysmonitor.getWidgetByName("usageViewModule");i.getWidgetByName("funcunusedcount").setValue(f.unusedFuncs.length);i.getWidgetByName("funcusingcount").setValue(f.usingFuncs.length)}};var e={url:FR.servletURL+"?op=fs_monitor&cmd=get_functions_process",type:"POST"};FS.Async.ajax(e,d)}}]}}]],columnSize:[761],rowSize:[28,320,28,240,0],vgap:10}}};
return b},_createTempleteLCPane:function(){var a=this;var b={widgetName:"templeteLCTable",renderEl:$("<div/>"),page:true,pageCount:10,type:"quickgrid",columnsConfig:[{key:"tname",value:FR.i18nText("FS-Monitor-Templet_name"),width:178},{key:"logtime",value:FR.i18nText("FS-Monitor-Templet_Release_Date"),width:200},{key:"state",value:FR.i18nText("FS-Monitor-Templet_State"),width:100},{key:"activedays",value:FR.i18nText("FS-Monitor-Templet_Active_Days"),width:142}],items:[],async:{url:FR.servletURL+"?op=fs_monitor&cmd=getUsageInfo",type:"POST"},localeArray:["state"],onAsyncSuccess:function(e,d){var c=FR.jsonDecode(e);
var f=a.sysmonitor.getWidgetByName("usageViewModule");f.getWidgetByName("templeteLCTable").refresh(c.infos)}};return b},_createModelProcess:function(){var a=this;var b={widgetName:"modelProcessPane",type:"tablelayout",rowSize:[100,1,100,2,10],columnSize:[150,1,"fill"],vgap:10,items:[[{el:{type:"tablelayout",rowSize:[28,18,18],columnSize:[150],vgap:5,items:[[{el:$("<div/>")}],[{el:{type:"label",textalign:"center",value:FR.i18nText("FS-Monitor-Model_Unused")}}],[{el:{type:"label",textalign:"center",widgetName:"funcunusedcount"}}]]}},{el:$('<div id="line2"/>').addClass("fs-monitor-line")},{el:$('<div id="unused-funcs"/>').addClass("fs-overflow-auto")}],[{el:$('<div id="line1"/>').addClass("fs-monitor-line")},{el:$('<div id="line2"/>').addClass("fs-monitor-line")},{el:$('<div id="line2"/>').addClass("fs-monitor-line")}],[{el:{type:"tablelayout",rowSize:[28,18,18],columnSize:[150],vgap:5,items:[[{el:$("<div/>")}],[{el:{type:"label",textalign:"center",value:FR.i18nText("FS-Monitor-Model_Using")}}],[{el:{type:"label",textalign:"center",widgetName:"funcusingcount"}}]]}},{el:$('<div id="line2"/>').addClass("fs-monitor-line")},{el:$('<div id="using-funcs"/>').addClass("fs-overflow-auto")}],[{el:$('<div id="line3"/>').addClass("fs-monitor-end-line")},{el:$('<div id="line4"/>').addClass("fs-monitor-end-line")},{el:$('<div id="line5"/>').addClass("fs-monitor-end-line")}],[{el:$('<div id="empty"/>')},null,null]]};
return b},createUserWrap:function(a){var c=$('<a href="#"/>').addClass("fs-func-name").data("user",a.funcName);var b=FR.i18nText(a.funcName)||"";$("<span/>").text(b).attr("title",b).appendTo(c);return c},logCleanModule:function(){var a={title:FR.i18nText("FS-Generic-Platform_Module_Log")+FR.i18nText("FS-Monitor-Log_Clean"),content:{type:"panel",width:800,height:400,doSize:true,contentWidget:{widgetName:"logCleanModule",type:"tablelayout",items:[[{el:{type:"llabel",levelStyle:1,value:FR.i18nText("FS-Generic-Platform_Module_Log")+FR.i18nText("FS-Monitor-Log_Clean")}}],[{el:this._createlogCleanPane()}]],columnSize:[761,"fill"],rowSize:[28,360],vgap:10}}};
return a},_createlogCleanPane:function(){var a=this;var c={widgetName:"logCleanTable",type:"tablelayout",rowSize:[20,40,40,40,30],columnSize:[200],vgap:10,items:[[{el:{type:"label",listeners:[{eventName:"afterinit",action:function(){var d=function(h,g){if(g==="success"){var f=FR.jsonDecode(h.responseText);a.sysmonitor.getWidgetByName("cleanRate").setValue(f.isStart,false);a.sysmonitor.getWidgetByName("startCleanDate").setEnable(f.isStart);a.sysmonitor.getWidgetByName("startCleanDate").setValue(f.clean_rate,true)
}};var e={url:FR.servletURL+"?op=fs_monitor&cmd=get_clean_config",type:"POST"};FS.Async.ajax(e,d)}}]}}],[{el:{type:"combo",widgetName:"startCleanDate",width:120,height:24,allowBlank:false,directEdit:false,items:[{text:FR.i18nText("FS-Monitor-Log_Clean_One_Week_Ago"),value:7},{text:FR.i18nText("FS-Monitor-Log_Clean_One_Month_Ago"),value:30},{text:FR.i18nText("FS-Monitor-Log_Clean_Two_Months_Ago"),value:2*30},{text:FR.i18nText("FS-Monitor-Log_Clean_Three_Months_Ago"),value:3*30}],value:7,listeners:[{eventName:"afteredit",action:function(){var g=a.sysmonitor.getWidgetByName("logCleanTable");
var f=g.getWidgetByName("cleanRate");b(f.getValue(),this.getValue());var e=this.getValue();var d;switch(e){case 7:d=FR.i18nText("FS-Monitor-Log_Clean_One_Week_Auto");break;case 30:d=FR.i18nText("FS-Monitor-Log_Clean_One_Month_Auto");break;case 60:d=FR.i18nText("FS-Monitor-Log_Clean_Two_Months_Auto");break;default:d=FR.i18nText("FS-Monitor-Log_Clean_Three_Months_Auto")}f.$btn.text(d)}}]}}],[{el:{type:"checkbox",widgetName:"cleanRate",text:FR.i18nText("FS-Monitor-Log_Clean_Three_Months_Auto"),listeners:[{eventName:"afteredit",action:function(){var d=this.getValue();
this.getWidgetByName("startCleanDate").setEnable(d);b(d,this.getWidgetByName("startCleanDate").getValue())}}],selected:true}}],[{el:{type:"button",text:FR.i18nText("FS-Monitor-Log_Clean"),width:80,height:28,handler:function(){var i=this;this.setEnable(false);var h=a.sysmonitor.getWidgetByName("startCleanDate").getValue();var e=function(k,j){i.setEnable(true);if($("#progressBar")){$("#progressBar").remove()}if(j==="success"){var l=FR.jsonDecode(k.responseText);if(l.failed){FR.Msg.toast(FR.i18nText("FS-Monitor_Clean_Failed"))
}else{FR.Msg.toast(FR.i18nText("FS-Monitor_Clean_Successfully"))}}else{FR.Msg.toast(FR.i18nText("FS-Monitor_Clean_Failed"))}};var f={url:FR.servletURL+"?op=fs_monitor&cmd=log_clean",type:"POST",data:{daysAgo:h}};FS.Async.ajax(f,e);if($("#progressBar").length<=0){var g=$("<div id = "+'"'+"progressBar"+'"'+">"+"</div>").appendTo("body");var d=$("<div>"+FR.i18nText("FS-Monitor-Log_Cleaning")+"..."+"</div>").appendTo(g);g.addClass("progressBar");d.addClass("progressBarTips fs-ui-fcolor-black")}}}}],[{el:{type:"label",value:FR.i18nText("FS-Monitor-Log_Copy")}}]]};
var b=function(d,e){FS.Sync.ajax({url:FR.servletURL+"?op=fs_monitor&cmd=set_clean_config",data:{clean_rate:e,isStart:d},type:"POST"})};return c}};
/*************备份还原的一些方法*************/
//获取当前时间
getCurrentDate = function() { 
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();          //秒
    var clock = year + ".";
    if(month < 10){
        clock += "0";
    }
    clock += month + ".";
    if(day < 10){
        clock += "0";
    }
    clock += day + " ";
    if(hh < 10){
        clock += "0";
    }
    clock += hh + ".";
    if (mm < 10){
        clock += '0'
    }
    clock += mm + ".";
    if (ss < 10){
        clock += '0'
    }
    clock += ss;
    return(clock);
} 
//创建手动备份设置对话框
createManualBackupSettingDialog = function(manualBackupGrid) {
    var self = this;
    var addMunualBackupSettingDialog = new FR.Dialog({
        title: FR.i18nText("FS-System-Config_Manual_Backup"),
        text4OK: FR.i18nText("FS-Generic-Simple_OK"),
        text4Cancel: FR.i18nText("FS-Generic-Simple_Cancel"),
        onOK: function () {
            //添加backup dialog确定按钮事件
            var defaultEntryName = getCurrentDate();
            //获取备份目录名
            var entryName = addMunualBackupSettingDialog.getWidgetByName("backupentryname").getValue();
            if (!entryName || !(entryName.length > 0)){
                entryName = defaultEntryName;
            }
            var config = {
                url: FR.servletURL + "?op=fr_server&cmd=manual_backup",
                data: {
                    optype: 'back_up',
                    entryName: entryName
                }
            };
            var completeFn = function(res, status){
                if (status === 'success') {
                    var manualBackupTable = manualBackupGrid;
                    manualBackupTable.refresh();
                    FR.Msg.toast(FR.i18nText("FS-System-Config_Backup_Complete"));
                }
            }
            FS.Async.ajax(config,completeFn);

        },
        onCancel: function () {
        },
        destroyOnClose: true,
        animate: false,
        width: 355,
        height: 150,
        confirm: true,
        border: true,
        closable: true,
        contentWidget: {
            type: 'absolute',
            items: [
                {
                    type: 'llabel',
                    value: FR.i18nText("FS-Generic-WF_Name"),
                    height: 21,
                    width: 30,
                    textalign: 'right',
                    x: 50,
                    y: 30
                },
                {
                    type: 'text',
                    value: getCurrentDate(),
                    height: 21,
                    width: 220,
                    widgetName: 'backupentryname',
                    x: 100,
                    y: 30
                }
            ]
        }
    });
    return addMunualBackupSettingDialog;
};

//创建手动备份列表配置
var createManualBackupGridCfg = function () {
    var self = this;
    var manualBackupGridCfg = [{
        key: 'manualbackupname',
        value: 'manualbackupname',
        width: 626
    }];
    manualBackupGridCfg.push({
        width: 24,
        onCellCreate: function (rowIdx, colIdx, item, colCfg) {
            var editBtn = new FR.IconButton({
                width: 24,
                height: 24,
                imgsrc: 'fs-servercfg-edit-blue',
                handler: function () {
                    var okCallback = function () {
                        //编辑用户dialog确定按钮事件
                        var newBackupName = editDialog.getWidgetByName("backupeditname").getValue();
                        var oldBackupName = item.manualbackupname;
                        var config = {
                            url: FR.servletURL + "?op=fr_server&cmd=manual_backup",
                            data: {
                                optype: 'edit_backup',
                                oldname: oldBackupName,
                                newname: newBackupName
                            }
                        };
                        var completeFn = function(res, status){
                            if (status === 'success') {
                                manualBackupGrid.resultWidgets.manualbackupgrid.refresh();
                            }
                        }
                        if (oldBackupName != newBackupName){
                            FS.Async.ajax(config,completeFn);
                        }
                    };
                    var editDialog = new FR.Dialog({
                        title: FR.i18nText("FS-System-Config_Manual_Backup"),
                        text4OK: FR.i18nText("FS-Generic-Simple_OK"),
                        text4Cancel: FR.i18nText("FS-Generic-Simple_Cancel"),
                        onOK: function () {
                            return okCallback.apply(this);
                        },
                        onCancel: function () {
                        },
                        destroyOnClose: true,
                        width: 355,
                        height: 150,
                        confirm: true,
                        border: true,
                        contentWidget: {
                            type: 'absolute',
                            items: [
                                {
                                    type: 'llabel',
                                    value: FR.i18nText("FS-Generic-WF_Name"),
                                    height: 21,
                                    width: 30,
                                    textalign: 'right',
                                    x: 50,
                                    y: 30
                                },
                                {
                                    type: 'text',
                                    height: 21,
                                    width: 220,
                                    widgetName: 'backupeditname',
                                    x: 100,
                                    y: 30
                                }
                            ]
                        }
                    });
                    editDialog.setVisible(true);
                    editDialog.getWidgetByName("backupeditname").setValue(item.manualbackupname);
                }
            });
            return editBtn.element;
        }
    });
    manualBackupGridCfg.push({
        width: 24,
        onCellCreate: function (rowIdx, colIdx, item, colCfg) {
            var restoreBtn = new FR.IconButton({
                width: 24,
                height: 24,
                imgsrc: 'fs-servercfg-restore',
                handler: function () {
                    FR.Msg.confirm(FR.i18nText("FS-System-Config_Restore"), FR.i18nText("FS-System-Config_Sure_To_Restore"), function (result) {
                        if (result) {
                            var config = {
                                url: FR.servletURL + "?op=fr_server&cmd=restore",
                                data: {
                                    backupname: item.manualbackupname,
                                    backuptype: 'manual'
                                },
                                type: 'POST'
                            };
                            var completeFn = function(res, status){
                                if (status === "success") {
                                    FR.Msg.toast(FR.i18nText("FS-System-Config_Restore_Complete"));
                                }
                            };
                            FS.Async.ajax(config,completeFn);
                        }
                    })
                }
            });

            return restoreBtn.element;
        }
    });

    var manualBackupGrid = {
        type: 'quickgrid',
        page: true,
        autoPage: true,
        pageCount: 10,
        multiSelect: true,
        intervalColor: true,
        isHeadShow: false,
        marginLeft: 10,
        marginRight: 10,
        widgetName: 'manualbackupgrid',
        async: {
            url: FR.servletURL + "?op=fr_server&cmd=manual_backup",
            data: {
                optype: 'list_backup'
            }
        },
        onAsyncSuccess: function (res, status) {
            var result = FR.jsonDecode(res);
            this.options.items = result;
            var backupNumPane = this.getWidgetByName("manualbackupnum");
            backupNumPane.setValue(result.length + "/30");
        },
        columnsConfig: manualBackupGridCfg
    };

    return manualBackupGrid;
};
//创建自动备份列表配置
var createAutoBackupGridCfg = function () {
    var self = this;
    var autoBackupGridCfg = [{
        key: 'autobackupname',
        value: 'autobackupname',
        width: 650
    }];
    autoBackupGridCfg.push({
        width: 24,
        onCellCreate: function (rowIdx, colIdx, item, colCfg) {
            var restoreBtn = new FR.IconButton({
                width: 24,
                height: 24,
                imgsrc: 'fs-servercfg-restore',
                handler: function () {
                    FR.Msg.confirm(FR.i18nText("FS-System-Config_Restore"), FR.i18nText("FS-System-Config_Sure_To_Restore"), function (result) {
                        if (result) {
                            var config = {
                                url: FR.servletURL + "?op=fr_server&cmd=restore",
                                data: {
                                    backupname: item.autobackupname,
                                    backuptype: 'auto'
                                },
                                type: 'POST'
                            };
                            var completeFn = function(res, status){
                                if (status === "success"){
                                    FR.Msg.toast(FR.i18nText("FS-System-Config_Restore_Complete"));
                                }
                            };
                            FS.Async.ajax(config,completeFn);
                        }
                    })
                }
            });
            return restoreBtn.element;
        }
    });
    var autoBackupGrid = {
        type: 'quickgrid',
        page: true,
        autoPage: true,
        pageCount: 10,
        multiSelect: true,
        intervalColor: true,
        isHeadShow: false,
        marginLeft: 10,
        marginRight: 10,
        widgetName: 'autobackupgrid',
        async: {
            url: FR.servletURL + "?op=fr_server&cmd=auto_backup",
            data: {
                optype: 'list_backup'
            }
        },
        onAsyncSuccess: function (res, status) {
            var result = FR.jsonDecode(res);
            this.options.items = result;
            var backupNumPane = this.getWidgetByName("autobackupnum");
            backupNumPane.setValue(result.length + "/30");
        },
        columnsConfig: autoBackupGridCfg
    };

    return autoBackupGrid;
};
//创建备份列表表头
var createHeaderControl = function (backupNum, backupDelete) {
    var self = this;
    var header = [
        {},{
            type: 'llabel',
            widgetName: backupNum,
            width: 40,
            height: 20,
            value: '0/30'
        }
    ];
    header.unshift({
        type: 'iconbutton',
        text: FR.i18nText("FS-System-Config_Delete_Backup"),
        baseClass: 'fs-servercfg-delete-blue',
        widgetName: backupDelete,
        handler: function () {
            var self = this;
            FR.Msg.confirm(FR.i18nText("FS-System-Config_Delete_Backup"), FR.i18nText("FS-Generic-Sure_To_Delete") + "?", function (result) {
                if (result) {
                    var backupGrid;
                    var backupType;
                    if(self.options.widgetName === "manualbackupdelete") {
                        backupGrid = self.getWidgetByName("manualbackupgrid");
                        backupType = "manual";
                    }
                    if(self.options.widgetName === "autobackupdelete") {
                        backupGrid = self.getWidgetByName("autobackupgrid");
                        backupType = "auto";
                    }
                    if(!backupGrid || !backupType){
                        return;
                    }
                    var selectedData = backupGrid.getSelectedData();
                    var backupNames = [];
                    for (var i = 0,len = selectedData.length; i < len; i++) {
                        backupNames.push(backupType === "manual" ? selectedData[i].manualbackupname : selectedData[i].autobackupname);
                    }
                    var config = {
                        url: FR.servletURL + "?op=fr_server&cmd=delete",
                        data: {
                            backupname: backupNames,
                            backuptype: backupType
                        },
                        type: 'POST'
                    };
                    var completeFn = function(res, status){
                        if (status === "success") {
                            backupGrid.refresh();
                        }
                    };
                    if (backupNames.length > 0){
                        FS.Async.ajax(config,completeFn);
                    }
                }
            });
        }
    })

    return header;
};

//获取自动备份定时器信息
var getAutoBackupTimer = function (){
    return FS.Sync.ajax({
        url: FR.servletURL + "?op=fr_server&cmd=auto_backup",
        data: {
            optype: "getinfo_backup"            
        },
        type: 'POST'
    });
};

//更新自动备份定时器
var updateAutoBakupTimer = function (isStartTimer, timerFreq){
    FS.Sync.ajax({
        url: FR.servletURL + "?op=fr_server&cmd=auto_backup",
        data: {
            optype: "update_backup",
            isStart: isStartTimer,
            backup_frequency: timerFreq
        },
        type: 'POST'
    });
};

var popData = function (index) {
    _popBackupdata();
};

var _popBackupdata = function () {
};

/*************备份还原*************/
//备份还原模块
var backupRestoreModule = function () {
    var result = getAutoBackupTimer();
    var isTimerStart = true;
    var backupFreq = 7;
    //假如不存在自动备份的任务就创建一个
    if(!result.timerName) {
        updateAutoBakupTimer(isTimerStart, backupFreq);
    }
    else {
        isTimerStart = result.isStart;
        backupFreq = result.backup_frequency;
    }

    //backup config
    var backupConfig = {
        type: 'llabel',
        levelStyle: 1,
        value: FR.i18nText("FS-System-Config_Backup")
    };
    var backupConfigPanel = {
        type: 'tablepane',
        colSize: [750],
        rowSize: [28,20],
        vgap: 15,
        items: 
        [
            [{
                type: 'quickbutton', 
                text: FR.i18nText("FS-System-Config_Manual_Backup"), 
                style: 'blue', 
                height: 28, 
                width: FR.i18nTextWidth("FS-System-Config_Manual_Backup") + 30,
                handler: function() {
                    var self = this;
                    if (self.getWidgetByName("manualbackupnum").getValue().split("/")[0] >= 30){
                        FR.Msg.toast(FR.i18nText("FS-System-Config_Cleanup_Backup"));
                        return;
                    }
                    var dialog = createManualBackupSettingDialog(self.getWidgetByName("manualbackupgrid"));
                    dialog.setVisible(true);
                }
            }], 
            [{
                type: 'tablepane',
                colSize: ['auto', 10, 60, 10, 'auto'],
                rowSize: [20],
                vgap: 0,
                items:
                [
                    [{
                        type: 'checkbox',
                        marginleft: 0,
                        widgetName: 'isautobackup',
                        text: FR.i18nText("FS-System-Config_Backup_Every"),
                        listeners: [{
                            eventName: 'afteredit',
                            action: function() {
                                var isautobackup = this.getValue();
                                this.getWidgetByName("backupfrequency").setEnable(isautobackup);
                                updateAutoBakupTimer(isautobackup, this.getWidgetByName("backupfrequency").getValue());
                            }
                        }],
                        selected: isTimerStart
                    },{},{
                        type: 'combo',
                        widgetName: 'backupfrequency',
                        directEdit: false,
                        value: backupFreq,
                        items: [
                        {value: 1, text: FR.i18nText("FS-System-Config_Backup_Frequency_Oneday")},
                        {value: 7, text: FR.i18nText("FS-System-Config_Backup_Frequency_Oneweek")},
                        {value: 30, text: FR.i18nText("FS-System-Config_Backup_Frequency_Onemonth")},
                        {value: 90, text: FR.i18nText("FS-System-Config_Backup_Frequency_Threemonths")},
                        {value: 180, text: FR.i18nText("FS-System-Config_backup_Frequency_Sixmonths")}
                        ],
                        disabled: !isTimerStart,
                        listeners: [{
                            eventName: "afteredit",
                            action: function(){
                                var backupFrequency = this.getValue();
                                //假如选了个空的值，默认设置为一周
                                if(!backupFrequency){
                                    this.setValue(7);
                                    backupFrequency = 7;
                                }
                                updateAutoBakupTimer(true, backupFrequency);
                            }
                        }]
                    },{},{
                        type: 'llabel',
                        value: FR.i18nText("FS-System-Config_Auto_Backup_Once")
                    }]
                ]
            }]
        ]
    };
    //manual backup
    var manualBackupItems = {
        menu: FR.i18nText("FS-System-Config_Restore") + ':' + FR.i18nText("FS-System-Config_Manual_Backup"),
        content: {
            type: 'tablepane',
            colSize: ['auto', 620, 30],
            vgap: 15,
            rowSize: [28, 'auto'],
            items: 
            [
            createHeaderControl('manualbackupnum', 'manualbackupdelete'),
            [createManualBackupGridCfg(),null,null]
            ]
        }
    };
    var restoreManualBackup = {
        type: 'accordion',
        items: [manualBackupItems]
    };
    //auto backup
    var autoBackupItems = {
        menu: FR.i18nText("FS-System-Config_Restore") + ':' + FR.i18nText("FS-System-Config_Auto_Backup"),
        content: {
            type: 'tablepane',
            colSize: ['auto', 620, 30],
            vgap: 15,
            rowSize: [28, 'auto'],
            items: 
            [
            createHeaderControl('autobackupnum', 'autobackupdelete'),
            [createAutoBackupGridCfg(), null, null]
            ]
        }
    };
    var restoreAutoBackup = {
        type: 'accordion',
        items: [autoBackupItems]
    };
    //main panel
    var backupRestorePanel = {
        title: FR.i18nText("FS-System_Backup_Restore"),
        content: {
            widgetName: 'backupRestorePanel',
            type: 'tablepane',
            width: 730,
            colSize: [730],
            rowSize: ['auto', 'auto', 'auto', 'auto'],
            vgap: 25,
            items: [[backupConfig],[backupConfigPanel],[restoreManualBackup],[restoreAutoBackup]]
        }
    };
    
    return backupRestorePanel;
};

//加载到sysmgr中
FS.Plugin.SystemItems.push({
    ui : this.backupRestoreModule,
    pop : this.popData
});
$.extend(FS.Design.op,{19:function(a){FS.PluginOperator.init(a)}});FS.PluginOperator={init:function(b){var a=this;FR.ajax({url:FR.servletURL+"?op=plugin&cmd=war",complete:function(e,d){if(d==="success"){var c=FR.jsonDecode(e.responseText);if(c.condition){a.isWar=true}var f=$("<iframe>").css({border:0,frameBorder:0,width:"100%",height:"100%"}).appendTo(b);f.attr("src",FR.servletURL+"?op=plugin&cmd=init")}}})}};
var loadedThemes=[];var toastContainer;var styleSelection="Default";customToastConfigTab=function(){loadedThemes=[];toastContainer=$('<div class="fs-toast-container"/>');return{title:FR.i18nText("FS-CustomStyle_Toast_Tab"),content:toastContainer}};addCustomStyleCard=function(a){var c;if($.inArray(a.name,loadedThemes)>-1){showRestartDialog(FR.i18nText("FS-CustomStyle_Toast_Error"),FR.i18nText("FS-CustomStyle_Toast_Exist_alert"));return}var d=$('<div class="fs-toast-card"/>').hover(function(){$(this).addClass("hover")
},function(){$(this).removeClass("hover")}).click(function(){var f={url:FR.servletURL+"?op=customstyle&cmd=set_style",data:{type:"toast",name:a.name}};var e=function(i,h){var g=FR.jsonDecode(i.responseText);$(".fs-toast-select",toastContainer).hide();b.show();getStyleSelection();if(g.success){showRestartDialog(FR.i18nText("FS-CustomStyle_Toast_Prompt"),FR.i18nText("FS-CustomStyle_Toast_Restart"))}else{showRestartDialog(FR.i18nText("FS-CustomStyle_Toast_Error"),FR.i18nText("FS-CustomStyle_Toast_SetStyle_Failed"))
}};FS.Async.ajax(f,e);$(".fs-toast-select",toastContainer).hide();b.show()});if(a.cover){c=a.cover}else{c="/com/fr/fs/plugin/resource/default@2x.png"}$('<img class="fs-toast-cover"/>').attr("src",FR.servletURL+"?op=resource&resource="+c).appendTo(d);var b=$('<div class="fs-toast-select"/>').appendTo(d);$('<div class="fs-toast-title"/>').attr("title",a.name).text(a.name).appendTo(d);if(styleSelection!==a.name){b.hide()}d.appendTo(toastContainer);loadedThemes.push(a.name)};popCustomToastData=function(d){getStyleSelection();
var c=[{name:"Default",cover:"/com/fr/fs/plugin/customstyle/resource/default@2x.png"}];$.each(c,function(e,f){addCustomStyleCard(f)});var b={url:FR.servletURL+"?op=customstyle&cmd=get_list",data:{type:"toast"}};var a=function(f,e){var g=FR.jsonDecode(f.responseText);$.each(g,function(h,i){addCustomStyleCard(i)})};FS.Async.ajax(b,a)};getStyleSelection=function(){var a=FS.Sync.ajax({url:FR.servletURL+"?op=customstyle&cmd=get_selection",type:"POST",data:{type:"toast"}});styleSelection=a.toast;if(!styleSelection){styleSelection="default"
}};showRestartDialog=function(d,a){var b;if(typeof a==="string"){b=a}var c=new FR.Dialog({title:d,height:155,width:320,widgetName:"customdialog",contentWidget:{type:"absolute",items:[{el:$("<div>"+b+"</div>").css({"width":"100%","top":35,"font-size":"14px","text-align":"center","position":"absolute"})},{type:"quickbutton",text:FR.i18nText("FS-CutomStyle_Toast_OK"),width:60,height:30,x:130,y:75,handler:function(){c.getWidgetByName("customdialog").doClose()}}]}});c.setVisible(true)};FS.Plugin.LookAndFeelSettings.push({item:customToastConfigTab,action:popCustomToastData});
/**
 * Created by vito on 2016/12/19.
 *
 * +-----------------------------------------+
 * |+---------------------------------------+|
 * ||           forbidWordLabel             ||
 * |+---------------------------------------+|
 * |+---+ +-------------------------+        |
 * || l | |   useForbidWordSwitch   |        |
 * |+---+ +-------------------------+        |
 * |+---------------------------------------+|
 * ||           forbidWordContent           ||
 * ||+-----------------------------+ +-----+||
 * |||                             | | bar |||
 * ||+-----------------------------+ +-----+||
 * ||+-------------------------------------+||
 * |||               tagpane               |||
 * |||                                     |||
 * ||+-------------------------------------+||
 * |+---------------------------------------+|
 * |              ...another...              |
 * +-----------------------------------------+
 *
 */
(function ($) {
    var Constants = {
        FORBID_WORD_PANE: {
            SwitchWD: 'useForbidWordSwitch',
            EditWD: 'editForbidWord',
            ContentWD: 'forbidWordContent',
            TransferWD: 'fwTransferWD',
            AddCustomWD: 'addCustomFWWD',
            InputWD: 'forbidWordInputWD',
            Ajax: {
                SET_SELECTED: {
                    op: 'fs_psi',
                    cmd: 'set_config',
                    type: 'add_fw'
                },
                REMOVE_CUSTOM: {
                    op: 'fs_psi',
                    cmd: 'change_custom',
                    type: 'forbidword',
                    method: 'remove'
                },
                ADD_CUSTOM: {
                    op: 'fs_psi',
                    cmd: 'change_custom',
                    type: 'forbidword',
                    method: 'add'
                },
                GET_CUSTOM: {
                    op: 'fs_psi',
                    cmd: 'get_config',
                    type: 'customfw'
                }
            },
            I18n: {
                EditPaneTitle: 'FS-PSqlInj-FW_Edit_Title',
                AddCustomTitle: 'FS-PSqlInj-Custom_Forbid_Word',
                RemoveCustom: 'FS-PSqlInj-Remove_Custom_FW',
                AddCustom: 'FS-PSqlInj-Add_Custom_FW',
                AddCustomError: 'FS-PSqlInj-Exist_Custom_FW',
                InputHint: 'FS-PSqlInj-Forbid_Word_Input_Hint'
            }
        },

        SPECIAL_CHAR_PANE: {
            SwitchWD: 'useSpecialCharSwitch',
            EditWD: 'editSpecialChar',
            ContentWD: 'specialCharContent',
            TransferWD: 'scTransferWD',
            AddCustomWD: 'addCustomSCWD',
            InputWD: 'specialCharInputWD',
            Ajax: {
                SET_SELECTED: {
                    op: 'fs_psi',
                    cmd: 'set_config',
                    type: 'add_sc'
                },
                REMOVE_CUSTOM: {
                    op: 'fs_psi',
                    cmd: 'change_custom',
                    type: 'specialchar',
                    method: 'remove'
                },
                ADD_CUSTOM: {
                    op: 'fs_psi',
                    cmd: 'change_custom',
                    type: 'specialchar',
                    method: 'add'
                },
                GET_CUSTOM: {
                    op: 'fs_psi',
                    cmd: 'get_config',
                    type: 'customsc'
                }
            },
            I18n: {
                EditPaneTitle: 'FS-PSqlInj-SC_Edit_Title',
                AddCustomTitle: 'FS-PSqlInj-Custom_Special_Char',
                RemoveCustom: 'FS-PSqlInj-Remove_Custom_SC',
                AddCustom: 'FS-PSqlInj-ADD_Custom_SC',
                AddCustomError: 'FS-PSqlInj-Exist_Custom_SC',
                InputHint: ''
            }
        }


    };

    function getInitData() {
        var data = FS.Sync.ajax({
            url: FR.servletURL,
            type: 'POST',
            data: {
                op: 'fs_psi',
                cmd: 'get_config'
            }
        });
        for (var val in data) {
            if (_.isArray(data[val]) && data[val].length > 0) {
                data[val] = _.map(data[val], function (item) {
                    return {key: item, value: item};
                });
            }
        }
        return data;
    }

    function createAddCustomDialog(config) {
        var self = this;
        this.removeArr = [];
        var addDialog = new FR.Dialog({
            confirm: true,
            title: FR.i18nText(config.I18n.AddCustomTitle),
            width: 350,
            height: 250,
            doSize: true,
            resizeable: false,
            destroyOnClose: true,
            text4OK: FR.i18nText("FS-Generic-Simple_OK"),
            contentWidget: {
                type: 'absolute',
                items: [{
                    el: {
                        type: 'llabel',
                        levelStyle: 1,
                        width: 330,
                        value: FR.i18nText(config.I18n.RemoveCustom)
                    }, x: 10, y: 10
                }, {
                    el: {
                        type: 'tagpane',
                        widgetName: config.AddCustomWD,
                        width: 330,
                        height: 65,
                        isInitWithData: true,
                        async: {
                            url: FR.servletURL,
                            data: config.Ajax.GET_CUSTOM
                        },
                        baseCls: 'fs-tagpane-addcustom',
                        onAsyncSuccess: function (res) {
                            this.options.items = _.map(FR.jsonDecode(res).data, function (val) {
                                return {key: val, value: val};
                            });
                        },
                        renderTag: function (item) {
                            var $tag = $('<span/>').addClass('fs-tagpane-edittag').data('value', item);
                            $('<span/>').text(item.value).appendTo($tag);
                            $('<div/>').addClass('fs-tagpane-del').appendTo($tag);
                            return $tag;
                        },
                        tagClick: function (e) {
                            var target = e.target;
                            var edittag = $(target).closest('.fs-tagpane-edittag');
                            if (edittag.length > 0) {
                                var value = $(edittag[0]).data('value');
                                this.getWidgetByName(config.AddCustomWD).delItem(value);
                                self.removeArr.push(value);
                            }
                        }
                    }, x: 10, y: 45
                }, {
                    el: {
                        type: 'llabel',
                        levelStyle: 1,
                        width: 330,
                        value: FR.i18nText(config.I18n.AddCustom)
                    }, x: 10, y: 110
                }, {
                    el: {
                        type: 'text',
                        width: 120,
                        widgetName: config.InputWD,
                        watermark: FR.i18nText(config.I18n.InputHint),
                        autoSearch: true,
                        allowBlank: true
                    }, x: 10, y: 145
                }]
            },
            onOK: function () {
                var addWord = $.trim(this.getWidgetByName(config.InputWD).getValue());
                if (self.removeArr.length > 0) {
                    FR.Msg.confirm(FR.i18nText("FS-Generic-Simple_Delete"), FR.i18nText("FS-Generic-Sure_To_Delete") + "?", function (result) {
                        if (result) {
                            FS.Async.ajax({
                                url: FR.servletURL,
                                type: 'POST',
                                data: $.extend(config.Ajax.REMOVE_CUSTOM, {
                                    data: encodeURIComponent(_.map(self.removeArr, function (item) {
                                        return item.value;
                                    }).join('|'))
                                }),
                                success: function () {
                                    self.getWidgetByName(config.TransferWD).removeValues(self.removeArr);
                                }
                            });
                        }
                    });
                }
                if (addWord !== '') {
                    var newItem = {key: addWord, value: addWord};
                    FS.Async.ajax({
                        url: FR.servletURL,
                        type: 'POST',
                        data: $.extend(config.Ajax.ADD_CUSTOM, {
                            data: encodeURIComponent(addWord)
                        }),
                        success: function (res) {
                            var status = FR.jsonDecode(res).status;
                            if (status === 'ok') {
                                self.getWidgetByName(config.TransferWD).addToSelectedPane(newItem);
                            } else {
                                FR.Msg.toast(FR.i18nText(config.I18n.AddCustomError));
                            }
                        }
                    });
                }
            }
        });
        addDialog.setVisible(true);
    }

    function createEditPaneDialog(config) {
        var self = this;
        var dialog = new FR.Dialog({
            confirm: true,
            title: FR.i18nText(config.I18n.EditPaneTitle),
            width: 550,
            height: 445,
            doSize: true,
            resizeable: false,
            destroyOnClose: true,
            text4OK: FR.i18nText("FS-Generic-Simple_OK"),
            contentWidget: {
                type: 'absolute',
                items: [
                    {
                        el: {
                            type: 'quickbutton',
                            width: Math.max(80, FR.i18nTextWidth("FS-PSqlInj-Add_Custom_FW") + 30),
                            height: 28,
                            style: 'blue',
                            text: FR.i18nText(config.I18n.AddCustom),
                            handler: function () {
                                createAddCustomDialog.call(this, config);
                            }
                        }, x: 15, y: 12
                    },
                    {
                        el: {
                            type: 'search',
                            width: 230,
                            autoSearch: true,
                            onKeyup: function (e) {
                                if (!FR.isNavKeyPress(e)) {
                                    var keyword = this.getValue();
                                    this.getWidgetByName(config.TransferWD).search(keyword);
                                }
                            }
                        }, x: 300, y: 10
                    },
                    {
                        el: {
                            type: 'transfer',
                            widgetName: config.TransferWD
                        }, x: 15, y: 50
                    }]
            },
            onOK: function () {
                var widgetData = dialog.getWidgetByName(config.TransferWD).getValue();
                FS.Async.ajax({
                    url: FR.servletURL,
                    type: 'POST',
                    data: $.extend(config.Ajax.SET_SELECTED, {
                        selectedValue: encodeURIComponent(widgetData.selectedValue)
                    }),
                    success: function () {
                        self.getWidgetByName(config.ContentWD).refresh();
                    }
                });
            },
            onCancel: function () {
                self.getWidgetByName(config.ContentWD).refresh();
            }
        });
        return dialog;
    }

    var psiUI = function () {
        var self = this;
        var forbidWordLabel = {
            type: 'llabel',
            levelStyle: 1,
            value: FR.i18nText("FS-PSqlInj-Forbid_Word")
        };

        var useForbidWordSwitch = {
            type: 'tablepane',
            colSize: [Math.max(40, FR.i18nTextWidth("FS-PSqlInj-Use_Forbid_Word", 6.5) + 15), 122],
            rowSize: [25],
            vgap: 10,
            items: [
                [
                    {type: 'llabel', value: FR.i18nText("FS-PSqlInj-Use_Forbid_Word")},
                    {
                        type: 'switch',
                        widgetName: Constants.FORBID_WORD_PANE.SwitchWD,
                        onTurnOn: function () {
                            var res = FS.Sync.ajax({
                                url: FR.servletURL,
                                type: 'POST',
                                data: {
                                    op: 'fs_psi',
                                    cmd: 'set_config',
                                    type: 'set_fw',
                                    usefw: true
                                }
                            });
                            if (res.status === 'ok') {
                                setPaneEnable.call(self, Constants.FORBID_WORD_PANE, true);
                            }
                        },
                        onTurnOff: function () {
                            var res = FS.Sync.ajax({
                                url: FR.servletURL,
                                type: 'POST',
                                data: {
                                    op: 'fs_psi',
                                    cmd: 'set_config',
                                    type: 'set_fw',
                                    usefw: false
                                }
                            });
                            if (res.status === 'ok') {
                                setPaneEnable.call(self, Constants.FORBID_WORD_PANE, false);
                            }
                        }
                    }
                ]
            ]
        };

        var forbidWordContent = {
            type: 'tablepane',
            width: 730,
            colSize: [730],
            rowSize: ['auto', 'auto'],
            vgap: 5,
            items: [
                [{
                    type: 'tablepane',
                    colSize: [680, 50],
                    rowSize: [20],
                    items: [
                        [
                            {},
                            {
                                type: 'iconbutton',
                                widgetName: Constants.FORBID_WORD_PANE.EditWD,
                                text: FR.i18nText("FS-Generic-Simple_Edit"),
                                baseClass: 'fs-tagpane-bar',
                                handler: function () {
                                    var dialog = createEditPaneDialog.call(this, Constants.FORBID_WORD_PANE);
                                    dialog.setVisible(true);
                                    var data = getInitData();
                                    dialog.getWidgetByName(Constants.FORBID_WORD_PANE.TransferWD).setValue({
                                        selectedValue: data.SelectedForbidWord,
                                        unSelectedValue: data.UnSelectedForbidWord
                                    });
                                }
                            }
                        ]
                    ]
                }],
                [{
                    type: 'tagpane',
                    widgetName: Constants.FORBID_WORD_PANE.ContentWD,
                    isInitWithData: false,
                    async: {
                        url: FR.servletURL,
                        data: {
                            op: 'fs_psi',
                            cmd: 'get_config'
                        }
                    },
                    onAsyncSuccess: function (res) {
                        this.options.items = _.map(FR.jsonDecode(res).SelectedForbidWord, function (tag) {
                            return {key: tag, value: tag};
                        });
                    },
                    renderTag: function (item) {
                        var $tag = $('<span/>').addClass("fs-tagpane-seltag");
                        $('<span/>').text(item.value).appendTo($tag);
                        return $tag;
                    }
                }]
            ]
        };

        var specialCharLabel = {
            type: 'llabel',
            levelStyle: 1,
            value: FR.i18nText("FS-PSqlInj-Special_Char")
        };

        var useSpecialCharSwitch = {
            type: 'tablepane',
            colSize: [Math.max(40, FR.i18nTextWidth("FS-PSqlInj-Use_Escape", 6.5) + 15), 130],
            rowSize: [25],
            vgap: 10,
            items: [
                [
                    {type: 'llabel', value: FR.i18nText("FS-PSqlInj-Use_Escape")},
                    {
                        type: 'switch',
                        widgetName: Constants.SPECIAL_CHAR_PANE.SwitchWD,
                        onTurnOn: function () {
                            var res = FS.Sync.ajax({
                                url: FR.servletURL,
                                type: 'POST',
                                data: {
                                    op: 'fs_psi',
                                    cmd: 'set_config',
                                    type: 'set_sc',
                                    usesc: true
                                }
                            });
                            if (res.status === 'ok') {
                                setPaneEnable.call(self, Constants.SPECIAL_CHAR_PANE, true);
                            }
                        },
                        onTurnOff: function () {
                            var res = FS.Sync.ajax({
                                url: FR.servletURL,
                                type: 'POST',
                                data: {
                                    op: 'fs_psi',
                                    cmd: 'set_config',
                                    type: 'set_sc',
                                    usesc: false
                                }
                            });
                            if (res.status === 'ok') {
                                setPaneEnable.call(self, Constants.SPECIAL_CHAR_PANE, false);
                            }
                        }
                    }
                ]
            ]
        };

        var specialCharContent = {
            type: 'tablepane',
            width: 730,
            colSize: [730],
            rowSize: ['auto', 'auto'],
            vgap: 5,
            items: [
                [{
                    type: 'tablepane',
                    colSize: [680, 50],
                    rowSize: [25],
                    vgap: 10,
                    items: [
                        [
                            {},
                            {
                                type: 'iconbutton',
                                widgetName: Constants.SPECIAL_CHAR_PANE.EditWD,
                                text: FR.i18nText("FS-Generic-Simple_Edit"),
                                baseClass: 'fs-tagpane-bar',
                                handler: function () {
                                    var dialog = createEditPaneDialog.call(this, Constants.SPECIAL_CHAR_PANE);
                                    dialog.setVisible(true);
                                    var data = getInitData();
                                    dialog.getWidgetByName(Constants.SPECIAL_CHAR_PANE.TransferWD).setValue({
                                        selectedValue: data.SelectedSpecialChar,
                                        unSelectedValue: data.UnSelectedSpecialChar
                                    });
                                }
                            }
                        ]
                    ]
                }],
                [{
                    type: 'tagpane',
                    widgetName: Constants.SPECIAL_CHAR_PANE.ContentWD,
                    isInitWithData: false,
                    async: {
                        url: FR.servletURL,
                        data: {
                            op: 'fs_psi',
                            cmd: 'get_config'
                        }
                    },
                    onAsyncSuccess: function (res) {
                        this.options.items = _.map(FR.jsonDecode(res).SelectedSpecialChar, function (tag) {
                            return {key: tag, value: tag};
                        });
                    },
                    renderTag: function (item) {
                        var $tag = $('<span/>').addClass("fs-tagpane-seltag");
                        $('<span/>').text(item.value).appendTo($tag);
                        return $tag;
                    }
                }]
            ]
        };

        var forbidWordPane = {
            type: 'tablepane',
            width: 730,
            colSize: [730],
            rowSize: ['auto', 'auto', 'auto'],
            vgap: 15,
            items: [
                [forbidWordLabel],
                [useForbidWordSwitch],
                [forbidWordContent]
            ]
        };

        var specialCharPane = {
            type: 'tablepane',
            width: 730,
            colSize: [730],
            rowSize: ['auto', 'auto', 'auto'],
            vgap: 15,
            items: [
                [specialCharLabel],
                [useSpecialCharSwitch],
                [specialCharContent]
            ]
        };

        return {
            title: FR.i18nText("FS-PSqlInj_Title"),
            content: {
                widgetName: 'PreventSqlInjectPanel',
                type: 'tablepane',
                width: 730,
                colSize: [730],
                rowSize: ['auto', 'auto'],
                vgap: 50,
                items: [
                    [forbidWordPane],
                    [specialCharPane]
                ]
            }
        };
    };

    var popData = function () {
        var data = getInitData();
        this.setWidgetValue(Constants.FORBID_WORD_PANE.ContentWD, data.SelectedForbidWord);
        this.setWidgetValue(Constants.SPECIAL_CHAR_PANE.ContentWD, data.SelectedSpecialChar);
        this.setWidgetValue(Constants.FORBID_WORD_PANE.SwitchWD, data.useForbidWord);
        this.setWidgetValue(Constants.SPECIAL_CHAR_PANE.SwitchWD, data.useEscapeSpecialChar);
        setPaneEnable.call(this, Constants.FORBID_WORD_PANE, data.useForbidWord);
        setPaneEnable.call(this, Constants.SPECIAL_CHAR_PANE, data.useEscapeSpecialChar);
    };


    function setPaneEnable(config, enable) {
        this.tabPane.getWidgetByName(config.ContentWD).setEnable(enable);
        this.tabPane.getWidgetByName(config.EditWD).setEnable(enable);
    }

    FS.Plugin.SystemItems.push({
        ui: psiUI,
        pop: popData
    });
})(jQuery);