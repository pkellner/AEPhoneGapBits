Ext.define('AE.store.Logs', {
    extend  : 'Ext.data.Store',
    requires: ['AE.model.Log'],
    config: {
        autoLoad: true,
        model   : 'AE.model.Log',
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    }
});