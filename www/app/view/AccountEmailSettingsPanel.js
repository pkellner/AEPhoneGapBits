Ext.define('AE.view.AccountEmailSettingsPanel', {
    extend: 'Ext.Panel',
    xtype: 'accountemailsettingspanel',
    config: {
        hideOnMaskTap:false,
        modal:true,
        showAnimation:'popIn',
        hideAnimation:'popOut',
        centered:true,
        width:600,
        height:600,
        layout:'fit',
        style: 'z-index: 8',
        items:[{
            docked:'top',
            xtype:'toolbar',
            ui: 'blue',
            title:'Email Server Settings',
            items: [{
                xtype: 'button',
                text: 'Cancel',
                id: 'emailSettingsPanelCloseBtn'
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                text: 'Save',
                ui: 'orange',
                id: 'emailSettingsPanelSaveBtn'
            }]
        }, {
            docked:'top',
            xtype:'toolbar',
            ui: 'blue-dark-flat',
            items: [{
                xtype: 'button',
                text: 'Back',
                ui: 'back',
                id: 'emailSettingsAccountTypeBackBtn'
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                text: 'Next',
                ui: 'forward',
                id: 'emailSettingsAccountTypeNextBtn'
            }]
        }, {
            layout: 'card',
            id: 'accountEmailSettingsCard',
            items: [{
                layout: 'vbox',
                items: [{
                    height: 50
                }, {
                    height: 285,
                    layout: 'hbox',
                    items: [{
                        flex: 1
                    }, {
                        width: 400,
                        layout:'vbox',
                        items:[
                            {
                                html:'Select your Mail Account type from below: ',
                                cls: 'x-form-fieldset-title'
                            },
                            {
                                xtype:'list',
                                height: 285,
                                id:'emailSettingsAccountTypesList',
                                itemTpl:'<div class="contact">{accountType}</div>',
                                store:'EmailSetupConfigs'
                            }
                        ]
                    }, {
                        flex: 1
                    }]
                }, {
                    flex: 1
                }]
            }, {
                layout: 'vbox',
                items: [{
                    layout: 'hbox',
                    height: 15
                }, {
                    layout: 'card',
                    flex: 1,
                    id: 'emailSettingsFormCard',
                    items: [{
                        layout: 'fit',
                        items: [{
                            xtype:'formpanel',
                            flex: 1,
                            id: 'emailServerSettingsFormPanel',
                            items: [{
                                xtype: 'fieldset',
                                title: 'Mail Server Credentials',
                                defaults: {
                                    labelAlign: 'left',
                                    labelWidth: 172
                                },
                                items: [
                                    {
                                        xtype: 'selectfield',
                                        name: 'serverType',
                                        id: 'emailSettings_serverType',
                                        width: 320,
                                        tpl: '<span class="x-list-label">aa{text}</span>',
                                        label: 'Server Type',
                                        options: [
                                            {text: 'IMAP', value: 'IMAP'}
                                        ]
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'serverUsername',
                                        id: 'emailSettings_serverUsername',
                                        label: 'Email Username',
                                        placeHolder: 'Your email account Username'
                                    },
                                    {
                                        xtype: 'passwordfield',
                                        name: 'serverPassword',
                                        id: 'emailSettings_serverPassword',
                                        placeHolder: 'Your email account Password',
                                        label: 'Email Password'
                                    },
                                    {
                                        xtype: 'emailfield',
                                        name: 'fromEmailAddress',
                                        id: 'emailSettings_fromEmailAddress',
                                        label: 'From Email Address',
                                        placeHolder: 'Your From Email Address'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'serverNameIn',
                                        id: 'emailSettings_serverNameIn',
                                        label: 'Incoming Mail Server',
                                        placeHolder: 'Server domain for fetching emails'
                                    }, {
                                        layout: 'hbox',
                                        items: [{
                                                xtype: 'numberfield',
                                                name: 'serverPort',
                                                id: 'emailSettings_serverPort',
                                                label: 'Port Number',
                                                width: 300,
                                                labelWidth: 172
                                            },
                                            {
                                                width: 20
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                name: 'useSSL',
                                                width: 160,
                                                label: 'Use SSL',
                                                labelWidth: 100
                                            }, {
                                                flex: 1
                                            }]
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'serverNameOut',
                                        id: 'emailSettings_serverNameOut',
                                        label: 'Outgoing Mail Server',
                                        placeHolder: 'Server domain for sending emails'
                                    },
                                    {
                                        layout: 'hbox',
                                        items: [{
                                                xtype: 'numberfield',
                                                name: 'serverPortOut',
                                                id: 'emailSettings_serverPortOut',
                                                label: 'Port Number',
                                                width: 300,
                                                labelWidth: 172
                                            },
                                            {
                                                width: 20
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                name: 'useSSLOut',
                                                width: 160,
                                                label: 'Use SSL',
                                                labelWidth: 100
                                            }, {
                                                flex: 1
                                            }]
                                    }, {
                                        layout: 'hbox',
                                        padding: 6,
                                        items: [{
                                            flex: 1
                                        }, {
                                            xtype: 'button',
                                            width: 240,
                                            cls: 'medium-btn',
                                            text: 'Test Email Server Connection',
                                            id: 'emailSettingsTestMailConnectionBtn'
                                        }]
                                    }
                                ]
                            }]
                        }]
                    }, {
                        layout: 'fit',
                        items: [{
                            title:'Your Mail Account',
                            xtype:'formpanel',
                            scrollable: false,
                            id:'emailSettingsPreConfigdFormPanel',
                            padding: '8px 12px',
                            items:[
                                {
                                    xtype:'fieldset',
                                    id:'emailSettingsPreConfigdMailFieldset',
                                    title:'Your Mail Server Credentials',
                                    defaults:{
                                        labelAlign:'left',
                                        labelWidth:150
                                    },
                                    items:[
                                        {
                                            xtype:'textfield',
                                            name:'serverUsername',
                                            id:'emailSettingsPreConfig_serverUsername',
                                            label:'Email Address',
                                            placeHolder:'Your Email Address for this account type'
                                        },
                                        {
                                            xtype:'passwordfield',
                                            name:'serverPassword',
                                            id:'emailSettingsPreConfig_serverPassword',
                                            placeHolder:'Your Email Password',
                                            label:'Email Password'
                                        },
//                                        {
//                                            xtype:'textfield',
//                                            name:'description',
//                                            id:'emailSettingsPreConfig_description',
//                                            placeHolder:'A short description for this account',
//                                            label:'Description <br />(not required)'
//                                        },
                                        {
                                            layout: 'hbox',
                                            padding: 6,
                                            items: [{
                                                flex: 1
                                            }, {
                                                xtype: 'button',
                                                width: 240,
                                                cls: 'medium-btn',
                                                text: 'Test Email Server Connection',
                                                id: 'emailSettingsTestMailConnectionBtn2'
                                            }]
                                        }

                                    ]
                                }
                            ]
                        }]
                    }]
                }]
            }]
        }]
    }

});