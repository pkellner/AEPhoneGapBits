Ext.define('AE.controller.Emails', {
    extend: 'Ext.app.Controller',

    require: [

    ],

    config: {
        refs: {
            mainContainerPanel: '#mainContainerPanel',

            emailsContainerPanel: '#emailsContainerPanel',
            leftCarouselArrow: '#leftCarouselArrow',
            rightCarouselArrow: '#rightCarouselArrow',

            emailsCarousel: 'carousel#emailsCarousel',

            emailPanel: 'emailpanel',
            emailsImgCarousel: 'emailscarousel img',
            emailsImgCarouselBorder: 'emailscarouselborder img',
            emailsImgCarouselBottomControls: 'emailscarouselbottomcontrols img',

            emailsImgCarouselInfinite: 'emailscarouselinfinite img',

            imgBrowserCloseBtn: '#imgBrowserCloseBtn',
            imageBrowserCarouselContainer: '#imageBrowserCarouselContainer',
            imageBrowserCarousel: 'imagebrowsercarousel',
            imageBrowserPanel: 'imageBrowserPanel',
            emailsImageBottomArrowLeft: 'button#emailsImageBottomArrowLeft',
            emailsImageBottomArrowRight: 'button#emailsImageBottomArrowRight',
            emailsImageBottomCounter: '#emailsImageBottomCounter',

            emailsCarouselBorder: 'emailscarouselborder',

            // Emails Carousel with bottom controls
            emailsCarouselBottomControls: 'emailscarouselbottomcontrols',
            emailCarouselBottomToolbar: '#emailCarouselBottomToolbar',
            emailsBottomArrowLeft: '#emailsBottomArrowLeft',
            emailsBottomArrowRight: '#emailsBottomArrowRight',

            emailsBottomCounter: '#emailsBottomCounter',

            replyPanel: '#replyPanel',
            replyPanelMessageBody: '#replyPanelMessageBody',
            replyPanelSendBtn: '#replyPanelSendBtn',
            replyPanelCloseBtn: '#replyPanelCloseBtn',
            replyPanelTitle: '#replyPanelTitle',
            replyFormPanel: '#replyFormPanel',
            replyFormPanelContainer: '#replyFormPanelContainer',
            replySubjectText: '#replyMessageTextarea',
            recipientPanel: '#recipientPanel',
            replyMessageTextarea: '#replyMessageTextarea',
            replyMessageCard: '#replyMessageCard',
            replyCreateMessageBtn: '#replyCreateMessageBtn',
            replyQuickMessageList: '#replyQuickMessageList',
            replyBackToQuickMessageBtn: '#replyBackToQuickMessageBtn',

            saveQuickMessageBtn: '#saveQuickMessageBtn',

            loggedInUserInfoToolbarTitle: '#loggedInUserInfoToolbarTitle',

            userBtn: '#userBtn'
        },
        control: {
            emailsCarouselBorder: {
                activeitemchange: 'onEmailCarouselActiveItemChange'
            },

            emailsCarouselBottomControls: {
                activeitemchange: 'onEmailCarouselActiveItemChange',
                deactivate: 'onEmailCarouselDeactivate'
            },

            emailsCarousel: {
                activeitemchange: 'onEmailCarouselActiveItemChange'
            },

            emailsContainerPanel: {
                hide: 'onHideEmailsContainerPanel'
            },

            emailsImgCarousel: {
                tap: 'onEmailsImgTap'
            },
            emailsImgCarouselBorder: {
                tap: 'onEmailsImgTap'
            },
            emailsImgCarouselBottomControls: {
                tap: 'onEmailsImgTap'
            },

            emailsImgCarouselInfinite: {
                tap: 'onEmailsImgTap'
            },

            imgBrowserCloseBtn: {
                tap: 'onImgBrowserCloseBtn'
            },
            imageBrowserCarousel: {
                activeitemchange: 'updateEmailImagesCarouselControls'
            },

            emailsImageBottomArrowLeft: {
                tap: 'emailsImageBottomArrowLeftBtnHandler'
            },

            emailsImageBottomArrowRight: {
                tap: 'emailsImageBottomArrowRightBtnHandler'
            },

            replyPanelCloseBtn: {
                tap: 'replyPanelCloseBtnHandler'
            },

            replyPanelSendBtn: {
                tap: 'replyPanelSendBtnHandler'
            },

            replyCreateMessageBtn: {
                tap: 'replyCreateMessageBtnHandler'
            },

            replyBackToQuickMessageBtn: {
                tap: 'replyBackToQuickMessageBtnHandler'
            },

            replyQuickMessageList: {
                selectionchange: 'replyQuickMessageListTap',
                refresh: 'replyQuickMessageListRefresh'
            },

            saveQuickMessageBtn: {
                tap: 'saveQuickMessageBtnHandler'
            },

            userBtn: {
                tap: 'onImageThumbTap'
            }
        },
        routes: {
            'ContactEmail/:Id': 'showContactEmail'
        }
    },

    launch: function () {
        var emailStore = Ext.getStore('Emails'),
            quickMessagesStore = Ext.getStore('QuickMessages');

        this.device = AE.app.getController('UI').device;

        // Whether to use Memory or LocalStorage proxy
        if (!AE.app.getController('User').getUserRights('UseLocalStorageEmailStore')) {
            emailStore.removeAll();
            Ext.getStore('Emails').setProxy({
                type: 'memory',
                reader: {
                    type: 'json'
                }
            });
        }

        // Quick Messages
        quickMessagesStore.on({
            beforeload: this.onQuickMessagesBeforeLoad,
            scope: this
        });

        // Load Emails store and add a callback
        emailStore.on({
            load: this.createInfiniteCarouselItems,
            scope: this
        });

        if (!this.replyPanel) {
            this.replyPanel = Ext.create('AE.view.ReplyPanel', {
                id: 'replyPanel',
                listeners: {
                    resize: this.onResizeReplyPanel,
                    scope: this
                }
            });

            Ext.Viewport.add([this.replyPanel]);

            AE.app.getController('UI').addToListFloatingPanels(this.replyPanel);
        }
    },

    hideAffordances: false,

    emailNotDeleted: false,
    emailNotViewed: false,

    currentViewedEmail: {
        record: null,
        carouselItemIndex: 0
    },

    onQuickMessagesBeforeLoad: function (store) {

        var userAccount = Ext.getStore('Accounts').first();

        store.getProxy().setExtraParams({
            username: userAccount.get('AEUsername')
        });
    },

    replyQuickMessageListRefresh: function () {

        var that = this,
            store = Ext.getStore('QuickMessages');

        store.each(function (record) {
            that.addQuickMsgButtons(record.get('Id'));
        });

    },

    onEmailsBeforeLoad: function (store) {
        var emailNotDeleted = this.emailNotDeleted,
            emailNotViewed = this.emailNotViewed,
            existingEmailDetailIds = null;

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
            emailNotDeleted: emailNotDeleted,
            emailNotViewed: emailNotViewed,
            existingEmailDetailIds: existingEmailDetailIds,
            limit: 250
        });
    },

    remoteEmailLoader: function () {
        var that = this,
            emailsStore = Ext.getStore('Emails'),
            emailNotDeleted = this.emailNotDeleted,
            emailNotViewed = this.emailNotViewed,
            existingEmailDetailIds = [],
            emailsContainerPanel = this.getEmailsContainerPanel(),
            emailsFilteredData, i;

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

        // If cache is enabled
        if (AE.app.getController('User').getUserRights('EnableCacheOfEmails')) {
            // Filter
            emailsStore.clearFilter();
            emailsStore.setFilters({
                property: 'AddressBookEntryId',
                value: that.selectedContact.data.PersonId,
                exactMatch: true
            });

            emailsFilteredData = emailsStore.getData().items;

            if (emailsFilteredData.length) {
                // Get Id for each email
                for (i = 0; i < emailsFilteredData.length; i++) {
                    existingEmailDetailIds[i] = emailsFilteredData[i].data.EmailDetailId;
                }
            }

        } else {
            emailsStore.removeAll();
        }

        if (!this.deferCreateCarouselItems) {
            // Mask timeout
            // Carousel mask
            this.emailMaskTimeout = setTimeout(function () {
//                emailsContainerPanel.setMasked({
//                    xtype: 'loadmask',
//                    message: 'Loading emails...'
//                });
            }, AE.config.emailLoadingMaskTimeout);
        }

        emailsContainerPanel.hide();

        Ext.Ajax.request({
            url : '/EmailDetail/GetEmailByPersonBare',
            method: 'POST',
            timeout: AE.config.GetEmailByPersonTimeoutLimit,
            params: {
                emailNotDeleted: emailNotDeleted,
                emailNotViewed: emailNotViewed,
                existingEmailDetailIds: Ext.encode(existingEmailDetailIds),
                addressBookEntryId: this.selectedContact.data.PersonId,
                limit: 575  // MAKE THIS A CONFIG VARIABLE AND SET IT TO 500 BY DEFAULT pgk 7/28/2012
            },
            success: function(response) {
                var responseJson = Ext.decode(response.responseText);

                // clear mask timeout
                clearTimeout(that.emailMaskTimeout);

                that.compareAndUpdateEmailsStore(responseJson.Data);
            },
            failure: function (response, options) {

                AE.msgBox.alert('Error', 'Error: Server response error from abort 0' );

                AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
            }
        });

    },

    remoteEmailDetailLoader: function (emailDetailId) {
        var that = this;

        Ext.fly('emailBody_' + emailDetailId).setHtml('<div class="loader"><div></div> <br /> Loading email message... </div>');

        Ext.Ajax.request({
            url : '/EmailDetail/GetEmailById',
            method: 'POST',
            timeout: AE.config.GetEmailByPersonTimeoutLimit,
            params: {
                emailDetailId: emailDetailId
            },
            success: function(response) {
                var responseJson = Ext.decode(response.responseText),
                    recordData;
                if (responseJson.total) {
                    recordData = responseJson.Data[0];
                    if (recordData.EmailDetailId == emailDetailId) {
                        that.createImageThumbnailsOnCarousel(recordData);
                        that.remoteEmailBodyLoader(recordData);
                    }
                } else {
                    Ext.fly('emailBody_' + emailDetailId).setHtml('');
                }

            },
            failure: function (response, options) {
                AE.msgBox.alert('Error', 'Error: Server response error from abort : ' + emailDetailId );

                AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
            }
        });


    },
    // Creates the thumbnails on the active email
    createImageThumbnailsOnCarousel: function (recordData) {

        var that = this,
            imgItems = [],
            imagesThumbContainer;

        if (recordData.EmailDetailInfoPictureInfos) {
            Ext.each(recordData.EmailDetailInfoPictureInfos, function (value, index) {
                var imageUrl;

                imageUrl = that.getImageUrl(value, '?width=125&height=94&scale=both');

                imgItems.push({
                    xtype: 'image',
                    //src: '/'+ value.UrlPrefix +'/'+ value.Id +'.jpg?width=125&height=94&scale=both',
                    src:  imageUrl,
                    cls: 'imagesThumb',
                    belongsToEmail: recordData.Id,
                    imgIndex: index,
                    imgId: value.Id,
                    emailDetailInfoPictureInfos: recordData.EmailDetailInfoPictureInfos,
                    width: 125,
                    height: 94
                });
            });

        }

        if (imgItems.length) {
            imagesThumbContainer = Ext.getCmp('imagesThumbContainer_' + recordData.EmailDetailId);
            imagesThumbContainer.setHidden(false);
            imagesThumbContainer.setItems(imgItems);
        }

    },

    // Loads the body of the email
    remoteEmailBodyLoader: function (recordData) {
        var that = this,
            contentToUse;

        if (this.currentViewedEmail.record.get('EmailDetailId') == recordData.EmailDetailId) {

            // Checks what type of content to use
            if (recordData.BodyTextHtmlLength  > 0 && recordData.BodyTextHtmlUrl != 'EMPTY') {
                contentToUse = 'BodyTextHtmlUrl';
            } else if (recordData.BodyTextLength > 0 && recordData.BodyTextUrl != 'EMPTY') {
                contentToUse = 'BodyTextUrl';
            } else {
                // Set to email body to empty to remove loader
                Ext.fly('emailBody_' + recordData.EmailDetailId).setHtml('');
                return;
            }
        }

        Ext.Ajax.request({
            url: recordData[contentToUse],
            params: {

            },
            success: function(response){

                if (response.responseText) {
                    that.writeEmailBodyToCarousel(recordData, response.responseText);
                }

            },
            failure: function (response, options) {

                Ext.Viewport.unmask();

                AE.msgBox.alert('Error', 'Error: Server response error from abort 1' );

                AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);

            }
        });

    },

    writeEmailBodyToCarousel: function (recordData, reponseText) {
        if (this.currentViewedEmail.record.get('EmailDetailId') == recordData.EmailDetailId) {
            Ext.fly('emailBody_' + recordData.EmailDetailId).setHtml(reponseText);
        }
    },

    onEmailsBackgroundBeforeLoad: function (store) {
        var that = this,
            emailsStore = Ext.getStore('Emails'),
            emailNotDeleted = this.emailNotDeleted,
            emailNotViewed = this.emailNotViewed,
            existingEmailDetailIds = [],
            emailsFilteredData, i;

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

        emailsStore.setFilters({
            property: 'AddressBookEntryId',
            value: that.selectedContact.data.PersonId,
            exactMatch: true
        });

        emailsFilteredData = emailsStore.getData().items;

        if (emailsFilteredData.length) {
            // Get Id for each email
            for (i = 0; i < emailsFilteredData.length; i++) {
                existingEmailDetailIds[i] = emailsFilteredData[i].data.EmailDetailId;
            }
        }

        store.getProxy().setExtraParams({
            whitelistOnly: this.whitelistOnly,
            emailNotDeleted: emailNotDeleted,
            emailNotViewed: emailNotViewed,
            existingEmailDetailIds: Ext.encode(existingEmailDetailIds),
            addressBookEntryId: this.selectedContact.data.PersonId,
            limit: 250
        });
    },

    compareAndUpdateEmailsStore: function (jsonData) {

        var emailsStore = Ext.getStore('Emails'),
            emailBgRecord, emailRecordIdx, i;

        for (i = 0; i < jsonData.length; i++) {

            emailBgRecord = jsonData[i];
            emailRecordIdx = emailsStore.findExact('EmailDetailId', emailBgRecord.EmailDetailId);

            if (emailRecordIdx == -1) {
                // Run cache manager
                this.emailStoreCacheManager();

                emailsStore.add(emailBgRecord);
                AE.logger('Add record');
            } else {
                AE.logger('Record exists');
            }

            this.localStorageCounterUpdater();
        }

        this.localStorageCounterUpdater();

        // Create emails carousel
        if (!this.deferCreateCarouselItems) {
            this.createInfiniteCarouselItems();
        } else {
            // Add the new email button
            // Add this when the new email is loaded
//            AE.app.getController('Contacts').addNewEmailBtn(this.selectedContact);
            this.deferCreateCarouselItems = false;

        }

    },


    // Frees memory
    emailStoreCacheManager: function () {

        if (AE.app.getController('User').getUserRights('UseLocalStorageEmailStore')) {
            var localStorageSize = (unescape(encodeURIComponent(JSON.stringify(localStorage))).length) / 1024 / 1024,
                emailsStore = Ext.getStore('Emails'),
                emailsStoreCount = emailsStore.getData().all.length,
                recordToRemove, i;

            // Check if store has reached limited
            if (localStorageSize > AE.config.EmailStoreLocalStorageLimit) {

                // remove records if limit is reached
                if (emailsStoreCount > AE.config.EmailStoreCacheManagerNumberOfRecordToRemove) {

                    for (i = emailsStoreCount; i >= (emailsStoreCount - AE.config.EmailStoreCacheManagerNumberOfRecordToRemove); i--) {

                        recordToRemove = emailsStore.getData().all[0];

                        // Check if this record is not on the select addressee
                        if (recordToRemove.get('AddressBookEntryId') != this.selectedContact.data.PersonId) {
                            AE.logger('remove record');
                            emailsStore.remove(recordToRemove);
                        }
                    }

                    localStorageSize = (unescape(encodeURIComponent(JSON.stringify(localStorage))).length) / 1024 / 1024;
                    // Run local storage cache manager again if size still exceeds
                    if (localStorageSize > AE.config.EmailStoreLocalStorageLimit) {
                        this.emailStoreCacheManager();
                    }

                }
            }

        }

    },

    // updates memory used for localStorage
    localStorageCounterUpdater: function () {
        if (AE.app.getController('User').getUserRights('UseLocalStorageEmailStore') && !AE.app.getController('User').getUserRights('HideLoggedInUserInfoToolbar')) {
            var localStorageSize = (unescape(encodeURIComponent(JSON.stringify(localStorage))).length) / 1024 / 1024,
                emailsStore = Ext.getStore('Emails'),
                emailsStoreCount = emailsStore.getData().all.length,
                userBarTitle;

            userBarTitle = emailsStoreCount + ' | ' + localStorageSize.toFixed(3) + ' MB used | '+ (AE.config.EmailStoreLocalStorageLimit - localStorageSize).toFixed(3)  +' MB free';
            AE.logger(userBarTitle);
            AE.app.getController('User').onLoggedInUserInfoToolbarTitle('', userBarTitle + '<br />');
        }
    },

    updateEmailCountOnCarouselBottom: function (carouselItemsCount, activeItemIndex) {

        if (!AE.app.getController('User').getUserRights('HideEmailCarouselCounter')) {

            if (!activeItemIndex) {
                activeItemIndex = this.carouselActiveItemIndex ? this.carouselActiveItemIndex : 1;
            }

            this.getEmailsBottomCounter().setTitle(activeItemIndex + ' of ' + carouselItemsCount)
        }
    },

    // Emails loader
    // Param: contact record. Uses contact Id
    showContactEmail: function (contact) {
//        var emailNotDeleted = this.emailNotDeleted,
//            emailNotViewed = this.emailNotViewed;
        // Values
        // null = shows viewed and unviewed
        // true = shows only viewed
        // false = shows only unviewed
//
//        if (emailNotDeleted)  {
//            emailNotDeleted = null;
//        }
//
//        if (emailNotViewed)  {
//            emailNotViewed = null;
//        }

        // Selected contact
        this.selectedContact = contact;

//        emailsBgStore.load({
//            params: {
//                addressBookEntryId: contact.getId()
//            },
//            scope: this
//        });

        this.remoteEmailLoader();
    },

    carouselControlsInit: function(storeCount) {

//            if (device.affordances) {
//                device.carouselControls.left.hide();
//                if (storeCount == 1) {
//                    device.carouselControls.right.hide();
//                } else {
//                    device.carouselControls.right.show();
//                }
//            }
//
//            if (device.bottomControls) {
//                device.carouselControls.left.disable();
//                if (storeCount == 1) {
//                    device.carouselControls.right.disable();
//                } else {
//                    device.carouselControls.right.enable();
//                }
//            }

    },

    showMessageOnEmailCarouselContainer: function (msg) {

        var emailsContainerPanel = this.getEmailsContainerPanel();

        emailsContainerPanel.setHtml(msg);

        this.hasMessageOnEmailContainerPanel = true;
    },

    hideMessageOnEmailCarouselContainer: function () {
        var emailsContainerPanel = this.getEmailsContainerPanel();

        emailsContainerPanel.setHtml('');

        this.hasMessageOnEmailContainerPanel = false;

    },

    // Create infinite carousel for emails
    createInfiniteCarousel: function (emailsContainerPanel) {
        var that = this,
            emailsCarousel,
            buttonItems = [];

        // Remove first login msg
        if (this.hasMessageOnEmailContainerPanel) {
            Ext.fly('hasMessageOnEmailContainerPanel').destroy();
            this.hasMessageOnEmailContainerPanel = false;
        }

        buttonItems[0] = {
            xtype: 'button',
            ui: 'orange',
            iconCls: 'reply',
            iconAlign: 'right',
            iconMask: true,
            text: 'Reply',
            handler: that.showReplyPanel,
            scope: that,
            centered: true
        };

        // Check user config
        if (!AE.app.getController('User').getUserRights('HideDeleteButtonOnEmail')) {

            buttonItems[1] = {
                xtype: 'button',
                ui: 'orange',
                iconCls: 'trash',
                iconAlign: 'right',
                iconMask: true,
                text: 'Delete',
                scope: that,
                handler: that.deleteEmailHandler
            };
        }

        emailsCarousel = Ext.create('AE.view.EmailsCarouselInfinite', {
            id: 'infiniteCarousel',
            innerItemConfig: {
                layout: 'vbox',
                defaults: {
                    xtype: 'component',
                    flex: 1
                },
                items: [{
                    xtype: 'emailpanel'
                }, {
                    // Image thumbnails
                    xtype: 'container',
                    layout: 'hbox',
                    cls: 'imagesThumbContainer',
                    hidden: true,
                    height: 105,
                    scrollable: {
                        direction: 'horizontal',
                        directionLock: true
                    }
                }, {
                    xtype: 'toolbar',
                    docked: 'bottom',
                    cls: 'emailActionsToolbar',
                    items: buttonItems
                }]
            },
            listeners: {
                itemindexchange: that.infiniteCarouselItemIndexChange,
                activeitemchange: that.infiniteCarouselActiveItemChange,
                scope: that
            }
        });

        // Add Carousel to Email Panel
        emailsContainerPanel.setItems(emailsCarousel);

        this.emailsCarousel = emailsCarousel;

        AE.app.getController('UI').device.emailsCarousel = emailsCarousel;

        // This will add a tap and drag listner for the first carousel item
        // for marking item as viewed
        this.addCarouselTapListener();
    },

    createInfiniteCarouselItems: function () {

        var that = this,
            emailsContainerPanel = this.getEmailsContainerPanel(),
            emailsContainerPanelCls,
            emailsStore = Ext.getStore('Emails'),
            emailsStoreCount = emailsStore.getCount();

        // Removes email viewed marker
        if (AE.app.getController('User').getUserRights('HideEmailViewedMarker')) {
            emailsContainerPanel.addCls('hideEmailViewedMarker');
        } else {
            emailsContainerPanel.removeCls('hideEmailViewedMarker');
        }

        emailsContainerPanel.setHidden(false);

        if (!emailsContainerPanel.getInnerItems().length) {
            this.createInfiniteCarousel(emailsContainerPanel);
        }

        // Set to the first carousel item
        this.emailsCarousel.setMaxItemIndex(0);
        // Set the number of emails for the selected contact
        this.emailsCarousel.setMaxItemIndex(emailsStoreCount - 1);

        this.currentViewedEmail = {
            record: Ext.getStore('Emails').first(),
            carouselItemIndex: 0
        };
        // Enable the events for the carousel
        this.emailsCarouselDisableEvents = false;
        // Load the first email on the carousel
        this.infiniteCarouselActiveItemChange(this.emailsCarousel, this.emailsCarousel.getActiveItem(), null);

        // Show  bottom control if it's rendered
        AE.app.getController('UI').setHiddenBottomControls(false);

    },

    infiniteCarouselItemIndexChange: function(carousel, item, index, updateControls) {


        var emailsStore = Ext.getStore('Emails'),
            emailItemsCount = emailsStore.getCount();

        // Store the value of the current email
        this.currentViewedEmail = {
            record: Ext.getStore('Emails').getAt(index),
            carouselItemIndex: index
        };

        if (typeof updateControls == 'boolean' && updateControls) {
            AE.app.getController('UI').updateEmailCarouselControls(carousel, index, emailItemsCount);

            // Email counter on carousel
            this.updateEmailCountOnCarouselBottom(emailItemsCount, ++activeItemIndex);
        }

//        // emailItemsCount is checked because in here only more than 1 email should be allowed to invoke markEmailAsViewed
//        // if it's only 1 email, it's invoked from the listener addCarouselTapListener
//        if (emailItemsCount > 1  && !this.emailsCarouselDisableEvents) {
//            this.markEmailAsViewed();
//            if (index == 2 && !emailsStore.getAt(0).get('EmailViewed')) {
//                this.markEmailAsViewed(emailsStore.getAt(0));
//            }
//        }
//
//        if (this.emailsCarouselDisableEvents) {
//            return;
//        }
//
//        // Email body dynamic content loading
////        this.emailBodyTextHtmlPreloader(--activeItemIndex);
//        this.remoteEmailDetailLoader(this.currentViewedEmail.record.get('EmailDetailId'));
//
//        if (!this.currentViewedEmail) return;



//        var innerItems = item.getInnerItems(),
//            imageCount = this.currentViewedEmail.record.get('imageCount')[index];
//
//        // Sets the carousel item panel template
//        innerItems[0].setData({ Header: (index + 1), Body: (index + 1), ImageCount:imageCount })
//
//        if (imageCount) {
//            // Shows the bottom horizontal thumbnails
//            innerItems[1].setHidden(false);
//            setPanelImages(innerItems[1], imageCount, index);
//
//        } else {
//            // hides the bottom horizontal thumbnails
//            innerItems[1].setHidden(true);
//        }
    },

    infiniteCarouselActiveItemChange: function (carousel, newActiveItem, previousActiveItem) {

        var activeItemIndex = carousel.getActiveIndex(),
            emailsStore = Ext.getStore('Emails'),
            emailItemsCount = emailsStore.getCount(),
            emailPanelBodyData,
            deleteBtn,
            innerItems,
            prevInnerItems;

        if (this.emailsCarouselDisableEvents) {
            return;
        }

        if (emailItemsCount == 1) {
            activeItemIndex = 0;

//            newActiveItem = carousel._activeItem;
//            previousActiveItem = null;
        }

        // Store the value of the current email
        this.currentViewedEmail = {
            record: Ext.getStore('Emails').getAt(activeItemIndex),
            carouselItemIndex: activeItemIndex
        };

        AE.app.getController('UI').updateEmailCarouselControls(carousel, activeItemIndex, emailItemsCount);

        // Email counter on carousel
        this.updateEmailCountOnCarouselBottom(emailItemsCount, activeItemIndex + 1);

        this.carouselActiveItemIndex = activeItemIndex;

        emailPanelBodyData = this.currentViewedEmail.record.getData();
        emailPanelBodyData.Body = '<div class="loader"><div></div> <br /> Loading email message... </div>';


        innerItems = newActiveItem.getInnerItems();
        // Set Data of the email panel template
        innerItems[0].setData(emailPanelBodyData);

        deleteBtn = newActiveItem.getDockedItems()[0].getInnerItems()[0];

        if (AE.app.getController('Contacts').includeDeletedEmails) {
            if (emailPanelBodyData.EmailDeleted) {
                deleteBtn.hide();
            } else {
                deleteBtn.show();
            }
        } else {
            if (deleteBtn.isHidden()) {
                deleteBtn.show();
            }
        }

        if (previousActiveItem) {
            prevInnerItems = previousActiveItem.getInnerItems();
            // Reset the previous carousel panel data
            prevInnerItems[0].setData({Subject: '<br />', EmailSentDatePretty: '', EmailReadStatus: 'blank'});

            // Hide the previous image panel
            this.hidePanelImages(prevInnerItems[1])
        }

        this.remoteEmailDetailLoaderForInfiniteCarousel(this.currentViewedEmail.record.get('EmailDetailId'), innerItems[1]);

        if (emailItemsCount > 1  && !this.emailsCarouselDisableEvents) {
            // Mark the first email if it's been switched from the bottom arrows
            if (activeItemIndex == 1 && !emailsStore.getAt(0).get('EmailViewed')) {
                this.markEmailAsViewed(emailsStore.getAt(0));
            }
            // Marks the viewed email record except for the first viewed
            if (!this.currentViewedEmail.record.get(('EmailViewed')) && activeItemIndex != 0) {
                this.markEmailAsViewed(this.currentViewedEmail.record);
            }

        }

    },

    setHiddenEmailCarouselAndBottomBar: function (hidden) {
        if (this.emailsCarousel) {
            this.emailsCarousel.setHidden(hidden);
            AE.app.getController('UI').setHiddenBottomControls(hidden);
        }
    },

    remoteEmailDetailLoaderForInfiniteCarousel: function (emailDetailId, imagesPanel) {
        var that = this;

        Ext.Ajax.request({
            url : '/EmailDetail/GetEmailById',
            method: 'POST',
            timeout: AE.config.GetEmailByPersonTimeoutLimit,
            params: {
                emailDetailId: emailDetailId
            },
            success: function(response) {
                var responseJson = Ext.decode(response.responseText),
                    recordData;

                if (responseJson.total) {
                    recordData = responseJson.Data[0];
                    if (recordData.EmailDetailId == emailDetailId) {
                        that.remoteEmailBodyLoaderForInfiniteCarousel(recordData, imagesPanel);
                    }
                } else {
                    Ext.fly('emailBody_' + emailDetailId).setHtml('');
                }

            },
            failure: function (response, options) {
                AE.msgBox.alert('Error', 'Error: Server response error from abort : ' + emailDetailId );

                AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
            }
        });


    },

    remoteEmailBodyLoaderForInfiniteCarousel: function (recordData, imagesPanel) {
        var that = this,
            emailImages,
            contentToUse;

        emailImages = recordData.EmailDetailInfoPictureInfos;

        if (emailImages && emailImages.length) {
            imagesPanel.show();
            this.setPanelImages(imagesPanel, emailImages);
            this.emailImagesLoadToStore(recordData.EmailDetailInfoPictureInfos);
        } else {
            imagesPanel.hide();
        }


        if (this.currentViewedEmail.record.get('EmailDetailId') == recordData.EmailDetailId) {

            // Checks what type of content to use
            if (recordData.BodyTextHtmlLength  > 0 && recordData.BodyTextHtmlUrl != 'EMPTY') {
                contentToUse = 'BodyTextHtmlUrl';
            } else if (recordData.BodyTextLength > 0 && recordData.BodyTextUrl != 'EMPTY') {
                contentToUse = 'BodyTextUrl';
            } else {
                // Set to email body to empty to remove loader
                Ext.fly('emailBody_' + recordData.EmailDetailId).setHtml('');
                return;
            }
        }

        if (!this.emailBodyRequests) {
            this.emailBodyRequests = {};
        }

        if (Ext.Ajax.isLoading(that.emailBodyRequests)) {
            Ext.Ajax.abort(that.emailBodyRequests);
        }

        this.emailBodyRequests = Ext.Ajax.request({
            url: recordData[contentToUse],
            params: {

            },
            success: function(response){

                if (response.responseText) {
                    that.writeEmailBodyToCarousel(recordData, response.responseText);
                }

            },
            failure: function (response, options) {
                Ext.Viewport.unmask();

                // Remvoed message box.
                // We'll either have transaction aborted or communication failure

                // Transaction aborted is when request is forcibly aborted when new email body is queried.

                AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText + ' Emails.js:remoteEmailBodyLoaderForInfiniteCarousel', response.status, response.statusText);
            }
        });

    },

    writeEmailBodyToInfiniteCarouselPanel: function (recordData, reponseText) {
        if (this.currentViewedEmail.record.get('EmailDetailId') == recordData.EmailDetailId) {
            Ext.fly('emailBody_' + recordData.EmailDetailId).setHtml(reponseText);
        }
    },

    emailImagesLoadToStore: function (images) {
        var imgStoreArray = [],
            i;

        // Clear store
        Ext.getStore('EmailPictures').removeAll(true);

        for (i=0; i < images.length; i++) {
            imgStoreArray[i] = [this.getImageUrl(images[i], ''), false];
        }

        Ext.getStore('EmailPictures').add(imgStoreArray);

    },

    // Creates the image container
    createPanelImages: function (panel) {
        var j, imgItems = [];

        // Image container
        for (j = 0; j <= (AE.config.EmailImageThumbLimit - 1); j++) {
            imgItems[j] = {
                xtype: 'image',
                src:  'resources/css/images/ajax-loader-small.gif',
                cls: 'imagesThumb',
                belongsToEmail: 0,
                imgIndex: 0,
                imgId: 0,
                emailDetailInfoPictureInfos: {},
                width: 125,
                height: 94
            }
        }

        panel.setItems(imgItems);
    },

    // Sets the images on the panel
    setPanelImages: function (panel, emailImages) {
        var i, panelItems, carouselRecordId, imageUrl;

        if (!panel.getInnerItems().length) {
            this.createPanelImages(panel);
        }

        panelItems = panel.getItems().items;

        // Looping through 50 thumbnail containers
        for (i = 0; i <= (AE.config.EmailImageThumbLimit - 1); i++) {

            if (i <= (emailImages.length - 1)) {
                imageUrl = this.getImageUrl(emailImages[i], '?width=125&height=94&scale=both');
                // Sets the source of the image
                // Show the thumbnail
                panelItems[i].show();
                // Set to the image loader first
                panelItems[i].setSrc('resources/css/images/ajax-loader-small.gif');
                // Then the actual image thumbnail
                panelItems[i].setSrc(imageUrl);

                panelItems[i].config.imgIndex = i;

            } else {
                if (!panel.isHidden()) {
                    // Hides the image thumbnails if it's less than 25
                    panelItems[i].hide();
                }
            }

        }
    },

    hidePanelImages: function (panel) {
        if (!panel.isHidden()) {

            var i, panelItems, carouselRecordId, imageUrl;

            panelItems = panel.getItems().items;

            // Looping through 25 thumbnail containers
            for (i = 0; i <= 24; i++) {

                if (!panelItems[i].isHidden()) {
                    // Set to default loader image
                    panelItems[i].setSrc('resources/css/images/ajax-loader-small.gif');
                }

            }
            panel.hide();
        }

    },

    getImageUrl: function (value, params) {
        var imageUrl;
        if (value.OverrideUrl != null && value.OverrideUrl.length > 0) {
            imageUrl = value.OverrideUrl;
        } else {
            imageUrl = '/' + value.UrlPrefix + '/' + value.ImageName + params;
            if (value.BaseUrl != null && value.BaseUrl.length > 0) {
                imageUrl = 'http://' + value.BaseUrl + imageUrl;
            }
        }

        return imageUrl;
    },

    addCarouselTapListener: function (cmp, opt) {
        // Tap listener for carousel item
        // for marking item as viewed
        // Using element selector to add listener
        var that = this;
        Ext.select('#emailsContainerPanel .x-carousel-item').each(function (el) {
            var that = this;
            // Have to use get
            // Using the passed param el doesn't work directly with on to add listener
            Ext.get(el.getId()).on({
                tap: that.markEmailAsViewed,
                drag: that.markEmailAsViewed,
                scope: that
            });
        }, that);
    },

    onHideEmailsContainerPanel: function () {

    },

    onEmailCarouselDeactivate: function () {

    },

    onEmailCarouselActiveItemChange: function (carousel, newActiveItem, previousActiveItem) {

        var activeItemIndex = carousel.getActiveIndex(),
            emailsStore = Ext.getStore('Emails'),
            emailItemsCount = emailsStore.getCount();

        if (emailItemsCount == 1) {
            activeItemIndex = 0;
        }

        this.currentViewedEmail = {
            record: Ext.getStore('Emails').getAt(activeItemIndex),
            carouselItemIndex: activeItemIndex
        };

        AE.app.getController('UI').updateEmailCarouselControls(carousel, activeItemIndex, emailItemsCount);

        // Email counter on carousel
        this.updateEmailCountOnCarouselBottom(emailItemsCount, ++activeItemIndex);

        this.carouselActiveItemIndex = activeItemIndex;

        // emailItemsCount is checked because in here only more than 1 email should be allowed to invoke markEmailAsViewed
        // if it's only 1 email, it's invoked from the listener addCarouselTapListener
        if (emailItemsCount > 1  && !this.emailsCarouselDisableEvents) {
            if (activeItemIndex == 2 && !emailsStore.getAt(0).get('EmailViewed')) {
                this.markEmailAsViewed(emailsStore.getAt(0));
            }
        }

        if (this.emailsCarouselDisableEvents) {
            return;
        }

        // Email body dynamic content loading
//        this.emailBodyTextHtmlPreloader(--activeItemIndex);
        this.remoteEmailDetailLoader(this.currentViewedEmail.record.get('EmailDetailId'));

        // Destroys the previous previous and next next email body
        this.emailBodyTextHtmlContentDestroyer(carousel, newActiveItem, previousActiveItem, emailItemsCount);

    },

    markEmailAsViewed: function (emailToMark) {
        if (!emailToMark || !emailToMark.stores) {
            emailToMark = this.currentViewedEmail.record
        }
        // Check if there's a record
        // Check if user is allowed to see View status
        // Check if email mark as viewed is still processing
        if (!emailToMark || AE.app.getController('User').getUserRights('HideEmailViewedMarker') || emailToMark.data.EmailViewedProcessing) {
            return;
        }

        if (emailToMark.data.EmailViewed == false) {

            emailToMark.set('EmailViewedProcessing', true);
            emailToMark.commit();

            Ext.Ajax.request({
                url: AE.config.baseUrl + '/EmailDetail/UpdateEmailDetailMarkViewed',
                params: {
                    emailDetailId: emailToMark.data.EmailDetailId,
                    viewedStatus: true
                },
                success: function(response) {

                    var responseJson = Ext.decode(response.responseText);

                    emailToMark.set('EmailViewed', true);
                    emailToMark.commit();

                    AE.app.getController('Contacts').readEmailTrackerOnSelectedContact();

                    // Use parent to child selector
                    // Ext.get will not work
                    var emailStatusEl = Ext.select('#emailsContainerPanel #emailReadStatus_' + emailToMark.data.EmailDetailId).first();

                    if (emailStatusEl) {
                        emailStatusEl.replaceCls('unread', 'read');
                    }
                },
                failure: function (response, options) {
                    // Set processing to false so on next view invoke, markEmailAsViewed can be run
                    emailToMark.set('EmailViewedProcessing', false);
                    emailToMark.commit();

                    AE.msgBox.alert('Error', 'Error: Server response error 0' );

                    AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
                }
            });

        }

    },

    onImageThumbTap: function () {
//        this.getMainContainerPanel().setActiveItem({
//            type: 'pop'
//        })

    },

    onEmailsImgTap: function (img, e) {
        var that = this;
        // Create the image browser panel
        if (!this.imageBrowserPanel) {
            this.imageBrowserPanel = Ext.create('AE.view.ImageBrowserPanel', {
                id: 'imageBrowserPanel'
            });
            // Add the image browser panel to the viewport
            Ext.Viewport.add([this.imageBrowserPanel]);
        }
        // Add a tapped cls to the tapped image thumbnail.
        // This creates a pressed effect
        img.addCls('tapped');

        setTimeout(function () {

            var fullUrl,
                imageRecord,
                emailPicturesStore = Ext.getStore('EmailPictures'),
                emailPicturesStoreCount = emailPicturesStore.getCount(),
                imageBrowserCarousel = that.getImageBrowserCarousel(),
                currentImgPanel;

            img.removeCls('tapped');

            imageBrowserCarousel.setMaxItemIndex(emailPicturesStoreCount - 1);

            that.imageBrowserPanel.show();
            that.imageBrowserPanelWidth = that.imageBrowserPanel.element.getWidth();
            that.imageBrowserPanelHeight = that.imageBrowserPanel.element.getHeight();

            imageBrowserCarousel.setActiveItem(img.config.imgIndex);

            imageRecord = emailPicturesStore.getAt(img.config.imgIndex);

            fullUrl = imageRecord.get('url') + '?maxwidth=' + (that.imageBrowserPanelWidth - 12) + '&maxheight=' + (that.imageBrowserPanelHeight - 59) + '&scaled=downscaleonly';

            currentImgPanel = imageBrowserCarousel.getActiveItem().getInnerItems()[0];
            currentImgPanel.setSrc('resources/css/images/ajax-loader.gif');

            // Add delay to show change the source of the image container to a loader image.
            // This fixes the problem of loader not showing
            // This will not cause any disruption on the app because it's happening on the animation time
            setTimeout(function () {
                currentImgPanel.setSrc(fullUrl);

                that.updateEmailImagesCarouselControls(imageBrowserCarousel, imageBrowserCarousel.getActiveItem());
            }, 600);


        }, 250);

    },

    loadImageCarouselImage: function (index, carousel) {
        var emailPicturesStore = Ext.getStore('EmailPictures'),
            emailPicturesStoreCount = emailPicturesStore.getCount()-1,
            nextIndex,
            previousIndex;

        this.emailImagePreloader(carousel.innerIndexToItem[index], index, emailPicturesStore.getAt(index).data.url);

        if (emailPicturesStoreCount) {
            if (index == 0) {
                nextIndex = index+1;
                this.emailImagePreloader(carousel.innerIndexToItem[nextIndex], nextIndex, emailPicturesStore.getAt(nextIndex).data.url);
            } else if (emailPicturesStoreCount == index) {
                previousIndex = index-1;
                this.emailImagePreloader(carousel.innerIndexToItem[previousIndex], previousIndex, emailPicturesStore.getAt(previousIndex).data.url);
            } else {
                nextIndex = index+1;
                this.emailImagePreloader(carousel.innerIndexToItem[nextIndex], nextIndex, emailPicturesStore.getAt(nextIndex).data.url);

                previousIndex = index-1;
                this.emailImagePreloader(carousel.innerIndexToItem[previousIndex], previousIndex, emailPicturesStore.getAt(previousIndex).data.url);
            }
        }

    },

    emailImagePreloader: function (panel, index, url, width, height) {
        var imageObj = new Image(),
            emailPicturesStore = Ext.getStore('EmailPictures'),
            imageRecord = emailPicturesStore.getAt(index),
            imagePanel = panel.getInnerItems()[0],

            fullUrl = url + '?maxwidth=' + (this.imageBrowserPanelWidth - 12) + '&maxheight=' + (this.imageBrowserPanelHeight - 59) + '&scaled=downscaleonly';

        if (!imageRecord.get('preloaded')) {
            imagePanel.setSrc('resources/css/images/ajax-loader.gif');

            imageObj.src = fullUrl;
            imageRecord.set('preloaded', true);
            imageRecord.commit();

            // Add delay to show change the source of the image container to a loader image.
            // This fixes the problem of loader not showing
            // This will not cause any disruption on the app because it's happening when requesting the image and swiping
            setTimeout(function () {
                imagePanel.setSrc(fullUrl);
            }, 500);

        } else {
            imagePanel.setSrc('resources/css/images/ajax-loader.gif');
            imagePanel.setSrc(fullUrl);
        }
    },

