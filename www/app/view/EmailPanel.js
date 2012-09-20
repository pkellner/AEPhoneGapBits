Ext.define('AE.view.EmailPanel', {
    extend: 'Ext.Panel',
    xtype : 'emailpanel',
    requires: [
        'Ext.Img'
    ],
    config: {
        ui: 'emailBody',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        cls: 'emailPanel',
        tpl: Ext.create('Ext.XTemplate',
            '<div class="header">' +
                '<div class="subject">{Subject}</div>' +
                '<div class="details"><span class="label">Sent: </span>{EmailSentDatePretty} ' +
                '<div id="emailReadStatus_{EmailDetailId}" class="emailReadStatus {EmailReadStatus}' +
                '<tpl if="EmailViewed">' +
                    'read' +
                '<tpl else>' +
                    'unread' +
                '</tpl>' +
                '"></div></div><div style="clear: both"></div>' +
            '</div>' +
            '<div class="body" id="emailBody_{EmailDetailId}">{Body}' +
            '</div>'
        )
    }
});