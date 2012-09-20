Ext.define('AE.view.LoginRegisterPanel', {
    extend:'Ext.Panel',
    xtype:'loginregisterpanel',
    config:{
        layout:'card',
        cls:'loginRegisterPanel',
        html:'<img class="fullBackground" src="resources/css/images/login/bg.jpg" />',
        activeItem: 3,
        items:[{
                layout: 'vbox',
                items: [{
                    height: 250,
                    layout: 'hbox',
                    cls: 'startHeaderWrapper',
                    items: [{
                        flex: 1
                    }, {
                        width: 45,
                        height: 30,
                        cls: 'nav',
                        items: [{
                            xtype: 'button',
                            hidden: true,
                            id: 'leftStartHeaderBtn',
                            ui: 'orange-dark-bevel',
                            iconAlign: 'left',
                            iconMask: true,
                            iconCls: 'arrow_left'
                        }]
                    }, {
                        width: 425,
                        layout: 'card',
                        id: 'startHeaderCard',
                        items: [{
                            id: 'welcomeHeaderPanel',
                            html: 'Welcome to <div class="agelessEmail-inline"></div>'
                        }, {
                            id: 'loginHeaderPanel'
                        }, {
                            layout: 'vbox',
                            cls: 'registerHeaderPanel',
                            items: [{
                                flex: 1,
                                html: '<div class="agelessEmail-inline"></div>'
                            }, {
                                layout: 'card',
                                height: 70,
                                id: 'startRegHeaderCard',
                                items: [{
                                    html: '<br />Create your account - Step 1 of 3'
                                }, {
                                    html: '<br />Your Mail Account type - Step 2 of 3'
                                }, {
                                    html: '<br />Your Mail Server credentials - Step 3 of 3'
                                }, {
                                    html: '<br />Your Mail Server credentials - Step 3 of 3'
                                }, {
                                    html: '<br />Add Email Addresses to the Whitelist'
                                }]
                            }]
                        }]
                    }, {
                        width: 45,
                        height: 30,
                        cls: 'nav',
                        items: [{
                            xtype: 'button',
                            hidden: true,
                            id: 'rightStartHeaderBtn',
                            ui: 'orange-dark-bevel',
                            iconAlign: 'right',
                            iconMask: true,
                            iconCls: 'arrow_right'
                        }]

                    }, {
                        flex: 1
                    }]
                }, {
                    flex: 1,
                    layout: 'card',
                    id: 'startBodyCard',
                    items: [{
                        id: 'welcomeButtonsPanel',
                        layout: 'hbox',
                        height: 30,
                        items: [{
                            flex: 1
                        }, {
                            xtype: 'button',
                            width: 170,
                            ui: 'orange-dark-bevel',
                            id: 'welcomeLoginButton',
                            text: 'Login'
                        }, {
                            id: 'welcomeStartSpacer',
                            width: 40
                        }, {
                            xtype: 'button',
                            width: 170,
                            ui: 'orange-dark-bevel',
                            id: 'welcomeCreateAccountButton',
                            text: 'Create an Account'
                        }, {
                            flex: 1
                        }]
                    }, {
                        // Login form
                        layout:'hbox',
                        height:250,
                        pack: 'center',
                        items:[
                            {
                                flex:1
                            },
                            {
                                width: 500,
                                items: [{
                                    xtype:'formpanel',
                                    id:'loginFormPanel',
                                    scrollable:false,
                                    layout:'vbox',
                                    items: [{
                                        height: 44,
                                        layout: 'hbox',
                                        items:[
                                            {
                                                xtype:'textfield',
                                                width: 180,
                                                name:'username',
                                                autoCapitalize: false,
                                                value: '',
                                                id:'login_username',
                                                placeHolder:'Ageless Username'
                                            }, {
                                                width: 10
                                            },
                                            {
                                                xtype:'passwordfield',
                                                width: 180,
                                                name:'password',
                                                value: '',
                                                id:'login_password',
                                                placeHolder:'Ageless Password'
                                            }, {
                                                width: 10
                                            },
                                            {
                                                xtype: 'button',
                                                width: 80,
                                                height: 34,
                                                text:'Login',
                                                ui:'orange-dark-bevel',
                                                id:'loginBtn'
                                            }
                                        ]
                                    }, {
                                        height: 10
                                    },{
                                        height: 40,
                                        layout: 'hbox',
                                        cls: 'login2ndLine',
                                        items: [
                                            {
                                                xtype:'checkboxfield',
                                                name:'rememberMe',
                                                id: 'login_rememberMe',
                                                width: 40,
                                                checked: false
                                            },
                                            {
                                                html: 'Remember Me',
                                                cls: 'rememberMe'
                                            }, {
                                                width: 50
                                            },
                                            {
                                                html: ''
//                                                html: '<span id="forgotPasswordLink">Forgot your Password</span>'
                                            }
                                        ]
                                    }, {
                                        flex: 1
                                    }]
                                }]
                            },
                            {
                                flex:1
                            }
                        ]
                        // End login form
                    }, {
                        // AgelessEmail account form
                        layout:'hbox',
                        height:350,
                        pack: 'center',
                        items:[
                            {
                                flex:1
                            }, {
                                layout: 'card',
                                id: 'regCardsPanel',
                                width:450,
                                activeItem: 0,
                                items: [
                                    {
                                        title: 'Ageless Email Account',
                                        xtype:'formpanel',
                                        scrollable: false,
                                        id: 'regAeFormPanel',
                                        items: [
                                            {
                                                xtype: 'fieldset',
                                                title: '(Do NOT enter your email credentials here.)<br /><br />',
                                                defaults: {
                                                    labelAlign: 'left',
                                                    labelWidth: 180
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        name: 'aeUsername',
                                                        id: 'reg_aeUsername',
                                                        autoCapitalize: false,
                                                        label: 'Ageless Username',
                                                        placeHolder: 'Your AgelessEmail Username'
                                                    },
                                                    {
                                                        xtype: 'passwordfield',
                                                        name: 'aePassword',
                                                        id: 'reg_aePassword',
                                                        label: 'Ageless Password',
                                                        placeHolder: 'Your AgelessEmail Password'
                                                    }
//                                                    {
//                                                        xtype: 'emailfield',
//                                                        name: 'aeRecoveryEmail',
//                                                        id: 'reg_aeRecoveryEmail',
//                                                        label: 'Admin Email',
//                                                        placeHolder: 'Email to use for account recovery'
//                                                    }
                                                ]
                                            }, {
                                                layout: 'hbox',
                                                items: [{
                                                    flex: 1
                                                }, {
                                                    xtype: 'button',
                                                    text:'Tap Here to Advance to Step 2',
                                                    width: 320,
                                                    iconAlign: 'right',
                                                    iconMask: true,
                                                    iconCls: 'arrow_right',
                                                    ui:'orange-dark-bevel',
                                                    cls: 'regPreConfigdAddBtn',
                                                    id:'regNextOnStep1'
                                                }]
                                            }
                                        ]
                                    }
                                ]
                            }, {
                                flex: 1
                            }
                        ]
                        // End - AgelessEmail account form
                    }, {
                        // Mail account list
                        layout: 'hbox',
                        pack: 'center',
                        cls: 'regBodyCard2',
                        items: [{
                            flex: 1
                        }, {
                            title:'Mail Account Type',
                            width: 400,
                            layout:'vbox',
                            items:[
                                {
                                    html:'Select your Mail Account type from below: ',
                                    cls: 'x-form-fieldset-title'
                                },
                                {
                                    xtype:'list',
                                    id:'regMailAccountTypesList',
                                    height: 265,
                                    itemTpl:'<div class="contact">{accountType}</div>',
                                    store:'EmailSetupConfigs'
                                }, {
                                    layout: 'hbox',
                                    items: [{
                                        flex: 1
                                    }, {
                                        xtype: 'button',
                                        text:'Tap Here to Advance to Step 3',
                                        width: 320,
                                        iconAlign: 'right',
                                        iconMask: true,
                                        iconCls: 'arrow_right',
                                        ui:'orange-dark-bevel',
                                        cls: 'regPreConfigdAddBtn',
                                        id:'regNextOnStep2'
                                    }]
                                }
                            ]
                        }, {
                            flex: 1
                        }]
                        // End - Mail account list
                    }, {
                        // Precofigured mail account
                        layout: 'hbox',
                        pack: 'center',
                        items: [{
                            flex: 1
                        }, {
                            title:'Your Mail Account',
                            xtype:'formpanel',
                            scrollable: false,
                            id:'regPreConfigdFormPanel',
                            width: 500,
                            items:[
                                {
                                    xtype:'fieldset',
                                    id:'regPreConfigdMailFieldset',
                                    title:'Your Mail Server Credentials',
                                    defaults:{
                                        labelAlign:'left',
                                        labelWidth:150
                                    },
                                    items:[
                                        {
                                            xtype:'textfield',
                                            name:'address',
                                            id:'pre_address',
                                            label:'Email Address',
                                            placeHolder:'Your Email Address for this account type'
                                        },
                                        {
                                            xtype:'passwordfield',
                                            name:'serverPassword',
                                            id:'pre_serverPassword',
                                            placeHolder:'Your Email Password',
                                            label:'Email Password'
                                        }
//                                        {
//                                            xtype:'textfield',
//                                            name:'description',
//                                            id:'pre_description',
//                                            placeHolder:'A short description for this account',
//                                            label:'Description <br />(optional)'
//                                        }

                                    ]
                                }, {
                                    layout: 'vbox',
                                    items: [{
                                        layout: 'hbox',
                                        items: [{
                                            flex: 1
                                        }, {
                                            xtype: 'button',
                                            text:'Test Email Server Connection',
                                            ui: 'blue',
                                            cls: 'regTestServerConnBtn',
                                            id:'regTestServerConnBtn'
                                        }]
                                    }, {
                                        layout: 'hbox',
                                        pack: 'center',
                                        items: [{
                                            flex: 1
                                        }, {
                                            xtype: 'button',
                                            text:'Tap Here to Register',
                                            width: 250,
                                            ui:'orange-dark-bevel',
                                            cls: 'regPreConfigdAddBtn',
                                            id:'regPreConfigdAddBtn'
                                        }]
                                    }]
                                }
                            ]
                        }, {
                            flex: 1
                        }]
                        // End - Preconfigured mail account
                    }, {
                        // Manual setup mail account
                        layout: 'hbox',
                        pack: 'center',
                        items: [{
                            flex: 1
                        }, {
                            title:'Other Mail Account',
                            xtype:'formpanel',
                            id:'regManualConfigFormPanel',
                            width: 550,
                            defaults:{
                                labelAlign:'left',
                                labelWidth:200
                            },
                            items:[
                                {
                                    xtype:'textfield',
                                    name:'serverUsername',
                                    id:'reg_serverUsername',
                                    label:'Email Username',
                                    autoCapitalize: false,
                                    placeHolder:'Your email account Username'
                                },
                                {
                                    xtype:'passwordfield',
                                    name:'serverPassword',
                                    id:'reg_serverPassword',
                                    placeHolder:'Your email account Password',
                                    label:'Email Password'
                                },
                                {
                                    xtype:'emailfield',
                                    name:'fromEmailAddress',
                                    id:'reg_fromEmailAddress',
                                    placeHolder:'Your From Email Address (Optional)',
                                    label:'From Email Address'
                                },
                                {
                                    xtype: 'fieldset',
                                    title: '',
                                    defaults:{
                                        labelAlign:'left',
                                        labelWidth:200
                                    },
                                    items: [{
                                        xtype:'selectfield',
                                        name:'serverType',
                                        label:' Server Type',
                                        width: 320,
                                        tpl:'<span class="x-list-label">{text}</span>',
                                        options:[
                                            {text: 'IMAP', value: 'IMAP'}
                                        ]
                                    },
                                        {
                                            xtype:'textfield',
                                            name:'serverNameIn',
                                            id:'reg_serverNameIn',
                                            label:'Incoming Mail Server',
                                            placeHolder:'Server domain for fetching emails'
                                        }, {
                                            layout: 'hbox',
                                            items: [{
                                                xtype:'numberfield',
                                                width: 320,
                                                labelWidth: 200,
                                                name:'serverPort',
                                                id:'reg_serverPort',
                                                label:'Incoming Port Number'
                                            }, {
                                                width: 20
                                            }, {
                                                xtype:'checkboxfield',
                                                labelWidth: 130,
                                                name:'useSSL',
                                                label:'Use SSL'
                                            }]
                                        },
                                        {
                                            xtype:'textfield',
                                            name:'serverNameOut',
                                            id:'reg_serverNameOut',
                                            label:'Outgoing Mail Server',
                                            placeHolder:'Server domain for sending emails'
                                        }, {
                                            layout: 'hbox',
                                            items: [{
                                                xtype:'numberfield',
                                                width: 320,
                                                labelWidth: 200,
                                                name:'serverPortOut',
                                                id:'reg_serverPortOut',
                                                label:'Outgoing Port Number'
                                            }, {
                                                width: 20
                                            }, {
                                                xtype:'checkboxfield',
                                                labelWidth: 130,
                                                name:'useSSLOut',
                                                label:'Use SSL'
                                            }]
                                        }]
                                }, {
                                    layout: 'vbox',
                                    items: [{
                                        layout: 'hbox',
                                        items: [{
                                            flex: 1
                                        }, {
                                            xtype: 'button',
                                            text:'Test Email Server Connection',
                                            ui: 'blue',
                                            cls: 'regTestServerConnBtn',
                                            id:'regTestServerConnManualBtn'
                                        }]
                                    }, {
                                        layout: 'hbox',
                                        items: [{
                                            flex: 1
                                        }, {
                                            xtype: 'button',
                                            text:'Tap Here to Register',
                                            width: 250,
                                            ui:'orange-dark-bevel',
                                            cls: 'regPreConfigdAddBtn',
                                            id:'regManualConfigAddBtn'
                                        }]
                                    }]
                                }
                            ]}, {
                            flex: 1
                        }]
                        // End - Manual setup mail account
                    }, {
                        // Whitelist setup
                        layout: 'hbox',
                        pack: 'center',
                        items: [{
                            flex: 1
                        }, {
                            layout: 'vbox',
                            width: 525,
                            items: [{
                                xtype: 'whitelistfirstloginpanel',
                                id: 'whitelistFirstLoginPanel'
                            }, {
                                html: 'Note: If you want to Un-Whitelist a Sender, you can do this later from a Bottom Toolbar Button on the Next Panel.',
                                cls: 'x-form-fieldset-title',
                                style: 'white-space: wrap',
                                height: 40
                            }]
                        }, {
                            flex: 1
                        }]
                        // End of whitelist setup
                    }]
                }]

            }, {
                html: ''
            }

        ]
    }
});