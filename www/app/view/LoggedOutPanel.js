Ext.define('AE.view.LoggedOutPanel', {
    extend: 'Ext.tab.Panel',
    config: {
        tabBarPosition: 'bottom',
        items:[
            {
                title:'Login',
                id: 'loginTab',
                iconCls:'user3',
                cls:'card5',
                layout: 'fit',
                ui: 'blue',
                items:[
                    {
                        xtype:'formpanel',
                        id: 'loginFormPanel',
                        items: [
                            {
                                xtype: 'fieldset',
                                defaults: {
                                    labelAlign: 'left',
                                    labelWidth: '40%'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        name: 'username',
                                        id: 'login_username',
                                        label: 'Username',
                                        required: true
                                    },
                                    {
                                        xtype: 'passwordfield',
                                        name: 'password',
                                        id: 'login_password',
                                        label: 'Password',
                                        required: true
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        name: 'rememberMe',
                                        label: 'Remember Me',
                                        value: true
                                    }
                                ]
                            },
                            {
                                xtype: 'toolbar',
                                docked: 'bottom',
                                ui: 'blue',
                                items: [
                                    {xtype: 'spacer'},
                                    {
                                        text: 'Login',
                                        ui: 'confirm',
                                        id: 'loginBtn'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                // Bug fix
                // If tab index 1 is hidden, all tab toolbar are hidden
                hidden: true,
                id: 'hiddenTab',
                iconCls:'x',
                layout: 'fit',
                html: ''
            },
            {
                title:'Register',
                id: 'regTab',
                iconCls:'user_add',
                cls:'card4',
                layout: 'fit',
                items: [{
                    xtype: 'tabpanel',
                    id: 'regCardsPanel',
                    tabBar: {
                        xtype: 'tabbar',
                        hidden: true
                    },
                    activeItem: 0,
                    items: [
                        {
                            title: 'Ageless Email Account',
                            xtype:'formpanel',
                            id: 'regAeFormPanel',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'AE Account',
                                    defaults: {
                                        labelAlign: 'left',
                                        labelWidth: 165
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'aeUsername',
                                            id: 'reg_aeUsername',
                                            label: 'Username',
                                            placeHolder: 'Your AgelessEmail Username',
                                            required: true
                                        },
                                        {
                                            xtype: 'passwordfield',
                                            name: 'aePassword',
                                            id: 'reg_aePassword',
                                            label: 'Password',
                                            placeHolder: 'Your AgelessEmail Password',
                                            required: true
                                        },
                                        {
                                            xtype: 'emailfield',
                                            name: 'aeRecoveryEmail',
                                            id: 'reg_aeRecoveryEmail',
                                            label: 'Admin Email',
                                            placeHolder: 'Email to use for account recovery',
                                            required: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'toolbar',
                                    docked: 'bottom',
                                    ui: 'blue',
                                    items: [
                                        {xtype: 'spacer'},
                                        {
                                            text: 'Next',
                                            ui: 'confirm',
                                            id: 'regNextAeBtn'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            title: 'Mail Account Type',
                            layout: 'vbox',
                            padding: '20 30',
                            items: [{
                                html: 'Select your Mail Account type: ',
                                height: 30
                            }, {
                                xtype: 'list',
                                id: 'regMailAccountTypesList',
                                flex: 1,
                                itemTpl: '<div class="contact">{accountType}</div>',
                                store: 'EmailSetupConfigs'
                            },
                                {
                                    xtype: 'toolbar',
                                    docked: 'bottom',
                                    ui: 'blue',
                                    items: [
                                        {
                                            text: 'Back',
                                            ui: 'back',
                                            id: 'regBackAccountTypeBtn'
                                        }
                                    ]
                                }]
                        },
                        {
                            title: 'Your Mail Account',
                            xtype: 'formpanel',
                            id: 'regPreConfigdFormPanel',
                            items: [{
                                xtype: 'fieldset',
                                id: 'regPreConfigdMailFieldset',
                                title: 'Your Mail Server Credentials',
                                defaults: {
                                    labelAlign: 'left',
                                    labelWidth: 165
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        name: 'address',
                                        id: 'pre_address',
                                        label: 'Address',
                                        placeHolder: 'Your Email Address for this account type.',
                                        required: true
                                    },
                                    {
                                        xtype: 'passwordfield',
                                        name: 'serverPassword',
                                        id: 'pre_serverPassword',
                                        placeHolder: 'Your Email Password',
                                        label: 'Password',
                                        required: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'description',
                                        id: 'pre_description',
                                        placeHolder: 'A short description for this account',
                                        label: 'Description',
                                        required: true
                                    }
                                ]
                            },
                                {
                                    xtype: 'toolbar',
                                    docked: 'bottom',
                                    ui: 'blue',
                                    items: [
                                        {
                                            text: 'Back',
                                            ui: 'back',
                                            id: 'regPreConfigdBackBtn'
                                        },
                                        {xtype: 'spacer'},
                                        {
                                            text: 'Test Email Server Connection',
                                            id: 'regTestServerConnBtn'
                                        },
                                        {
                                            text: 'Register',
                                            ui: 'confirm',
                                            id: 'regPreConfigdAddBtn'
                                        }
                                    ]
                                }]
                        },
                        {
                            title: 'Other Mail Account',
                            xtype: 'formpanel',
                            id: 'regManualConfigFormPanel',
                            items: [{
                                xtype: 'fieldset',
                                id: 'regManualConfigMailFieldset',
                                title: 'Your Mail Server Credentials',
                                defaults: {
                                    labelAlign: 'left',
                                    labelWidth: 165
                                },
                                items: [
                                    {
                                        xtype: 'selectfield',
                                        name: 'serverType',
                                        label: 'Server Type',
                                        tpl: '<span class="x-list-label">aa{text}</span>',
                                        options: [
                                            {text: 'POP3', value: 'POP3'}
//                                            {text: 'IMAP', value: 'IMAP'},
                                        ],
                                        required: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'serverUsername',
                                        id: 'reg_serverUsername',
                                        label: 'Username',
                                        placeHolder: 'Your email account Username for fetching emails',
                                        required: true
                                    },
                                    {
                                        xtype: 'passwordfield',
                                        name: 'serverPassword',
                                        id: 'reg_serverPassword',
                                        placeHolder: 'Your email account Password for fetching emails',
                                        label: 'Password',
                                        required: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'serverNameIn',
                                        id: 'reg_serverNameIn',
                                        label: 'Server Name In',
                                        placeHolder: 'Your email server domain for fetching emails',
                                        required: true
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'serverNameOut',
                                        id: 'reg_serverNameOut',
                                        label: 'Server Name Out',
                                        placeHolder: 'Your email server domain for sending emails',
                                        required: true
                                    },
                                    {
                                        xtype: 'numberfield',
                                        name: 'serverPort',
                                        id: 'reg_serverPort',
                                        label: 'Port Number',
                                        placeHolder: 'Your email server port number',
                                        required: true
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        name: 'useSSL',
                                        label: 'Use SSL'
                                    }
                                ]
                            },
                                {
                                    xtype: 'toolbar',
                                    docked: 'bottom',
                                    ui: 'blue',
                                    items: [
                                        {
                                            text: 'Back',
                                            ui: 'back',
                                            id: 'regManualConfigBackBtn'
                                        },
                                        {xtype: 'spacer'},
                                        {
                                            text: 'Test Email Server Connection',
                                            id: 'regTestServerConnManualBtn'
                                        },
                                        {
                                            text: 'Register',
                                            ui: 'confirm',
                                            id: 'regManualConfigAddBtn'
                                        }
                                    ]
                                }]
                        }
                    ]
                }]
            }
        ]
    }
});