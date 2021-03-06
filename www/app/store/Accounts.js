Ext.define('AE.store.Accounts', {
    extend  : 'Ext.data.Store',
    requires: ['AE.model.Account'],
    config: {
        autoLoad: true,
        model   : 'AE.model.Account',
        proxy: {
            type: 'ajax',
            url : AE.config.baseUrl + '/Account/GetLoggedInUser',
            actionMethods: {
                read: 'POST'
            },
            reader: {
                type: 'json',
                idProperty: 'Id'
            },
            listeners: {
                exception: function (proxy, response, operation, eOpts) {
                    AE.logger('Exception on Account store. store/Accounts.js', 4);
                    AE.ajaxErrorLog(proxy.getUrl(), response.responseText, response.status, response.statusText, proxy.getExtraParams());
                }
            }
        }
    }
});