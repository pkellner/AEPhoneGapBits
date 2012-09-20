Ext.define('AE.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        views: ['Main'],
        controllers: ['Main']
    },

    isActive: function() {
        return Ext.os.is.Tablet || true;
    },

    launch: function() {
        Ext.create('AE.view.tablet.Main');
    }
});