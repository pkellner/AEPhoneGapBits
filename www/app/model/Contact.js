Ext.define('AE.model.Contact', {
    extend: 'Ext.data.Model',

    config: {
        idProperty: 'PersonId',
        sorters: [
            {
                property : 'TimeUpdated',
                direction: 'DESC'
            }
        ],
        fields: [
            {name: 'City',  type: 'string'},
            {name: 'CurrentCondition',  type: 'string'},
            {name: 'CurrentTemperature',  type: 'string'},
            {name: 'EmailAddress',  type: 'string'},
//            {name: 'EmailSentDateRecent',  type: 'date'},
            {name: 'EmailSentDateRecentPretty',  type: 'string'},
            {name: 'FirstName',  type: 'string'},
            {name: 'Id',  type: 'int'},
            {name: 'LastName',  type: 'string'},
            {name: 'NumberEmails',  type: 'int', default: 0},
            {name: 'NumberNewEmails',  type: 'int', default: 0},
            {name: 'NumberNewPictures',  type: 'int', default: 0},
            {name: 'NumberPictures',  type: 'int'},
            {name: 'PersonId',  type: 'int'},
            {name: 'PersonImageUrl',  type: 'string'},
            {name: 'PersonImageUrlUrlPrefix',  type: 'string'},
            {name: 'PersonImageUrlImageName',  type: 'string'},
            {name: 'ReadStatusCssClass',  type: 'string'},
            {name: 'State',  type: 'string'},
            {name: 'WeatherImageUrl',  type: 'string'},
            {name: 'WhiteList',  type: 'boolean'},
            {name: 'Zip',  type: 'string'},

            // Internal
            // For app use
            {name: 'WhiteListProcessing',  type: 'boolean', defaultValue: false},
            {name: 'HasNewEmail',  type: 'boolean', defaultValue: false},
            {name: 'TimeUpdated',  type: 'int', defaultValue: 0}

        ]
    }
});