//    loadImageCarouselImage: function (index) {
//        var emailPicturesStore = Ext.getStore('EmailPictures'),
//            imageBrowserCarousel = this.getImageBrowserCarousel(),
//            emailPicturesStoreCount = emailPicturesStore.getCount()-1,
//            nextIndex,
//            previousIndex;
//
//        console.info(emailPicturesStoreCount)
//        console.info(imageBrowserCarousel)
//        console.info(index)
//        console.info(emailPicturesStore.getAt(index))
//        console.info(imageBrowserCarousel.innerItems[index])
//
//        this.setImageSrcOnImageCarousel(index, emailPicturesStore.getAt(index).data.url, imageBrowserCarousel.innerItems[index].getId());
//
//        if (emailPicturesStoreCount) {
//            if (index == 0) {
//                nextIndex = index+1;
//                this.setImageSrcOnImageCarousel(nextIndex, emailPicturesStore.getAt(nextIndex).data.url, imageBrowserCarousel.innerItems[nextIndex].getId());
//            } else if (emailPicturesStoreCount == index) {
//                previousIndex = index-1;
//                this.setImageSrcOnImageCarousel(previousIndex, emailPicturesStore.getAt(previousIndex).data.url, imageBrowserCarousel.innerItems[previousIndex].getId());
//            } else {
//                nextIndex = index+1;
//                this.setImageSrcOnImageCarousel(nextIndex, emailPicturesStore.getAt(nextIndex).data.url, imageBrowserCarousel.innerItems[nextIndex].getId());
//
//                previousIndex = index-1;
//                this.setImageSrcOnImageCarousel(previousIndex, emailPicturesStore.getAt(previousIndex).data.url, imageBrowserCarousel.innerItems[previousIndex].getId());
//            }
//        }
//
//    },

