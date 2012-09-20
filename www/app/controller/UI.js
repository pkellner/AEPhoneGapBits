Ext.define('AE.controller.UI', {
    extend:'Ext.app.Controller',

    config:{
        routes:{
            'login':'showLogin'
        },
        refs:{
            viewport:'viewport',
            mainView:'mainview',
            mainContainerPanel: '#mainContainerPanel',
            mainWrapperPanel:'#mainWrapperPanel',

            contactsListContainerPanel:'#contactsListContainerPanel',
            contactsList:'contactslist',
            accountToolbar:'#accountToolbar',
            accountToolbar2:'#accountToolbar2',

            contactsListBottomToolbar:'#contactsListBottomToolbar',
            addWhitelistMultipleEmailBtn:'#addWhitelistMultipleEmailBtn',
            addWhitelistEmailBtn:'#addWhitelistEmailBtn',
            infoWinBtn:'#infoWinBtn',

            contactsListBottomToolbar2:'#contactsListBottomToolbar2',
            addWhitelistMultipleEmailBtn2:'#addWhitelistMultipleEmailBtn2',
            addWhitelistEmailBtn2:'#addWhitelistEmailBtn2',
            infoWinBtn2:'#infoWinBtn2',


            // Contact Control
            whitelistContactControl: '#whitelistContactControl',
            assignPictureContactControl: '#assignPictureContactControl',

            settingsBtn:'#settingsBtn',
            settingsBtn2:'#settingsBtn2',
            logoutBtn:'#logoutBtn',
            logoutBtn2:'#logoutBtn2',
            refreshContactsListBtn:'#refreshContactsListBtn',
            refreshContactsListBtn2:'#refreshContactsListBtn2',

            toolbarNewEmailBtn: '#toolbarNewEmailBtn',
            toolbarNewEmailBtn2: '#toolbarNewEmailBtn2',

            emailsContainerPanel:'#emailsContainerPanel',
            // Padded Border
            emailsCarouselBorder:'emailscarouselborder',
            // Sencha Carousel
            emailsCarousel:'emailscarousel',

            // Emails Carousel with bottom controls
            emailsCarouselBottomControls: 'emailscarouselbottomcontrols',
            emailCarouselBottomToolbar: '#emailCarouselBottomToolbar',
            emailsBottomArrowLeft: '#emailsBottomArrowLeft',
            emailsBottomArrowRight: '#emailsBottomArrowRight',
            emailsBottomCounter: '#emailsBottomCounter',

            loggedInUserInfoToolbar: '#loggedInUserInfoToolbar',

            // Affordances
            leftCarouselArrow:'#leftCarouselArrow',
            rightCarouselArrow:'#rightCarouselArrow'
        },
        controls: {
            refreshContactsListBtn: {
                painted: 'onPaintRefreshContactsListBtn'
            },
            refreshContactsListBtn2: {
                painted: 'onPaintRefreshContactsListBtn'
            }
        }
    },

    launch:function () {

        this.getDeviceTypeByScreenSize();

        var that = this;
        // Not added through the viewport because there's no buffer option
        Ext.Viewport.on({
            orientationchange:{
                fn:that.onOrientationChange,
                scope:that,
                buffer:300
            },
            resize:{
                fn:that.viewportResize,
                scope:that
            }
        });

        this.onOrientationChange(Ext.Viewport);

        this.viewportResize();

    },

    appScreen: 'login',

    device:{},

    floatingPanels: [],

    addToListFloatingPanels: function (panel) {
        this.floatingPanels[this.floatingPanels.length] = panel;
    },

    hideFloatingPanels: function (skipPanel) {
        var i;

        for (i = 0; i < this.floatingPanels.length; i++) {
            if (this.floatingPanels[i].getId() != skipPanel) {
                this.floatingPanels[i].hide();
            }
        }
    },

    // Using browser user agent
    getDeviceTypeByScreenSize:function () {

        var viewport = Ext.Viewport,
            vWidth = viewport.getWindowWidth(),
            vHeight = viewport.getWindowHeight(),
            ua = navigator.userAgent,
            checker = {
                ipad:ua.match(/iPad/),
                android:ua.match(/Android/),
                blackberry:ua.match(/BlackBerry/)
            };

        AE.logger('vWidth: ' + vWidth);
        AE.logger('vHeight: ' + vHeight);

        if (checker.ipad) {
            AE.logger('Device: iPad');
            if (vWidth > 1024 || vHeight > 768) {
                this.device = AE.config.iPad3;
                this.device.type = 'iPad3';
            } else {
                this.device = AE.config.iPad12;
                this.device.type = 'iPad12';
            }
        }
        else {
            AE.logger('Device: Other');
            if (vWidth <= 800 && vHeight <= 600 || vHeight <= 800 && vWidth <= 600) {

                this.device = AE.config.Device_800x600;
                this.device.type = 'Device_800x600';

            } else if (vWidth <= 1200 && vHeight <= 800 || vHeight <= 1200 && vWidth <= 800) {

                this.device = AE.config.Device_1200x800;
                this.device.type = 'Device_800x600';

            } else {

                this.device = AE.config.OtherDevice;
                this.device.type = 'OtherDevice';

            }
        }

        this.device.ua = ua;

    },

    // Components to create on first run
    initComponentsByDeviceLoggedIn:function () {

        if (this.device.affordances) {
            this.createAffordances();
        }

        if (this.device.bottomControls) {
            this.createBottomControls();
        }

        if (!AE.app.getController('User').getUserRights('HideLoggedInUserInfoToolbar')) {
            this.addLoggedInNameToolbar();
        }

    },

    onTapInfoWinBtn: function () {

        var that = this,
            aboutInfoText;

        if (!this.aboutPanel) {
            aboutInfoText = AE.app.getController('User').getUserInfoForAbout();
            this.aboutPanel = Ext.create('Ext.Panel', {
                modal:true,
                showAnimation:'popIn',
                hideAnimation:'popOut',
                centered:true,
                width:475,
                height:400,
                layout:'fit',
                items:[
                    {
                        docked:'top',
                        xtype:'toolbar',
                        id: 'infoWinToolbar',
                        ui: 'blue',
                        title:'AgelessEmail',
                        items: [{
                            xtype: 'button',
                            text: 'Close',
                            id: 'infoWinCloseBtn',
                            handler: function () {
                                that.aboutPanel.hide();
                            }
                        }, {
                            xtype: 'spacer'
                        }]
                    }, {
                        style: 'padding: 12px;',
                        html: aboutInfoText
                    }
                ]
            });
        }

        Ext.Viewport.add([this.aboutPanel]);

        this.aboutPanel.show();
    },

    addLoggedInNameToolbar: function () {
        var that = this;

        if (!this.getContactsListBottomToolbar()) {
            this.getContactsList().add([{
                id: 'contactsListBottomToolbar',
                xtype: 'toolbar',
                docked: 'bottom',
                items: [{
                    id: 'contactsArrowDownBtn',
                    iconCls: 'arrow_down',
                    iconMask: true
                }, {
                    id: 'contactsArrowUpBtn',
                    iconCls: 'arrow_up',
                    iconMask: true
                }, {
                    xtype: 'spacer'
                }, {
                    id: 'addWhitelistMultipleEmailBtn',
                    iconCls: 'user_multiple_add',
                    iconMask: true
                }, {
                    id: 'addWhitelistEmailBtn',
                    iconCls: 'user_add',
                    iconMask: true
                }, {
                    id: 'infoWinBtn',
                    iconCls: 'info',
                    iconMask: true,
                    handler: this.onTapInfoWinBtn,
                    scope: this
                }
                ]
            }, {
                xtype: 'toolbar',
                id: 'contactsListBottomToolbar2',
                docked: 'bottom',
                hidden: true,
                items: [{
                    id: 'infoWinBtn2',
                    iconCls: 'info',
                    iconMask: true,
                    handler: this.onTapInfoWinBtn,
                    scope: this
                }, {
                    xtype: 'spacer'
                }, {
                    id: 'addWhitelistMultipleEmailBtn2',
                    iconCls: 'user_multiple_add',
                    iconMask: true
                }, {
                    id: 'addWhitelistEmailBtn2',
                    iconCls: 'user_add',
                    iconMask: true
                }]
            }]);
        }

        if (!this.getLoggedInUserInfoToolbar()) {
            this.getContactsList().add([{
                cls: 'loggedInUserInfoToolbar',
                id: 'loggedInUserInfoToolbar',
                height: 76,
                hidden: true,
                ui: 'blue-dark-flat',
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype:'title',
                        id: 'loggedInUserInfoToolbarTitle',
                        title:''
                    }, {
                        xtype: 'spacer'
                    }
                ]
            }]);
        }

    },

    createAffordances:function () {

        var leftArrow, rightArrow,
            leftArrowTop, leftArrowLeft,
            rightArrowTop, rightArrowLeft,
            resizeLevel = AE.config.contactsList.resize,
            viewportWidth = Ext.Viewport.getWindowWidth(),
            viewportHeight = Ext.Viewport.getWindowHeight();

        if (this.device.orientation === 'portrait') {
            if (viewportWidth <= 800 && viewportWidth > 600) {
                // This is the width of the contacts list
                leftArrowLeft = resizeLevel.level600To800 + 5;

            } else if (viewportWidth <= 600) {
                // This is the width of the contacts list
                leftArrowLeft = resizeLevel.level600Below + 5;
            }

        } else {
            leftArrowLeft = resizeLevel.level800Up;
        }

        leftArrowTop = rightArrowTop = (viewportHeight - 140) / 2;
        // Width of viewport - width of this component
        rightArrowLeft = viewportWidth - 51

        leftArrow = Ext.create('Ext.Panel', {
            id:'leftCarouselArrow',
            html:'',
            cls:'emailArrow left',
            zIndex:4,
            top:leftArrowTop,
            left:leftArrowLeft,
            width:46,
            height:140
        });

        leftArrow.element.addListener('tap', this.leftArrowTapHandler, this);

        rightArrow = Ext.create('Ext.Panel', {
            id:'rightCarouselArrow',
            html:'',
            cls:'emailArrow right',
            zIndex:4,
            top:rightArrowTop,
            left:rightArrowLeft,
            width:46,
            height:140
        });

        rightArrow.element.addListener('tap', this.rightArrowTapHandler, this);

        Ext.Viewport.add([leftArrow, rightArrow]);

        leftArrow.show();
        rightArrow.show();

        this.device.carouselControls = {
            left: leftArrow,
            right: rightArrow
        }

    },

    createBottomControls: function () {

        var emailsContainerPanel = this.getEmailsContainerPanel(),
            that = this;

        // Add the bottom controls
        // Can't add it directly on the carousel  because it will be overwritten. You can only add items
        // through the items config which is also defined for the carousel items
        if (!this.getEmailsBottomArrowLeft()) {
            emailsContainerPanel.add([
                Ext.create('Ext.Toolbar', {
                    id: 'emailCarouselBottomToolbar',
                    docked: 'bottom',
                    hidden: true,
                    items: [{
                        id: 'emailsBottomCounter',
                        xtype: 'title',
                        title: ''
                    }, {
                        xtype: 'spacer'
                    }, {
                        id: 'emailsBottomArrowLeft',
                        iconCls: 'arrow_left',
                        ui: 'orange',
                        iconAlign: 'right',
                        iconMask: true,
                        handler: that.leftArrowTapHandler,
                        scope: that
                    }, {
                        xtype: 'spacer',
                        width: 10
                    }, {
                        id: 'emailsBottomArrowRight',
                        iconCls: 'arrow_right',
                        ui: 'orange',
                        iconAlign: 'right',
                        iconMask: true,
                        handler: that.rightArrowTapHandler,
                        scope: that
                    }]
                })
            ]);
        }

        this.device.carouselControls = {
            left: this.getEmailsBottomArrowLeft(),
            right: this.getEmailsBottomArrowRight()
        }

    },

    leftArrowTapHandler: function () {
        var leftCarouselArrow;

        this.device.emailsCarousel.previous();

        if (this.device.affordances) {

            leftCarouselArrow = this.device.carouselControls.left;
            leftCarouselArrow.addCls('tapped');

            setTimeout(function () {
                leftCarouselArrow.removeCls('tapped');
            }, 300);
        }

    },

    rightArrowTapHandler: function () {
        var rightCarouselArrow;

        this.device.emailsCarousel.next();

        if (this.device.affordances) {

            rightCarouselArrow = this.device.carouselControls.right;
            rightCarouselArrow.addCls('tapped');

            setTimeout(function () {
                rightCarouselArrow.removeCls('tapped');
            }, 300);
        }
    },

    updateEmailCarouselControls: function (carousel, activeItemIndex, carouselItemsCount) {

        var device = this.device,
            carouselControls,
            left,
            right;

        activeItemIndex++;

        if (device.carouselControls) {
            left = device.carouselControls.left;
            right = device.carouselControls.right;

            if (device.affordances) {
                if (!this.hideAffordances) {
                    if (carouselItemsCount == 1) {
                        left.hide();
                        right.hide();
                    } else {
                        if (activeItemIndex == carouselItemsCount)  {
                            left.show();
                            right.hide();
                        } else if (activeItemIndex == 1)  {
                            left.hide();
                            right.show();
                        } else {
                            left.show();
                            right.show();
                        }
                    }
                }
            }

            if (device.bottomControls) {

                carouselControls = this.getEmailCarouselBottomToolbar();
                if (carouselControls) {
                    carouselControls.show();
                    if (carouselItemsCount == 1) {
                        left.disable();
                        right.disable();
                    } else if (carouselItemsCount == 0) {
                        carouselControls.hide();
                    } else {
                        if (activeItemIndex == carouselItemsCount)  {
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
                }

                // Update carousel counter
                AE.app.getController('Emails').updateEmailCountOnCarouselBottom(carouselItemsCount, activeItemIndex);

            }
        }

    },

    onOrientationChange:function (viewport, orientation, width, height) {

        this.viewportResize();

    },

    viewportResize:function () {
        var that = this;

        if (this.resizeTask) {
            clearTimeout(this.resizeTask);
        }

        this.resizeTask = setTimeout(function () {

            var viewport = Ext.Viewport,
                vWidth = viewport.getWindowWidth(),
                vHeight = viewport.getWindowHeight(),
                resizeLevel = AE.config.contactsList.resize,
                emailsCarousel = that.device.emailsCarousel,
                userController = AE.app.getController('User'),
                resizeLevelToUse,
                affordancesPadding = 0,
                arrowTop,
                leftCarouselArrow,
                rightCarouselArrow;

            if (that.appScreen == 'main') {

                // Determines the orientation
                // Rearranges the toolbar and its items
                if (vWidth > vHeight && vWidth > 800) {
                    // LANDSCAPE

    //            if (this.getEmailsCarousel()) this.getEmailsCarousel().fireEvent('resize');
                    that.device.orientation = 'landscape';

                    that.getAccountToolbar().show();

                    that.getLogoutBtn().show();

                    that.getAccountToolbar().addCls('accountToolbarRound');
                    that.getAccountToolbar2().hide();

                    if (!userController.getUserRights('HideSettingsBtn')) {
                        that.getSettingsBtn().show();
                        that.getSettingsBtn2().hide();
                    }

                    that.getContactsListContainerPanel().setWidth(resizeLevel.level800Up);

                    if (!userController.getUserRights('HideContactsRefreshBtn')) {
                        // For admin
                        if (AE.urlVars.admin) {
                            that.getRefreshContactsListBtn().show();
                            that.getRefreshContactsListBtn2().hide();

                            if (AE.app.getController('Contacts').showToolbarNewEmailBtn) {
                                that.getRefreshContactsListBtn().setUi('red');
                            } else {
                                that.getRefreshContactsListBtn().setUi('normal');
                            }
                        } else {
                            if (AE.app.getController('Contacts').showToolbarNewEmailBtn) {
                                that.getToolbarNewEmailBtn().show();
                                that.getRefreshContactsListBtn().hide();
                            } else {
                                that.getRefreshContactsListBtn().show();
                                that.getToolbarNewEmailBtn().hide();
                            }
                            that.getRefreshContactsListBtn2().hide();
                        }

                    }

                    // Bottom toolbar
                    that.getContactsListBottomToolbar2().hide();
                    // show the other Info button
                    that.getInfoWinBtn().show();

                    if (!userController.getUserRights('HideAddWhitelistEmailBtn')) {
                        that.getAddWhitelistEmailBtn().show();
                    } else {
                        that.getAddWhitelistEmailBtn().hide();
                    }

                    if (!userController.getUserRights('HideAddWhitelistMultipleEmailBtn')) {
                        that.getAddWhitelistMultipleEmailBtn().show();
                    } else {
                        that.getAddWhitelistMultipleEmailBtn().hide();
                    }

                } else {
                    // PORTRAIT
                    that.device.orientation = 'portrait';

                    // Portrait should be 800 or less in width to be modified.
                    if (vWidth <= 800) {

                        that.getLogoutBtn().hide();
                        that.getAccountToolbar().removeCls('accountToolbarRound');
                        that.getAccountToolbar2().show();

                        if (userController.getUserRights('HideAllWhitelistBtn')) {
                            that.getAccountToolbar().hide();
                        }


                        if (!userController.getUserRights('HideSettingsBtn')) {
                            that.getSettingsBtn().hide();
                            that.getSettingsBtn2().show();
                        }

                        if (!userController.getUserRights('HideContactsRefreshBtn')) {

                            // For admin
                            if (AE.urlVars.admin) {
                                that.getRefreshContactsListBtn2().show();
                                that.getRefreshContactsListBtn().hide();
                                if (AE.app.getController('Contacts').showToolbarNewEmailBtn) {
                                    that.getRefreshContactsListBtn2().setUi('red');
                                } else {
                                    that.getRefreshContactsListBtn2().setUi('normal');
                                }
                            } else {
                                if (AE.app.getController('Contacts').showToolbarNewEmailBtn) {
                                    that.getToolbarNewEmailBtn2().show();
                                    that.getRefreshContactsListBtn2().hide();
                                    that.getRefreshContactsListBtn().hide();
                                } else {
                                    that.getToolbarNewEmailBtn2().hide();
                                    that.getRefreshContactsListBtn2().show();
                                    that.getRefreshContactsListBtn().hide();
                                }
                            }

                        }

                    } else {
                        that.getAccountToolbar2().hide();

                        that.getLogoutBtn().show();

                        if (!userController.getUserRights('HideSettingsBtn')) {
                            that.getSettingsBtn().show();
                            that.getSettingsBtn2().hide();
                        }

                        if (!userController.getUserRights('HideContactsRefreshBtn')) {
                            // For admin
                            if (AE.urlVars.admin) {
                                that.getRefreshContactsListBtn2().show();
                                that.getRefreshContactsListBtn().hide();
                                if (AE.app.getController('Contacts').showToolbarNewEmailBtn) {
                                    that.getRefreshContactsListBtn2().setUi('red');
                                } else {
                                    that.getRefreshContactsListBtn2().setUi('normal');
                                }
                            } else {
                                if (AE.app.getController('Contacts').showToolbarNewEmailBtn) {
                                    that.getToolbarNewEmailBtn2().show();
                                    that.getRefreshContactsListBtn2().hide();
                                } else {
                                    that.getToolbarNewEmailBtn2().hide();
                                    that.getRefreshContactsListBtn2().show();
                                }
                            }
                        }
                    }

                    if (AE.urlVars.admin) {
                        // Bottom toolbar
                        that.getContactsListBottomToolbar2().show();

                        // Hide the other whitelist add button
                        that.getAddWhitelistEmailBtn().hide();
                        // Hide the other multiple whitelist add button
                        that.getAddWhitelistMultipleEmailBtn().hide();
                        // Hide the other Info button
                        that.getInfoWinBtn().hide();
                    }

                }

                AE.logger(that.device.orientation)
                AE.logger(vWidth)
                AE.logger(vHeight)

                // Contacts Resize
                if (that.device.orientation == 'portrait') {

                    if (vWidth <= 800 && vWidth > 600) {
                        that.contactControlButtonIconMask(false);
                        resizeLevelToUse = resizeLevel.level600To800;

                    } else if (vWidth <= 600) {
                        that.contactControlButtonIconMask(false);
                        resizeLevelToUse = resizeLevel.level600Below;

                    } else {
                        that.contactControlButtonIconMask(true);
                        resizeLevelToUse = resizeLevel.level800Up;
                    }

                } else {
                    that.contactControlButtonIconMask(true);
                    resizeLevelToUse = resizeLevel.level800Up;
                }

                if (that.device.affordances) {

                    affordancesPadding = 5;
                    arrowTop = (vHeight / 2) - 70;
                    leftCarouselArrow = that.getLeftCarouselArrow();
                    rightCarouselArrow = that.getRightCarouselArrow();

                    // For positioning the arrows
                    if (that.getLeftCarouselArrow()) {

                        that.getRightCarouselArrow().doSetLeft(vWidth - 51);
                        that.getRightCarouselArrow().doSetTop(arrowTop);

                        that.getLeftCarouselArrow().doSetLeft(resizeLevelToUse + affordancesPadding);
                        that.getLeftCarouselArrow().doSetTop(arrowTop);

                    }

                    // Hide affordances on small screen
                    if (vHeight < 500 || vWidth < 500) {
                        that.hideAffordances = true;
                    } else {
                        that.hideAffordances = false;
                    }
                }

                // Resize the contacts list
                that.getContactsListContainerPanel().setWidth(resizeLevelToUse);

                that.contactsListResizeLevel = resizeLevelToUse;

                if (emailsCarousel) emailsCarousel.onSizeChange();

            }

            clearTimeout(that.resizeTask);

        }, 1);

    },

    onPaintRefreshContactsListBtn: function () {
        var hideCmp = AE.app.getController('User').getUserRights('HideContactsRefreshBtn');
        this.getRefreshContactsListBtn().setHidden(hideCmp);
        this.getRefreshContactsListBtn2().setHidden(hideCmp);
    },

    contactControlButtonIconMask: function (visibility) {
//        this.getWhitelistContactControl().setIconMask(visibility);

//        this.getAssignPictureContactControl().setIconMask(visibility);

    },

    setHiddenBottomControls: function (hiddenBool) {
        if (this.device.bottomControls) {
            this.getEmailCarouselBottomToolbar().setHidden(hiddenBool);
        }
    },


    resetUI: function () {
        if (this.getLeftCarouselArrow()) {
            this.getLeftCarouselArrow().hide();
            this.getRightCarouselArrow().hide();
        }

        this.setHiddenBottomControls(true);

        // Hide Main panel
        this.getMainContainerPanel().setActiveItem(0);

        AE.app.getController('UI').appScreen = 'login';

        // Show pop animation
        AE.app.getController('LoginRegister').popLoginForm();
    }
});