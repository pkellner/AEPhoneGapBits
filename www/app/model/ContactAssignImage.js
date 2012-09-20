Ext.define('AE.model.ContactAssignImage', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'ContentLength', type: 'int'},
            {name: 'ContentTypeMime', type: 'string'},
            {name: 'FileName', type: 'string'},
            {name: 'ImageName', type: 'string'},
            {name: 'FileNameExtension', type: 'string'},
            {name: 'Id'},
            {name: 'ImageCreation', type: 'string'},
            {name: 'ImageDataBytes', type: 'string'},
            {name: 'ModifiedDate', type: 'string'},
            {name: 'UrlPrefix', type: 'string'}
        ]
    }
});