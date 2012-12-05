Ext.define('AE.store.EmailsBackground', {
    extend  : 'Ext.data.Store',
    requires: ['AE.model.Email', 'AE.model.EmailPicture'],
    config: {
        model   : 'AE.model.Email',
        pageSize: 100,
        proxy: {
            type: 'ajax',
            url : AE.config.baseUrl + '/EmailDetail/GetEmailByPerson',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            reader: {
                type: 'json',
                rootProperty: 'Data',
                idProperty: 'EmailDetailId'
            },
            listeners: {
                exception: function (proxy, response, operation, eOpts) {
                    AE.ajaxErrorLog(proxy.getUrl(), response.responseText, response.status, response.statusText);
                }
            }
        }
    }
});