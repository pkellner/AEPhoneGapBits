Ext.define('AE.model.EmailPicture', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'url'},
            {name: 'preloaded',  type: 'boolean'},
            {name: 'rendered',  type: 'boolean'},
            {name: 'renderedId'}
        ]
    }
});