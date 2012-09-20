Ext.define('AE.view.SettingsPanel', {
    extend:'Ext.Panel',
    xtype:'settingspanel',
    requires: [
        'Ext.form.Panel',
        'Ext.tab.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.field.Select',
        'Ext.field.Number',
        'AE.view.LoggedInPanel',
        'AE.view.LoggedOutPanel'
    ],
    config:{
        hideOnMaskTap:false,
        modal:true,
        showAnimation:'popIn',
        hideAnimation:'popOut',
        centered:true,
        width:650,
        height:550,
        layout:'fit',
        items:[
            {
                docked:'top',
                xtype:'toolbar',
                id: 'settingsToolbar',
                ui: 'blue',
                title:'Settings',
                items: [{
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    text: 'Close',
                    id: 'settingsCloseBtn'
                }]
            }
        ]
    }

});