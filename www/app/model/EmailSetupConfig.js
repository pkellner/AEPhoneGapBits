Ext.define('AE.model.EmailSetupConfig', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'Id',  type: 'int'},
            {name: 'accountType',  type: 'string'},
            {name: 'serverType',  type: 'string'},
            {name: 'serverNameIn',  type: 'string'},
            {name: 'serverNameOut',  type: 'string'},
            {name: 'serverPort',  type: 'int'},
            {name: 'useSSL',  type: 'bool'},
            {name: 'serverPortOut',  type: 'int'},
            {name: 'useSSLOut',  type: 'bool'}
        ]
    }
});