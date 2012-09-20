Ext.define('AE.store.EmailSetupConfigs', {
    extend  : 'Ext.data.Store',
    requires: ['AE.model.EmailSetupConfig'],
    config: {
        autoLoad: true,
        model   : 'AE.model.EmailSetupConfig',
        proxy: {
            type: 'ajax',
            url : 'data/json/EmailSetupConfigs.js',
            reader: {
                type: 'json',
                idProperty: 'Id',
                rootProperty: 'Data'
            }
        }
    }
});