//    destoyImageCarouselImage: function (index) {
//        var emailPicturesStore = Ext.getStore('EmailPictures'),
//            imageBrowserCarousel = this.getImageBrowserCarousel(),
//            emailPicturesStoreCount = emailPicturesStore.getCount()-1,
//            nextIndex,
//            nextIndexRecord,
//            previousIndex,
//            previousIndexRecord;
//
//        console.info(emailPicturesStoreCount)
//        console.info(imageBrowserCarousel)
//        console.info(index)
//        console.info(emailPicturesStore.getAt(index))
//        console.info(imageBrowserCarousel.innerItems[index])
//
//        if (emailPicturesStoreCount > 3) {
//            if (index == 0) {
//                nextIndex = index+2;
//                nextIndexRecord = emailPicturesStore.getAt(nextIndex);
//                if (nextIndexRecord && nextIndexRecord.data.rendered) {
//                    this.destroyImageOnImageCarousel(nextIndex, nextIndexRecord.data.url, imageBrowserCarousel.innerItems[nextIndex].getId());
//                }
//            } else if (emailPicturesStoreCount == index) {
//                previousIndex = index-2;
//                previousIndexRecord = emailPicturesStore.getAt(nextIndex);
//                if (nextIndexRecord && nextIndexRecord.data.rendered) {
//                    this.destroyImageOnImageCarousel(previousIndex, previousIndexRecord.data.url, imageBrowserCarousel.innerItems[previousIndex].getId());
//                }
//            } else {
//                nextIndex = index+2;
//                nextIndexRecord = emailPicturesStore.getAt(nextIndex);
//                if (nextIndexRecord && nextIndexRecord.data.rendered) {
//                    this.destroyImageOnImageCarousel(nextIndex, nextIndexRecord.data.url, imageBrowserCarousel.innerItems[nextIndex].getId());
//                }
//
//                previousIndex = index-2;
//                previousIndexRecord = emailPicturesStore.getAt(nextIndex);
//                if (nextIndexRecord && nextIndexRecord.data.rendered) {
//                    this.destroyImageOnImageCarousel(previousIndex, previousIndexRecord.data.url, imageBrowserCarousel.innerItems[previousIndex].getId());
//                }
//            }
//        }
//    },

