Ext.define('AE.view.WhitelistFirstLoginPanel', {
    extend:'Ext.Panel',
    xtype:'whitelistfirstloginpanel',
    config:{
        flex: 1,
        layout:'fit',
        items:[{
                docked:'bottom',
                id: 'whitelistFirstLoginToolbar',
                xtype:'toolbar',
                items: [{
                    xtype: 'button',
                    text: 'Check / Uncheck All',
                    ui: 'blue',
                    id: 'whitelistSelectAllBtn'
                }, {
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    text: 'Continue',
                    cls: 'regPreConfigdAddBtn',
                    ui: 'orange',
                    id: 'whitelistFirstLoginSaveBtn'
                }]
            }, {
                layout: 'vbox',
                items: [{
                    height: 20,
                    cls: 'x-form-fieldset-title',
                    html: '&nbsp; &nbsp; Check Email Address to add to Whitelist:'
                }, {
                    xtype: 'list',
                    mode: 'MULTI',
                    id: 'whitelistFirstLoginContactsList',
                    padding: 0,
                    allowDeselect: false,
                    flex: 1,
                    store: 'WhitelistFirstLoginContacts',
                    itemTpl: new Ext.XTemplate(
                        '<div class="checkbox {WhiteList}"></div>' +
                        '{EmailAddress}')
                }]
            }
        ]
    }

});