Ext.define('AE.controller.Settings', {
    extend: 'Ext.app.Controller',

    launch: function () {

    },

    config: {

        refs: {

            // Carousel arrows
            leftCarouselArrow: '#leftCarouselArrow',
            rightCarouselArrow: '#rightCarouselArrow',
            // Buttons
            settingsBtn: 'button#settingsBtn',
            settingsBtn2: 'button#settingsBtn2',
            settingsCloseBtn: 'button#settingsCloseBtn',
            settingsToolbar: '#settingsToolbar',

            // Profile
            profileUpdateBtn: 'button#profileUpdateBtn',

            profileTestMailConnectionBtn: 'button#profileTestMailConnectionBtn',
            // Forms
            profileFormPanel: '#profileFormPanel',
            // Tabs
            settingsTabPanel: '#settingsTabPanel',
            profileTab: '#profileTab'
        },
        control: {
            profileUpdateBtn: {
                tap: 'onProfileUpdateBtn'
            },

            profileTestMailConnectionBtn: {
                tap: 'onProfileTestMailConnectionBtn'
            }
        }
    }
});