//    setImageSrcOnImageCarousel: function (index, url, id) {
//        console.info(arguments)
//        var imageBrowserCarousel = this.getImageBrowserCarousel(),
//            emailPicturesStore = Ext.getStore('EmailPictures');
//        imageBrowserCarousel.innerItems[index].setSrc(url);
//        emailPicturesStore.getAt(index).set('preloaded', true);
//        emailPicturesStore.getAt(index).set('renderedId', id);
//    },

//    destroyImageOnImageCarousel: function (index, url, id) {
//        console.info(arguments)
//        var imageBrowserCarousel = this.getImageBrowserCarousel(),
//            emailPicturesStore = Ext.getStore('EmailPictures');
//        imageBrowserCarousel.innerItems[index].setSrc('/databaseimages/00000000-0000-0000-0000-000000000000.jpg?width=100');
//        emailPicturesStore.getAt(index).set('rendered', false);
//        emailPicturesStore.getAt(index).set('renderedId', null);
//    },

    updateEmailImagesCarouselControls: function (carousel) {

        var activeItemIndex = carousel.getActiveIndex(),
            emailPicturesCount = Ext.getStore('EmailPictures').getCount(),
            left = this.getEmailsImageBottomArrowLeft(),
            right = this.getEmailsImageBottomArrowRight();

        activeItemIndex++;

        if (emailPicturesCount == 1) {
            left.disable();
            right.disable();
        } else {
            if (activeItemIndex == emailPicturesCount)  {
                left.enable();
                right.disable();
            } else if (activeItemIndex == 1)  {
                left.disable();
                right.enable();
            } else {
                left.enable();
                right.enable();
            }
        }

        if (!AE.app.getController('User').getUserRights('HideEmailImageViewerCounter')) {
            this.getEmailsImageBottomCounter().setTitle(activeItemIndex + ' of ' + emailPicturesCount);
        }

        // load images
        this.loadImageCarouselImage(activeItemIndex - 1, carousel);

    },

    emailBodyTextHtmlLoader: function (idx, record) {
        var that = this,
            url;

        if (!record.get('BodyContentToUse')) {
            return;
        } else  {
            url = (record.get('BodyContentToUse') == 'BodyTextHtmlUrlContent') ? 'BodyTextHtmlUrl' : 'BodyTextUrl';
            url = record.get(url);
        }

        Ext.Ajax.request({
            url: url,
            params: {

            },
            success: function(response){

                if (response.responseText) {
                    record.set(record.get('BodyContentToUse'), response.responseText);
                    record.commit();
                    that.emailBodyTextHtmlContentSetter(record);
                }

            },
            failure: function (response, options) {
                Ext.Viewport.unmask();

                AE.msgBox.alert('Error', 'Error: Server response error 1' );

                AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
            }
        });
    },

    emailBodyTextHtmlPreloader: function (index) {
        var emailsStore = Ext.getStore('Emails'),
            emailsStoreCount = emailsStore.getCount()-1,
            record,
            nextIndex,
            previousIndex;

        // So function will not be called when carouse.removeAll is call invoked and eventuall invokes activeItemChange
        if (this.silentBackGroundLoader) {
            return;
        }

        record = emailsStore.getAt(index);

        if (!record) {
            return;
        }

        // Loads email body on the current carousel
        if (!this.emailBodyTextHtmlContentSetter(record)) {
            this.emailBodyTextHtmlLoader(index, record);
        }

        // Checks to load the next and previous email body
        if (emailsStoreCount) {
            if (index == 0) {
                // When carousel is at the first item
                // Loads email body on the next carousel item

                nextIndex = index+1;

                record = emailsStore.getAt(nextIndex);
                if (!this.emailBodyTextHtmlContentSetter(record)) {
                    this.emailBodyTextHtmlLoader(nextIndex, record);
                }

            } else if (emailsStoreCount == index) {
                // When carousel is at the last item
                // Loads email body on the previous carousel item

                previousIndex = index-1;

                record = emailsStore.getAt(previousIndex);
                if (!this.emailBodyTextHtmlContentSetter(record)) {
                    this.emailBodyTextHtmlLoader(previousIndex, record);
                }

            } else {
                // Loads email body on the next carousel item

                nextIndex = index+1;

                record = emailsStore.getAt(nextIndex);
                if (!this.emailBodyTextHtmlContentSetter(record)) {
                    this.emailBodyTextHtmlLoader(nextIndex, record);
                }

                // Loads email body on the previous carousel item
                previousIndex = index-1;

                record = emailsStore.getAt(previousIndex);
                if (!this.emailBodyTextHtmlContentSetter(record)) {
                    this.emailBodyTextHtmlLoader(previousIndex, record);
                }
            }
        }

    },
    // Writes email body content
    emailBodyTextHtmlContentSetter: function (record) {
        var bodyEl,
            emailContent,
            contentToUse;

        // Checks what type of content to use
        if (record.get('BodyTextHtmlLength')  > 0 && record.get('BodyTextHtmlUrl') != 'EMPTY') {
            contentToUse = 'BodyTextHtmlUrlContent';
        } else if (record.get('BodyTextLength') > 0 && record.get('BodyTextUrl') != 'EMPTY') {
            contentToUse = 'BodyTextUrlContent';
        } else {
            contentToUse = 'blank';
        }

        // Store the type of content to use
        record.set('BodyContentToUse', contentToUse);
        record.commit();

        if (contentToUse == 'blank') {
            emailContent = ' ';
        } else {
            emailContent = record.get(contentToUse);
        }
        // Checks if we already have the Email Content on record
        // If not call remote loader
        if (emailContent) {
            // Gets the email body dom element
            bodyEl = Ext.fly('emailBody_' + record.get('EmailDetailId'));

            // Checks if element is available
            if (bodyEl) {
                // Writes content to the email body dom element
                bodyEl.setHtml(emailContent);

            } else {
                // Add a delay because of animation duration duration and Ext.fly still can't find the dom element
                // Post this on forum
                setTimeout(function () {
                    // Gets the email body dom element
                    bodyEl = Ext.fly('emailBody_' + record.get('EmailDetailId'));
                    if (bodyEl) {
                        // Writes content to the email body dom element
                        bodyEl.setHtml(emailContent);
                    }
                }, 300);
            }
            return true;
        }
        return;


    },

    // Destroy Email body
    emailBodyTextHtmlContentDestroyer: function (carousel, newActiveItem, previousActiveItem) {
        var emailsStore = Ext.getStore('Emails'),
            activeItemIndex = carousel.getActiveIndex(),
            emailsStoreCount = emailsStore.getCount()-1,
            nextNextIdx = activeItemIndex + 1,
            prevPrevIdx = activeItemIndex - 1;

        // So function will not be called when carouse.removeAll is call invoked and eventuall invokes activeItemChange
        if (this.silentBackGroundLoader) {
            return;
        }


        // Get the next next carousel item
        if (nextNextIdx <= emailsStoreCount) {
            this.emailBodyTextHtmlContentDoDestroy(nextNextIdx, emailsStore);
        }

        // Get the previous previous carousel item
        if (prevPrevIdx > -1) {
            this.emailBodyTextHtmlContentDoDestroy(prevPrevIdx, emailsStore);
        }
    },

