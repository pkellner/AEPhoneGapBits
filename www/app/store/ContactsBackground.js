Ext.define('AE.store.ContactsBackground', {
    extend  : 'Ext.data.Store',
    requires: ['AE.model.Contact' ],
    config: {
        model   : 'AE.model.Contact',
        pageSize: 500,
        proxy: {
            type: 'ajax',
            url : AE.config.baseUrl + '/EmailDetail/GetPersonsWithEmailByEmailAccount',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            reader: {
                type: 'json',
                rootProperty: 'Data',
                idProperty: 'Id'
            },
            listeners: {
                exception: function (proxy, response, operation, eOpts) {

                    AE.app.getController('UtilClass').ajaxErrorLog(proxy.getUrl(), response.responseText, response.status, response.statusText);

                }
            }
        }
    }
});