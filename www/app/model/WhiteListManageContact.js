Ext.define('AE.model.WhitelistManageContact', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'PersonId',
        fields: [
            {name: 'EmailAddress',  type: 'string'},
            {name: 'Id',  type: 'int'},
            {name: 'FirstName',  type: 'string'},
            {name: 'LastName',  type: 'string'},
            {name: 'PersonId',  type: 'int'},
            {name: 'WhiteList',  type: 'boolean'}
        ]
    }
});