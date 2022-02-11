(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d)||{};r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d)||{};if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);
var canSlideMenum=true;//能否进行菜单收缩  默认true  可以收起展开
var topHeight=120;//顶部菜单高度 
var topMenuName=["设计资源","经营合同","企业档案","多媒体共享","原生成管理"];//顶部菜单名称
var topMenuHref=["http://www.baidu.com","http://www.baidu.com",
                 "http://www.baidu.com","http://www.baidu.com","http://www.baidu.com"];//顶部菜单跳转链接
var topMenuImage=["1.png","2.png","3.png","4.png","5.png"];//菜单对应图标名称 具体文件放到com.fr.solution.theme.sky.files.image包下面
var isShow=true;//伸缩菜单展开状态  true表示展开
(function ($) {
    $.extend(FS, {
        refreshMsgBox: function(msgs, onMsgShow){
            //console.log("[refreshMsgBox] msgs:"+msgs.length+" len:"+FS.Plugin.MessageHelper.length);
            var num = msgs ? msgs.length : 0;
            $('.fs-navi-msgnum').text(num);
            $('.fs-navi-msgnum').trigger('fs-navi-msgnum-changed',{'num':num});
            this.MsgBox = {
                msgs: msgs,
                onMsgShow: function($wrapper){
                    if(onMsgShow){
                        onMsgShow($wrapper);
                    }
                }
            };
        },
        _showFavoriteCombo: function ($obj, speed) {
            var self = this;
            var $wrapper = $obj.data('COMBO');
            if (!$wrapper) {
                $wrapper = $('<div class="fs-favorite-combo"/>')
                    .hide().appendTo($obj);
                $obj.data('COMBO', $wrapper);
            }
            var head = FS.THEME.config4frame.north.visible ? (FS.THEME.config4frame.north.height || 60) : 0;
            var foot = FS.THEME.config4frame.south.visible ? 30 : 0;
            $wrapper.empty().css({
                height: document.body.clientHeight - head - foot,
                'z-Index': FR.widget.opts.zIndex++
            });
            $('<div class="fs-favorite-combo-title"/>')
                .text(FR.i18nText("FS-Generic-Simple_Favorite")).appendTo($wrapper);
            var $list = $('<div class="fs-favorite-combo-list"/>').appendTo($wrapper);
            // create favorite
            var nodes = this.Control.getFavoriteNodes();
            if (nodes && nodes.length > 0) {
                $.each(nodes, function (index, node) {
                    var $node = $('<a href="#"/>').attr('title', node.entry.text).data('FAVORITE', node).appendTo($list);
                    $('<span/>').text(node.entry.text).appendTo($node);
                    var $del = $('<i class="icon-remove-favorite"/>').hide().appendTo($node);
                    $node.hover(function () {
                        $del.show();
                    }, function () {
                        $del.hide();
                    })
                });
                $wrapper.click(function (e) {
                    var $target = $(e.target);
                    var $entry = $target.closest('a');
                    var node = $entry.data('FAVORITE');
                    if ($entry && $entry.length > 0) {
                        if ($target.hasClass('icon-remove-favorite')) {
                            // delete
                            self.Control.removeFavoriteNode(node.id, function () {
                                $entry.remove();
                            });
                        } else {
                            //open
                            $wrapper.hide();
                            self.loadContentByEntry(node.entry);
                        }
                    }
                });
            }
            var boxHeight = (document.body.clientHeight - 122);
            $wrapper.height(boxHeight);
            $list.height(boxHeight-30);
            $list.slimscroll({
                position: 'relative',
                width: '260px',
                height: (document.body.clientHeight - 122 - 30) + 'px'
            });
            $wrapper.slideDown(speed);
        },


    });
    FS.MenuTree2 = FR.extend(FS.MenuTree, {
        _bindEvts: function(){
        }
    });

    FS.THEME = $.extend(true, FS.THEME, {
        config4navigation: {
            onBeforeInit:function(){
                //FR.i18n['FS-Frame-Enter_Entry_Name']=FR.i18n['FS-FRAME-SEARCH-PLACEHOLDER'];
            },
            onAfterInit: function () {
                var self = this;
                //$('#fs-navi-admin').remove();  
                _initTopRightNavigation();
                _initMessgeAlert();
                _initFrameNavigationBar();
                
                _initTopRightNavigationForMenu();
                $('#fs-frame-body').resize(function () {
                    //FS._doResize();
                });
                $("#fs-frame-navi").css({"position":"absolute","width":"21em"});
                $("#fs-frame-reg").css({"position":"absolute","right":"22em"});
                $("#fs-frame-search").css({"position":"absolute","right":"13em"});
            }
        },
        config4MenuTree: {
            onAfterNodeCreate:function(node, $node, $li){
                if(node.isModule){
                    //console.log($node.html());
                    var icon = !node.nodeicon ? 'leaf' : node.nodeicon;
                    var $icon = $node.find(".fs-menu-icon");
                    $icon.empty();
                    $('<i class="tree-icon"/>').appendTo($icon).addClass('icon-tree-'+icon);
                }
                $node.find('.icon-menu-b').removeClass('fui-fhc');
                var hasChildren = node.hasChildren && node.ChildNodes && node.ChildNodes.length>0;
                $node.find('span').not(".fs-menu-icon").not(".menutree-text").css("font-size","15px");
                $node.attr('data-has-children',hasChildren);
                if(hasChildren){
                    $node.find('.fs-menu-icon').empty().html('<i class="icon-tree-fork"></i>');
                }
            },
            // onAfterInit:function(element){ // add menu collapse button
            //     if(document.getElementById('menu-tree-extend-button')){
            //         return;
            //     }
            //     var $btn = $('<div/>').prependTo($('.fs-tab-btns:first'))
            //         .addClass('fs-tab-exd').attr('id','menu-tree-extend-button');
            //     var $icn = $('<i class="icon-tab-exd" />').appendTo($btn);
            //     var $wid = FS.CONSTS.Regions["west"].width();
            //     $btn.click(function(){
            //         $btn.toggleClass('off');
            //         var w = $btn.hasClass('off') ? 0 : $wid;
            //         FS.CONSTS.Regions["west"].css("width", w);
            //         FS._doResize();
            //     });
            // },
            onAfterInit:function(element){ // add menu collapse button
                var collapseBtn = $('<div id="fs-menu-collapse-btn" class="fs-menu-hide"/>')
                    .click(function () {
                        FS.CONSTS.Regions["west"].css("width", 0);
                        FS._doResize();
                        $(this).hide();
                        $('#fs-menu-expend-btn').show();
                    }).appendTo(FS.CONSTS.Regions["west"]);
                var collapseBtn = $('<div id="fs-menu-expend-btn" class="fs-menu-show"/>')
                    .click(function () {
                        FS.CONSTS.Regions["west"].css("width", FS.THEME.config4frame.west.width);
                        FS._doResize();
                        $(this).hide();
                        $('#fs-menu-collapse-btn').show();
                    })
                    .appendTo(FS.CONSTS.Regions["east"]).hide();

                $('iframe').attr({allowtransparency:true,frameborder:'0',border:'0',marginheight:'0',marginwidth:'0'});
            },
            onAfterNodeExpand : function(node, $node, $li){
                //console.log("[onAfterNodeExpand]"+$node);
                if($node){
                    $node.addClass('on');
                    $node.find('.tree-icon').html('');
                    //console.log($node.html());
                }
            },
            onAfterNodeCollapse : function(node, $node, $li){
                //console.log("[onAfterNodeCollapse]"+$node);
                if($node){
                    $node.find('.tree-icon').html('');
                    $node.removeClass('on');
                    //console.log($node.html());
                }
            }
        },
        config4tabPane: {
            hasHomepageBtn: true,
            tabWidth: 120,
            onSelectTab : function($tab, $content, entry){
                if($content && ''==$content.html()){
                    $content.bind('DOMNodeInserted', function(e) {
                        var elm = $(e.target);
                        if('IFRAME'==$(e.target).get(0).tagName.toUpperCase()){
                            $content.css('overflow','hidden');
                            elm.attr("frameBorder","no");
                            elm.attr("border","0");
                            elm.on('load',function(){
                                $(this).contents().find("body").css("padding-bottom","60px");
                            });
                            $content.unbind('DOMNodeInserted');
                        }
                    });
                }

            }
        },
        config4frame: {
            resizable: false,
            north: {
                height: 135+parseInt(topHeight)-75
            },
            west: {
                width: 200
            }
        }
    });
    var _createItem = function (node, $pane, $node) {
        return $('<a href="#"/>').text(node.text)
            .click(function () {
                FS.tabPane.addItem(node);
                $node.removeClass('node-select');
                $node.css({'color': 'rgb(0,255,0)'});
                $pane.hide();
                $(document).unbind('mousedown.nodepane');
            });
    };
    var _collectAllChildNodes = function (node, childs) {
        var self = this;
        if (!node.ChildNodes) {
            return;
        }
        $.each(node.ChildNodes, function (index, child) {
            if (child.hasChildren) {
                _collectAllChildNodes(child, childs);
            } else {
                childs.push(child);
            }
        });
    };
    var _initMessgeAlert = function(){
        var numpanel = $('#fs-navi-message .fs-navi-msgnum');
        numpanel.on('fs-navi-msgnum-changed',function(event,data){
            //console.log("[fs-navi-msgnum-changed]"+data.num+" | "+FS.Plugin.MessageHelper.length);
            if(data.num>0){$(this).show();}
            else{	$(this).hide();	}
        });
        var msgnum = parseInt(numpanel.text());
        msgnum = isNaN(msgnum)? 0 : msgnum;
        numpanel.trigger('fs-navi-msgnum-changed',{'num':msgnum});
    };
    var _initTopRightNavigation = function(){
        $('#fs-frame-search').hide();
        $('#fs-navi-favorite').insertBefore($('#fs-navi-message'));
        var sbtn = $('<li class="fs-navibar-item" id="fs-navi-search"><i class="icon-navi-search"></i></li>');
        sbtn.insertBefore($('#fs-navi-favorite')).click(function(){
            $('#fs-frame-search input').focus();
            $('#fs-frame-search').show();
            $("#fs-frame-reg").css("right","36em");
            $(this).removeClass('fui-bsc');
            $(document).bind('mouseup.nodepane',function(e){
                var target = e.target;
                if (target.tagName.toUpperCase()!='INPUT') {
                    $('#fs-frame-search').hide();
                    $("#fs-frame-reg").css("right","22em");
                    $(document).unbind('mouseup.nodepane');
                }
            });
        });
        $('#fs-frame-banner .fs-banner-title')
            .bind('mouseover',function(){$(this).toggleClass('on');})
            .bind('mouseout' ,function(){$(this).toggleClass('on');})
        _createTopNavBarForBI();
    };
    /** show or hide menu**/
    var _toggelTop=function(){
    	if(isShow){
    		$("#fs-frame-banner").hide();
    		$("#fs-frame-navi").hide();
    		$("#fs-frame-search").hide();
    		$("#fs-frame-reg").hide();
    		$("#fs-frame-navi-toptwo").hide();
    		$("#fs-frame-header .node-navi").css("top","-3px");
    		$("#slide_div_id").removeClass("slide-up").addClass("slide-down");
    		$("#fs-frame-header").css("height",(parseInt($("#fs-frame-header").css("height"))-topHeight)+"px");
    		//重置页面
    		FS.THEME.config4frame.north.height=60;
    		_hlDoResize();
    		isShow=false;
    	}else{
    		$("#fs-frame-banner").show();
    		$("#fs-frame-navi").show();
    		$("#fs-frame-search").show();
    		$("#fs-frame-reg").show();
    		$("#fs-frame-navi-toptwo").show();
    		$("#fs-frame-header .node-navi").css("top",(topHeight-3)+"px");
    		$("#slide_div_id").addClass("slide-up").removeClass("slide-down");
    		$("#fs-frame-header").css("height",(parseInt($("#fs-frame-header").css("height"))+topHeight)+"px");
    		//重置页面
    		FS.THEME.config4frame.north.height=60+topHeight;
    		_hlDoResize();
    		isShow=true;
    	}
    	$("#fs-frame-search").hide();
    	
    }
    var _hlDoResize=function(){
    	var f=FS.THEME.config4frame.north.visible?(FS.THEME.config4frame.north.height||60):0;
    	if(!isShow){
    		f=60+topHeight;
    	}else{
    		f=60;
    	}
    	var e=FS.THEME.config4frame.south.visible?30:0;
    	var h=document.body.clientWidth;
	    var d=document.body.clientHeight;
	     $("#fs-frame-body").css({height:d-f-e,top:f});
    };
    /**生成上面菜单（第二行） START**/
    var _initTopRightNavigationForMenu = function(){
        $('<ul id="fs-frame-navi-toptwo" style="position: absolute; display: block;top:'+(topHeight/2+5)+'px"></ul>').insertBefore($('#fs-frame-search'));
       var _HTML="";
        $.each(topMenuName,function(index,item){
        	_HTML+='<li style="display: inline-block;margin-right: 1em;">';
        	_HTML+='<a style="display: block;text-align: center;" href="'+topMenuHref[index]+'">';
        	_HTML+='<img src="${servletURL}?op=resource&resource=/com/fr/solution/theme/sky/files/image/'+topMenuImage[index]+'"  ';
        	_HTML+=' style="border: 1px solid gray;border-radius: 50%;width: 2em; height: 2em;">';
        	_HTML+=' <div>'+item+'</div></a></li>';
       });
        $("#fs-frame-navi-toptwo").append(_HTML);
    };
    var _createFrameNavigationButton = function($wrapper, title, iconClass){
        var $wrap = $('<div class="node-navi-item" />').appendTo($wrapper);
        var $icon = $('<div/>').appendTo($wrap).addClass('node-navi-icon').addClass(iconClass);
        var $menu = $('<div/>').text(title).appendTo($wrap).addClass('node-navi-title');
        $menu.attr('title',title);
        return $wrap;
    };
    var _createFrameNavigationBar = function(nodes){
        var $wp = $('#fs-frame-header');
        var $ul = $('<ul class="node-navi"/>').appendTo($wp);
        $ul.resize(function(){
            popMenu.hide();
            var disWidth = 0;
            var winWidth = $ul.width();
            var morWidth = 20;
            var hitWidth = $ul.find('li.select').width() || 0;
            var maxWidth = winWidth - morWidth - hitWidth;
            var hideList = [];
            var childNodes = $ul.children();
            childNodes.each(function(idx,el){
                var e = $(el);
                var w = e.show().width();
                var m = disWidth + w;
                if( e.hasClass('select') || 'node-navi-btn-more'==e.attr('id') ){
                    return;
                }
                if( m >= maxWidth ){
                    hideList.push(idx);
                    return;
                }
                disWidth = disWidth + w;

            });
            for(var i=0;i<hideList.length;i++){
                $(childNodes[hideList[i]]).hide();
            }
            if(hideList.length>0){
                btnNode.show();
                var specWidth = winWidth-disWidth - hitWidth;
                btnNode.width(specWidth);
                btnNode.find('.node-navi-item').width(specWidth);
            } else {
                btnNode.hide();
            }
        });

        $.each(nodes, function (index, root) {
            var $node = $('<li class="node-navi-li"/>').appendTo($ul);
            $menu = _createFrameNavigationButton($node, root.text, 'node-navi-icon-'+( index % 9 ) );
            $menu.attr("data-node-id", root.id);
            $menu.attr("data-sub-menu",( root.ChildNodes && root.ChildNodes.length > 0 ) );
            $menu.click(function(){
                //console.log("[NAV Click]"+root.id);
                $('#fs-frame-header .node-navi-li').each(function(){
                    $(this).removeClass('select');
                });
                $node.addClass('select');

                var config = FS.THEME.config4MenuTree;
                config.renderEl.empty();

                if (!root.ChildNodes) {
                    FS.tabPane.addItem(root);
                    return;
                }
                var buildMenuTree = function(childNodes){
                    config.nodes = childNodes;
                    new FS.MenuTree2(config);
                };
                if(root.isModule){
                    FS.Async.getModuleTreeById(root.id, function(res, status){
                        var childNodes = FR.jsonDecode(res.responseText).ChildNodes;
                        $.each(childNodes, function(index, item){
                            item.isModule = true;
                            item.nodeicon = FS.CONSTS.ModuleIcons[item.id];
                        });
                        buildMenuTree(childNodes);
                    });
                } else {
                    FS.Async.getReportTreeById(root.id, function(res, status){
                        var childNodes = FR.jsonDecode(res.responseText) || [];
                        buildMenuTree(childNodes);
                    });
                }

                var westWidth = FS.CONSTS.Regions["west"].width();
                if( westWidth < FS.THEME.config4frame.west.width){
                    $('#fs-menu-expend-btn').click();
                }

            });
        });

        //_createFrameNavigationBarForBI($ul);

        var btnNode = $('<li class="node-navi-li"/>').appendTo($ul).attr("id","node-navi-btn-more");
        var btnMore = _createFrameNavigationButton(btnNode,"",'node-navi-icon-more');
        var popMenu = $('<div class="node-navi-combo-more" />').appendTo(btnNode).hide();
        btnMore.click(function(){
            $(this).addClass("on");
            popMenu.empty();
            $ul.children("li:hidden").clone(true).show().appendTo(popMenu);
            popMenu.height($(document).height()-FS.THEME.config4frame.north.height).slideDown('fast');
            $(document).bind('mouseover.nodepane', function (e) {
                var $t = $(e.target);
                if ($t.closest('.node-navi-li').length <= 0) {
                    popMenu.slideUp('fast');
                    $(document).unbind('mouseover.nodepane');
                }
            });
            popMenu.find('li').click(function(){
                try{
                    $('#fs-frame-header .node-navi-li').removeClass('select');
                    var nodeId = $(this).find("[data-node-id]").attr("data-node-id");
                    var lastNode = btnNode.prevAll('li:visible').first().hide();
                    var navMenu = $ul.find("[data-node-id='"+nodeId+"']").parent().show().addClass('select');
                }catch(err){
                }
                btnMore.removeClass("on");
                popMenu.empty();
                //popMenu.hide();
                popMenu.slideUp('fast');
                event.preventDefault();
            });
        });
        btnNode.hide();
        
        /**重写方法 START**/
        $("#fs-frame-header .node-navi").css("top",(topHeight-3)+"px");
        if(!canSlideMenum){
        	$("#fs-frame-header").css("height",(parseInt($("#fs-frame-header").css("height"))-topHeight)+"px");
        }
        if(canSlideMenum){
        	//自定义收缩
        	var btnNodeSilde = $('<li class="node-navi-li"/>').appendTo($ul).attr("id","node-navi-btn-slide").css({"position":"absolute","right":"-30px","left":"auto"});
        	var divSlide=$("<div class='node-navi-icon'><div class=' slide-top' id='slide_div_id'></div></div>").appendTo($("#node-navi-btn-slide"));
        	divSlide.click(function(){
        		_toggelTop();
        	});
        }
        /**重写方法 END**/
		//test show or hide menu
//		var btnNode2 = $('<li class="node-navi-li"/>').appendTo($ul).attr("id","node-navi-btn-show-hide");
//        var btnMore2 = _createFrameNavigationButton(btnNode2,"",'node-navi-icon-more');
//        btnMore2.click(function(){
//			alert(this)
//        });
//       
//        $ul.resize();
    };
   
    var _initFrameNavigationBar = function(){
        var nav = {
            report:{res:[],url:FR.servletURL + "?op=fs_main&cmd=module_getrootreports",res:[]},
            module:{res:[],url:FR.servletURL + "?op=fs_main&cmd=getmoduleitems",res:[]}
        };
        var ajax1 = $.post(nav.report.url,{id: -1}).done(function(data){
            nav.report.res = $.parseJSON(data);
            console.log(nav.report.res)
            if(FS.THEME.config4MenuTree.insertNodes) {
                $.each(FS.THEME.config4MenuTree.insertNodes, function(p,q){
                    if($.isFunction(q)){
                        var o=q.apply();
                        o&&nav.report.res.push(o);
                    }else{
                        nav.report.res.push(q);
                    }
                });
            }
        });
        var ajax2 = $.post(nav.module.url,{id: 1}).done(function(data){
            var module = $.parseJSON(data);
            console.log(module)
            if(module && module.hasChildren){
                nav.module.res.push(module);
            }
        });
        $.when(ajax1,ajax2).done(function(){
            var nodes = nav.report.res.concat(nav.module.res);
            _createFrameNavigationBar(nodes);
        });
    };
    var _createFrameNavigationBarForBI = function(parentNode){
        var isBI = typeof BI != 'undefined';
        if(!isBI){
            return;
        }
        try{
            var node = $('<li class="node-navi-li"/>').appendTo(parentNode).attr("id","node-navi-btn-addanysis");
            var btnAddAnysis = _createFrameNavigationButton(node,BI.i18nText('BI-Add_Analysis'),"node-navi-icon-addanysis");
            btnAddAnysis.attr("data-node-id", "node-navi-btn-addanysis");
            btnAddAnysis.click(function(){
                var id = BI.UUID();
                var newAnalysisBox = BI.createWidget({
                    type: "bi.new_analysis_float_box"
                });
                newAnalysisBox.on(BI.NewAnalysisFloatBox.EVENT_CHANGE, function (data) {
                    BI.requestAsync("fr_bi", "add_report", {
                        reportName: data.reportName,
                        reportLocation: data.reportLocation,
                        realTime: data.realTime
                    }, function (res, model) {
                        if (BI.isNotNull(res) && BI.isNotNull(res.reportId)) {
                            FS.tabPane.addItem({
                                title: data.reportName,
                                src: FR.servletURL + "?op=fr_bi&cmd=init_dezi_pane&reportId=" + res.reportId + "&edit=_bi_edit_"
                            });
                        }
                    });
                });
                BI.Popovers.create(id, newAnalysisBox, {width: 400, height: 320}).open(id);
                newAnalysisBox.setTemplateNameFocus();
            });
            if(FS.config.isAdmin){
                node = $('<li class="node-navi-li"/>').appendTo(parentNode).attr("id","node-navi-btn-datasetting");
                btnDateSetting = _createFrameNavigationButton(node,BI.i18nText("BI-Data_Setting"),"node-navi-icon-datasetting");
                btnDateSetting.attr("data-node-id", "node-navi-btn-datasetting");
                btnDateSetting.click(function(){
                    FS.tabPane.addItem({
                        title: BI.i18nText('BI-Data_Setting'),
                        src: FR.servletURL + '?op=fr_bi_configure&cmd=init_configure_pane'
                    });
                    var westWidth = FS.CONSTS.Regions["west"].width();
                    if( westWidth < FS.THEME.config4frame.west.width){
                        $('#fs-menu-expend-btn').click();
                    }
                });
            }
        }catch(err){
        }
    };
    var _createTopNavBarForBI = function(){
        var isBI = typeof BI != 'undefined';
        if(!isBI){
            return;
        }
        var navItem = $('<li class="fs-navibar-item" />').attr('id','fs-navi-fbishutcut').insertAfter($('#fs-navi-search'));
        var parentNode = $("<ul />").appendTo(navItem);
        _createFrameNavigationBarForBI(parentNode);
    };
})(jQuery);


(function(){

// empty or click the first navigation button after init
    var monitor = setInterval(function(){
        if(!FS.THEME.config4MenuTree.renderEl){
            return;
        }
        $('ul.node-navi .node-navi-item[data-sub-menu=true]').first().click();
        /*
         if(FS.THEME.config4tabPane.hasHomepageBtn){
         FS.THEME.config4MenuTree.renderEl.empty();
         }else{
         $('ul.node-navi .node-navi-item').first().click();
         }
         */
        clearInterval(monitor);
    },100);

}());
