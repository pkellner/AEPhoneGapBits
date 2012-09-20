Ext.define('AE.view.EmailsCarouselInfinite', {
    extend: 'Ext.carousel.Infinite',
    xtype : 'emailscarouselinfinite',
    requires: [
        'AE.view.EmailPanel',
        'Ext.Img'
    ],
    config: {
        cls: 'emailsCarouselBottomControls'
    }
});