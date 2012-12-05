Ext.define('AE.store.WhitelistManageContacts', {
    extend:'Ext.data.Store',
    config:{
        model:'AE.model.WhitelistManageContact',
        pageSize: 500,
        proxy:{
            type:'ajax',
            url: AE.config.baseUrl + '/EmailDetail/GetPersonsWithEmailByEmailAccount',
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            extraParams: {
                whitelistOnly: true,
                includeAddressBookEntriesWithNoEmailLast: true,
                emailNotDeleted: true
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