Ext.define('AE.view.ContactsList', {

    extend:'Ext.dataview.List',
    xtype:'contactslist',
    requires:[
        'Ext.SegmentedButton',
        'Ext.TitleBar',
        'AE.view.SettingsPanel'
    ],

    config:{
        ui:'contacts',
        cls:'contactsList',
        loadingText: false,
        scrollTopTopOnRefresh: false,
        scrollable: {
            direction: 'vertical'
        },
        store:'Contacts',
//        defaultType: 'contactslistitem',
        allowDeselect:false,
//        useComponents: true,
        emptyText:'No Contacts',
        itemTpl: new Ext.XTemplate('<div><div class="contact" style="clear: both">' +
            '<div id="contactListName_{PersonId}" class="name">' +
            '<tpl if="FirstName == \'\' && LastName == \'\'">' +
            '{EmailAddress}' +
            '<tpl else>' +
            '{FirstName} {LastName}' +
            '</tpl>' +
            '</div>' +
            '<div class="avatar"><img id="contactImg_{PersonId}" src="'+ AE.config.baseUrl +'/{PersonImageUrlUrlPrefix}/{PersonImageUrlImageName}?width=84&height=84&scale=both" alt="{FirstName} {LastName}" /></div>' +

            '<div class="user">' +

            '<div class="info">' +
            '<div class="weather ' +
            '<tpl if="WeatherImageUrl == \'\' || WeatherImageUrl == \'http:\/\/www.google.com\/\'">' +
                'blank' +
            '</tpl>' +
            '">' +
                '<tpl if="WeatherImageUrl != \'\' && WeatherImageUrl != \'http:\/\/www.google.com\/\'">' +
                    '<img src="{WeatherImageUrl}" />' +
                '</tpl>' +
            '</div>' +
            '<tpl if="CurrentTemperature != \'\'">' +
                '{CurrentTemperature} &#176;F <br />' +
            '</tpl>' +
            '<span  id="contactListCity_{PersonId}">{City}</span> <br /><span id="contactListState_{PersonId}">{State}</span>' +
            '</div>' +
            '</div>' +
            '<div class="emailInfo">' +
            '{NumberEmails} <span class="unread">Email' +
            '<tpl if="NumberEmails != 1">s</tpl>',
            '</span> <br ><div class="numberNewEmails">{NumberNewEmails} <span class="unread">New</span></div><br />' +
            '</div>' +
            '<div class="newEmailBtnContainer" id="newEmailBtnContainer_{PersonId}"></div>' +
            '</div>' +
            '</div>' +
            '</div><div class="contact" style="clear: both"  id="contactToolbar_{PersonId}"></div>',
            {
                disableFormats:true,
                notEmpty:function (strToCheck) {
                    if (strToCheck != '') {
                        return true;
                    }
                }
            }),
            items:[
            {
                xtype:'toolbar',
                id: 'accountToolbar2',
                hidden: true,
                ui:'blue',
                cls: 'accountToolbarRound',
                docked:'top',
                items:[{
                        xtype:'button',
                        id:'refreshContactsListBtn2',
                        iconCls:'refresh',
                        hidden: true,
                        iconMask:true
                    }, {
                        xtype: 'spacer'
                    }, {
                        xtype:'button',
                        id:'toolbarNewEmailBtn2',
                        text: 'New Email',
                        ui: 'red',
                        hidden: true,
                        iconCls:'mail4',
                        iconMask:true
                    }, {
                        xtype:'button',
                        id:'settingsBtn2',
                        iconCls: 'settings9',
                        iconAlign: 'right',
                        hidden: true,
                        iconMask: true
                    },
                    {
                        xtype:'button',
                        id:'logoutBtn2',
                        text: 'Logout'
                    }
                ]
            },
            {
                xtype:'toolbar',
                id: 'accountToolbar',
                ui:'blue',
                cls: 'accountToolbarRound',
                docked:'top',
                items:[
                    {
                        xtype:'segmentedbutton',
                        id:'emailFilterToggleBtn',
                        hidden: true,
                        items:[
                            {
                                id: 'emailFilterToggleAllBtn',
                                text:'All'
                            },
                            {
                                id: 'emailFilterToggleWhitelistBtn',
                                text:'Whitelist'
                            }
                        ]
                    },
                    {
                        xtype:'segmentedbutton',
                        id:'emailAdvancedFilterToggleBtn',
                        allowDepress:false,
                        items:[
                            {
                                id: 'emailAdvancedFilterToggleAllBtn',
                                text:'All'
                            },
                            {
                                id: 'emailAdvancedFilterToggleWhitelistBtn',
                                text:'Whitelist'
                            }, {
                                id: 'emailAdvancedFilterBtn',
                                iconCls:'arrow_down',
                                iconAlign: 'right',
                                iconMask:true
                            }
                        ]
                    },
                    {
                        xtype:'button',
                        id:'refreshContactsListBtn',
                        iconCls:'refresh',
                        hidden: true,
                        iconMask:true
                    }, {
                        xtype:'button',
                        id:'toolbarNewEmailBtn',
                        text: 'New Email !!',
                        ui: 'red',
                        hidden: true,
                        iconCls:'mail4',
                        iconMask:true
                    },
                    {
                        xtype:'spacer'
                    },
                    {
                        xtype:'button',
                        id:'settingsBtn',
                        iconCls: 'settings9',
                        iconAlign: 'right',
                        hidden: true,
                        iconMask: true
                    },
                    {
                        xtype:'button',
                        id:'logoutBtn',
                        text: 'Logout'
                    }
                ]
            }
        ]
    }

});