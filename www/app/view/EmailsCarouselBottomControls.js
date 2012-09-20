Ext.define('AE.view.EmailsCarouselBottomControls', {
    extend: 'Ext.Carousel',
    xtype : 'emailscarouselbottomcontrols',
    requires: [
        'AE.view.EmailPanel',
        'Ext.Img'
    ],
    config: {
        cls: 'emailsCarouselBottomControls'
    }
});