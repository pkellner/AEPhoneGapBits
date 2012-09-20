Ext.define('AE.view.ReplyPanel', {
    extend: 'Ext.Panel',
    xtype : 'replypanel',
    config: {
        cls: 'replyPanel',
        hidden: true,
        modal: true,
        top: '15%',
        left: '15%',
        showAnimation: 'pop',
        hideAnimation:'popOut',
        layout: 'fit',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            id: 'replyPanelTopToolbar',
            items: [{
                xtype: 'button',
                id: 'replyPanelCloseBtn',
                text: 'Close'
            }]
        }, {
            layout: 'vbox',
            id: 'replyPanelMessageBody',
            cls: 'formContainer',
            items: [{
                xtype: 'panel',
                id: 'recipientPanel',
                height: 69
            }, {
                layout: 'card',
                id: 'replyMessageCard',
                flex: 1,
                activeItem: 0,
                items: [{
                    layout: 'vbox',
                    showAnimation: {
                        type: 'slide',
                        direction: 'left'
                    },
                    items: [{
                        xtype: 'button',
                        text: 'Create Your Own Message',
                        id: 'replyCreateMessageBtn',
                        iconCls: 'compose',
                        iconMask: true
                    }, {
                        html: 'Choose a Quick Message below:',
                        cls: 'quickMessageTitle',
                        padding: '10px 5px'
                    }, {
                        xtype: 'list',
                        flex: 1,
                        id: 'replyQuickMessageList',
                        cls: 'quickMessageList',
                        itemTpl: '<div class="msgBtnContainer" id="msgBtnContainer_{Id}"></div><div class="msgTpl">{MessageTemplate}</div><div class="clearBoth"></div>',
                        store: 'QuickMessages'
                    }]
                }, {
                    layout: 'vbox',
                    showAnimation: {
                        type: 'slide',
                        direction: 'right'
                    },
                    items: [{
                        xtype: 'button',
                        text: 'Use Quick Message',
                        id: 'replyBackToQuickMessageBtn',
                        iconCls: 'list',
                        iconMask: true
                    }, {
                        html: 'Type your Reply Message below:',
                        cls: 'quickMessageTitle',
                        padding: '10px 5px'
                    }, {
                        xtype: 'toolbar',
                        ui: 'blue-dark-flat',
                        items: [{
                            xtype: 'button',
                            text: 'Save as Quick Message Template',
                            id: 'saveQuickMessageBtn',
                            hidden: true,
                            iconCls: 'doc_new',
                            iconMask: true
                        }, {
                            xtype: 'spacer'
                        }, {
                            xtype: 'button',
                            id: 'replyPanelSendBtn',
                            iconCls: 'doc_send',
                            iconMask: true,
                            ui: 'orange',
                            text: 'Send'
                        }]
                    }, {
                        xtype: 'formpanel',
                        id: 'replyFormPanel',
                        flex: 1,
                        scrollable: false,
                        items: [{
                            xtype: 'textareafield',
                            labelAlign: 'left',
                            clearIcon: false,
                            autoCorrect: true,
                            autoComplete: true,
                            autoCapitalize: true,
                            maxRows: 5,
                            name: 'replyMessage',
                            id: 'replyMessageTextarea'
                        }]
                    }]
                }]
            }]
        }]
    }
});