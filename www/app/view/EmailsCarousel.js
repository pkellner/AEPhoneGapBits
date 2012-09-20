Ext.define('AE.view.EmailsCarousel', {
    extend: 'Ext.Carousel',
    xtype : 'emailscarousel',
    requires: [
        'AE.view.EmailPanel',
        'Ext.Img'
    ],

    config: {
        cls: 'native'
    }
});