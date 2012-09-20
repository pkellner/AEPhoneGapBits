Ext.define('AE.view.WhitelistManagePanel', {
    extend:'Ext.Panel',
    xtype:'whitelistmanagepanel',
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
                id: 'whitelistManageToolbar',
                ui: 'blue',
                title:'Manage Whitelist',
                items: [{
                    xtype: 'button',
                    text: 'Close',
                    id: 'whitelistCloseBtn'
                }, {
                    xtype: 'spacer'
                }]
            }, {
                layout: 'vbox',
                style: 'background: #EEE;',
                defaults: {
                    padding: 10
                },
                items: [{
                    height: 30,
                    cls: 'x-form-fieldset-title',
                    html: 'Add an Email Address to the Whitelist:'
                }, {
                    layout: 'hbox',
                    padding: 0,
                    margin: '0px 10px',
                    items: [{
                        flex: 1,
                        xtype: 'textfield',
                        style: 'border: 1px solid #DDD;',
                        id: 'whitelistEmailAddressFieldToAdd',
                        labelWidth: 130,
                        label: 'Email Address:'
                    }, {
                        width: 5
                    }, {
                        xtype: 'button',
                        id: 'whitelistSaveBtn',
                        cls: 'medium-btn',
                        margin: '5px 0px 0px',
                        height: 40,
                        width: 70,
                        ui: 'orange',
                        text: 'Add'
                    }]
                }, {
                    height: 80,
                    html: '<p class="smallText">Note: This window enables you to add various email addresses to the Whitelist, before the Sender actually sends you an email. This is useful for setting up a batch of Whitelist email addresses after you have registered an AgelessEmail Account.</p>'
                }, {
                    height: 30,
                    cls: 'x-form-fieldset-title',
                    html: 'Current Whitelist: '
                }, {
                    xtype: 'list',
                    margin: 10,
                    padding: 0,
                    flex: 1,
                    store: 'WhitelistManageContacts',
                    itemTpl: new Ext.XTemplate(
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