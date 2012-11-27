Ext.define('AE.controller.Contacts', {
    extend: 'Ext.app.Controller',

    requires: [

    ],

    config: {

        refs: {
            mainWrapperPanel: '#mainWrapperPanel',

            contactsList: 'contactslist',

            emailFilterBtn: '#emailFilterBtn',
            emailFilterToggleBtn: 'segmentedbutton#emailFilterToggleBtn',
            emailFilterToggleAllBtn: '#emailFilterToggleAllBtn',
            emailFilterToggleWhitelistBtn: '#emailFilterToggleWhitelistBtn',

            emailAdvancedFilterBtn: '#emailAdvancedFilterBtn',
            emailAdvancedFilterToggleBtn: '#emailAdvancedFilterToggleBtn',
            emailAdvancedFilterToggleAllBtn: '#emailAdvancedFilterToggleAllBtn',
            emailAdvancedFilterToggleWhitelistBtn: '#emailAdvancedFilterToggleWhitelistBtn',
            emailAdvancedFilterAllSenders: '#emailAdvancedFilterAllSenders',
            emailAdvancedFilterDeletedCheckbox: '#emailAdvancedFilterDeletedCheckbox',
            emailAdvancedFilterViewedCheckbox: '#emailAdvancedFilterViewedCheckbox',


            emailFilterWhitelistCheckbox: '#emailFilterWhitelistCheckbox',
            emailFilterDeletedCheckbox: '#emailFilterDeletedCheckbox',
            emailFilterViewedCheckbox: '#emailFilterViewedCheckbox',
            emailFilterApplyBtn: '#emailFilterApplyBtn',

            toolbarNewEmailBtn: '#toolbarNewEmailBtn',
            toolbarNewEmailBtn2: '#toolbarNewEmailBtn2',

            emailsContainerPanel: '#emailsContainerPanel',
            refreshContactsListBtn: 'button#refreshContactsListBtn',
            refreshContactsListBtn2: 'button#refreshContactsListBtn2',

            contactsArrowUpBtn: '#contactsArrowUpBtn',
            contactsArrowDownBtn: '#contactsArrowDownBtn',

            addWhitelistEmailBtn: '#addWhitelistEmailBtn',
            addWhitelistMultipleEmailBtn: '#addWhitelistMultipleEmailBtn',

            whitelistFirstLoginPanelBtn: '#whitelistFirstLoginPanelBtn',

            addWhitelistEmailBtn2: '#addWhitelistEmailBtn2',
            addWhitelistMultipleEmailBtn2: '#addWhitelistMultipleEmailBtn2',

            whitelistCloseBtn: '#whitelistCloseBtn',
            whitelistSaveBtn: '#whitelistSaveBtn',
            whitelistEmailAddressFieldToAdd: '#whitelistEmailAddressFieldToAdd',
            whitelistManageList: '#whitelistManageList',
            whitelistMultipleCloseBtn: '#whitelistMultipleCloseBtn',
            whitelistMultipleList: '#whitelistMultipleList',

            contactAssignImg: 'contactassignimagepanel img',
            assignImagePanelCloseButton: '#assignImagePanelCloseButton',

            updateContactPanelCloseBtn: 'button#updateContactPanelCloseBtn',
            updateContactSaveFormBtn: 'button#updateContactSaveFormBtn',
            updateContactForm: '#updateContactForm',

            whitelistContactControl: '#whitelistContactControl'

        },

        control: {
            contactsList: {
                select: 'onContactSelect',
                deselect: 'onContactDeselect',
                activate: 'onContactRefresh'
            },
            emailAdvancedFilterBtn: {
                tap: 'onTapEmailFilterBtn'
            },
            emailFilterToggleBtn: {
                toggle: 'onEmailFilterToggleBtn',
                show: 'onPaintEmailFilterToggleBtn'
            },

            emailAdvancedFilterToggleBtn: {
                toggle: 'onEmailFilterToggleBtn',
                show: 'onPaintEmailFilterToggleBtn'
            },

            emailFilterApplyBtn: {
                tap: 'emailFilterApplyBtnHandler'
            },

            refreshContactsListBtn: {
                tap: 'onRefreshContactsListBtn'
            },
            refreshContactsListBtn2: {
                tap: 'onRefreshContactsListBtn'
            },

            contactsArrowUpBtn: {
                tap: 'onTapContactsArrowUpBtn'
            },
            contactsArrowDownBtn: {
                tap: 'onTapContactsArrowDownBtn'
            },

            addWhitelistEmailBtn: {
//                tap: 'onShowWhitelistFirstLoginPanel'
                tap: 'onTapAddWhitelistEmailBtn'
                // restore this
            },

            whitelistFirstLoginPanelBtn: {
                tap: 'onShowWhitelistFirstLoginPanel'
            },

            addWhitelistMultipleEmailBtn: {
                tap: 'onTapAddWhitelistEmailMultipleBtn'
            },

            addWhitelistEmailBtn2: {
                tap: 'onTapAddWhitelistEmailBtn'
            },
            addWhitelistMultipleEmailBtn2: {
                tap: 'onTapAddWhitelistEmailMultipleBtn'
            },

            whitelistCloseBtn: {
                tap: 'onTapWhitelistCloseBtn'
            },
            whitelistMultipleList: {
                select: 'onSelectWhitelistMultipleList'
            },

            whitelistSaveBtn: {
                tap: 'onTapWhitelistSaveBtn'
            },

            whitelistMultipleCloseBtn: {
                tap: 'onTapWhitelistMultipleCloseBtn'
            },

            toolbarNewEmailBtn: {
                tap: 'onTapToolbarNewEmailBtn'
            },

            toolbarNewEmailBtn2: {
                tap: 'onTapToolbarNewEmailBtn'
            },

            contactAssignImg: {
                tap: 'onTapContactAssignImg'
            },
            assignImagePanelCloseButton: {
                tap: 'hideAssignImageSelectorPanel'
            },

            // Update contact

            updateContactPanelCloseBtn: {
                tap: 'updateContactPanelCloseBtnHandler'
            },
            updateContactSaveFormBtn: {
                tap: 'updateContactSaveFormBtnHandler'
            },

            // Contact controls
            whitelistContactControl: {
                tap: 'whitelistContactControlBtnHandler'
            }
        }
    },

    launch: function () {

        if (!AE.app.getController('User').getUserRights('HideIncludeDeletedEmailsRender') || !AE.app.getController('User').getUserRights('HideIncludeViewedEmailsRender') || !AE.app.getController('User').getUserRights('IncludeAllSendersRender') ) {
            this.emailAdvancedFilter = true;
        } else {
            this.emailAdvancedFilter = false;
        }

        // Set filter values
        this.whitelistOnly = AE.app.getController('User').getUserRights('WhiteListOnly');
        this.includeAllSenders = AE.app.getController('User').getUserRights('IncludeAllSenders');
        // Contact buttons
        this.showUpdateAddressBook = AE.app.getController('User').getUserRights('ShowUpdateAddressBook');
        this.showAssignPictureToAddressBook = AE.app.getController('User').getUserRights('ShowAssignPictureToAddressBook');
        this.showAssignToWhiteListButton = AE.app.getController('User').getUserRights('ShowAssignToWhiteListButton');

        if (this.showUpdateAddressBook || this.showAssignPictureToAddressBook || this.showAssignToWhiteListButton) {
            this.showContactButtons = true;
        } else {
            this.showContactButtons = false;
        }

        Ext.getStore('ContactAssignImages').on({
            beforeload: this.contactAssignImagesBeforeLoad,
            load: this.contactAssignImagesLoad,
            scope: this
        });

        // Flag for maintaining selection
        this.maintainSelectedContact = false;

        // Contacts store and add a callback
        Ext.getStore('Contacts').on({
            beforeload: this.onContactsBeforeLoad,
            load: this.onContactStoreLoad,
            refresh: this.onContactStoreRefresh,
            scope: this
        });

        // Whitelist contacts store
        Ext.getStore('WhitelistManageContacts').on({
            load: this.onLoadWhitelistManageContactsStore,
            scope: this
        });

        if (!this.whitelistManagePanel) {
            this.whitelistManagePanel = Ext.create('AE.view.WhitelistManagePanel', {
                id: 'whitelistManagePanel',
                hidden: true
            });

            Ext.Viewport.add([this.whitelistManagePanel]);
        }

        if (!this.whitelistMultipleManagePanel) {
            this.whitelistMultipleManagePanel = Ext.create('AE.view.WhitelistMultipleManagePanel', {
                id: 'whitelistMultipleManagePanel',
                hidden: true
            });

            Ext.Viewport.add([this.whitelistMultipleManagePanel]);
        }

    },

    forms: {
        whitelistManage: {
            idPrefix: 'whitelist',
            fields: [{
                name: 'EmailAddressFieldToAdd',
                type: 'email'
            }]
        }
    },

    // For whitelist toggle buttons
    onEmailFilterToggleBtn: function (segmentedBtn, toggledBtn) {

        var loadContactsStore = false,
            contactsStore = Ext.getStore('Contacts'),
            toggleText = toggledBtn.getText(),
            filterParams,
            whiteListOnlyConfig = AE.app.getController('User').getUserRights('WhiteListOnly');

        // App tracker of whitelist
        if (toggleText == 'Whitelist') {
            if (!this.whitelistOnly) {
                this.whitelistOnly = true;
                loadContactsStore = true;
            }
        } else if (toggleText == 'All') {
            if (this.whitelistOnly) {
                this.whitelistOnly = false;
                loadContactsStore = true;
            }
        } else {
            segmentedBtn.setPressedButtons([
                this.whitelistOnly ? this.getEmailAdvancedFilterToggleWhitelistBtn() : this.getEmailAdvancedFilterToggleAllBtn()
            ]);
            return;
        }

        if (loadContactsStore) {
            if (AE.app.getController('User').getUserRights('RemoteFilter')) {
                this.maintainSelectedContact = false;

                contactsStore.load({
                    scope: this
                });

            } else {
                contactsStore.clearFilter();
                contactsStore.filter('WhiteList', this.whitelistOnly);
            }

        }

    },

    onPaintEmailFilterToggleBtn: function (segmentedBtn) {
        if (this.emailAdvancedFilter) {
            segmentedBtn.setPressedButtons([
                this.whitelistOnly ? this.getEmailAdvancedFilterToggleWhitelistBtn() : this.getEmailAdvancedFilterToggleAllBtn()
            ]);
        } else {
            segmentedBtn.setPressedButtons([
                this.whitelistOnly ? this.getEmailFilterToggleWhitelistBtn() : this.getEmailFilterToggleAllBtn()
            ]);
        }
    },

    emailFilterApplyBtnHandler: function () {

        var contactsStore = Ext.getStore('Contacts'),
            emailAdvancedFilterAllSendersCheckbox = this.getEmailAdvancedFilterAllSenders(),
            emailFilterDeletedCheckbox = this.getEmailAdvancedFilterDeletedCheckbox(),
            emailFilterViewedCheckbox = this.getEmailAdvancedFilterViewedCheckbox(),
            userController,
            emailNotDeleted,
            emailNotViewed,
            remoteFilterConfig;

        userController = AE.app.getController('User');

        if (!userController) {
            AE.logger('User controller not found. Contacts.js:emailFilterApplyBtnHandler', 4);
        }

        // Check first if component is rendered
        // If component is not rendered, param will use the config
        // Not rendered in Mom mode based on config
        if (emailAdvancedFilterAllSendersCheckbox && !emailAdvancedFilterAllSendersCheckbox.getHidden()) {
            this.includeAllSenders = emailAdvancedFilterAllSendersCheckbox.getChecked();
        } else {
            this.includeAllSenders = userController.getUserRights('IncludeAllSenders');
        }

        if (emailFilterDeletedCheckbox && !emailFilterDeletedCheckbox.getHidden()) {
            emailNotDeleted = emailFilterDeletedCheckbox.getChecked();
        } else {
            emailNotDeleted = userController.getUserRights('IncludeDeletedEmails');
        }

        this.includeDeletedEmails = emailNotDeleted;

        if (emailFilterViewedCheckbox && !emailFilterViewedCheckbox.getHidden()) {
            emailNotViewed = emailFilterViewedCheckbox.getChecked();
        } else {
            emailNotViewed = userController.getUserRights('IncludeViewedEmails');
        }

        AE.app.getController('Emails').emailNotDeleted = emailNotDeleted;
        AE.app.getController('Emails').emailNotViewed = emailNotViewed;

        remoteFilterConfig = userController.getUserRights('RemoteFilter');

        if (remoteFilterConfig) {
            // Remote store load
            contactsStore.load({
                limit: 250,
                scope: this
            });
        } else {
            contactsStore.clearFilter();
            contactsStore.filter('WhiteList', userController.getUserRights('WhiteListOnly'));
        }

        if (this.filterPanel) {
            this.filterPanel.hide();
        }
    },

    onRefreshContactsListBtn: function (btn) {

        if (this.selectedContactControlButton) {
            this.selectedContactControlButton.destroy();
        }
        // Maintain the selected contact
        // Selects the contact after refresh
        this.maintainSelectedContact = true;
        if (this.maintainSelectedContact) {
            this.contactsLoadCalledFromRefresh = true;
        }

        this.showToolbarNewEmailBtn = false;
        // Set to normal ui
        if (btn) {
            btn.setUi('normal');
        }

        // Removes all user data
        AE.app.getController('User').resetAppUserData();

        // Resets counter
        AE.app.getController('User').onLoggedInUserInfoToolbarTitle('', '');

        // Loads contacts
        Ext.getStore('Contacts').load();
    },

    onTapToolbarNewEmailBtn: function (btn) {
        btn.hide();

        if (AE.app.getController('UI').device.orientation == 'landscape') {
            this.getRefreshContactsListBtn().show();
        } else {
            this.getRefreshContactsListBtn2().show();
        }

        this.showToolbarNewEmailBtn = false;

        this.onRefreshContactsListBtn();
    },

    onContactsBeforeLoad: function (store) {
//        Filter
        var emailNotDeleted = AE.app.getController('Emails').emailNotDeleted,
            emailNotViewed = AE.app.getController('Emails').emailNotViewed,
            contactsList = this.getContactsList();

        // Values
        // null = shows viewed and unviewed
        // true = shows only viewed
        // false = shows only unviewed

        if (emailNotDeleted)  {
            emailNotDeleted = null;
        } else {
            emailNotDeleted = true;
        }

        if (emailNotViewed)  {
            emailNotViewed = null;
        } else {
            emailNotViewed = true;
        }

        store.getProxy().setExtraParams({
            whitelistOnly: this.whitelistOnly,
            includeAddressBookEntriesWithNoEmailLast: this.includeAllSenders,
            emailNotDeleted: emailNotDeleted,
            emailNotViewed: emailNotViewed,
            limit: 250
        });

        // Delayed Contacts List mask
        if (!this.contactsMaskTask) {
            this.contactsMaskTask = Ext.create('Ext.util.DelayedTask', function () {
                contactsList.setMasked({
                    xtype: 'loadmask',
                    message: 'Loading...'
                });
                contactsList.setMasked(true);
            }, this);
        }

        this.contactsMaskTask.delay(1000);
    },

    onContactStoreRefresh: function (store) {
        if (!AE.app.getController('User').getUserRights('HideNewEmailButton')) {
            store.each(function (record) {
                if (record.get('HasNewEmail')) {
                    this.addNewEmailBtn(record);
                }
            }, this);
        }
    },

    onContactStoreLoad: function(store) {
        var that = this,
            firstItem,
            emailsCarousel = AE.app.getController('Emails').emailsCarousel,
            contactsList = this.getContactsList();

        this.emailCountTracker = {};

        // Fix for bug on ST bug for 2.0.1.1
        // Removing recrds still retains the previous select record on lists
        this.getContactsList().deselectAll();

        // Resume query for getting new email
        this.runQueryNewEmailTask();

        // Cancel mask task
        this.contactsMaskTask.cancel();
        contactsList.unmask();

        if (emailsCarousel) {
            if (store.getCount() == 0) {
                AE.app.getController('Emails').setHiddenEmailCarouselAndBottomBar(true);
                return;
            } else {
                AE.app.getController('Emails').setHiddenEmailCarouselAndBottomBar(false);
            }
        }


        if (this.maintainSelectedContact) {
            if (this.contactsLoadCalledFromRefresh) {

                if (!this.selectedContact) {
                    this.selectedContact = store.getAt(0);
                }
                // If selected contact no longer exists
                // Happens when whitelist is updated
                if (store.findExact('PersonId', this.selectedContact.get('PersonId')) == -1) {
                    this.selectedContact = store.getAt(0);
                }

                this.contactsLoadCalledFromRefresh = false;
                contactsList.select(this.selectedContact, false,false);

                // Reset maintain selected contact
                this.maintainSelectedContact = false;
                // Add contact toolbar
                this.addContactControlButtons();
                // Scroll to the selected contact

                if (AE.app.getController('User').getUserRights('ScrollSelectedSenderToView')) {
                    this.scrollToSelectedContact(store, contactsList);
                }


            }

        } else {

            // Hide bottom control if it's rendered
            AE.app.getController('UI').setHiddenBottomControls(true);

            firstItem = Ext.getStore('Contacts').getAt(0);
            if (firstItem) {
                contactsList.select(firstItem, false, false);
            }

        }

        // This fixes the linking problem of contacts model using 2 stores
        // for tracking new emails
        store.each(function (record) {
            that.emailCountTracker[record.get('Id')] = record.get('NumberEmails');
        });

        // Background contacts store update task
        this.runQueryNewEmailTask();

        // Save time last loaded
        this.lastContactsStoreLoadTime = Date.now();

        this.onContactRefresh(this.getContactsList())

    },

    selectFirstContact: function () {
        this.getContactsList().select(Ext.getStore('Contacts').getAt(0));
    },

    createQueryNewEmailTask: function () {
        this.runQueryNewEmailTask();
    },

    cancelQueryNewEmailTask: function () {
        clearTimeout(this.queryNewEmailTask);
    },

    runQueryNewEmailTask: function () {

        if (this.queryNewEmailTask) {
            this.cancelQueryNewEmailTask();
        }

        this.queryNewEmailTask = setTimeout(Ext.Function.bind(this.queryNewEmail, this), AE.app.getController('User').getUserRights('AddressBookReloadTime'));
    },

    queryNewEmail: function () {

        var that = this,
            whitelist;

        if (AE.urlVars.admin) {
           whitelist = this.whitelistOnly;
        } else {
            whitelist = AE.app.getController('User').getUserRights('WhiteListOnly');
        }

        Ext.Ajax.request({
            url: AE.config.baseUrl + '/EmailDetail/GetLatestMailReceivedDateTime',
            params: {
                whitelist: whitelist
            },
            success: function(response) {
                var responseJson = Ext.decode(response.responseText),
                    ellapsedTimeSinceLastContactsStoreLoad = (Date.now() - that.lastContactsStoreLoadTime) / 1000;

                if (ellapsedTimeSinceLastContactsStoreLoad > responseJson.SecondsAgo) {
                    // Maintain selected contact
                    that.maintainSelectedContact = true;

                    // Show the new email indicator
                    if (!AE.app.getController('User').getUserRights('HideToolbarNewEmailBtn')) {
                        // For admin
                        // Show red refresh button
                        if (AE.urlVars.admin) {
                            if (AE.app.getController('UI').device.orientation == 'landscape') {
                                that.getRefreshContactsListBtn().setUi('red');
                            } else {
                                that.getRefreshContactsListBtn2().setUi('red');
                            }
                        } else {
                            // for Mom
                            // Show the Red New Email button
                            if (AE.app.getController('UI').device.orientation == 'landscape') {
                                that.getToolbarNewEmailBtn().show();
                                that.getRefreshContactsListBtn().hide();
                            } else {
                                that.getToolbarNewEmailBtn2().show();
                                that.getRefreshContactsListBtn2().hide();
                            }
                        }

                        that.showToolbarNewEmailBtn = true;
                    }

                }

                that.runQueryNewEmailTask();

            },
            failure: function (response, options) {

//                Will create a toolbar here to indicate server connection
//                AE.msgBox.alert('Error', 'Error: Server response error' );

                // Resume running task
                AE.logger('queryNewEmail: run task');
                that.runQueryNewEmailTask();

                AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
            }
        });
    },

    emailCountTracker: {},

    addNewEmailBtn: function (record) {
        var domNode, id;
        id = record.get('Id');

        domNode = Ext.DomQuery.selectNode('div#newEmailBtnContainer_' + id);

        if (!AE.app.getController('User').getUserRights('HideEmailImageViewerCounter')) {
//            if (!this.newEmailBtn) {
//                this.newEmailBtn = Ext.create('Ext.Button', {
//                    text: 'New Email',
//                    ui: 'orange',
//                    iconMask: true,
//                    iconCls: 'mail4',
//                    hidden: true,
//                    handler: this.newEmailBtnHandler,
//                    scope: this
//                });
//            }

            this.newEmailBtn = Ext.create('Ext.Button', {
                text: 'New Email',
                ui: 'orange',
                iconMask: true,
                iconCls: 'mail4',
                hidden: true,
                contactRecord: record,
                handler: this.newEmailBtnHandler,
                scope: this
            });

            this.newEmailBtn.setRenderTo(domNode);

            this.newEmailBtn.show({
                type: 'fadeIn'
            });


//            if (this.newEmailBtn.isHidden()) {
//                if (this.newEmailBtnAnimate) {
//                    this.newEmailBtn.show({
//                        type: 'fadeIn'
//                    });
//                    this.newEmailBtnAnimate = false;
//                } else {
//                    this.newEmailBtn.show();
//                }
//            }
        }
    },

    newEmailBtnHandler: function (btn) {

        btn.hide();

        if (!this.selectedContact || this.selectedContact.get('Id') != btn.config.contactRecord.get('Id')) {
            this.selectedContactNewEmailBtn = btn;
            this.getContactsList().select(this.selectedContact);
        } else {
            // Set the HasNewEmail to false so it won't render again the new mail btn
            this.selectedContact.set('HasNewEmail', false);
            this.selectedContact.commit();
            this.addContactControlButtons();

            AE.app.getController('Emails').createInfiniteCarouselItems();
        }

//        this.newEmailBtn.setHidden(true);
    },

    // This will update the Email store and carousel for new email
    newEmailOnSelectedContact: function () {
        // defer loading emails
        AE.app.getController('Emails').deferCreateCarouselItems = false;
//        // query emails
//        AE.app.getController('Emails').remoteEmailLoader();

    },


    onTapEmailFilterBtn: function () {

        var emailNotDeleted,
            emailNotViewed;

        if (!this.emailAdvancedFilter) return;

        if (!this.filterPanel) {

            this.filterPanel = Ext.create('Ext.Panel', {
                hideOnMaskTap: true,
                modal: true,
                width: 240,
                top: 0,
                left: 0,
                defaults: {
                    labelWidth: 160
                },
                items: [{
                    xtype: 'checkboxfield',
                    id: 'emailAdvancedFilterAllSenders',
                    label: 'Include All Senders',
                    hidden: AE.app.getController('User').getUserRights('IncludeAllSendersRender')
                }, {
                    xtype: 'checkboxfield',
                    id: 'emailAdvancedFilterDeletedCheckbox',
                    label: 'Include Deleted',
                    hidden: AE.app.getController('User').getUserRights('HideIncludeDeletedEmailsRender')
                }, {
                    xtype: 'checkboxfield',
                    id: 'emailAdvancedFilterViewedCheckbox',
                    label: 'Include Viewed',
                    hidden: AE.app.getController('User').getUserRights('HideIncludeViewedEmailsRender')
                }, {
                    xtype: 'toolbar',
                    docked: 'bottom',
                    ui: 'blue-dark-flat',
                    items: [{
                        xtype: 'spacer'
                    }, {
                        text: 'Apply',
                        id: 'emailFilterApplyBtn'
                    }]
                }]
            });
        }

        this.filterPanel.showBy(this.getEmailAdvancedFilterBtn());

        emailNotDeleted = AE.app.getController('Emails').emailNotDeleted;

        emailNotViewed = AE.app.getController('Emails').emailNotViewed;

        this.getEmailAdvancedFilterAllSenders().setChecked(this.includeAllSenders);
        this.getEmailAdvancedFilterDeletedCheckbox().setChecked(emailNotDeleted);
        this.getEmailAdvancedFilterViewedCheckbox().setChecked(emailNotViewed);

    },


    filterHandler: function () {

    },


    readEmailTrackerOnSelectedContact: function () {

        var list = this.getContactsList(),
            numberNewEmails = this.selectedContact.get('NumberNewEmails') - 1;
        this.selectedContact.set('NumberNewEmails', numberNewEmails);
        this.selectedContact.commit();

    },

    onContactRefresh: function (list) {
        var that = this,
            contactsStore = list.getStore();

        this.getRefreshContactsListBtn().setUi('normal');

        if (AE.app.getController('User').getUserRights('HideEmailViewedMarker')) {
            list.addCls('hideNewEmailCount');
        }

            contactsStore.each(function (record) {
                var recordId = record.get('Id'),
                    listItemEl;

                    // Private method: getViewItems
                    listItemEl = list.container.getViewItems()[list.getStore().indexOfId(recordId)];

                    if (AE.app.getController('User').getUserRights('ShowNewEmailBorder')) {
                        if (Ext.isElement(listItemEl)) {
                            listItemEl = Ext.get(listItemEl);
                        }

                        if (listItemEl) {
                            listItemEl.addCls('hasNewEmail');
                        }
                    }
            });

//            Ext.Object.each(this.hasNewEmailRecords, function (value, idx, emailRecords) {
//                var listItemEl, record;
//
//                record = list.getStore().indexOfId(value)
//
//                if (record == -1) {
//                    return;
//                }
//                // Private method: getViewItems
//                listItemEl = list.container.getViewItems()[list.getStore().indexOfId(value)];
//
//                if (Ext.isElement(listItemEl)) {
//                    listItemEl = Ext.get(listItemEl);
//                }
//                console.info(value)
//                if (listItemEl) {
//                    listItemEl.addCls('hasNewEmail');
//                }
//
//            });

    },

    // Contact list selection
    onContactSelect: function(list, contact) {

        if (this.assignImageSelectorPanel && !this.assignImageSelectorPanel.isHidden()) {
            this.hideAssignImageSelectorPanel();
        }

        this.selectedContact = contact;
        this.selectedContactIndex = Ext.getStore('Contacts').find('Id', contact.get('Id'));

        if (this.selectedContact.get('NumberEmails') == 0) {
            AE.app.getController('Emails').setHiddenEmailCarouselAndBottomBar(true);
            AE.app.getController('Emails').showMessageOnEmailCarouselContainer('<div id="hasMessageOnEmailContainerPanel">There is no Email from this Sender.</div>');
        } else {
            AE.app.getController('Emails').setHiddenEmailCarouselAndBottomBar(false);
            AE.app.getController('Emails').showContactEmail(contact);

            AE.app.getController('Emails').hideMessageOnEmailCarouselContainer();

            if (this.selectedContactNewEmailBtn) {
                this.selectedContactNewEmailBtn.hide();
            }

            // Set the HasNewEmail to false so it won't render again the new mail btn
            this.selectedContact.set('HasNewEmail', false);
            this.selectedContact.commit();
        }



        // Private method
//        this.selectedContactHtml = list.container.getViewItems()[list.getStore().indexOf(contact)];
//        this.selectedContactHtmlId = list.container.getViewItems()[list.getStore().indexOf(contact)];

        this.addContactControlButtons();

        // Hide new email button if it's shown on previous selected contact
//        if (this.newEmailBtn) {
//            this.newEmailBtn.setHidden(true);
//            // set to true so first show will animate
//            this.newEmailBtnAnimate = true;
//        }

    },

    onContactDeselect: function(list, contact) {

    },

    addContactControlButtons: function () {
        var contact = this.selectedContact,
            selectedContactEl;

        if (!this.showContactButtons) {
            return;
        }

        selectedContactEl = Ext.DomQuery.selectNode('div#contactToolbar_' + contact.data.PersonId);

        if (selectedContactEl) {

            if (!this.contactToolbar) {
                this.contactToolbar = Ext.create('Ext.Toolbar', {
                    cls: 'contactControlToolbar',
                    renderTo: selectedContactEl,
                    items: [{
                        id: 'updateContactControl',
                        iconCls:'address_book',
                        ui: 'orange',
                        iconMask:true,
                        text: 'Update',
                        hidden: !this.showUpdateAddressBook,
                        handler: this.updateContactControlHandler,
                        scope: this
                    }, {
                        id: 'whitelistContactControl',
                        iconCls:'add',
                        ui: 'orange',
                        iconMask:true,
                        text: 'Whitelist',
                        hidden: !this.showAssignToWhiteListButton
                    }, {
                        id: 'assignPictureContactControl',
                        iconCls:'user3',
                        ui: 'orange',
                        iconMask:true,
                        handler: this.showAssignImageSelectorPanel,
                        text: 'Assign Picture',
                        scope: this,
                        hidden: !this.showAssignPictureToAddressBook
                    }]
                });
            } else {
                this.renderContactToolbarToContactNode();
            }

            if (this.selectedContact.get('WhiteList')) {
                this.getWhitelistContactControl().setUi('orange-dark-flat');
                this.getWhitelistContactControl().setIconCls('minus1');

            } else {
                this.getWhitelistContactControl().setUi('orange');
                this.getWhitelistContactControl().setIconCls('add');
            }
        }

    },

    updateContactControlHandler: function () {

        if (!this.updateContactPanel) {
            this.updateContactPanel = Ext.create('AE.view.UpdateContactPanel', {
                hidden: true,
                id: 'updateContactPanel'
            });

            Ext.Viewport.add([this.updateContactPanel]);
            // Add to list of floating panels
            AE.app.getController('UI').addToListFloatingPanels(this.updateContactPanel);
        }
        // Hide other floating panels
        AE.app.getController('UI').hideFloatingPanels('updateContactPanel');

        this.updateContactSetForm();
        this.updateContactPanel.show();

    },

    updateContactSetForm: function () {
        var selectedContact = this.selectedContact;

        this.getUpdateContactForm().setValues(selectedContact.data);

    },

    updateContactSaveFormBtnHandler: function () {

        var that = this,
            selectedContact = this.selectedContact,
            contactFormValues = this.getUpdateContactForm().getValues();

        contactFormValues.Id = selectedContact.data.Id;

        Ext.Viewport.mask({
            xtype: 'loadmask',
            message: 'Updating Contact...'
        });

        Ext.Ajax.request({
            url: AE.config.baseUrl + '/EmailDetail/UpdateAddressBookEntry',
            params: contactFormValues,
            success: function(response){

                var responseJson = Ext.decode(response.responseText),
                    selectedRecordData, recordUpdate;

                Ext.Viewport.unmask();

                if (responseJson.success) {

                    that.updateContactPanelCloseBtnHandler();

                    selectedContact.set('FirstName', contactFormValues.FirstName);
                    selectedContact.set('LastName', contactFormValues.LastName);
                    selectedContact.set('City', contactFormValues.City);
                    selectedContact.set('State', contactFormValues.State);
                    selectedContact.set('Zip', contactFormValues.Zip);
                    selectedContact.commit();

                    // Add the toolbar again
                    // Seems the toolbar is hidden when List dom is updated
                    // It might be overwriting the template
                    that.renderContactToolbarToContactNode();
                } else {
                    AE.msgBox.alert('Error', 'Error: ' + responseJson.message);
                }
            },
            failure: function (response, options) {
                Ext.Viewport.unmask();

                AE.msgBox.alert('Error', 'Error: Server response error' );

                AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
            }
        });
    },

    renderContactToolbarToContactNode: function () {
        if (this.selectedContact && this.contactToolbar) {
            this.contactToolbar.setRenderTo(Ext.DomQuery.selectNode('div#contactToolbar_' + this.selectedContact.data.PersonId));
        }
    },

    updateContactPanelCloseBtnHandler: function () {

        this.updateContactPanel.hide();

    },

    whitelistContactControlBtnHandler: function () {

        var that = this,
            selectedContact = this.selectedContact;

        if (selectedContact.get('WhiteListProcessing')) {
            return;
        }

        selectedContact.set('WhiteListProcessing', true);
        selectedContact.commit();
        // This prevents flashing
        this.addContactControlButtons();

        Ext.Ajax.request({
            url: AE.config.baseUrl + '/EmailDetail/UpdateAddressBookEntryWhiteList',
            params: {
                addressBookEntryId: selectedContact.data.Id,
                whiteList: !selectedContact.data.WhiteList
            },
            success: function(response) {

                var responseJson = Ext.decode(response.responseText);

                if (responseJson.success) {

                    if (selectedContact.data.WhiteList) {
                        selectedContact.set('WhiteList', false);
                        selectedContact.commit();
                        if (that.whitelistOnly) {
                            that.removeSelectedContact();
                        }
                    } else {
                        selectedContact.set('WhiteList', true);
                        selectedContact.commit();
                    }
                    // This prevents flashing
                    setTimeout(function () {
                        that.addContactControlButtons();
                    }, 1);

                } else {
                    AE.logger('WhiteList message: '. reponseJson.message);
                }

                selectedContact.set('WhiteListProcessing', false);
                selectedContact.commit();

            },
            failure: function (response, options) {
                // Set processing to false so on next view invoke, markEmailAsViewed can be run
                selectedContact.set('WhiteListProcessing', false);
                selectedContact.commit();

                AE.msgBox.alert('Error', 'Error: Server response error' );

                AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
            }
        });

    },

    showAssignImageSelectorPanel: function () {

        if (this.assignImageSelectorPanel && !this.assignImageSelectorPanel.isHidden()) {
            this.hideAssignImageSelectorPanel();
        } else {
            if (!this.assignImageSelectorPanel) {
                this.assignImageSelectorPanel = Ext.create('AE.view.ContactAssignImagePanel', {
                    hidden: true,
                    id: 'contactAssignImagePanel'
                });

                this.getMainWrapperPanel().add([this.assignImageSelectorPanel]);
                // Add to list of floating panels
                AE.app.getController('UI').addToListFloatingPanels(this.assignImageSelectorPanel);
            }

            this.getAllImagesByUsername();

            // Hide other floating panels
            AE.app.getController('UI').hideFloatingPanels('contactAssignImagePanel');

            this.assignImageSelectorPanel.show();
        }

    },

    getAllImagesByUsername: function () {
        Ext.getStore('ContactAssignImages').load();
    },

    contactAssignImagesBeforeLoad: function (store) {
        var userAccount = Ext.getStore('Accounts').first();

        store.getProxy().setExtraParams({
            Username: userAccount.data.AEUsername
        });
    },

    contactAssignImagesLoad: function (store) {

        var contactImages = [];

        this.assignImageSelectorPanel.removeAll();

        store.each(function (record) {
            contactImages.push({
                xtype: 'image',
                src: AE.config.baseUrl  + '/'+ record.data.UrlPrefix +'/'+ record.data.ImageName +'.jpg?width=125',
                recordImageId: record.data.Id,
                recordImageName: record.data.ImageName,
                recordUrlPrefix: record.data.UrlPrefix,
                cls: 'imagesThumb',
                width: 125,
                height: 94
            });
        });

        this.assignImageSelectorPanel.add(contactImages);
    },

    hideAssignImageSelectorPanel: function () {

        delete this.selectedContactImg;

        this.assignImageSelectorPanel.hide();
        return;

    },

    onTapContactAssignImg: function (img, e) {
        var that = this;

        if (this.selectedContactImg) {
            this.selectedContactImg.removeCls('tapped');
            this.selectedContactImg.setHeight(94);
            this.selectedContactImg.setWidth(125);
        }
            img.addCls('tapped');
            this.selectedContactImg = img;
            this.selectedContactImg.setHeight(102);
            this.selectedContactImg.setWidth(133);

        setTimeout(function () {
            Ext.Anim.run(that.selectedContactImg, 'fade', {
                out: true,
                duration: 800,
                autoClear: false
            });
        }, 500);

        setTimeout(function () {
            that.onAssignSelectedPictureButton();
        }, 1500);
    },

    onAssignSelectedPictureButton: function () {

        var that = this,
            recordImageId,
            selectedContact = this.selectedContact,
            selectedContactImg = this.selectedContactImg.config;

        if (this.selectedContactImg && this.selectedContactImg.config.recordImageId) {

            recordImageId = selectedContactImg.recordImageId;
            Ext.Ajax.request({
                url: AE.config.baseUrl + '/EmailDetail/AssignPictureToAddressBookEntryId',
                params: {
                    imageDetailId: recordImageId,
                    addressBookEntryId: selectedContact.data.Id
                },
                success: function(response){
                    var responseJson = Ext.decode(response.responseText),
                        contactImg;
                    if (responseJson.success) {

                        contactImg = Ext.get('contactImg_' + selectedContact.data.Id);

                        contactImg.dom.src = '/'+ selectedContactImg.recordUrlPrefix +'/'+ selectedContactImg.recordImageName +'?width=84&height=84&scale=both';
                        selectedContact.set('PersonImageUrlUrlPrefix', selectedContactImg.recordUrlPrefix);
                        selectedContact.set('PersonImageUrlImageName', selectedContactImg.recordImageName);
                        selectedContact.commit();

                        that.renderContactToolbarToContactNode();

//                        Ext.Anim.run(contactImg, 'fade', {
//                            out: true,
//                            scope: that,
//                            after: function () {
//                                contactImg.dom.src = '/'+ selectedContactImg.recordUrlPrefix +'/'+ selectedContactImg.recordImageName +'?width=84&height=84&scale=both';
//                                Ext.Anim.run(contactImg, 'fade', {
//                                    out: false,
//                                    scope: that
//                                });
//                                selectedContact.set('PersonImageUrlUrlPrefix', selectedContactImg.recordUrlPrefix);
//                                selectedContact.set('PersonImageUrlImageName', selectedContactImg.recordImageName);
//                                selectedContact.commit();
//
//                                that.renderContactToolbarToContactNode();
//                            }
//                        });

                        that.hideAssignImageSelectorPanel();

                    } else {
                        AE.msgBox.alert('Error', 'Error: ' + responseJson.message);
                    }
                },
                failure: function (response, options) {
                    Ext.Viewport.unmask();

                    AE.msgBox.alert('Error', 'Error: Server response error' );

                    AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
                }
            });
        }
    },

    updateSelectedContactEmailCountOnDelete: function () {
        var numberEmails = this.selectedContact.get('NumberEmails');

        this.selectedContact.set('NumberEmails', numberEmails - 1);
        this.selectedContact.commit();

        this.emailCountTracker[this.selectedContact.get('Id')] = numberEmails - 1;

    },

    scrollToSelectedContact: function (store, contactsList) {
        var that = this;

        // Add a timeout to wait for the previous selected contact to be selected on the dom
        setTimeout(function () {

            var idx = store.indexOf(that.selectedContact),
                els = contactsList.container.getViewItems(),
                el = els[idx],
                offset = el.offsetTop,
                scroller = contactsList.getScrollable().getScroller(),
                containerMaxPosY = scroller.maxPosition.y;

            if (containerMaxPosY > offset) {
                // Let the item on top peek
                if (offset != 0) {
                    offset -= 60;
                }
                contactsList.getScrollable().getScroller().scrollTo(0, offset, true)
            } else {
                contactsList.getScrollable().getScroller().scrollTo(0, containerMaxPosY, true)
            }

        }, 500);

    },

    onTapContactsArrowUpBtn: function () {
        var list = this.getContactsList(),
            scrollToSizeY = AE.config.contactsListScrollToYLength,
            scroller = list.getScrollable().getScroller(),
            currentScrollPositionY = scroller.position.y,
            containerMinPosY = scroller.minPosition.y,
            nextYPosition;
        if (containerMinPosY < currentScrollPositionY) {

            if ((currentScrollPositionY - scrollToSizeY) >  containerMinPosY) {
                nextYPosition = currentScrollPositionY - scrollToSizeY;
            } else {
                nextYPosition = (containerMinPosY - currentScrollPositionY) + currentScrollPositionY;
            }

            list.getScrollable().getScroller().scrollTo(0, nextYPosition, true);
        }
    },

    onTapContactsArrowDownBtn: function () {
        var list = this.getContactsList(),
            scrollToSizeY = AE.config.contactsListScrollToYLength,
            scroller = list.getScrollable().getScroller(),
            currentScrollPositionY = scroller.position.y,
            containerMaxPosY = scroller.maxPosition.y,
            nextYPosition;

        if (containerMaxPosY > currentScrollPositionY) {

            if ((currentScrollPositionY + scrollToSizeY) <  containerMaxPosY) {
                nextYPosition = currentScrollPositionY + scrollToSizeY;
            } else {
                nextYPosition = (containerMaxPosY - currentScrollPositionY) + currentScrollPositionY;
            }

            list.getScrollable().getScroller().scrollTo(0, nextYPosition, true);
        }
    },

    onLoadWhitelistManageContactsStore: function (store) {
        store.sort('EmailAddress', 'ASC');
    },

    onTapAddWhitelistEmailMultipleBtn: function () {
        Ext.getStore('WhitelistManageContacts').load({
            params: {
                whitelistOnly: false
            }
        });

        this.whitelistMultipleManagePanel.show();

    },

    onSelectWhitelistMultipleList: function(list, contact) {

        var recordData = contact.getData(),
            whiteList = true;

        if (recordData.WhiteList) {
            whiteList = false;
        }

        Ext.Ajax.request({
            url: AE.config.baseUrl + '/EmailDetail/UpdateAddressBookEntryWhiteList',
            params: {
                addressBookEntryId: recordData.Id,
                whiteList: whiteList
            },
            success: function(response) {

                var responseJson = Ext.decode(response.responseText);

                if (responseJson.success) {
                    contact.set('WhiteList', whiteList);
                    contact.commit();
                } else {
                    AE.logger('WhiteList message: '. reponseJson.message);
                }

            },
            failure: function (response, options) {

                AE.msgBox.alert('Error', 'Error: Server response error' );

                AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
            }
        });

        list.deselectAll();

    },

    onTapWhitelistMultipleCloseBtn: function () {
        this.onRefreshContactsListBtn();
        this.whitelistMultipleManagePanel.hide();
    },

    onTapAddWhitelistEmailBtn: function () {

        Ext.getStore('WhitelistManageContacts').load();

        this.whitelistManagePanel.show();

        AE.app.getController('UtilClass').clearFormChecks(this.forms.whitelistManage, true);
    },

    onTapWhitelistCloseBtn: function () {
        this.onRefreshContactsListBtn();
        this.whitelistManagePanel.hide();
    },

    onTapWhitelistSaveBtn: function (btn) {

        var whitelistManageContactsStore = Ext.getStore('WhitelistManageContacts'),
            whitelistEmailAddressFieldToAdd = Ext.getCmp('whitelistEmailAddressFieldToAdd'),
            formValues = {
                EmailAddressFieldToAdd: whitelistEmailAddressFieldToAdd.getValue()
            };

        if (!AE.app.getController('UtilClass').formChecker(this.forms.whitelistManage, formValues)) {
            return;
        }

        if (whitelistManageContactsStore.findExact('EmailAddress', formValues.EmailAddressFieldToAdd) != -1) {
            AE.msgBox.alert('Error', 'The Email Address that you entered is already on the Whitelist. ');
        } else {

            whitelistEmailAddressFieldToAdd.disable();
            btn.disable();

            Ext.Ajax.request({
                url: AE.config.baseUrl + '/Account/AddEmailAddressToAddressBook',
                method: 'POST',
                params: {
                    emailAddress: formValues.EmailAddressFieldToAdd
                },
                success: function (response) {

                    var responseJson = Ext.decode(response.responseText);

                    if (responseJson.Success) {
                        AE.app.getController('UtilClass').clearFormChecks(this.forms.whitelistManage, true);

                        Ext.getStore('WhitelistManageContacts').load();
                    } else {
                        AE.msgBox.alert('Error', 'Server error: ' + responseJson.Message, Ext.emptyFn);
                    }

                    whitelistEmailAddressFieldToAdd.enable();
                    btn.enable();

                },
                failure: function (response) {

                    var responseJson = Ext.decode(response.responseText);

                    AE.msgBox.alert('Error', 'Error: ' + responseJson.message, function () {

                    });

                    whitelistEmailAddressFieldToAdd.enable();
                    btn.enable();
                },
                scope: this
            });

        }

    },

    removeSelectedContact: function () {
        var contactsStore = Ext.getStore('Contacts');

        contactsStore.remove(this.selectedContact);

        if (Ext.getStore('Contacts').getCount()) {
            if (this.selectedContactIndex == 0) {
                // Select the next contact if the deleted contact is the first
                this.getContactsList().select(contactsStore.first());
            } else {
                // If the selected contact is second contact or the end
                // Then on delete, select the above contact
                this.getContactsList().select(contactsStore.getAt(--this.selectedContactIndex));
            }
        } else {
            // If 0 contacts records
            // then hide the container panel
            this.getEmailsContainerPanel().hide();

            // Hide bottom control if it's rendered
            AE.app.getController('UI').setHiddenBottomControls(true);
        }



    }

});