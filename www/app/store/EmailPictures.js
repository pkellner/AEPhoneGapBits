Ext.define('AE.store.EmailPictures', {
    extend  : 'Ext.data.Store',
    requires: ['AE.model.EmailPicture', 'Ext.data.reader.Array'],
    config: {
        model   : 'AE.model.EmailPicture',
        proxy: {
            type: 'memory',
            reader: {
                type: 'array'
            }
        }
    }
});