Ext.define('AE.store.Emails', {
    extend  : 'Ext.data.Store',
    config: {
        model   : 'AE.model.Email',
        autoSync: true,
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'emails-store',
            reader: {
                type: 'json'
            }
        },
        sorters: [{
            property: 'EmailSentDate',
            direction: 'DESC'
        }]
    }
});