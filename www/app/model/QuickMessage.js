Ext.define('AE.model.QuickMessage', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'Id',  type: 'int'},
            {name: 'MessageTemplate',  type: 'string'},
            {name: 'SortKey',  type: 'int'},
            {name: 'User',  type: 'int'},
            {name: 'UserId',  type: 'int'}
        ]
    }
});