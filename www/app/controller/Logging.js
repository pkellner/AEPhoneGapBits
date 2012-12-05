Ext.define('AE.controller.Logging', {
    extend: 'Ext.app.Controller',

    requires: [

    ],

    config: {

    },

    allowLogging: function () {
        var allowLogging = false,
            loggingPanel = Ext.getCmp('loggingPanel');

        if (AE.config.logger.enable) {
            allowLogging = true;
        }
        // Url var for logging takes top priority
        if (AE.urlVars) {
            if (typeof AE.urlVars.logging === 'string') {
                AE.urlVars.logging = (AE.urlVars.logging == 'true') ? true : false;

                if (AE.urlVars.logging) {
                    allowLogging = true;
                } else {
                    allowLogging = false;
                }

                AE.config.logger.enable = allowLogging;
            }

        }
        // Show the logging panel if logging is enabled
        if (allowLogging && loggingPanel && loggingPanel.isHidden()) {
            loggingPanel.show();
            Ext.getCmp('clearLogsBtn').setHidden(false);
        }

        return allowLogging;
    },

    logger: function (msg, level, logType, data) {

        var dt, dtFormat, logLevelText, logTextPanel;

        if (!this.allowLogging()) {
            return;
        }

        dt = new Date();


        if (level) {
            logLevelText = AE.config.logger.level[level];
        } else {
            // Trace. Default log level
            level = 0;
            logLevelText = AE.config.logger.level[0];
        }

        // Check for the minimum level for loggin
        if (level <= AE.config.logger.minLogLevel) {

            // Show log on about window
            switch (logType) {
                case 'info':
                    console.info(logLevelText + ': ' + msg, data);
                    break;
                default:
                    console.log(logLevelText + ': ' + msg);
            }

            logTextPanel = Ext.get('logTextPanel');

            dtFormat = Ext.Date.format(dt, "H:i:s");

            if (logTextPanel) {
                logTextPanel.setHtml('<div class="logItem '+logLevelText+'"> > ' + dtFormat +': ' + logLevelText +': ' + msg + '</div>' + logTextPanel.getHtml());
            }

        }

    },

    ajaxErrorLog: function (url, responseText, status, statusText, params) {
//        this.logger('AJAX Error; responseText: ' + responseText, 4);
        this.logger('<br />Ajax url: ' + url +
            '<br />Ajax status: ' + status +
            '<br />Ajax statusText: ' + statusText +
            '<br />params: ' + (params ? JSON.stringify(params, null, '<br />'): ''),
            4);

    }

});