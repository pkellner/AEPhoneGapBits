Ext.define('AE.model.Account', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'Id',  type: 'int'},
            {name: 'AEUsername',  type: 'string'},
            {name: 'AERecoveryEmail',  type: 'string'},
            {name: 'AccountType',  type: 'string'},
            {name: 'FromEmailAddress',  type: 'string'},
            {name: 'ServerUsername',  type: 'string'},
            {name: 'ServerType',  type: 'string'},
            {name: 'ServerNameIn',  type: 'string'},
            {name: 'ServerNameOut',  type: 'string'},
            {name: 'ServerPort',  type: 'int'},
            {name: 'ServerPortOut',  type: 'int'},
            {name: 'ServerUseSSL',  type: 'bool'},
            {name: 'ServerUseSSLOut',  type: 'bool'}
        ]
    }
});