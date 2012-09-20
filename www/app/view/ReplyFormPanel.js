Ext.define('AE.view.ReplyFormPanel', {
    extend: 'Ext.Panel',
    xtype : 'replyformpanel',
    config: [{
        items: [{
            xtype: 'formpanel',
            id: 'replyFormPanel',
            layout: 'fit',
            items: [
                {
                    xtype: 'fieldset',
                    defaults: {
                        labelAlign: 'left',
                        labelWidth: 150
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'replySubject',
                        label: 'Subject'
                    }, {
                        xtype: 'textareafield',
                        autoCorrect: true,
                        autoComplete: true,
                        autoCapitalize: true,
                        name: 'replyMessage',
                        label: 'Message'
                    }]
                }
            ]
        }]
    }]
});
