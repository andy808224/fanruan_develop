/**
 * Coder: Sean
 * Date: 13-11-6
 * Time: 上午12:02
 */
alert("bcbcbb")
FS.PASSWORD = {
    init: function (renderer) {
    	alert(1111)
        var items = [], actions = [];
        if (FS.isAdmin()) {
            items = [FS.adminPwdModule()];
        } else {
            items = [this._userInfoModule(), this._userPwdModule()];
            actions = [
                function () {
                var tabpane = this;
                var config = {
                    url: FR.servletURL + "?op=fs_main&cmd=user_getinfo"
                };
                var completeFn = function (res, status) {
                    if (status == 'success') {
                        var user = FR.jsonDecode(res.responseText);
                        tabpane.getWidgetByName("fullnameText").setValue(user.realname);
                        tabpane.getWidgetByName("emailText").setValue(user.email);
                        tabpane.getWidgetByName("MobilePhoneText").setValue(user.mobile);
                    }
                };
                FS.Async.ajax(config, completeFn);
            }, FR.emptyFn()]
        }
        this.infoChange = new FS.LTabPane({
            width: '100%',
            height: '100%',
            items: items,
            style: 'blue',
            renderEl: renderer,
            marginLeft: 40,
            initAfterActions: actions
        });
    },
    createPwdCfg: function () {
    	alert(1)
        var cfgItems = [
            [
                {el: {type: 'llabel', value: FR.i18nText("FS-Admin-Old_Password")}},
                {el: {type: 'password', widgetName: 'oldPwdText'}},
                null,
                {el: {type: 'llabel', widgetName: 'oldPwdError', levelStyle: 0, fontfamily: 'SimSun', invisible: true,
                    color: '#EB000B', fontsize: '13px', value: FR.i18nText("FS-Admin-Old_Password_Error")}}
            ],
            [
                {el: {type: 'llabel', value: FR.i18nText("FS-Admin-Enter_New_Password")}},
                {el: {type: 'password', widgetName: 'newPwdText'}},
                null,
                {el: {type: 'llabel', widgetName: 'enterNewPwdError', levelStyle: 0, fontfamily: 'SimSun', invisible: true,
                    color: '#EB000B', fontsize: '13px', value: FR.i18nText("FS-Admin-Please_Enter_Newpwd")}}
            ],
            [
                {el: {type: 'llabel', value: FR.i18nText("FS-Admin-Verify_New_Password")}},
                {el: {type: 'password', widgetName: 'verifyPwdText'}},
                null,
                {el: {type: 'llabel', widgetName: 'pwdNotMatchError', levelStyle: 0, fontfamily: 'SimSun', invisible: true,
                    color: '#EB000B', fontsize: '13px', value: FR.i18nText("FS-Admin-Passwords_Not_Match")}}
            ]
        ];
        return cfgItems;
    },
    /*******************用户信息模块*******************/
    _userInfoModule: function () {
        var self = this;
        var userInfo = {
            title: FR.i18nText("FS-Admin-My_Info"),
            content: {
                type: 'confirm',
                doSize: true,
                text4OK: FR.i18nText("FS-Generic-Simple_Save"),
                text4Cancel: null,
                btnsAlignment: 'left',
                closeAfterAction: false,
                firstBtnMargin: 0,
                //密码修改，确认按钮的点击事件
                onOK: function () {
                    self._userInfoSubmit();
                },
                onCancel: function () {
                },
                width: 800,
                height: 170,
                contentWidget: {
                    type: 'tablelayout',
                    widgetName: 'userInfoTablelayout',
                    columnSize: [Math.max(92, FR.i18nTextWidth("FS-Generic-Simple_Email", 6.5) + 40), 181, 6, 'fill'],
                    rowSize: [21, 21, 21],
                    vgap: 19,
                    items: [
                        [
                            {el: {type: 'llabel', value: FR.i18nText("FS-Admin-Full_Name")}},
                            {el: {type: 'text', widgetName: 'fullnameText', allowBlank: false}},
                            null,
                            {el: {type: 'llabel', widgetName: 'fullnameError', levelStyle: 0, fontfamily: 'SimSun', invisible: true,
                                color: '#EB000B', fontsize: '13px', value: FR.i18nText("FS-Admin-Name_Can_Not_Be_Null")}}
                        ],
                        [
                            {el: {type: 'llabel', value: FR.i18nText("FS-Generic-Simple_Email")}},
                            {el: {type: 'text', widgetName: 'emailText'}}
                        ],
                        [
                            {el: {type: 'llabel', value: FR.i18nText("FS-Generic-Mobile_Phone")}},
                            {el: {type: 'text', widgetName: 'MobilePhoneText'}}
                        ]
                    ]
                }
            }
        };
        return userInfo;
    },
    /**
     * 提交用户信息,包括姓名、邮箱和手机
     * @private
     */
    _userInfoSubmit: function () {
        var fullnameText = this.infoChange.getWidgetByName("fullnameText"),
            error = this.infoChange.getWidgetByName("fullnameError");
        if (!fullnameText.checkValid()) {
            error.setVisible(true);
        } else {
            error.setVisible(false);
        }
        var completeFn = function (res, status) {
            if (status == 'success') {
                var re = FR.jsonDecode(res.responseText);
                if (re.success) {
                    FR.Msg.toast(FR.i18nText("FS-Generic-Simple_Successfully"));
                } else {
                    FR.Msg.toast(FR.i18nText("FS-Generic-Simple_Failed"));
                }
            }
        };
        var config = {
            url: FR.servletURL + "?op=fs_main&cmd=user_saveinfo",
            data: {
                realname: fullnameText.getValue(),
                email: this.infoChange.getWidgetByName("emailText").getValue(),
                mobile: this.infoChange.getWidgetByName("MobilePhoneText").getValue()

            }
        };
        //提交用户信息
        FS.Async.ajax(config, completeFn);
    },
    /*******************密码修改模块*******************/
    _userPwdModule: function () {
        var self = this;
        var userPwd = {
            title: FR.i18nText("FS-Admin-Password_Modify"),
            content: {
                type: 'confirm',
                doSize: true,
                text4OK: FR.i18nText("FS-Generic-Simple_Save"),
                text4Cancel: null,
                btnsAlignment: 'left',
                closeAfterAction: false,
                firstBtnMargin: 0,
                //密码修改，确认按钮的点击事件
                onOK: function () {
                    self._userPwdSubmit();
                },
                onCancel: function () {
                },
                width: 800,
                height: 170,
                contentWidget: {
                    type: 'tablelayout',
                    widgetName: 'userPwdTablelayout',
                    columnSize: [FR.i18nTextWidth("FS-Admin-Verify_New_Password", 6.5) > 120 ? 180 : 131, 122 , 6, 'fill'],
                    rowSize: [21, 21, 21],
                    vgap: 19,
                    items: self.createPwdCfg()
                }
            }
        };
        return userPwd;
    },
    _userPwdSubmit: function () {
        this._getUserPwdData();
        //清空报错信息
        this._clearUserPwdErrorInfo();
        //判断新密码设置是否为空
        var oldp = this.oldPwdText.getValue(),
            np = this.newPwdText.getValue();
        if (FR.isEmpty(np)) {
            this.enterNewPwdError.setVisible(true);
            return false;
        }
        //判断两次输入的新密码是否一致
        if (np != this.verifyPwdText.getValue()) {
            this.pwdNotMatchError.setVisible(true);
            return false;
        }
        //提交密码修改并判断密码是否修改成功
        var submitResult = FS.Trans.changePW({
            oldp: encodeURIComponent(oldp),
            np: encodeURIComponent(np)
        });
        if (submitResult.success) {
            FS.signOut();
        } else {
            this.oldPwdError.setVisible(true);
            return false;
        }
        return true;
    },
    _getUserPwdData: function () {
        this.oldPwdText = this.infoChange.getWidgetByName('oldPwdText');
        this.verifyPwdText = this.infoChange.getWidgetByName('verifyPwdText');
        this.newPwdText = this.infoChange.getWidgetByName('newPwdText');
        //报错信息
        this.oldPwdError = this.infoChange.getWidgetByName('oldPwdError');
        this.enterNewPwdError = this.infoChange.getWidgetByName('enterNewPwdError');
        this.pwdNotMatchError = this.infoChange.getWidgetByName('pwdNotMatchError');
    },
    _clearUserPwdErrorInfo: function () {
        this.oldPwdError.setVisible(false);
        this.enterNewPwdError.setVisible(false);
        this.pwdNotMatchError.setVisible(false);
    }
};
FS.PASSWORD.init();