//    emailBodyTextHtmlContentDestroyer: function (carousel, newActiveItem, previousActiveItem) {
//        var emailsStore = Ext.getStore('Emails'),
//            activeItemIndex = carousel.getActiveIndex(),
//            emailsStoreCount = emailsStore.getCount()-1,
//            emailPanelBodyData,
//            record,
//            nextNextIdx = activeItemIndex + 2,
//            prevPrevIdx = activeItemIndex - 2;
//
//        // So function will not be called when carouse.removeAll is call invoked and eventuall invokes activeItemChange
//        if (this.silentBackGroundLoader) {
//            return;
//        }
//
//
//        // Get the next next carousel item
//        if (nextNextIdx <= emailsStoreCount) {
//            this.emailBodyTextHtmlContentDoDestroy(nextNextIdx, emailsStore);
//        }
//
//        // Get the previous previous carousel item
//        if (prevPrevIdx > -1) {
//            this.emailBodyTextHtmlContentDoDestroy(prevPrevIdx, emailsStore);
//        }
//    },

    emailBodyTextHtmlContentDoDestroy: function (idx, emailsStore) {
        var record,
            bodyEl,
            imagesThumbContainer;

        record = emailsStore.getAt(idx);

        bodyEl = Ext.get('emailBody_' + record.get('EmailDetailId'));

        if (bodyEl) {
            bodyEl.setHtml('');

            imagesThumbContainer = Ext.getCmp('imagesThumbContainer_' + record.get('EmailDetailId'));
            if (imagesThumbContainer) {
                imagesThumbContainer.removeAll();
                imagesThumbContainer.setHidden(true);
            }
        }

    },

