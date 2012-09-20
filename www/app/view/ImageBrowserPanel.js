Ext.define('AE.view.ImageBrowserPanel', {
    extend: 'Ext.Panel',
    xtype : 'imagebrowserpanel',
    config: {
        cls: 'imageBrowser',
        floating: true,
        hidden: true,
        modal: true,
        top: '15%',
        left: '15%',
        showAnimation: 'pop',
        layout: 'fit',
        items: [{
            xtype: 'toolbar',
            docked: 'bottom',
            id: 'emailImageCarouselBottomToolbar',
            items: [{
                xtype: 'button',
                id: 'imgBrowserCloseBtn',
                text: 'Close'
            }, {
                xtype: 'title',
                id: 'emailsImageBottomCounter',
                title: ''
            }, {
                xtype: 'spacer'
            }, {
                id: 'emailsImageBottomArrowLeft',
                iconCls: 'arrow_left',
                ui: 'orange',
                iconAlign: 'right',
                iconMask: true
            }, {
                xtype: 'spacer',
                width: 10
            }, {
                id: 'emailsImageBottomArrowRight',
                iconCls: 'arrow_right',
                ui: 'orange',
                iconAlign: 'right',
                iconMask: true
            }]
        }, {
            xtype: 'imagebrowsercarousel',
            layout: 'fit',
            id: 'imageBrowserCarousel'
        }]
    }
});