Ext.define('AE.store.QuickMessages', {
    extend  : 'Ext.data.Store',
    config: {
        model   : 'AE.model.QuickMessage',
        proxy: {
            type: 'ajax',
            url : AE.config.baseUrl + '/EmailResponse/GetMessages',
            reader: {
                type: 'json',
                idProperty: 'Id',
                rootProperty: 'Data'
            }
        }
    }
});