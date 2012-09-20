Ext.define('AE.view.tablet.Main', {
    extend:'AE.view.Main',
    xtype:'mainview',

    config:{
        id:'mainContainerPanel',
        fullscreen:true,
        layout:'card',
        animation: 'pop',
        items:[
            {
                id: 'regWrapperPanel',
                layout: 'fit',
                items: [{
                    xtype: 'loginregisterpanel'
                }]
            },
            {
                layout:'vbox',
                id: 'mainWrapperPanel',
                cls:'mainView',
                items:[
                    {
                        xtype:'panel',
                        layout: 'fit',
                        id: 'contactsListContainerPanel',
                        items: [{
                            xtype: 'contactslist'
                        }],
                        docked: 'left',
                        width: 0
                    },
                    {
                        xtype: 'panel',
                        flex: 1,
                        id:'emailsContainerPanel',
//                        showAnimation: 'pop',
                        layout: 'fit'
                    }
                ]
            }
        ]
    }
});