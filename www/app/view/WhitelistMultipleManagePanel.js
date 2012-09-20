Ext.define('AE.view.WhitelistMultipleManagePanel', {
    extend:'Ext.Panel',
    xtype:'whitelistmultiplemanagepanel',
    config:{
        hideOnMaskTap:false,
        modal:true,
        showAnimation:'popIn',
        hideAnimation:'popOut',
        centered:true,
        width: 570,
        height: 550,
        layout:'fit',
        items:[
            {
                docked:'top',
                xtype:'toolbar',
                id: 'whitelistMultipleManageToolbar',
                ui: 'blue',
                title:'Manage Whitelist',
                items: [{
                    xtype: 'button',
                    text: 'Close',
                    id: 'whitelistMultipleCloseBtn'
                }, {
                    xtype: 'spacer'
                }]
            }, {
                layout: 'vbox',
                style: 'background: #EEE;',
                items: [{
                    height: 20,
                    cls: 'x-form-fieldset-title',
                    html: 'Check Email Address to add to Whitelist:'
                }, {
                    xtype: 'list',
                    id: 'whitelistMultipleList',
                    margin: 10,
                    padding: 0,
                    flex: 1,
                    store: 'WhitelistManageContacts',
                    itemTpl: new Ext.XTemplate(
                        '<div class="checkbox {WhiteList}"></div>' +
                        '<tpl if="FirstName == \'\' && LastName == \'\'">' +
                            '{EmailAddress}' +
                        '<tpl else>' +
                            '{EmailAddress} - {FirstName} {LastName}' +
                        '</tpl>')
                }]
            }
        ]
    }

});