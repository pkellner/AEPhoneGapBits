Ext.define('AE.store.ContactAssignImages', {
    extend  : 'Ext.data.Store',
    config: {
        model   : 'AE.model.ContactAssignImage',
        pageSize: 500,
        proxy: {
            type: 'ajax',
            url : AE.config.baseUrl + '/EmailDetail/GetAllImagesByUsername',
            reader: {
                type: 'json',
                rootProperty: 'Data',
                idProperty: 'Id'
            },
            listeners: {
                exception: function (proxy, response, operation, eOpts) {
                    AE.ajaxErrorLog(proxy.getUrl(), response.responseText, response.status, response.statusText);
                }
            }
        }
    }
});