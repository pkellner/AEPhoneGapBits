Ext.define('AE.view.ImageBrowserCarousel', {
    extend: 'Ext.carousel.Infinite',
    xtype : 'imagebrowsercarousel',
    requires: [
        'Ext.Img'
    ],
    config: {
        innerItemConfig: {
            layout: 'fit',
            items: [{
                xtype: 'image',
                src: 'resources/css/images/ajax-loader.gif'
            }]
        }
    }
});
