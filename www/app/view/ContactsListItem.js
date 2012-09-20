Ext.define('AE.view.ContactsListItem', {
    extend: 'Ext.dataview.component.DataItem',
    xtype : 'contactslistitem',
    requires: [
        'Ext.Img'
    ],

    config: {

        layout: {
            type: 'vbox'
        },
        dataMap: {

            getFirstName: {
                setHtml: 'FirstName'
            }

        },

        firstName: {
            cls   : 'firstName'
        }

    },
    applyFirstName: function(config) {
        return Ext.factory(config, Ext.Component, this.getFirstName());
    },
    updateFirstName: function(newText) {
        if (newText) {
            this.add(newText);
        }
    }
});