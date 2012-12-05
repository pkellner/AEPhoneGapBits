Ext.define('AE.store.WhitelistFirstLoginContacts', {
    extend:'Ext.data.Store',
    config:{
        model:'AE.model.WhitelistFirstLoginContact',
        pageSize: 500,
        proxy:{
            type:'ajax',
            url: AE.config.baseUrl + '/Account/GetFromAddressListFast',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            reader:{
                type:'json',
                rootProperty:'Data',
                idProperty:'Id'
            },
            listeners:{
                exception:function (proxy, response, operation, eOpts) {
                    AE.logger('Exception on Contacts store. store/Contacts.js', 4);
                    AE.ajaxErrorLog(proxy.getUrl(), response.responseText, response.status, response.statusText);

                }
            }
        }
    }
});