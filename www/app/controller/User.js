Ext.define('AE.controller.User', {
    extend:'Ext.app.Controller',

    config:{
        refs: {
            mainContainerPanel: '#mainContainerPanel',

            emailFilterToggleBtn: '#emailFilterToggleBtn',
            emailAdvancedFilterToggleBtn: '#emailAdvancedFilterToggleBtn',
            emailAdvancedFilterBtn: '#emailAdvancedFilterBtn',

            // Buttons
            settingsBtn: 'button#settingsBtn',
            settingsBtn2: 'button#settingsBtn2',
            settingsCloseBtn: 'button#settingsCloseBtn',
            settingsToolbar: '#settingsToolbar',

            // Profile
            profileUpdateBtn: 'button#profileUpdateBtn',

            profileTestMailConnectionBtn: 'button#profileTestMailConnectionBtn',
            // Forms
            profileFormPanel: '#profileFormPanel',
            // Tabs
            settingsTabPanel: '#settingsTabPanel',
            profileTab: '#profileTab',

            // Account
            accountPanel: 'accountpanel',
            accountFormPanel: '#accountFormPanel',
            accountPanelCloseBtn: '#accountPanelCloseBtn',
            accountPanelSaveBtn: '#accountPanelSaveBtn',
            emailServerSettingsBtn: '#emailServerSettingsBtn',

            // Email Server settings
            emailSettingsPanelCloseBtn: '#emailSettingsPanelCloseBtn',
            emailSettingsPanelSaveBtn: '#emailSettingsPanelSaveBtn',
            emailServerSettingsFormPanel: '#emailServerSettingsFormPanel',
            emailSettingsPanel: '#emailSettingsPanel',
            emailSettingsTestMailConnectionBtn: '#emailSettingsTestMailConnectionBtn',
            emailSettingsTestMailConnectionBtn2: '#emailSettingsTestMailConnectionBtn2',
            accountEmailSettingsCard: '#accountEmailSettingsCard',
            emailSettingsChangeAccountTypeBtn: '#emailSettingsChangeAccountTypeBtn',
            emailSettingsAccountTypeBackBtn: '#emailSettingsAccountTypeBackBtn',
            emailSettingsAccountTypeNextBtn: '#emailSettingsAccountTypeNextBtn',
            emailSettingsAccountTypesList: '#emailSettingsAccountTypesList',
            emailSettingsFormCard: '#emailSettingsFormCard',
            emailSettingsPreConfigdMailFieldset: '#emailSettingsPreConfigdMailFieldset',
            emailSettingsPreConfigdFormPanel: '#emailSettingsPreConfigdFormPanel',

            addWhitelistEmailBtn: '#addWhitelistEmailBtn',
            addWhitelistMultipleEmailBtn: '#addWhitelistMultipleEmailBtn',

            contactsList: 'contactslist',

            deleteAccountBtn: '#deleteAccountBtn',
            deleteDataOnlyBtn: '#deleteDataOnlyBtn',
            
            assignDropboxAccountBtn: '#assignDropboxAccountBtn',
            clearDropboxLocalCacheBtn: '#clearDropboxLocalCacheBtn',

            loggedInUserInfoToolbar: '#loggedInUserInfoToolbar',
            loggedInUserInfoToolbarTitle: '#loggedInUserInfoToolbarTitle',

            loginPanel: '#loginPanel',

            logoutBtn: '#logoutBtn',
            logoutBtn2: '#logoutBtn2'
        },
        control: {
            profileUpdateBtn: {
                tap: 'onProfileUpdateBtn'
            },

            profileTestMailConnectionBtn: {
                tap: 'onProfileTestMailConnectionBtn'
            },
            emailFilterToggleBtn: {
                painted: 'onPaintEmailFilterToggleBtn'
            },
            emailAdvancedFilterToggleBtn: {
                painted: 'onPaintEmailFilterToggleBtn'
            },

            addWhitelistEmailBtn: {
                painted: 'onPaintAddWhitelistEmailBtn'
            },

            addWhitelistMultipleEmailBtn: {
                painted: 'onPaintAddWhitelistMultipleEmailBtn'
            },

            // Account
            accountPanelCloseBtn: {
                tap: 'onTapAccountPanelCloseBtn'
            },
            accountPanelSaveBtn: {
                tap: 'onTapAccountPanelSaveBtn'
            },
            emailServerSettingsBtn: {
                tap: 'onTapEmailServerSettingsBtn'
            },
            accountPanel: {
                show: 'onAccountPanelShow'
            },
            emailSettingsPanel: {
                show: 'onEmailServerSettingsPanelShow'
            },
            emailSettingsChangeAccountTypeBtn: {
                tap: 'emailSettingsChangeAccountTypeBtnHandler'
            },
            emailSettingsAccountTypeBackBtn: {
                tap: 'emailSettingsAccountTypeBackBtnHandler'
            },
            emailSettingsAccountTypeNextBtn: {
                tap: 'emailSettingsAccountTypeNextBtnHandler'
            },
            emailSettingsAccountTypesList: {
                select: 'emailSettingsAccountTypesListSelect'
            },

            // Email Server settings
            emailSettingsPanelCloseBtn: {
                tap: 'onTapEmailSettingsPanelCloseBtn'
            },
            emailSettingsPanelSaveBtn: {
                tap: 'onTapEmailSettingsPanelSaveBtn'
            },
            emailSettingsTestMailConnectionBtn: {
                tap: 'onTapEmailSettingsTestMailConnectionBtn'
            },

            emailSettingsTestMailConnectionBtn2: {
                tap: 'onTapEmailSettingsTestMailConnectionBtn'
            },

            settingsBtn: {
                tap: 'onAccountTap'
            },
            settingsBtn2: {
                tap: 'onAccountTap'
            },
            settingsCloseBtn: {
                tap: 'onAccountCloseBtn'
            },

            deleteAccountBtn: {
                tap: 'deleteAccountBtnHandler'
            },

            assignDropboxAccountBtn: {
                tap: 'assignDropboxAccountBtnHandler'
            },

            deleteDataOnlyBtn: {
                tap: 'deleteAccountDataBtnHandler'
            },

            clearDropboxLocalCacheBtn: {
                tap: 'clearDropboxLocalCacheBtnHandler'
            },

            loggedInUserInfoToolbarTitle: {
                painted: 'onLoggedInUserInfoToolbarTitle'
            },

            logoutBtn: {
                tap: 'logoutBtnHandler'
            },
            logoutBtn2: {
                tap: 'logoutBtnHandler'
            }


        }
    },

    // Form field config
    // Used for form validation
    forms: {

        account: {
            idPrefix: 'account_',
            fields: [{
                name: 'aeUsername',
                type: 'string'
            }
//            {
//                name: 'aeRecoveryEmail',
//                type: 'email'
//            }
            ]
        },

        emailSettings: {
            idPrefix: 'emailSettings_',
            // So password field can be determined if it's optional or not
            passwordFieldIndex: 0,
            fields: [{
                name: 'serverPassword',
                type: 'string',
                optional: true
            }, {
                name: 'fromEmailAddress',
                type: 'email',
                optional: true
            }, {
                name: 'serverUsername',
                type: 'string'
            }, {
                name: 'serverNameIn',
                type: 'string'
            },
//                {
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
        },
        emailSettingsPreConfigd: {
            idPrefix: 'emailSettingsPreConfig_',
            // So password field can be determined if it's optional or not
            passwordFieldIndex: 0,
            fields: [{
                name: 'serverPassword',
                type: 'string',
                optional: true
            }, {
                name: 'serverUsername',
                type: 'email'
            }]
        }
    },

    launch:function () {
        Ext.getStore('Accounts').addListener('load', this.onAccountsStoreLoad, this);

        if (!this.accountPanel) {
            // Create Settings Window
            this.accountPanel = Ext.create('AE.view.AccountPanel', {
                id: 'accountPanel',
                hidden: true,
                listeners: {
                    show: this.onAccountPanelShow,
                    scope: this
                }
            });
            this.accountPanel = Ext.Viewport.add([this.accountPanel]);

            // Add to list of floating panels
            AE.app.getController('UI').addToListFloatingPanels(this.accountPanel);
        }

        if (!this.accountEmailSettingsPanel) {
            // Create Settings Window
            this.accountEmailSettingsPanel = Ext.create('AE.view.AccountEmailSettingsPanel', {
                id: 'emailSettingsPanel',
                hidden: true
            });
            Ext.Viewport.add([this.accountEmailSettingsPanel]);

            // Add to list of floating panels
            AE.app.getController('UI').addToListFloatingPanels(this.accountEmailSettingsPanel);
        }
    },

    onAccountsStoreLoad: function (store, records, successful, operation, opts) {

        // Use getStore so this function can be called outside Acconnts store listener
        var userAccount = Ext.getStore('Accounts').first(),
            uiController = AE.app.getController('UI');

        if (userAccount) {
            if (userAccount.getData().AEUsername) {
                // Shows the main app panel
                this.getMainContainerPanel().setActiveItem(1);

                uiController.appScreen = 'main';
                // Initialize our main screen
                uiController.viewportResize();

                uiController.initComponentsByDeviceLoggedIn();

                if (AE.config.logger.enable) {
                    AE.app.getController('UI').onTapInfoWinBtn();
                }

                // Load Contacts
                AE.app.getController('Contacts').emailFilterApplyBtnHandler();

                // Load messages store
                Ext.getStore('QuickMessages').load();

            } else {
                // destroy the null data
                userAccount.destroy();
                AE.logger(' User not logged in');

                // Show pop animation
                AE.app.getController('LoginRegister').popLoginForm();

                // Reset previous data
                AE.app.getController('User').resetAppUserData();
            }
        }

    },

    // Sets the hidden value of the Filter toggle
    onPaintEmailFilterToggleBtn: function (cmp) {


        if (this.getUserRights('HideAllWhitelistBtn')) {
            // This will hide the All and Whitelist buttons
            this.getEmailAdvancedFilterToggleBtn().setHidden(true);
            this.getEmailFilterToggleBtn().setHidden(true);
        } else {
            // Advanced filter drop down
            if (!AE.app.getController('Contacts').emailAdvancedFilter) {
                this.getEmailAdvancedFilterToggleBtn().setHidden(true);
                this.getEmailFilterToggleBtn().setHidden(false);
            } else {
                this.getEmailAdvancedFilterToggleBtn().setHidden(false);
                this.getEmailFilterToggleBtn().setHidden(true);
            }
        }

    },

    onPaintAddWhitelistEmailBtn: function (cmp) {
        if (this.getUserRights('HideAddWhitelistEmailBtn')) {
            cmp.hide();
        }
    },

    onPaintAddWhitelistMultipleEmailBtn: function (cmp) {
        if (this.getUserRights('HideAddWhitelistMultipleEmailBtn')) {
            cmp.hide();
        }
    },

    // Gets user rights based on the user type and option
    getUserRights: function (option) {

        var user,
            appMode = 'normal';

        if (!AE.urlVars) {
            return;
        }

        // Convert to boolean
        if (typeof AE.urlVars.admin === 'string') {
            AE.urlVars.admin = (AE.urlVars.admin === 'true' ? true: false);
        }

        // For admin
        if (AE.config.AdminMode) {
            appMode  = 'admin';
        }
        // Url variable takes top priority
        if (AE.urlVars.admin && appMode == 'normal') {
            appMode  = 'admin';
        }

        user = appMode;

//        AE.logger(option)
//        AE.logger(user)
//        AE.logger(AE.config[option][user])

        Ext.Viewport.addCls('user-' + user);

        if (typeof AE.config[option] === 'undefined') {
            AE.logger('Config '+ option +' not defined. User.js:getUserRights', 4);
        } else {
            if (typeof AE.config[option][user] === 'undefined') {
                AE.logger('Config '+ option +' not defined for user ' + user +'. User.js:getUserRights', 4);
            } else {
                return AE.config[option][user];
            }
        }

        return false;

    },

    // Sets user rights based on the user type and option
    setUserRights: function (option, value) {

        var user = (AE.urlVars.admin ? 'admin' : 'normal');

        AE.config[option][user] = value;

//        AE.logger(option)
//        AE.logger(user)
//        AE.logger(AE.config[option][user])


    },

    onLoggedInUserInfoToolbarTitle: function (title, prependInfo) {
        var userAccount = Ext.getStore('Accounts').first(),
            appendInfo = '';

        if (title == '') {
            title = this.getLoggedInUserInfoToolbarTitle();
        }

        if (this.getUserRights('HideLoggedInUserInfoToolbar')) {
            this.getLoggedInUserInfoToolbar().setHidden(true);
        } else {
            if (typeof prependInfo != 'string') {
                prependInfo = '';
            }
            if (AE.urlVars.admin) {
                appendInfo = '<br />(Admin Mode) (Build ' + AE.config.build + ')';
            }
            title.setTitle(prependInfo + 'Username: ' + userAccount.getData().AEUsername + '<br />Email: ' + userAccount.getData().ServerUsername + appendInfo);
        }

    },

    getUserInfoForAbout: function () {
        var userAccount = Ext.getStore('Accounts').first(),
            appendInfo = '';

        if (!this.getUserRights('HideUserInfoInAboutWindow')) {

            appendInfo = 'Username: ' + userAccount.getData().AEUsername + '<br />Email: ' + userAccount.getData().ServerUsername;

            if (AE.urlVars.admin) {
                appendInfo += '<br />(Admin Mode) (Build ' + AE.config.build + ')';
            }
        }

        return appendInfo;
    },

    onAccountTap: function () {

        // Hide other floating panels
        AE.app.getController('UI').hideFloatingPanels('accountPanel');

        this.accountPanel.show();

        // Hide show Delete Entire Account btn
        this.getDeleteAccountBtn().setHidden(this.getUserRights('HideDeleteAccountBtn'));
        // Enable button if previously disabled
        if (!this.getUserRights('HideDeleteAccountBtn') && this.getDeleteAccountBtn().isDisabled()) {
            this.getDeleteAccountBtn().enable();
        }
        // Hide show Delete Entire Account data btn
        this.getDeleteDataOnlyBtn().setHidden(this.getUserRights('HideDeleteDataOnlyBtn'));
        // Enable button if previously disabled
        if (!this.getUserRights('HideDeleteDataOnlyBtn') && this.getDeleteDataOnlyBtn().isDisabled()) {
            this.getDeleteDataOnlyBtn().enable();
        }

        // Hide show Assign Dropbox button
        this.getAssignDropboxAccountBtn().setHidden(this.getUserRights('HideAssignDropboxBtn'));

        // Hide show Clear Dropbox button
        this.getClearDropboxLocalCacheBtn().setHidden(this.getUserRights('HideClearDropboxBtn'));

    },

    onTapAccountPanelSaveBtn: function () {
        var accountFormPanel = this.getAccountFormPanel(),
            accountFormPanelValues = accountFormPanel.getValues(),
            userAccount = Ext.getStore('Accounts').first(),
            userAccountData = userAccount.getData(),
            userAccountValues,
            that = this;

        if (!AE.app.getController('UtilClass').formChecker(this.forms.account, accountFormPanelValues)) {
            return;
        }

        this.accountPanel.hide();

        userAccountValues = {
            aeUsername: userAccountData.AEUsername,
            accountType: userAccountData.AccountType,
            fromEmailAddress: userAccountData.FromEmailAddress,
            serverUsername: userAccountData.ServerUsername,
            serverPassword: userAccountData.ServerPassword,
            serverNameIn: userAccountData.ServerNameIn,
            serverNameOut: userAccountData.ServerNameOut,
            serverPort: userAccountData.ServerPort,
            serverType: userAccountData.ServerType,
            serverPortOut: userAccountData.ServerPortOut,
            useSSL: userAccountData.ServerUseSSL,
            useSSLOut: userAccountData.ServerUseSSLOut
        };

        Ext.applyIf(accountFormPanelValues, userAccountValues);

        Ext.Ajax.request({
            url: AE.config.baseUrl + '/Account/RegisterUpdateCurrentUser',
            method: 'POST',
            params: accountFormPanelValues,
            success: function (response) {

                var responseJson = Ext.decode(response.responseText);

                // Update Account store
//                userAccount.set('AERecoveryEmail', accountFormPanelValues.aeRecoveryEmail);

                if (responseJson.success) {
                    AE.msgBox.alert('Profile', 'Your profile has been updated.', Ext.emptyFn);
                } else {
                    AE.msgBox.alert('Error', 'Error: ' + responseJson.message, Ext.emptyFn);
                }


            },
            failure: function (response) {

                var responseJson = Ext.decode(response.responseText);

                AE.msgBox.alert('Error', 'Error: ' + responseJson.message, function () {
                    that.accountPanel.show();
                });
            }
        });

    },

    onAccountPanelShow: function () {
        AE.logger('onAccountPanelShow')

        var userAccount = Ext.getStore('Accounts').first(),
            accountFormPanel;

        // Settings Tab panels
        // SWITCH
        if (userAccount && userAccount.get('AEUsername')) {

            // Set form valus of current logged in user
            accountFormPanel = this.getAccountFormPanel();
            // Set the form values
            accountFormPanel.setValues({
                aeUsername: userAccount.data.AEUsername,
                aePassword: ''
//                aeRecoveryEmail: userAccount.data.AERecoveryEmail
            });

        }

    },

    onTapAccountPanelCloseBtn: function () {
        this.accountPanel.hide();
    },

    onTapEmailServerSettingsBtn: function () {

        var emailSetupStore = Ext.getStore('EmailSetupConfigs'),
            userAccountOnEmailSetupRecord;

        // Get account type
        this.selectedEmailSettingsAccountType = Ext.getStore('Accounts').first().get('AccountType');

        userAccountOnEmailSetupRecord = emailSetupStore.findRecord('accountType', this.selectedEmailSettingsAccountType);

        // Panel
        this.accountEmailSettingsPanel.show();

        // Hide other floating panels
        AE.app.getController('UI').hideFloatingPanels('emailSettingsPanel');

        // Update text
        this.updateMailAccountTypeText();

        // Switch card
        this.accountEmailSettingsPanelCard = 1;
        this.emailSettingsAccountTypeBackBtnHandler();

        // Select list
        this.getEmailSettingsAccountTypesList().select(userAccountOnEmailSetupRecord, false, false);

    },

    onTapEmailSettingsTestMailConnectionBtn: function (btn) {
        var emailServerSettingsFormPanelValues,
            accountEmailSettingsCard = this.getAccountEmailSettingsCard(),
            that = this;

        emailServerSettingsFormPanelValues = this.prepareFormValues();
        if (!emailServerSettingsFormPanelValues) {
            return;
        }

        if (btn) {
            if (btn.getId() == 'emailSettingsTestMailConnectionBtn' ||  btn.getId() == 'emailSettingsTestMailConnectionBtn2') {
                this.callDoEmailSettingsSave = false;
            }
        }

        if (this.callDoEmailSettingsSave) {
            that.accountEmailSettingsPanel.hide();
        } else {
            accountEmailSettingsCard.mask({
                xtype: 'loadmask',
                message: 'Testing mail connection...'
            });
        }

        Ext.Ajax.request({
            url: AE.config.baseUrl + '/Account/TestEmailServer',
            method: 'POST',
            params: emailServerSettingsFormPanelValues,
            success: function (response) {

                var responseJson = Ext.decode(response.responseText);
                accountEmailSettingsCard.unmask();

                if (responseJson.success) {
                    if (that.callDoEmailSettingsSave) {
                        that.doEmailSettingsSave();
                    } else {
                        AE.msgBox.alert('Success', 'Your mail settings are correct!', function () {
                            Ext.repaint();
                        });
                    }
                } else {
                    AE.msgBox.alert('Error', 'Error: ' + responseJson.message, function () {
                        if (that.callDoEmailSettingsSave) {
                            that.accountEmailSettingsPanel.show();
                            that.getEmailSettingsAccountTypeBackBtn().addCls('x-button-backss');
                        }
                    });
                }

                // Ghosting fix
                var btnMargin = that.getEmailSettingsAccountTypeBackBtn().getMargin();
                that.getEmailSettingsAccountTypeBackBtn().setMargin(1);
                setTimeout(function () {
                    that.getEmailSettingsAccountTypeBackBtn().setMargin(btnMargin);
                }, 100)
            },
            failure: function (response) {
                var responseJson = Ext.decode(response.responseText);

                accountEmailSettingsCard.unmask();
                AE.msgBox.alert('Error', 'Error: ' + responseJson.message, function () {

                });
            }
        });
    },

    prepareFormValues: function () {

        var emailServerSettingsFormPanel,
            emailServerSettingsFormPanelValues,
            userAccount = Ext.getStore('Accounts').first(),
            userAccountData = userAccount.getData(),
            userAccountValues;

        if (this.selectedEmailSettingsAccountType == 'Other') {

            // Make password required
            if (userAccount.get('AccountType') != 'Other') {
                this.forms.emailSettings.fields[this.forms.emailSettings.passwordFieldIndex].optional = false;
            } else {
                this.forms.emailSettings.fields[this.forms.emailSettings.passwordFieldIndex].optional = true;
            }

            emailServerSettingsFormPanel = this.getEmailServerSettingsFormPanel();
            emailServerSettingsFormPanelValues = emailServerSettingsFormPanel.getValues();
            if (!AE.app.getController('UtilClass').formChecker(this.forms.emailSettings, emailServerSettingsFormPanelValues)) {
                return;
            }

            userAccountValues = {
                accountType: this.selectedEmailSettingsAccountType
//                aeRecoveryEmail: userAccountData.AERecoveryEmail
            };

        } else {

            // Make password required
            if (userAccount.get('AccountType') == 'Other') {
                this.forms.emailSettingsPreConfigd.fields[this.forms.emailSettingsPreConfigd.passwordFieldIndex].optional = false;
            } else {
                this.forms.emailSettingsPreConfigd.fields[this.forms.emailSettingsPreConfigd.passwordFieldIndex].optional = true;
            }

            emailServerSettingsFormPanel = this.getEmailSettingsPreConfigdFormPanel();
            emailServerSettingsFormPanelValues = emailServerSettingsFormPanel.getValues();

            emailServerSettingsFormPanelValues.fromEmailAddress = userAccount.get('FromEmailAddress');

            if (!AE.app.getController('UtilClass').formChecker(this.forms.emailSettingsPreConfigd, emailServerSettingsFormPanelValues)) {
                return;
            }

            userAccountValues = this.selectedEmailSettingsAccountRecord;


//            userAccountValues.aeRecoveryEmail = userAccountData.AERecoveryEmail;

        }

        userAccountValues.aeUsername = userAccountData.AEUsername;

        Ext.applyIf(emailServerSettingsFormPanelValues, userAccountValues);

        return emailServerSettingsFormPanelValues;
    },

    onTapEmailSettingsPanelSaveBtn: function () {

        this.callDoEmailSettingsSave = true;

        this.onTapEmailSettingsTestMailConnectionBtn();

    },

    doEmailSettingsSave: function () {
        var emailServerSettingsFormPanelValues,
            userAccount = Ext.getStore('Accounts').first();

        this.callDoEmailSettingsSave = false;

        emailServerSettingsFormPanelValues = this.prepareFormValues();

        if (!emailServerSettingsFormPanelValues) {
            return;
        }

        this.accountEmailSettingsPanel.hide();

        Ext.Ajax.request({
            url: AE.config.baseUrl + '/Account/RegisterUpdateCurrentUser',
            method: 'POST',
            params: emailServerSettingsFormPanelValues,
            success: function (response) {

                var responseJson = Ext.decode(response.responseText);

                if (responseJson.success) {
                    userAccount.set('AccountType', emailServerSettingsFormPanelValues.accountType);
                    userAccount.set('ServerNameIn', emailServerSettingsFormPanelValues.serverNameIn);
                    userAccount.set('ServerNameOut', emailServerSettingsFormPanelValues.serverNameOut);
                    userAccount.set('ServerType', emailServerSettingsFormPanelValues.serverType);
                    userAccount.set('ServerPort', emailServerSettingsFormPanelValues.serverPort);
                    userAccount.commit();

                    // Form fields applicable only to Other
                    if (this.selectedEmailSettingsAccountType != 'Other') {
                        userAccount.set('FromEmailAddress', emailServerSettingsFormPanelValues.fromEmailAddress);
                        userAccount.set('ServerUsername', emailServerSettingsFormPanelValues.serverUsername);
                        userAccount.set('ServerUseSSL', emailServerSettingsFormPanelValues.useSSL);
                        userAccount.set('ServerPortOut', emailServerSettingsFormPanelValues.serverPortOut);
                        userAccount.set('ServerUseSSLOut', emailServerSettingsFormPanelValues.useSSLOut);
                        userAccount.commit();
                    }

                    AE.msgBox.alert('Profile', 'Your profile has been updated.', function () {

                    });
                } else {

                    AE.msgBox.alert('Error', 'Error: ' + responseJson.message, function () {

                    });
                }

            },
            failure: function (response) {

                var responseJson = Ext.decode(response.responseText);

                AE.msgBox.alert('Error', 'Error: ' + responseJson.message, function () {

                });
            }
        });

    },

    emailSettingsChangeAccountTypeBtnHandler: function () {
        var emailSetupStore = Ext.getStore('EmailSetupConfigs'),
            userAccountOnEmailSetupRecord = emailSetupStore.findRecord('accountType', this.selectedEmailSettingsAccountType);

        this.getAccountEmailSettingsCard().animateActiveItem(1, {
            type: 'slide',
            direction: 'left'
        });

        // Buttons
        this.getEmailSettingsTestMailConnectionBtn().setHidden(true);

        // Select list
        this.getEmailSettingsAccountTypesList().select(userAccountOnEmailSetupRecord, false, true);
    },

    emailSettingsAccountTypeBackBtnHandler: function () {

        switch (this.accountEmailSettingsPanelCard) {
            case 0:
                this.onAccountTap();
                break;
            case 1:
                this.getAccountEmailSettingsCard().animateActiveItem(0, {
                    type: 'slide',
                    direction: 'right'
                });
                this.getEmailSettingsAccountTypeNextBtn().setHidden(false);
                this.accountEmailSettingsPanelCard = 0;

                // Hide save button
                this.getEmailSettingsPanelSaveBtn().setHidden(true);

                if (this.selectedEmailSettingsAccountType == 'Other') {
                    AE.app.getController('UtilClass').clearFormChecks(this.forms.emailSettings, true);
                } else {
                    AE.app.getController('UtilClass').clearFormChecks(this.forms.emailSettingsPreConfigd, true);
                }

                break;
        }

    },

    emailSettingsAccountTypeNextBtnHandler: function (btn) {

        this.accountEmailSettingsPanelCard = 1;

        if (this.selectedEmailSettingsAccountType == 'Other') {
            this.getEmailSettingsFormCard().setActiveItem(0);
        } else {
            this.getEmailSettingsFormCard().setActiveItem(1);
        }

        this.getAccountEmailSettingsCard().animateActiveItem(1, {
            type: 'slide',
            direction: 'left'
        });

        btn.setHidden(true);

        // show save button
        this.getEmailSettingsPanelSaveBtn().setHidden(false);

        this.setEmailServerSettingsFormValues();
    },

    emailSettingsAccountTypesListSelect: function (list, selectedRecord) {

        if (selectedRecord.getData().accountType) {

            this.selectedEmailSettingsAccountRecord = selectedRecord.getData();

            this.selectedEmailSettingsAccountType = this.selectedEmailSettingsAccountRecord.accountType;

            this.updateMailAccountTypeText();

        }
    },

    onEmailServerSettingsPanelShow: function () {
        AE.logger('onAccountPanelShow')



    },

    setEmailServerSettingsFormValues: function () {
        var userAccount = Ext.getStore('Accounts').first(),
            emailSettingsFormPanel;

        // Settings Tab panels
        // SWITCH
        if (userAccount && userAccount.get('AEUsername')) {

            if (userAccount.data.AccountType == 'Other') {
                // Set form values of current logged in user
                emailSettingsFormPanel = this.getEmailServerSettingsFormPanel();
                // Set the form values
                emailSettingsFormPanel.setValues({
                    serverUsername: userAccount.data.ServerUsername,
                    fromEmailAddress: userAccount.data.FromEmailAddress,
                    serverPassword: '',
                    serverType: userAccount.data.ServerType,
                    serverNameIn: userAccount.data.ServerNameIn,
                    serverNameOut: userAccount.data.ServerNameOut,
                    serverPort: userAccount.data.ServerPort,
                    useSSL: userAccount.data.ServerUseSSL,
                    serverPortOut: userAccount.data.ServerPortOut,
                    useSSLOut: userAccount.data.ServerUseSSLOut
                });
            } else {
                // Set form values of current logged in user
                emailSettingsFormPanel = this.getEmailSettingsPreConfigdFormPanel();
                // Set the form values
                emailSettingsFormPanel.setValues({
                    serverUsername: userAccount.data.ServerUsername
                });
            }

        }
    },

    updateMailAccountTypeText: function () {
        var mailAccountTypeText = Ext.get('mailAccountTypeText');

        if (this.selectedEmailSettingsAccountType != 'Other') {
            this.getEmailSettingsPreConfigdMailFieldset().setTitle('Your ' + this.selectedEmailSettingsAccountType + ' Server Credentials');
        }
    },

    onTapEmailSettingsPanelCloseBtn: function () {
        this.selectedEmailSettingsAccountType = null;
        this.accountEmailSettingsPanel.hide();
    },

    logoutBtnHandler: function (button) {
        var that = this;

        if (this.getUserRights('HideLogoutConfirmWindow')) {
            this.doLogout('yes');
        } else {
            AE.app.getController('UtilClass').alertMsgBox({
                title: 'Logout',
                message: 'Are you sure you want to Logout?',
                fn: this.doLogout,
                scope: this
            });
        }
    },

    doLogout: function (btn, closeWindow) {
        var that = this;

        if (btn == 'yes') {
            Ext.Viewport.mask({
                xtype: 'loadmask',
                message: 'Logging out...'
            });

            Ext.Ajax.request({
                url: AE.config.baseUrl + '/Account/LogOut',
                method: 'POST',
                success: function (response) {

                    var responseJson = Ext.decode(response.responseText);

                    // Clear all records
                    // Reset app
                    if (closeWindow) {
                        that.resetApp(true);
                    } else {
                        that.resetApp();
                    }



                    Ext.Viewport.unmask();

                },
                failure: function (response, options) {
                    Ext.Viewport.unmask();

                    AE.msgBox.alert('Error', 'Error: Server response error' );

                    AE.ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
                }
            });
        }

    },
    
    assignDropboxAccountBtnHandler: function () {
        AE.msgBox.show({
            title: 'Assign Dropbox Account',
            message: 'Do you want to Pick a Dropbox account to use for storing your email attachments?',
            width: 380,
            buttons: [{
                text: 'Yes',
                itemId: 'yes'
            }, {
                text: 'No',
                itemId: 'no',
                ui: 'action'
            }],
            fn: this.assignDropboxAccount,
            scope: this
        });
    },
    
    clearDropboxLocalCacheBtnHandler: function () {
        AE.msgBox.show({
            title: 'Clear Local Storage for Files In Dropbox',
            message: 'Do you want to remove the local files cached for Dropbox?',
            width: 380,
            buttons: [{
                text: 'Yes',
                itemId: 'yes'
            }, {
                text: 'No',
                itemId: 'no',
                ui: 'action'
            }],
            fn: this.clearDropboxLocalCache,
            scope: this
        });
    },

    
    assignDropboxAccount: function () {
        // Redirect the user to authorize. when this finishes, it will redirect the user
        // back to the location specified by RedirectOnDropboxSuccessUrl in web.config
        // (ELLUIS, PLEASE FIX THIS TO DO IT PROPERLY. THE BELOW DOES NOT WORK ***)
        window.location.href('Dropbox/AuthorizeDropbox');
    },
    
    clearDropboxLocalCache: function () {
        Ext.Ajax.request({
            url: AE.config.baseUrl + '/Account/RemoveLocalData',
            method: 'POST',
            params: {
                 numberDaysKeepImagesInLocalStorage: 0    // if 0 then all local data is removed if the file is in Dropbox
            },
            success: function (response) {
                // Hide panel
                that.accountPanel.setHidden(true);

                // Reset app
                that.resetApp();

                Ext.Viewport.unmask();

            },
            failure: function (response, options) {
                Ext.Viewport.unmask();

                AE.msgBox.alert('Error', 'Error: Server response error');

                AE.ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
            }
        });
    },



    deleteAccountBtnHandler: function () {
        AE.msgBox.show({
            title: 'Delete Entire Account',
            message: 'Do you want to Delete your AgelessEmail Account?',
            width: 380,
            buttons: [{
                text: 'Yes',
                itemId: 'yes'
            }, {
                text: 'No',
                itemId: 'no',
                ui: 'action'
            }],
            fn: this.deleteAccountConfirm,
            scope: this
        });
    },

    deleteAccountConfirm: function (button) {
        if (button == 'yes') {
            AE.msgBox.show({
                title: 'Delete Entire Account',
                message: 'Are you sure you want to Delete your AgelessEmail Account?<br />(The Application and Browser will Close after this operation.)',
                width: 380,
                buttons: [{
                    text: 'Yes',
                    itemId: 'yes'
                }, {
                    text: 'No',
                    itemId: 'no',
                    ui: 'action'
                }],
                fn: this.doDeleteAccount,
                scope: this
            });
        }
    },

    doDeleteAccount: function (button) {
        var that = this;
        if (button == 'yes') {
            AE.logger('Delete AgelessEmail Account');

            // Disable button
            this.getDeleteAccountBtn().disable();
            // Disable button
            this.getDeleteDataOnlyBtn().disable();

            Ext.Ajax.request({
                url: AE.config.baseUrl + '/Account/RemoveUserData',
                method: 'POST',
                params: { includeAccountDelete: true },
                success: function (response) {
                    // Hide panel
                    that.accountPanel.setHidden(true);

                    // Reset app
                    that.doLogout('yes', true);

                    Ext.Viewport.unmask();

                },
                failure: function (response, options) {
                    Ext.Viewport.unmask();

                    AE.msgBox.alert('Error', 'Error: Server response error' );

                    AE.ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
                }
            });
        }
    },

    deleteAccountDataBtnHandler: function () {
        AE.msgBox.show({
            title: 'Delete Account Data Only',
            message: 'Do you want to Delete your Account Data?',
            width: 380,
            buttons: [{
                text: 'Yes',
                itemId: 'yes'
            }, {
                text: 'No',
                itemId: 'no',
                ui: 'action'
            }],
            fn: this.deleteAccountDataConfirm,
            scope: this
        });
    },

    deleteAccountDataConfirm: function (button) {
        if (button == 'yes') {
            AE.msgBox.show({
                title: 'Delete Account Data Only',
                message: 'Are you sure you want to Delete your Account Data?<br />(The Application and Browser will Close after this operation.)',
                width: 380,
                buttons: [{
                    text: 'Yes',
                    itemId: 'yes'
                }, {
                    text: 'No',
                    itemId: 'no',
                    ui: 'action'
                }],
                fn: this.doDeleteAccountData,
                scope: this
            });
        }
    },

    doDeleteAccountData: function (button) {
        var that = this;
        if (button == 'yes') {
            AE.logger('Delete Account Data');

            // Disable button
            this.getDeleteDataOnlyBtn().disable();
            // Disable button
            this.getDeleteAccountBtn().disable();

            Ext.Ajax.request({
                url: AE.config.baseUrl + '/Account/RemoveUserData',
                method: 'POST',
                params: { includeAllUserData: true },
                success: function (response) {
                    // Hide panel
                    that.accountPanel.setHidden(true);

                    // Reset app
                    that.doLogout('yes', true);

                    Ext.Viewport.unmask();

                },
                failure: function (response, options) {
                    Ext.Viewport.unmask();

                    AE.msgBox.alert('Error', 'Error: Server response error' );

                    AE.ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
                }
            });
        }
    },

    resetAppUserData: function () {

        Ext.getStore('Emails').removeAll();

        // We need this so we can select again the first user on login and logout
        this.getContactsList().deselectAll();

        // Fix for sencha bug on retaining record information
        Ext.getStore('Contacts').each(function (record) {
            record.set('HasNewEmail', false);
        });

        Ext.getStore('Contacts').removeAll();
        Ext.getStore('ContactsBackground').removeAll();

    },

    resetApp: function (closeWindow) {

        Ext.getStore('Accounts').removeAll();

        AE.app.getController('Contacts').cancelQueryNewEmailTask();
        AE.app.getController('Contacts').selectedContact = null;
        AE.app.getController('Contacts').maintainSelectedContact = false;
        AE.app.getController('Emails').deferCreateCarouselItems = false;
        AE.app.getController('Emails').selectedContact = null;
        AE.app.getController('Emails').emailsCarouselDisableEvents = true;

        // Remove all records
        this.resetAppUserData();

        AE.app.getController('UI').resetUI();

        if (closeWindow) {
            window.close();
        }

    }

});