Ext.define('AE.controller.UtilClass', {
    extend:'Ext.app.Controller',

    launch:function () {

        // Gets URL params
        // Used for determining user rights

        AE.logger(AE.urlVars.admin ? 'Admin' : 'User');

//        this.overrideConsole();

    },
    // Wanted to directly override console method.
    // Got invocation error
    // Asked on StackOverflow
    overrideConsole: function () {

        var origLog = console.log.bind(console);

        if (window.console) {

            if (AE.config.logger.enable) {

                console.__proto__.log = function (msg, level) {

                    if (level) {
                        level = AE.config.logger.level[level];
                    } else {
                        level = AE.config.logger.level[0];
                    }

                    origLog(level + ': ' + msg);

                }
            }

        } else {
            console = function () {
            };
        }
    },

    // Gets URL params
    getUrlParams: function () {
        var vars = {},
            parts = window.location.href.replace(/[?&]+([^=&]+)=([^&#]*)/gi, function(m,key,value) {
            vars[key] = value;
        });

        AE.urlVars = vars;

    },

    logger: function (msg, level, logType, data) {

        if (AE.config.logger.enable && level >= AE.config.logger.minLogLevel) {

            if (level) {
                level = AE.config.logger.level[level];
            } else {
                level = AE.config.logger.level[0];
            }

            switch (logType) {
                case 'info':
                    console.info(level + ': ' + msg, data)
                    break;
                default:
                    console.log(level + ': ' + msg);
            }
        }
    },

    ajaxErrorLog: function (url, responseText, status, statusText) {
        this.logger('url: ' + url, 4);
        this.logger('responseText: ' + responseText, 4);
        this.logger('status: ' + status, 4);
        this.logger('statusText: ' + statusText, 4);
    },

    clearFormChecks: function (formFields, resetField) {
        Ext.each(formFields.fields, function (field) {

            var extField = Ext.getCmp(formFields.idPrefix + field.name);

                extField.setCls('');

                if (resetField) {
                    extField.reset();
                }
        });
    },

    formChecker: function (formFields, fieldValues) {
        var valid = true;
        Ext.each(formFields.fields, function (field) {

            var extField = Ext.getCmp(formFields.idPrefix + field.name),
                fieldVal = fieldValues[field.name],
                regEmail = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/);
            switch(field.type) {
                case 'string':

                    if (!Ext.isEmpty(fieldVal) && Ext.isString(fieldVal)) {
                        extField.setCls('');
                    } else {
                        valid = false;
                        extField.setCls('redBorder' );
                    }
                    break;
                case 'email':

                    if (regEmail.test(fieldValues[field.name])) {
                        extField.setCls('');
                    } else {
                        valid = false;
                        extField.setCls('redBorder');
                    }
                    break;
                case 'number':

                    if (Ext.isNumber(fieldValues[field.name])) {
                        extField.setCls('');
                        if (field.exclude) {
                            if (Ext.Array.indexOf(field.exclude, fieldValues[field.name]) >= 0) {
                                valid = false;
                                extField.setCls('redBorder');
                            }
                        }
                    } else {
                        valid = false;
                        extField.setCls('redBorder');
                    }

                    break;
            }

            if (field.notAllowed) {

                if (!field.notAllowed.index) {
                    extField.setCls('');
                } else {
                    valid = false;
                    extField.setCls('redLabel');
                }
            }

            // for optional fields
            if (fieldVal == '' && field.optional)  {
                valid = true;
                extField.setCls('');
            }

        });
        return valid;
    },

    alertMsgBox: function (options) {
        AE.msgBox.show({
            title: options.title,
            message: options.message,
            width: 380,
            buttons: [{
                text: 'Yes',
                itemId: 'yes'
            }, {
                text: 'No',
                itemId: 'no',
                ui: 'action'
            }],
            fn: options.fn,
            scope: options.scope
        });
    },

    createCookie: function (name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    },

    readCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },

    eraseCookie: function (name) {
        this.createCookie(name,"",-1);
    }

});