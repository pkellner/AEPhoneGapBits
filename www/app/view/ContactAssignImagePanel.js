Ext.define('AE.view.ContactAssignImagePanel', {
    extend: 'Ext.Panel',
    xtype : 'contactassignimagepanel',
    requires: [
        'Ext.Img'
    ],
    config: {
        cls: 'contactAssignImagePanel',
        modal:true,
        centered: true,
        scrollable: true,
        width: '100%',
        height: '100%',
        showAnimation: {
            type: 'slide',
            direction: 'right'
        },
        hideAnimation: 'slideOut',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            ui: 'blue',
            title: 'Tap a Picture to Assign to Contact',
            items: [{
                xtype: 'spacer'
            }, {
                text: 'Close',
                id: 'assignImagePanelCloseButton'
            }]
        }]
    }

});