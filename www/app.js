// Browser detection
if (!Ext.browser.is.WebKit) {
    window.location = "browser-compat.html";
}

Ext.application({

    name: 'AE',

    models: ['Contact', 'ContactAssignImage', 'Email', 'EmailPicture', 'EmailSetupConfig', 'QuickMessage', 'WhitelistFirstLoginContact', 'WhitelistManageContact', 'Account', 'Log'],
    stores: ['Contacts', 'ContactsBackground', 'ContactAssignImages', 'Emails', 'EmailsBackground', 'EmailPictures', 'EmailSetupConfigs', 'QuickMessages',
        'WhitelistFirstLoginContacts', 'WhitelistManageContacts', 'Accounts', 'Logs'],
    controllers: ['Main', 'Contacts', 'Emails', 'Settings', 'UtilClass', 'UI', 'User', 'LoginRegister', 'Logging'],
    views: ['Main', 'ContactsList', 'ContactAssignImagePanel', 'UpdateContactPanel',
        'EmailsCarouselBorder', 'EmailsCarouselBottomControls', 'EmailsCarouselInfinite', 'EmailPanel',
        'ImageBrowserCarousel', 'ImageBrowserPanel', 'AccountPanel', 'AccountEmailSettingsPanel',
        'ReplyPanel', 'ReplyFormPanel', 'WhitelistFirstLoginPanel', 'WhitelistManagePanel', 'WhitelistMultipleManagePanel', 'MessageBox', 'LoginRegisterPanel'],
    profiles: ['Tablet'],

    requires: [
        'Ext.util.DelayedTask',
        'Ext.data.identifier.Uuid',
        'Ext.Anim',
        'Ext.MessageBox',
        'Ext.data.proxy.LocalStorage'
    ],


    launch: function() {

        // Console logger alias
        AE.logger = Ext.bind(AE.app.getController('Logging').logger, AE.app.getController('Logging'));
        AE.ajaxErrorLog = Ext.bind(AE.app.getController('Logging').ajaxErrorLog, AE.app.getController('Logging'));

        AE.app.getController('UtilClass').getUrlParams();

        AE.msgBox = Ext.create('AE.view.MessageBox');

        Ext.create('AE.view.Main');




    }
});