//    emailBodyTextHtmlContentDoDestroy: function (idx, emailsStore) {
//        var record,
//            emailPanelBodyData;
//
//        record = emailsStore.getAt(idx);
//        console.info(idx)
//        console.info(record)
//        console.info('destroy record: ' + record.get('EmailDetailId'))
//        // Check if content is blank
//        // Don't destroy
//        console.info(record.get('BodyContentToUse'))
//        if (record.get('BodyContentToUse') == 'blank') {
//            return;
//        }
//
//        emailPanelBodyData = record.getData();
//        console.info(emailPanelBodyData)
//        // Get the email component associated with the record
//        Ext.getCmp('emailpanel_' + emailPanelBodyData.EmailDetailId).setData(emailPanelBodyData);
//        // Destroy email content on record
//        if (record.get('BodyContentToUse')) {
//            record.set(record.get('BodyContentToUse'), null);
//        }
//    },


    emailsImageBottomArrowLeftBtnHandler: function () {
        this.getImageBrowserCarousel().previous();
    },

    emailsImageBottomArrowRightBtnHandler: function () {
        this.getImageBrowserCarousel().next();
    },

    onImgBrowserCloseBtn: function () {
        this.imageBrowserPanel.hide();
    },

    onEmailViewed: function () {

    },

    onEmailViewedRecordUpdater: function () {

    },

    deleteEmailHandler: function () {

        AE.msgBox.show({
            title: 'Delete',
            message: 'Are you sure you want to Delete this email?',
            width: 380,
            buttons: [{
                text: 'Yes',
                itemId: 'yes'
            }, {
                text: 'No',
                itemId: 'no',
                ui: 'action'
            }],
            fn: this.deleteEmail,
            scope: this
        });


    },

    deleteEmail: function (button ) {

        AE.logger('deleteEmail')
        var recordToDelete = this.currentViewedEmail.record,
            that = this;

        if (button == 'yes') {
            Ext.Ajax.request({
                url: AE.config.baseUrl + '/EmailDetail/UpdateEmailDetailMarkDeleted',
                params: {
                    emailDetailId: recordToDelete.data.EmailDetailId,
                    deletedStatus: true
                },
                success: function(response){

                    var responseJson = Ext.decode(response.responseText),
                        emailsStore = Ext.getStore('Emails'),
                        storeCount = emailsStore.getCount(),
                        storeCountForIndex,
                        nextIndexCalc,
                        newActiveItemIndex,
                        oldActiveItemIndex;

                    if (responseJson.success) {

                        emailsStore.removeAt(that.currentViewedEmail.carouselItemIndex);

                        // Check if there's only 1 email for the the selected contact
                        storeCount = Ext.getStore('Emails').getCount();

                        if (storeCount > 0) {
                            // Remove carousel item
                            storeCountForIndex = storeCount - 1;

                            that.emailsCarousel.setMaxItemIndex(storeCountForIndex);

                            newActiveItemIndex = that.currentViewedEmail.carouselItemIndex;

                            that.emailsCarousel.setActiveItem(newActiveItemIndex);

                            if (storeCountForIndex > 2 && storeCountForIndex >= newActiveItemIndex) {

                                if ((newActiveItemIndex + 1) >= 3) {
                                    if (((newActiveItemIndex + 1) % 3) != 0) {
                                        nextIndexCalc = ((newActiveItemIndex + 1) % 3);
                                        oldActiveItemIndex = nextIndexCalc;
                                        newActiveItemIndex = nextIndexCalc - 1;
                                    } else {
                                        newActiveItemIndex = 2;
                                        oldActiveItemIndex = 0;
                                    }

                                } else {
                                    oldActiveItemIndex = newActiveItemIndex + 1;
                                }

                                that.infiniteCarouselActiveItemChange(that.emailsCarousel, that.emailsCarousel.getInnerItems()[newActiveItemIndex], that.emailsCarousel.getInnerItems()[oldActiveItemIndex]);

                            } else {
                                that.infiniteCarouselActiveItemChange(that.emailsCarousel, that.emailsCarousel.getActiveItem(), null);
                            }

                            AE.app.getController('UI').updateEmailCarouselControls(that.emailsCarousel, that.currentViewedEmail.carouselItemIndex, storeCount);

                            AE.app.getController('Contacts').updateSelectedContactEmailCountOnDelete();

                        } else {
                            that.senderSwitchFromDelete = true;
                            // Removes the contact record
                            AE.app.getController('Contacts').removeSelectedContact();
                        }
                        // Remove store item
                        Ext.getStore('Emails').remove(recordToDelete);

                        AE.app.getController('Contacts').renderContactToolbarToContactNode();

                    } else {
                        AE.msgBox.alert('Error', 'Error: ' + responseJson.message);
                    }

                },
                failure: function (response, options) {
                    Ext.Viewport.unmask();

                    AE.msgBox.alert('Error', 'Error: Server response error 2' );

                    AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
                }
            });
        }
    },

    showReplyPanel: function (btn) {
        var that = this,
            emailRecord = this.currentViewedEmail.record;

        setTimeout(function () {
            var recipientInfoTpl,
                replyData,
                messageTextarea = that.getReplyMessageTextarea();

            that.replyPanel.show();
            that.replyPanel.setMasked(false);

            recipientInfoTpl = new Ext.XTemplate('<div class="replyInfoContainer"><div class="personImage"><img id="contactImg_3" height="65" width="65" src="/{PersonImageUrlUrlPrefix}/{PersonImageUrlImageName}?width=65&height=65&scale=both  " alt="{FirstName} {LastName}" ></div> ' +
                '<div class="labelName">' +
                '<span class="label">Reply To: </span>' +
                '<span class="name">' +
                '<tpl if="FirstName == \'\' && LastName == \'\'">' +
                '{EmailAddress}' +
                '<tpl else>' +
                '{FirstName} {LastName}' +
                '</tpl></span>' +
                '<br /><span class="label">Subject: </span>' +
                '<span class="subject">{subject} </span>' +
                '</div></div>');

            messageTextarea.reset();

            replyData = Ext.Object.merge({}, that.selectedContact.data, {
                subject: 'Re: ' +  emailRecord.data.Subject
            });

            recipientInfoTpl.overwrite(that.getRecipientPanel().element, replyData);

            that.onResizeReplyPanel();

            setTimeout(function () {
                that.getReplyMessageCard().setActiveItem(0);

                that.getReplyQuickMessageList().refresh();


            }, 300);

        }, 250);

    },

    onResizeReplyPanel: function () {

        var vHeight = Ext.Viewport.getWindowHeight(),
            rowDivisor;

        if (vHeight < 700 ) {
            rowDivisor = 84;
        } else if (vHeight > 700 && vHeight < 1000) {
            rowDivisor = 68;
        } else {
            rowDivisor = 62;
        }

        if (!this.replyPanel.isHidden()) {
            // Set the textarea height
            this.getReplyMessageTextarea().setMaxRows( vHeight / rowDivisor);
        }
    },

    replyPanelSendBtnHandler: function (btnText) {
        var that = this,
            selectedEmail = this.currentViewedEmail.record,
            usingTextarea = false,
            messageToSend;

        if (typeof btnText === 'object') {
            messageToSend = that.getReplyMessageTextarea().getValue();
            btnText.setDisabled(true);
            usingTextarea = true;
        } else {
            messageToSend = btnText;
        }

        if (Ext.String.trim(messageToSend) == '') {
            AE.msgBox.alert('Text Required', 'Please enter a Message', function () {});
            btnText.setDisabled(false);
            return;
        }

        this.replyPanel.setMasked({
            xtype: 'loadmask',
            message: 'Sending...'
        });

        Ext.Ajax.request({
            url: AE.config.baseUrl + '/EmailResponse/SendResponseMessage',
            params: {
                addressBookEntryId: that.selectedContact.data.PersonId,
                subject: 'Re: ' + selectedEmail.data.Subject,
                messageToSend: messageToSend
            },
            success: function(response) {
                var responseJson = Ext.decode(response.responseText);

                that.replyPanel.setMasked(false);
                if (usingTextarea) {
                    btnText.setDisabled(false);
                }

                if (!AE.app.getController('User').getUserRights('HideReplyMessageSentConfirmMsgBox')) {
                    AE.msgBox.alert('Sent', 'Your message has been sent!', function () {
                        that.replyPanel.hide();
                    });
                } else {
                    that.replyPanel.hide();
                }

            },
            failure: function (response, options) {

                that.replyPanel.setMasked(false);
                if (usingTextarea) {
                    btnText.setDisabled(false);
                }

                AE.msgBox.alert('Error', 'Error: Server response error 3' );

                AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
            }
        });
    },

    replyQuickMessageListTap: function (list) {
        var that = this,
            selectedMessage = list.getSelection()[0];

        // To prevent showing message box when tapped from Delete or Update button
        if (this.tappedFromQuickMsgBtn) {
            this.tappedFromQuickMsgBtn = false;
            return;
        }

        if (list.hasSelection()) {
            AE.msgBox.show({
                title: 'Send Reply',
                message: 'Do you want to send this Quick Message ?',
                width: 380,
                buttons: [{
                    text: 'Yes',
                    itemId: 'yes'
                }, {
                    text: 'No',
                    ui: 'action',
                    itemId: 'no'
                }],
                fn: function (btn) {
                    if (btn == 'yes') {
                        that.replyPanelSendBtnHandler(selectedMessage.data.MessageTemplate);
                    }
                    list.deselectAll();
                },
                scope: this
            });
        }

    },

    replyCreateMessageBtnHandler: function () {
        this.getReplyMessageCard().animateActiveItem(1, {
            type: 'slide',
            direction: 'left'
        });

        // show save quick message btn
        this.getSaveQuickMessageBtn().setHidden(!AE.app.getController('User').getUserRights('ShowQuickMsgSaveBtn'));

        this.getReplyMessageTextarea().focus();
    },

    replyBackToQuickMessageBtnHandler: function () {
        this.getReplyMessageCard().animateActiveItem(0, {
            type: 'slide',
            direction: 'right'
        });
    },

    replyPanelCloseBtnHandler: function () {
        this.replyPanel.hide();
    },

    replyQuickMessageListSwipe: function (dataview, idx, target, record) {
        this.selectedQuickMsgRecord = record;

        this.addQuickMsgButtons(record.get('Id'));

    },

    addQuickMsgButtons: function (id) {

        var buttonContainerEl;

        // button visibility
        this.showQuickMsgDeleteBtn = AE.app.getController('User').getUserRights('ShowQuickMsgDeleteBtn');
        this.showQuickMsgUpdateBtn = AE.app.getController('User').getUserRights('ShowQuickMsgUpdateBtn');

        if (!this.showQuickMsgDeleteBtn && this.showQuickMsgUpdateBtn) {
            return;
        }

        buttonContainerEl = Ext.DomQuery.selectNode('div#msgBtnContainer_' + id);

        if (!buttonContainerEl) {
            return;
        }

        this.quickMsgButtons = Ext.create('Ext.Toolbar', {
            renderTo: buttonContainerEl,
            items: [{
                iconCls:'compose3',
                ui: 'orange',
                iconMask:true,
                hidden: !this.showQuickMsgDeleteBtn,
                handler: this.updateQuickMsg,
                recordId: id,
                scope: this
            }, {
                iconCls:'trash',
                ui: 'orange',
                iconMask:true,
                hidden: !this.showQuickMsgUpdateBtn,
                handler: this.deleteQuickMsg,
                recordId: id,
                scope: this
            }]
        });

    },

    deleteQuickMsg: function (btn) {
        this.tappedFromQuickMsgBtn = true;

        this.selectedQuickMsgRecord = Ext.getStore('QuickMessages').getById(btn.config.recordId);

        AE.app.getController('UtilClass').alertMsgBox({
            title: 'Delete Quick Message',
            message: 'Do you want to Delete this Quick Message?',
            fn: this.doDeleteQuickMsg,
            scope: this
        });

    },

    doDeleteQuickMsg: function (btn) {
        var that = this;

        if (btn == 'yes') {

            Ext.getStore('QuickMessages').remove(this.selectedQuickMsgRecord);

            Ext.Ajax.request({
                url : '/EmailResponse/DeleteMessage',
                method: 'POST',
                params: {
                    Id: this.selectedQuickMsgRecord.get('Id')
                },
                success: function(response) {
                    var responseJson = Ext.decode(response.responseText);

                    that.getReplyQuickMessageList().refresh();
                },
                failure: function (response, options) {

                    AE.msgBox.alert('Error', 'Error: Server response error 4' );

                    AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
                }
            });
        } else {
            this.getReplyQuickMessageList().deselectAll();
        }
    },

    updateQuickMsg: function (btn) {
        this.tappedFromQuickMsgBtn = true;

        this.selectedQuickMsgRecord = Ext.getStore('QuickMessages').getById(btn.config.recordId);

        AE.msgBox.show({
            title: 'Update Quick Message',
            multiLine: false,
            prompt: true,
            value: this.selectedQuickMsgRecord.get('MessageTemplate'),
            width: 380,
            buttons: [{
                text: 'Update',
                itemId: 'update'
            }, {
                text: 'Cancel',
                itemId: 'cancel',
                ui: 'action'
            }],
            fn: this.doUpdateQuickMsg,
            scope: this
        });

    },

    doUpdateQuickMsg: function (btn, textValue) {
        var that = this,

        textValue = Ext.String.trim(textValue);

        if (btn == 'update') {
            if (textValue == '') {
                this.updateQuickMsg();
            } else {
                this.selectedQuickMsgRecord.set('MessageTemplate', textValue);
                this.selectedQuickMsgRecord.commit();
                Ext.Ajax.request({
                    url : '/EmailResponse/UpdateMessage',
                    method: 'POST',
                    params: {
                        Id: this.selectedQuickMsgRecord.get('Id'),
                        MessageTemplate: textValue
                    },
                    success: function(response) {
                        var responseJson = Ext.decode(response.responseText);

                        that.getReplyQuickMessageList().refresh();
                    },
                    failure: function (response, options) {

                        AE.msgBox.alert('Error', 'Error: Server response error 5' );

                        AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
                    }
                });
            }
        }

        this.getReplyQuickMessageList().deselectAll();

    },

    saveQuickMessageBtnHandler: function () {
        var messageTextarea = this.getReplyMessageTextarea(),
            messageValue = Ext.String.trim(messageTextarea.getValue());

        if (messageValue == '') {
            AE.msgBox.alert('Text Required', 'Please enter a Message', Ext.emptyFn);
            return;
        }

        AE.app.getController('UtilClass').alertMsgBox({
            title: 'Save Quick Message',
            message: 'Do you want to Save this Message as a Quick Message Template?',
            fn: this.doSaveQuickMsg,
            scope: this
        });
    },

    doSaveQuickMsg: function (btn) {

        var that = this,
            messageTextarea = this.getReplyMessageTextarea(),
            messageValue = messageTextarea.getValue(),
            quickMessagesStore = Ext.getStore('QuickMessages');

        if (btn == 'yes') {

            var user = Ext.getStore('Accounts').first();

            Ext.Ajax.request({
                url : '/EmailResponse/AddMessage',
                method: 'POST',
                params: {
                    MessageTemplate: messageValue,
                    UserId: user.get('Id')
                },
                success: function(response) {
                    var responseJson = Ext.decode(response.responseText);

                    // ReLoad messages store
                    Ext.getStore('QuickMessages').load();

                },
                failure: function (response, options) {

                    AE.msgBox.alert('Error', 'Error: Server response error 6' );

                    AE.app.getController('UtilClass').ajaxErrorLog(options.url, response.responseText, response.status, response.statusText);
                }
            });

        }
    }

});