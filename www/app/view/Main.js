Ext.define('AE.view.Main', {
    extend: 'Ext.Container',
    requires: [
        'AE.view.ContactsList',
        'AE.view.EmailsCarouselBorder'
    ],

    config: {
        fullscreen: true
    }
});