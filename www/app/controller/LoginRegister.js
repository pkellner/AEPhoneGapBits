Ext.define('AE.controller.LoginRegister', {
    extend: 'Ext.app.Controller',
    config: {

        refs: {
            mainContainerPanel: '#mainContainerPanel',

            startHeaderPanel: '#startHeaderPanel',
            startHeaderCard: '#startHeaderCard',
            startRegHeaderCard: '#startRegHeaderCard',
            startBodyCard: '#startBodyCard',
            welcomeLoginButton: '#welcomeLoginButton',
            welcomeCreateAccountButton: '#welcomeCreateAccountButton',
            welcomeStartSpacer: '#welcomeStartSpacer',
            leftStartHeaderBtn: '#leftStartHeaderBtn',
            rightStartHeaderBtn: '#rightStartHeaderBtn',
            regNextOnStep1: '#regNextOnStep1',
            regNextOnStep2: '#regNextOnStep2',

            loginRegisterPanel: 'loginregisterpanel',

            // Register
            regWrapperPanel: '#regWrapperPanel',
            // Register buttons
            regNowBtn: '#regNowBtn',

            regNextAeBtn: 'button#regNextAeBtn',
            regPreConfigdAddBtn: 'button#regPreConfigdAddBtn',
            regManualConfigAddBtn: 'button#regManualConfigAddBtn',
            regTestServerConnBtn: 'button#regTestServerConnBtn',
            regBackAccountTypeBtn: '#regBackAccountTypeBtn',
            regPreConfigdBackBtn: '#regPreConfigdBackBtn',
            regManualConfigBackBtn: '#regManualConfigBackBtn',
            regTestServerConnManualBtn: '#regTestServerConnManualBtn',
            // Register Forms
            regAeFormPanel: '#regAeFormPanel',
            regPreConfigdFormPanel: '#regPreConfigdFormPanel',
            regManualConfigFormPanel: '#regManualConfigFormPanel',
            regPreConfigdMailFieldset: '#regPreConfigdMailFieldset',
            // Register Datalist
            regMailAccountTypesList: '#regMailAccountTypesList',
            // Register Cards
            regCardsPanel: '#regCardsPanel',

            // Register preconfigured
            pre_address: '#pre_address',

            // Whitelist email addresses
            whitelistFirstLoginSaveBtn: '#whitelistFirstLoginSaveBtn',
            whitelistSelectAllBtn: '#whitelistSelectAllBtn',
            whitelistFirstLoginContactsList: '#whitelistFirstLoginContactsList',

            // Login
            loginBtn: 'button#loginBtn',
            loginHereBtn: '#loginHereBtn',

            // Forms
            regFormPanel: '#regFormPanel',
            reg_aeUsername: '#reg_aeUsername',

            loginFormPanel: '#loginFormPanel',
            loginUsername: '#login_username',
            loginPassword: '#login_password',
            loginRememberMe: '#login_rememberMe',
            // Tabs
            regTab: '#regTab',
            loginTab: '#loginTab',

            // Forgot Password
            forgotPasswordEmail: '#forgotPasswordEmail',
            forgotPasswordSendBtn: '#forgotPasswordSendBtn'
        },

        control: {

            welcomeLoginButton: {
                tap: 'onWelcomeLoginButton'
            },

            welcomeCreateAccountButton: {
                tap: 'onWelcomeCreateAccountButton',
                painted: 'onPaintWelcomeCreateAccountButton'
            },

            leftStartHeaderBtn: {
                tap: 'onLeftStartHeaderBtn'
            },

            rightStartHeaderBtn: {
                tap: 'onRightStartHeaderBtn'
            },

            regNextOnStep1: {
                tap: 'onRightStartHeaderBtn'
            },

            regNextOnStep2: {
                tap: 'onRightStartHeaderBtn'
            },

            // Register buttons
            regNowBtn: {
                tap: 'onRegNowBtn'
            },
            regManualConfigAddBtn: {
                tap: 'onRegManualConfigAddBtn'
            },
            regPreConfigdAddBtn: {
                tap: 'onRegPreConfigdAddBtn'
            },
            regNextAeBtn: {
                tap: 'onRegNextAeBtn'
            },
            regTestServerConnBtn: {
                tap: 'onRegTestMailConnectionBtn'
            },
            regBackAccountTypeBtn: {
                tap: 'showRegAeAccountPanel'
            },
            regPreConfigdBackBtn: {
                tap: 'showRegMailAccountTypesPanel'
            },
            regManualConfigBackBtn: {
                tap: 'showRegMailAccountTypesPanel'
            },
            regTestServerConnManualBtn: {
                tap: 'onRegTestMailConnectionBtn'
            },

            regFormPanel: '#regFormPanel',

            reg_aeUsername: {
                keyup: 'onKeyupUsername'
            },

            loginUsername: {
                keyup: 'onKeyupUsername',
                focus: 'onFocusLoginUsername',
                blur: 'onBlurLoginUsername'
            },

            loginPassword: {
                focus: 'onFocusLoginPassword',
                blur: 'onBlurLoginPassword'
            },

            // Register DataList
            regMailAccountTypesList: {
                select: 'onSelectRegMailAccountTypesList'
            },

            whitelistSelectAllBtn: {
                tap: 'onTapWhitelistSelectAllBtn'
            },

            whitelistFirstLoginSaveBtn: {
                tap: 'onTapWhitelistFirstLoginPanelSaveBtn'
            },

            whitelistFirstLoginContactsList: {
                select: 'onSelectWhitelistList'
            },

            loginHereBtn: {
                tap: 'onLoginHereBtn'
            },
            loginBtn: {
                tap: 'onLoginBtn'
            },
            forgotPasswordBtn: {
                tap: 'onForgotPasswordBtn'
            },

            forgotPasswordSendBtn: {
                tap: 'forgotPasswordSendBtnHandler'
            }
        }

    },

    launch: function () {
        // Bind forgot Password

//        Ext.get('forgotPasswordLink').on('tap', this.onForgotPasswordBtn, this);
    },

    // Data holder for registration form
    regFormData: {},

    // Flag for tracking logged in panel
    isLoggedInPanelRendered: false,

    // Flag for tracking logged out panel
    isLoggedOutPanelRendered: false,

    // Form field config
    // Used for form validation
    forms: {
        login: {
            idPrefix: 'login_',
            fields: [{
                name:'username',
                type: 'string'
            }, {
                name:'password',
                type: 'string'
            }]
        },
        registerAeAccount: {
            idPrefix: 'reg_',
            fields: [{
                name: 'aeUsername',
                type: 'string'
            }, {
                name: 'aePassword',
                type: 'string'
            }
//            {
//                name: 'aeRecoveryEmail',
//                type: 'email'
//            }
            ]
        },
        registerPreConfigd: {
            idPrefix: 'pre_',
            fields: [{
                name: 'address',
                type: 'email'
            }, {
                name: 'serverPassword',
                type: 'string'
            }]
        },
        registerManual: {
            idPrefix: 'reg_',
            fields: [{
                name: 'fromEmailAddress',
                type: 'email',
                optional: true
            }, {
                name: 'serverUsername',
                type: 'string'
            }, {
                name: 'serverPassword',
                type: 'string'
            }, {
                name: 'serverNameIn',
                type: 'string'
            }
//                , {
//                name: 'serverNameOut',
//                type: 'string'
//            }, {
//                name: 'serverPortOut',
//                type: 'number',
//                exclude: [0]
//            }, {
//                name: 'serverPort',
//                type: 'number',
//                exclude: [0]
//            }
            ]
        }
    },

    onWelcomeLoginButton: function () {
        this.startPanelHandler('login');
    },

    onWelcomeCreateAccountButton: function () {
        this.startPanelHandler('register', 1);
    },

    onPaintWelcomeCreateAccountButton: function (btn) {
        if (AE.app.getController('User').getUserRights('HideCreateAccountBtn')) {
            this.getWelcomeStartSpacer().setHidden(true);
            btn.setHidden(true);
        }
    },

    onLeftStartHeaderBtn: function (btn) {
        if (this.startPanelCurrentlyShowing == 'login' || this.startPanelCurrentlyShowing == 'register' && this.startPanelCurrentlyShowingCard == 1) {
            this.startPanelHandler('');
        } else if (this.startPanelCurrentlyShowing == 'register') {
            this.startPanelHandler('register', -1);
        }
    },

    onRightStartHeaderBtn: function (btn) {

        if (this.startPanelCurrentlyShowing == 'register' && this.startPanelCurrentlyShowingCard == 1) {
            // Step 1
            this.onRegNextAeBtn();
        } else {
            // Step 2
            if (this.startPanelCurrentlyShowingCard == 2) {
                if (this.getRegMailAccountTypesList().hasSelection()) {
                    this.startPanelHandler('register', 1);
                }
            } else {
                this.startPanelHandler('register', 1);
            }
        }
    },

    onKeyupUsername: function (field) {
        var fieldVal = field.getValue();

        field.setValue(fieldVal.replace(/[^a-zA-Z0-9]/gi,''));
    },

    onFocusLoginUsername: function () {
        AE.logger('Login field FOCUS. LoginRegister.js:onFocusLoginUsername', 2);
    },

    onBlurLoginUsername: function () {
        AE.logger('Login field BLUR. LoginRegister.js:onBlurLoginUsername', 2);
    },

    onFocusLoginPassword: function () {
        AE.logger('Password field FOCUS. LoginRegister.js:onFocusLoginPassword', 2);
    },

    onBlurLoginPassword: function () {
        AE.logger('Password field BLUR. LoginRegister.js:onBlurLoginPassword', 2);
    },

    // Form on creating Ageless Email Account
    onRegNextAeBtn: function () {

        var regFormPanel = this.getRegAeFormPanel();

        if (!AE.app.getController('UtilClass').formChecker(this.forms.registerAeAccount, regFormPanel.getValues())) {
            return;
        } else {
            this.checkForExistingUsername();
        }

    },

    checkForExistingUsername: function () {
        var regFormPanel = this.getRegAeFormPanel(),
            that = this;

        // step 1 mask timeout
        this.step1MaskTimeout = setTimeout(function () {
            Ext.Viewport.mask({
                xtype: 'loadmask',
                message: ''
            });
        }, AE.config.step1FormRegistrationTimeout);


        Ext.Ajax.request({
            url: AE.config.baseUrl + '/Account/checkForExistingUsername',
            method: 'GET',
            params: {username: regFormPanel.getValues().aeUsername},
            success: function (response) {

                var responseJson = Ext.decode(response.responseText);

                clearTimeout(that.step1MaskTimeout);

                Ext.Viewport.unmask();

                if (responseJson.Success) {
                    // Check if no username
                    if (responseJson.Total == 0) {
                        that.usernameUniqueProceed();
                        that.getReg_aeUsername().setCls('');
                    } else {
                        AE.msgBox.alert('Username Uniqueness', 'Username already exists. Please try again.');
                        that.getReg_aeUsername().setCls('redBorder');
                    }

                } else {

                    AE.msgBox.alert('Error', 'Error: ' + responseJson.message, function () {

                    });
                }

            },
            failure: function (response, options) {

                Ext.Viewport.unmask();

                AE.msgBox.alert('Error', 'Error: Server response error' );

                AE.ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
            }
        });
    },

    usernameUniqueProceed: function () {
        var regFormPanel = this.getRegAeFormPanel();

        Ext.apply(this.regFormData, regFormPanel.getValues());
        this.startPanelHandler('register', 1);
    },

    startPanelHandler: function (view, card) {

        var startHeaderCard = this.getStartHeaderCard(),
            startBodyCard = this.getStartBodyCard(),
            leftStartHeaderBtn = this.getLeftStartHeaderBtn(),
            rightStartHeaderBtn = this.getRightStartHeaderBtn(),
            selectedMailAccountType,
            slideDir = 'left',
            regCard;

        switch (view) {
            case 'login':
                cardBodyToShow = 1;
                leftStartHeaderBtn.show();
                this.startPanelCurrentlyShowing = 'login';
                startBodyCard.animateActiveItem(1, {
                    type: 'slide'
                });
                break;
            case 'register':

                regCard = (this.startPanelCurrentlyShowingCard ? this.startPanelCurrentlyShowingCard : 0) + card;

                if (regCard < this.startPanelCurrentlyShowingCard) {
                    slideDir = 'right';
                }

                // Header

                leftStartHeaderBtn.show();
                if (regCard <= 2) {
                    rightStartHeaderBtn.show();
                } else {
                    if (card == -1) {
                        rightStartHeaderBtn.show();
                    } else {
                        rightStartHeaderBtn.hide();
                    }

                }

                startHeaderCard.animateActiveItem(2, {
                    type: 'slide',
                    direction: slideDir
                });

                this.getStartRegHeaderCard().animateActiveItem(regCard - 1, {
                    type: 'slide',
                    direction: slideDir
                });

                // Body

                // Special case for Other mail account panel
                if (this.startPanelCurrentlyShowingCard == 2 && card != -1 ) {

                    // If selection is other, this will skip the preconfigured card on tapping right
                    if (this.getRegMailAccountTypesList().getSelection()[0].data.accountType == 'Other') {
                        regCard++;
                    }
                } else if (card == -1 && this.startPanelCurrentlyShowingCard == 4) {
                    // Skips the Preconfigured card on tapping left arrow
                    regCard--;
                }

                if (card == 5) {
                    leftStartHeaderBtn.hide();
                }

                this.startPanelCurrentlyShowing = 'register';
                this.startPanelCurrentlyShowingCard = regCard;

                startBodyCard.animateActiveItem(1 + regCard, {
                    type: 'slide',
                    direction: slideDir
                });

                break;
            default:
                this.startPanelCurrentlyShowing = 'start';
                this.startPanelCurrentlyShowingCard = 0;

                startHeaderCard.animateActiveItem(0, {
                    type: 'slide',
                    direction: 'right'
                });

                leftStartHeaderBtn.hide();
                rightStartHeaderBtn.hide();
                startBodyCard.animateActiveItem(0, {
                    type: 'slide',
                    direction: 'right'
                });
        }
    },

    popLoginForm: function () {
        this.getLoginRegisterPanel().setActiveItem(1);
        this.onLoginHereBtn();
        this.startPanelHandler();
    },

    onRegNowBtn: function () {
        this.getLoginRegisterPanel().animateActiveItem(1, {
            type: 'pop'
        });
    },

    onLoginHereBtn: function () {
        this.getLoginRegisterPanel().animateActiveItem(0, {
            type: 'pop'
        });
    },

    onSelectRegMailAccountTypesList: function (dataView, record, opts) {

        this.getRegPreConfigdMailFieldset().setTitle(record.data.accountType + ' Server Credentials');

        this.getPre_address().setPlaceHolder('Your ' + record.data.accountType + ' email address');

        Ext.apply(this.regFormData, record.data);

    },

    checkPreConfigServerFormCredentials: function () {

        var regFormPanel = this.getRegPreConfigdFormPanel(),
            regFormValues = regFormPanel.getValues();
        if (AE.app.getController('UtilClass').formChecker(this.forms.registerPreConfigd, regFormValues)) {
            return true;
        }

    },

    getPreConfigServerFormCredentials: function () {
        var regFormPanel = this.getRegPreConfigdFormPanel(),
            regFormValues = regFormPanel.getValues();

        Ext.apply(this.regFormData, regFormPanel.getValues());

        this.regFormData.serverUsername = regFormValues.address;
        this.regFormData.serverPassword = regFormValues.serverPassword;
        this.regFormData.serverAccountDescription = regFormValues.description;
        // Copy email address to from email address
        this.regFormData.fromEmailAddress = regFormValues.address;
    },

    onRegPreConfigdAddBtn: function () {
        if (this.checkPreConfigServerFormCredentials()) {
            this.getPreConfigServerFormCredentials();
            this.doTestMailConnection(true);
        } else {
            return;
        }
    },

    checkManualServerFormValues: function () {

        var regFormPanel = this.getRegManualConfigFormPanel();

        if (AE.app.getController('UtilClass').formChecker(this.forms.registerManual, regFormPanel.getValues())) {
            return true;
        }

    },

    getManualServerFormValues: function () {
        var regFormPanel = this.getRegManualConfigFormPanel();

        Ext.apply(this.regFormData, regFormPanel.getValues());
    },

    onRegManualConfigAddBtn: function () {
        if (this.checkManualServerFormValues()) {
            this.getManualServerFormValues();
            this.doTestMailConnection(true);
        }
    },

    onRegTestMailConnectionBtn: function () {
        var checkPass = false;
        // Use the manual config form
        if (this.regFormData.accountType == 'Other') {
            // Check form first
            if (this.checkManualServerFormValues()) {
                // Get form values
                this.getManualServerFormValues();
                checkPass = true;
            }
        } else {
            // Check form first
            if (this.checkPreConfigServerFormCredentials()) {

                // Get form values
                this.getPreConfigServerFormCredentials();

                checkPass = true;
            }
        }
        // If form check has passed
        if (checkPass) {
            this.doTestMailConnection(false);
        }
    },

    doTestMailConnection: function (proceedRegistration) {

        var that = this;

        Ext.Viewport.mask({
            xtype: 'loadmask',
            message: 'Checking mail connection...'
        });

        Ext.Ajax.request({
            url: AE.config.baseUrl + '/Account/TestEmailServer',
            method: 'POST',
            params: that.regFormData,
            success: function (response) {

                var responseJson = Ext.decode(response.responseText);
                Ext.Viewport.unmask();

                if (responseJson.success) {
                    // Register the new account
                    if (proceedRegistration) {
                        that.registerNewAccount();
                    } else {
                        AE.msgBox.alert('Test Email Server Connection', 'The Connection to your Email Server was Successful.');
                    }

                } else {

                    AE.msgBox.alert('Error', 'Error: ' + responseJson.message, function () {

                    });
                }

            },
            failure: function (response, options) {
                Ext.Viewport.unmask();

                AE.msgBox.alert('Error', 'Error: Server response error' );

                AE.ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
            }
        });
    },

    registerNewAccount: function () {

        var that = this;

        Ext.Viewport.mask({
            xtype: 'loadmask',
            message: 'Registering...'
        });

        Ext.Ajax.request({
            url: AE.config.baseUrl + '/Account/RegisterFull',
            method: 'POST',
            params: that.regFormData,
            success: function (response) {

                var responseJson = Ext.decode(response.responseText);
                Ext.Viewport.unmask();

                if (responseJson.success) {

                    that.getRegAeFormPanel().reset();
                    that.getRegPreConfigdFormPanel().reset();
                    that.getRegManualConfigFormPanel().reset();

                    that.startPanelHandler('register', 5);

                    that.onShowWhitelistFirstLoginPanel(that.regFormData);

                } else {
                    AE.msgBox.alert('Error', 'Error: ' + responseJson.message, function () {

                    });
                }

            },
            failure: function (response, options) {
                Ext.Viewport.unmask();

                AE.msgBox.alert('Error', 'Error: Server response error' );

                AE.ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
            }
        });

    },

    onShowWhitelistFirstLoginPanel: function (loginInformation) {
        var that = this;

        setTimeout(function () {

            var loggedInAccount = Ext.getStore('Accounts').first(),
                whitelistFirstLoginContactsList,
                loginInfo;

            loginInfo = loginInformation;

            whitelistFirstLoginContactsList = that.getWhitelistFirstLoginContactsList();

            whitelistFirstLoginContactsList.setMasked({
                xtype: 'loadmask',
                message: 'Loading email addresses...'
            });

            // Delete the serverPassword
            // This will cause server error when passed
            delete loginInfo.serverPassword;

            Ext.Ajax.request({
                url : '/Account/GetFromAddressListFast',
                params: loginInfo,
                method: 'POST',
                success: function (response) {
                    whitelistFirstLoginContactsList.setMasked(false);

                    var responseJson = Ext.decode(response.responseText),
                        i, responseData,
                        emailData = [];

                    if (responseJson.success) {

                        responseData = responseJson.Data;

                        for (i = 0; i < responseData.length; i++) {
                            emailData[i] = [responseData[i]];
                        }

                        if (emailData.length) {
                            Ext.getStore('WhitelistFirstLoginContacts').setData(emailData);
                            whitelistFirstLoginContactsList.selectAll(true);
                        }

                    } else {
                        AE.msgBox.alert('Error', 'Server error: ' + responseJson.Message, Ext.emptyFn);
                    }

                },
                failure: function (response) {

                    whitelistFirstLoginContactsList.setMasked(false);

                    var responseJson = Ext.decode(response.responseText);

                    AE.msgBox.alert('Error', 'Error: ' + responseJson.message, function () {

                    });

                },
                scope: this
            });

        }, 1000);
    },

    whitelistSelectAll: true,

    onTapWhitelistSelectAllBtn: function (btn) {

        if (!this.whitelistSelectAll) {
            this.getWhitelistFirstLoginContactsList().selectAll(true);
            this.whitelistSelectAll = true;
        } else {
            this.getWhitelistFirstLoginContactsList().deselectAll(true);
            this.whitelistSelectAll = false;
        }

    },

    onTapWhitelistFirstLoginPanelSaveBtn: function (btn) {

        var that = this,
            whitelistFirstLoginContactsList,
            whitelistSelections = this.getWhitelistFirstLoginContactsList().getSelection();

        if (whitelistSelections.length) {

            this.whitelistSelections = {
                records: whitelistSelections,
                count: 0
            };

            btn.disable();

            whitelistFirstLoginContactsList = that.getWhitelistFirstLoginContactsList();

            whitelistFirstLoginContactsList.setMasked({
                xtype: 'loadmask',
                message: 'Adding email addresses to whitelist...'
            });

            this.processSelectedEmailAddressForWhitelist();

        } else {
            this.switchToMainApp();
        }

    },

    switchToMainApp: function () {

        this.onLoginBtn(this.regFormData);

        whitelistFirstLoginContactsList = this.getWhitelistFirstLoginContactsList();

        whitelistFirstLoginContactsList.setMasked(false);

//        Add first login message after registration
        AE.app.getController('Emails').showMessageOnEmailCarouselContainer('<div id="hasMessageOnEmailContainerPanel">Thank you for joining AgelessEmail.<br />We are initializing your account.<br /><br />Your Inbox emails are being processed. <br />This may take about a minute.  Please wait...<br /><br />If you see the RED Refresh Button, click it to retrieve new email.</div>');
    },

    processSelectedEmailAddressForWhitelist: function () {

        if (this.whitelistSelections.count < this.whitelistSelections.records.length ) {

            Ext.callback(this.addEmailAddressToWhitelist, this, [this.whitelistSelections.records[this.whitelistSelections.count],
                this.processSelectedEmailAddressForWhitelist, this]);

            this.whitelistSelections.count += 1;

        } else {

            this.switchToMainApp();

        }

    },

    addEmailAddressToWhitelist: function(record, callback, scope) {
        var emailAddress = record.get('EmailAddress');

        Ext.Ajax.request({
            url: AE.config.baseUrl + '/Account/AddEmailAddressToAddressBook',
            method: 'POST',
            params: {
                emailAddress: emailAddress
            },
            success: function (response) {

                var responseJson = Ext.decode(response.responseText);

                if (responseJson.Success) {

                } else {
                    AE.msgBox.alert('Error', 'Server error: ' + responseJson.Message, Ext.emptyFn);
                }

                if (callback) {
                    Ext.callback(callback, scope);
                }

            },
            failure: function (response) {

                var responseJson = Ext.decode(response.responseText);

                AE.logger(responseJson.message + '. LoginRegister.js:addEmailAddressToWhitelist', 4);

                if (callback) {
                    Ext.callback(callback, scope);
                }

            },
            scope: this
        });
    },

    showRegAeAccountPanel: function () {
        this.getRegCardsPanel().animateActiveItem(0, { type: 'slide', direction: 'right'});
    },

    showRegMailAccountTypesPanel: function () {
        this.getRegCardsPanel().animateActiveItem(1, { type: 'slide', direction: 'right'});
    },

    onLoginBtn: function (regFormData) {

        var that = this,
            loginFormPanel = this.getLoginFormPanel();

        if (regFormData.aeUsername) {

            loginFormPanel.setValues({
                username: regFormData.aeUsername,
                password: regFormData.aePassword
            });
        } else {
            if (!AE.app.getController('UtilClass').formChecker(this.forms.login, loginFormPanel.getValues())) {
                return;
            }
        }

        Ext.Viewport.mask({
            xtype: 'loadmask',
            message: 'Logging in. Please wait...'
        });

        loginFormPanel.submit({
            url: AE.config.baseUrl + '/Account/Login',
            method: 'POST',
            success: function (form, result) {
                if (result.success) {

                    // Load data
                    Ext.getStore('Accounts').add(result.data);

                    Ext.Viewport.unmask();

                    AE.app.getController('User').onAccountsStoreLoad();

                    that.getLoginUsername().reset();
                    that.getLoginPassword().reset();
                    that.getLoginRememberMe().setChecked(false);

                } else {
                    Ext.Viewport.unmask();
                    AE.msgBox.alert('Error', 'Error: ' + result.message, function () {

                    });
                }
            },
            failure: function (form, result) {
                Ext.Viewport.unmask();
                AE.msgBox.alert('Error', 'Error: ' + result.message, function () {

                });
            }
        });
    },

    onForgotPasswordBtn: function () {

        var that = this;

        if (!this.forgotPasswordPanel) {
            this.forgotPasswordPanel = Ext.create('Ext.Panel', {
                id: 'forgotPasswordPanel',
                hideOnMaskTap:false,
                modal:true,
                showAnimation:'popIn',
                hideAnimation:'popOut',
                centered:true,
                width:400,
                height:215,
                layout:'fit',
                items: [{
                    xtype: 'toolbar',
                    ui: 'blue',
                    docked: 'top',
                    title: 'Forgot Password',
                    items: [{
                        xtype: 'button',
                        text: 'Close',
                        handler: function () {
                            that.forgotPasswordPanel.hide();
                        },
                        scope: that
                    }, {
                        xtype: 'spacer'
                    }, {
                        xtype: 'button',
                        pack: 'center',
                        text: 'Send',
                        id: 'forgotPasswordSendBtn',
                        ui:'orange-dark-bevel',
                        width: 70
                    }]
                }, {
                    layout: 'vbox',
                    items: [ {
                        height: 5
                    },{
                        html: 'Enter your Username or Email Address that is associated with your account and we will email you a link to reset your password.'
                    }, {
                        height: 10
                    }, {
                        xtype: 'emailfield',
                        name: 'emailAddress',
                        id: 'forgotPasswordEmail',
                        placeHolder: 'Type your email address here'
                    }]
                }]
            });

            Ext.Viewport.add([this.forgotPasswordPanel]);
        }

        this.forgotPasswordPanel.show();
    },

    forgotPasswordSendBtnHandler: function () {

        var emailField = this.getForgotPasswordEmail();

        this.forgotPasswordPanel.hide();

        Ext.Viewport.mask({
            xtype: 'loadmask',
            message: 'Processing. Please wait...'
        });

        Ext.Ajax.request({
            url: AE.config.baseUrl + '/Account/EmailForgotPassword',
            method: 'POST',
            params: { emailOrUsername: emailField.getValue() },
            success: function (response) {

                var responseJson = Ext.decode(response.responseText);
                Ext.Viewport.unmask();
                AE.msgBox.alert('Test Email Server Connection', responseJson.message);

            },
            failure: function (response, options) {
                Ext.Viewport.unmask();

                AE.msgBox.alert('Error', 'Error: Server response error' );

                AE.ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
            }
        });

    }

});