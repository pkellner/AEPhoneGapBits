Ext.define('AE.view.AccountPanel', {
    extend: 'Ext.Panel',
    xtype:'accountpanel',
    config: {
        hideOnMaskTap:false,
        modal:true,
        showAnimation:'popIn',
        hideAnimation:'popOut',
        centered:true,
        width:480,
        height:390,
        layout:'fit',
        style: 'z-index: 8',
        items:[
            {
                docked:'top',
                xtype:'toolbar',
                ui: 'blue',
                title:'Account',
                items: [{
                    xtype: 'button',
                    text: 'Cancel',
                    id: 'accountPanelCloseBtn'
                }, {
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    text: 'Save',
                    ui: 'orange',
                    id: 'accountPanelSaveBtn'
                }]
            }, {
                docked:'top',
                xtype:'toolbar',
                ui: 'blue-dark-flat',
                items: [{
                    xtype: 'button',
                    text: 'Email Server Settings',
                    id: 'emailServerSettingsBtn'
                }, {
                    xtype: 'spacer'
                }]
            }, {
                xtype:'formpanel',
                id: 'accountFormPanel',
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'AgelessEmail Account',
                        defaults: {
                            labelAlign: 'left',
                            labelWidth: 160
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                name: 'aeUsername',
                                id: 'account_aeUsername',
                                label: 'Username',
                                readOnly: true,
                                placeHolder: 'Your AgelessEmail Username'
                            },
                            {
                                xtype: 'passwordfield',
                                name: 'aePassword',
                                id: 'account_aePassword',
                                label: 'Password',
                                placeHolder: 'Your AgelessEmail Password'
                            }
//                            {
//                                xtype: 'emailfield',
//                                name: 'aeRecoveryEmail',
//                                id: 'account_aeRecoveryEmail',
//                                label: 'Admin Email',
//                                placeHolder: 'Email to use for account recovery'
//                            }
                        ]
                    }, {
                        layout: 'vbox',
                        items: [{
                            height: 50,
                            items: [{
                                layout: 'hbox',
                                height: 32,
                                items: [{
                                    xtype: 'button',
                                    ui: 'grey-flat',
                                    cls: 'small-btn',
                                    text: 'Delete Account Data Only',
                                    id: 'deleteDataOnlyBtn'
                                }, {
                                    width: 10
                                }, {
                                    xtype: 'button',
                                    ui: 'grey-flat',
                                    cls: 'small-btn',
                                    text: 'Delete Entire Account',
                                    id: 'deleteAccountBtn'
                                }, {
                                    flex: 1
                                }]
                            }]
                        }, {
                            height: 50,
                            items: [{
                                layout: 'hbox',
                                height: 32,
                                items: [{
                                    xtype: 'button',
                                    ui: 'grey-flat',
                                    cls: 'small-btn',
                                    text: 'Assign Dropbox Account',
                                    id: 'assignDropboxAccountBtn'
                                }, {
                                    width: 10
                                }, {
                                    xtype: 'button',
                                    ui: 'grey-flat',
                                    cls: 'small-btn',
                                    text: 'Clear Dropbox Local Cache',
                                    id: 'clearDropboxLocalCacheBtn'
                                }, {
                                    flex: 1
                                }]
                            }]
                        }]
                    }
                ]
            }
        ]
    }

});