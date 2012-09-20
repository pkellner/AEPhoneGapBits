Ext.define('AE.model.Email', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'AddressBookEntryId',  type: 'int'},
            {name: 'EmailDetailId',  type: 'int'},
            {name: 'HighPriority', type: 'int' },
            {name: 'BodyTextHtml', type: 'string' },
            {name: 'BodyTextHtmlUrl', type: 'string' },
            {name: 'BodyTextHtmlLength', type: 'string' },
            {name: 'BodyText',  type: 'string'},
            {name: 'BodyTextUrl',  type: 'string'},
            {name: 'BodyTextLength',  type: 'string'},
            {name: 'EmailSentDatePretty',  type: 'string'},
            {name: 'EmailSentDate',  type: 'date', dateFormat: 'MS'},
            {name: 'EmailViewed',  type: 'boolean'},
            {name: 'EmailDeleted',  type: 'boolean'},

            // Internal
            // For app use
            {name: 'EmailViewedProcessing',  type: 'boolean', defaultValue: false},
            {name: 'BodyTextHtmlUrlContent', type: 'string' },
            {name: 'BodyTextUrlContent',  type: 'string'},
            {name: 'BodyContentToUse',  type: 'string'},

            {name: 'FromCity',  type: 'string'},
            {name: 'FromEmail',  type: 'string'},
            {name: 'FromFirstName',  type: 'string'},
            {name: 'FromLastName',  type: 'string'},
            {name: 'FromPersonImage',  type: 'string'},
            {name: 'FromState',  type: 'string'},
            {name: 'FromZip',  type: 'string'},
            {name: 'HighPriority',  type: 'boolean'},
            {name: 'Id',   type: 'int'},
            {name: 'EmailDetailInfoPictureInfos'},
            {name: 'PictureIds'},
            {name: 'PersonId',  type: 'string'},
            {name: 'Subject',  type: 'string'},
            {name: 'WhiteList',  type: 'boolean'}
        ]
    }
});