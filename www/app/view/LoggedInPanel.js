Ext.define('AE.view.LoggedInPanel', {
    extend: 'Ext.Panel',
    config: {
        title:'Profile',
        id: 'profileTab',
        iconCls:'user',
        cls:'card4',
        layout: 'fit',
        items:[
            {
                xtype:'formpanel',
                id: 'profileFormPanel',
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'AE Account',
                        defaults: {
                            labelAlign: 'left',
                            labelWidth: 160
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'aeUsername',
                                id: 'prof_aeUsername',
                                label: 'Username',
                                placeHolder: 'Your AgelessEmail Username',
                                required: true
                            },
                            {
                                xtype: 'passwordfield',
                                name: 'aePassword',
                                id: 'prof_aePassword',
                                label: 'Password',
                                placeHolder: 'Your AgelessEmail Password',
                                required: true
                            },
                            {
                                xtype: 'emailfield',
                                name: 'aeRecoveryEmail',
                                id: 'prof_aeRecoveryEmail',
                                label: 'Admin Email',
                                placeHolder: 'Email to use for account recovery',
                                required: true
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Mail Server Credentials',
                        defaults: {
                            labelAlign: 'left',
                            labelWidth: 165
                        },
                        items: [
                            {
                                xtype: 'selectfield',
                                name: 'serverType',
                                id: 'prof_serverType',
                                tpl: '<span class="x-list-label">aa{text}</span>',
                                label: 'Server Type',
                                options: [
                                    {text: 'POP3', value: 'POP3'}
//                                            {text: 'IMAP', value: 'IMAP'}
                                ],
                                required: true
                            },
                            {
                                xtype: 'textfield',
                                name: 'serverUsername',
                                id: 'prof_serverUsername',
                                label: 'Username',
                                placeHolder: 'Your email account Username for fetching emails',
                                required: true
                            },
                            {
                                xtype: 'passwordfield',
                                name: 'serverPassword',
                                id: 'prof_serverPassword',
                                placeHolder: 'Your email account Password for fetching emails',
                                label: 'Password'
                            },
                            {
                                xtype: 'textfield',
                                name: 'serverNameIn',
                                id: 'prof_serverNameIn',
                                label: 'Server Name In',
                                placeHolder: 'Your email server domain for fetching emails',
                                required: true
                            },
                            {
                                xtype: 'textfield',
                                name: 'serverNameOut',
                                id: 'prof_serverNameOut',
                                label: 'Server Name Out',
                                placeHolder: 'Your email server domain for sending emails',
                                required: true
                            },
                            {
                                xtype: 'numberfield',
                                name: 'serverPort',
                                id: 'prof_serverPort',
                                label: 'Port Number',
                                placeHolder: 'Your mail server port number',
                                required: true
                            },
                            {
                                xtype: 'checkboxfield',
                                name: 'useSSL',
                                label: 'Use SSL'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                ui: 'blue',
                items: [
                    {
                        text: 'Test Mail Connection',
                        id: 'profileTestMailConnectionBtn'
                    },
                    {xtype: 'spacer'},
                    {
                        text: 'Save',
                        ui: 'confirm',
                        id: 'profileUpdateBtn'
                    }
                ]
            }
        ]
    }

});