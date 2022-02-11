/**
 * Created by zuoqb on 2017年8月9日11:39:28
 */
$(function () {
    var imgOffsetX, imgOffsetY, loginImgWidth, loginImgHeight, scale;
    //报错蒙板
    var $mask = $('<div class="fs-login-errmask"/>');
    var windowWidth = document.body.clientWidth;
    var windowHeight = document.body.clientHeight;
    //用户名
    var $username = $('input.fs-login-username').attr("placeholder", FR.i18nText("FS-Generic-Simple_Username")).attr('title', FR.i18nText("FS-Generic-Simple_Username"));
    //密码
    var $password = $('input.fs-login-password').attr("placeholder", FR.i18nText("FS-Generic-Simple_Password")).attr('title', FR.i18nText("FS-Generic-Simple_Password"));
    $('input').focus(function () {
        $mask.hide();
    });
    //是否保持登录状态
    var $keep = $('span.fs-login-remember').text(FR.i18nText("FS-Generic-Privilege_Keep_Login_State")).click(
        function () {
            $(this).toggleClass('fs-login-remember-selected');
        }
    );
    //登录按钮
    $('a').text(FR.i18nText("FS-Generic-Sign_In")).click(
        function () {
            signIN();
        }
    );
    //绑定回车
    $(document).keydown(function (e) {
        if (e.keyCode === 13) {
            signIN();
        }
    });
    var themes = $('.fs-login-theme-trigger').attr('themes');
    var supportSwitch = $('.fs-login-theme-trigger').attr('supportSwitch');
    var items = [];
    if (supportSwitch === 'true') {
        items[0] = {
            text: FR.i18nText('Plugin-Theme_Classic'),
            value: 'default'
        };
        items[1] = {
            text: FR.i18nText('Plugin-Theme_Modern'),
            value: 'bi'
        };
        if (themes.length > 0) {
            $.each(themes.split(','), function (i, item) {
                items[i + 2] = {
                    text: item,
                    value: item
                }
            });
        }
        $('.fs-login-theme-text').text(FR.i18nText('Plugin-Theme_Select'));
        var editorWidth = $('#fs-login-input-area').width() - $('.fs-login-theme-text').width() - 6;//6是间隙的宽度
        var themeEditor = new FR.ComboBoxEditor({
            renderEl: $('.fs-login-theme-trigger'),
            directEdit: false,
            allowBlank: false,
            widgetUrl: null,
            fontSize: 14,
            width: editorWidth,
            height: 21,
            items: items,
            maxCount: 5,
            sonHeight: 21,
            value: 'default',
            listeners: [{
                eventName:FR.Events.AFTEREDIT,
                action:function() {
                    if ($('a').attr('expired') == 'true') {
                        FR.Msg.alert(FR.i18nText('FR-Engine_Alert'), FR.i18nText('Plugin-Theme_License_Expired_Tip'), function (result) {
                        });
                    }
                }
            }]
        });
        $username.blur(function () {
            var username = $username.val();
            if (username) {
                FR.ajax({
                    url: FR.servletURL + '?op=theme&cmd=get',
                    data: {
                        username: $username.val()
                    },
                    complete: function (res) {
                        var data = FR.jsonDecode(res.responseText);
                        if (data.status === 'success' && data.theme) {
                            var value = themeEditor.isValueInList(data.theme) || data.theme === 'bi' ? data.theme : 'default';
                            themeEditor.setValue(value, false);
                        }
                    }
                });
            }
        });
    } else {
        $('#fs-login-theme-wrap').hide();
    }
    /**
     * 初始化FS的登录背景图片
     */
    var initBackgroundImage = function () {
        var self = this;
        var ran = new Date().getTime() + "" + (Math.random() * 1000);
        FR.ajax({
            url: FR.servletURL + "?op=fs_load&cmd=getLoginImageInfo&_ran=" + ran,
            complete: function (res, status) {
                if (status == 'success') {
                    var loginInfo = FR.jsonDecode(res.responseText);
                    var loginImgID = loginInfo.id;
                    loginImgWidth = parseInt(loginInfo.width);
                    loginImgHeight = parseInt(loginInfo.height);
                    calcBackgroundScale();
                    var url = FR.servletURL + ((loginImgID && loginImgID != 'null') ?
                            ('?op=fr_attach&cmd=ah_image&id=' + loginImgID + '&isAdjust=false')
                            : '?op=resource&resource=/com/fr/plugin/fresh/web/images/login/login.jpg');
                    if ($('body').length > 0) {
                        var loginImg = $('img.fs-login-img');
                        //loginImg.attr("src", url);
                        loginImg.attr("src","/hailian/img/login.jpg");
                        loginImg.css({
                            "margin-left": "-" + imgOffsetX + "px",
                            "margin-top": "-" + imgOffsetY + "px",
                            width: loginImgWidth * scale + "px",
                            height: loginImgHeight * scale + "px"
                        });
                    }
                }
            }
        })
    };

    /**
     * 获取初初始化参数
     */
    var initParams = function () {
        var bannerType = null;
        FR.ajax({
            url: FR.servletURL + "?op=fs_load&cmd=get_banner_type",
            type: 'POST',
            async: false,
            complete: function (res, status) {
                if (status === "success") {
                    bannerType = FR.jsonDecode(res.responseText).bannerType;
                }
            }
        });
        return bannerType;
    };

    /**
     *初始化logo
     */
    var initLogoImage = function () {};

    var calcBackgroundScale = function () {
        var windowWidth = document.body.clientWidth;
        var windowHeight = document.body.clientHeight;

        if (windowWidth / windowHeight >= loginImgWidth / loginImgHeight) {
            scale = windowWidth / loginImgWidth;
            imgOffsetX = 0;
            imgOffsetY = (loginImgHeight * scale - windowHeight) / 2;
        } else {
            scale = windowHeight / loginImgHeight;
            imgOffsetX = (loginImgWidth * scale - windowWidth) / 2;
            imgOffsetY = 0;
        }
        //$('#fs-chicken-soup').css({
        //    zoom:Math.min(windowWidth/1920, windowHeight/1080),
        //    "-moz-transform":"scale(" + Math.min(windowWidth/1920, windowHeight/1080) +")"
        //});
        //$('#fs-login-logo').css({
        //    zoom: Math.min(windowWidth/1920, windowHeight/1080),
        //    "-moz-transform":"scale(" + Math.min(windowWidth/1920, windowHeight/1080) + ")"
        //});
        var contentScale = Math.min(windowWidth / 1366, windowHeight / 768);
        $('#fs-login-content').css({
            transform: 'scale(' + Math.max(1, contentScale) + ')'
        });
    };

    var showErrorMsg = function ($pos, msg) {
        $mask.hide().insertAfter($pos).text(msg);
        $mask.click(function () {
            $(this).fadeOut();
            $pos.select();
        }).fadeIn();
    };

    var signIN = function () {
        $mask.hide();
        var user = $username.val();
        var pw = $password.val();
        //用户名为空
        if (FR.isEmpty(user)) {
            showErrorMsg($username, FR.i18nText('FS-User-User_Can_Not_Be_Null'));
            return;
        }
        //密码为空
        if (FR.isEmpty(pw)) {
            showErrorMsg($password, FR.i18nText('FS-Admin-Password_Can_Not_Be_Null'));
            return;
        }
        var domain=FR.serverURL+FR.servletURL;
		//domain="/WebReport";
        domain=domain.replace("/ReportServer","")+'/auxiliaryRoleLogin?op=fs_load&cmd=login';
		console.log(domain)
        //http://localhost:8075/WebReport/AuxiliaryRoleLogin?fr_username=zuo&fr_password=anginfo2015&fr_remember=false&__redirect__=true
        FR.ajax({
            //url: FR.serverURL + '/AuxiliaryRoleLogin?op=fs_load&cmd=login',
        	url: domain,
            data: FR.cjkEncodeDO({
                fr_username: encodeURIComponent(user),
                fr_password: encodeURIComponent(pw),
                fr_remember: $keep.hasClass('fs-login-remember-selected'),
                __redirect__:false,
                theme: $('#fs-login-btn').attr('expired') == 'true' || themeEditor === undefined ? "" : themeEditor.getValue()
            }),
       /* 	 url: FR.servletURL + '?op=fs_load&cmd=login',
             data: FR.cjkEncodeDO({
                 fr_username: encodeURIComponent(user),
                 fr_password: encodeURIComponent(pw),
                 fr_remember: $keep.hasClass('fs-login-remember-selected'),
                 theme: $('#fs-login-btn').attr('expired') == 'true' || themeEditor === undefined ? "" : themeEditor.getValue()
             }),*/
            type: 'POST',
            async: false,
            error: function () {
                FR.Msg.toast("Error!");
            },
            complete: function (res, status) {
                if (res.responseText == "") {
                    showErrorMsg($username, FR.i18nText('FS-Admin-Authentication_failed'));
                    return;
                }
                var signResult = FR.jsonDecode(res.responseText);
                console.log(signResult)
                if (signResult.fail) {
                    //用户名和密码不匹配
                    //showErrorMsg($username, FR.i18nText("FS-Generic-Privilege_Name_Not_Match_Password"));
                	showErrorMsg($username, signResult.msg);
                } else if (signResult.url) {
                    window.location.href = signResult.url;
                }
            }
        });
    };
    initBackgroundImage();
    var bannerType = initParams();
   /* if (bannerType > 1) {
        initLogoImage();
    }
    if (bannerType < 3) {
        $("#fs-login-title").show();
    }
    if (bannerType === 3) {
        $("#fs-login-title").hide();
    }*/
    $username.focus();
    $(window).resize(function () {
        calcBackgroundScale();
        $('img.fs-login-img').css({
            "margin-left": "-" + imgOffsetX + "px",
            "margin-top": "-" + imgOffsetY + "px",
            width: loginImgWidth * scale + "px",
            height: loginImgHeight * scale + "px"
        });
    });
});