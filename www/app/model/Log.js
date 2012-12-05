Ext.define('AE.model.Log', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'Id',  type: 'int'},
            {name: 'Type',  type: 'string'},
            {name: 'Value',  type: 'string'}
        ]
    }
});