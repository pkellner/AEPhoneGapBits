Ext.define('AE.view.UpdateContactPanel', {
    extend:'Ext.Panel',
    xtype:'updatecontactpanel',
    requires: [
        'Ext.form.Panel'
    ],
    config:{
        hideOnMaskTap: false,
        modal: true,
        showAnimation: 'popIn',
        hideAnimation: 'popOut',
        centered: true,
        width: 480,
        height: 380,
        layout: 'fit',
        items:[
            {
                docked:'top',
                xtype:'toolbar',
                id: 'settingsToolbar',
                ui: 'blue',
                title:'Address Book Update',
                items: [{
                    xtype: 'button',
                    text: 'Cancel',
                    id: 'updateContactPanelCloseBtn'
                }, {
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    text: 'Save',
                    ui: 'orange-dark-bevel',
                    id: 'updateContactSaveFormBtn'
                }]
            },
            {
                xtype:'formpanel',
                id: 'updateContactForm',
                items: [{
                    xtype: 'fieldset',
                    defaults: {
                        labelAlign: 'left',
                        labelWidth: 135
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'FirstName',
                        id: 'update_FirstName',
                        label: 'First Name'
                    }, {
                        xtype: 'textfield',
                        name: 'LastName',
                        id: 'update_LastName',
                        label: 'Last Name'
                    }, {
                        xtype: 'textfield',
                        name: 'City',
                        id: 'update_City',
                        label: 'City'
                    }, {
                        xtype: 'textfield',
                        name: 'State',
                        id: 'update_State',
                        label: 'State'
                    }, {
                        xtype: 'textfield',
                        name: 'Zip',
                        id: 'update_Zip',
                        label: 'Zip Code'
                    }]
                }, {
                    html: '<span class="textNotes">A weather image will be displayed based on the zip code entered. Expect the weather to appear within 15 minutes of saving the zip code.</span>'
                }]
            }
        ]
    }

});