Ext.ns('AE.config');

AE.config = {

    build: '9.7.12.1',

    logger: {
        enable: true,
        minLogLevel: 0,
        level: {
            0: 'Trace',
            1: 'Debug',
            2: 'Info',
            3: 'Warn',
            4: 'Error'
        }
    },

    // The base url for all ajax calls
    baseUrl: 'http://agelessemail.peterkellner.net',

    HideCreateAccountBtn: {
        admin: false,
        normal: true
    },

    // Remote filtering of Contacts
    // ON uses server filter
    // OFF uses ST store filtering
    RemoteFilter: {
        admin: true,
        normal: true
    },

    // FILTER PARAMS
    // Used in GetPersonsWithEmailByEmailAccount

    // Filter for showing only whitelist contact.
    // Normal Mode (Mom) will show Whitelist only.
    WhiteListOnly: {
        admin: false,
        normal: true
    },

    // Filter for including the deleted emails
    // Normal mode will not show Deleted emails.  Admin mode will show.
    IncludeDeletedEmails: {
        admin: false,
        normal: false
    },

    // Filter for including the read/viewed emails
    // For now, both Admin and Normal Mode are ON and will showed Viewed Emails.
    IncludeViewedEmails: {
        admin: true,
        normal: true
    },

    // Includes all senders / contacts
    // ON includes all the senders even if they don't have emails
    // OFF only includes contacts that have emails
    IncludeAllSenders: {
        admin: true,
        normal: false
    },

    // End of FILTER PARAMS



    // FILTER BUTTONS

    // Shows or Hides the All / Whitelist Toggle button
    // Right now, the Toggle is hidden for Normal.  The Toggle shows for Admin.
    HideAllWhitelistBtn: {
        admin: false,
        normal: true
    },

    // Shows or Hides the Include Deleted emails button
    // Refer to filter: IncludeDeletedEmails
    // Right now, we HIDE deleted Emails for Normal mode.
    HideIncludeDeletedEmailsRender: {
        admin: false,
        normal: true
    },

    // Shows or Hides the Read/Viewed emails button
    // Refer to filter: IncludeViewedEmails
    HideIncludeViewedEmailsRender: {
        admin: true,
        normal: true
    },

    // Shows or Hides the Manage Whitelist button
    // Button is hidden for Mom mode
    HideAddWhitelistEmailBtn: {
        admin: false,
        normal: true
    },

    // Shows or Hides the Multiple whitelist checker button
    // Button is hidden for Mom mode
    HideAddWhitelistMultipleEmailBtn: {
        admin: false,
        normal: true
    },

    // Shows or Hides button for showing the Include All Senders
    // Refere to filter: IncludeAllSenders
    IncludeAllSendersRender: {
        admin: false,
        normal: true
    },

    // End of FILTER BUTTONS



    // Shows or Hides the Settings button
    // Right now, we are Hiding the Settings button for Normal.  We show it for Admin mode.
    HideSettingsBtn: {
        admin: false,
        normal: true
    },

    // Shows or Hides the Delete/Trash button on emails
    // Right now, we Show the Delete button for both Normal and Admin.
    HideDeleteButtonOnEmail: {
        admin: false,
        normal: false
    },

    // Shows or Hides the bottom toolbar that shows the Logged in User's Username and Email Address
    // Right now, we are showing the Info bar for both Admin and Normal.
    HideLoggedInUserInfoToolbar: {
        admin: false,
        normal: false
    },

    HideUserInfoInAboutWindow: {
        admin: false,
        normal: false
    },

    // Shows or Hides the Confirmation window for logging out
    // ON - Directly logs out the user
    // OFF - Asks if the user wants to logout
    // Right now, in Normal mode, the user will be prompted.  Admin will not be prompted.
    HideLogoutConfirmWindow: {
        admin: true,
        normal: false
    },


    // CONTACT BUTTONS
    // Buttons on the selected contact list (Update, Whitelist, Assign Picture)

    // Shows or Hides the Update button
    // Updates the contact information
    // Right now, Admin shows the Update button.  The Update button is hidden in Normal mode.
    ShowUpdateAddressBook: {
        admin: true,
        normal: false
    },

    // Shows or Hides the Assign Picture button
    // Assigns a picture to the contact
    // Right now, Admin shows the Assign Picture button.  The Assign button is hidden in Normal mode.
    ShowAssignPictureToAddressBook: {
        admin: true,
        normal: false
    },

    // Shows or Hides the Whitelist Button
    // To add contact as a Whitelist
    // Right now, Admin shows the Whitelist button.  The Whitelist button is hidden in Normal mode.
    ShowAssignToWhiteListButton: {
        admin: true,
        normal: false
    },
    // End of CONTACT BUTTONS



    // Shows or Hides the Email read/viewed marker
    // This is the close and open mail icon on the emails
    // The "New" Count Field is also tied to this Config option
    // Right now, we show the Icon for the Normal mode.  It is Hidden for Admin.
    HideEmailViewedMarker: {
        admin: true,
        normal: false
    },

    // Shows or Hides the number of emails counter on the bottom of the emails carousel
    // Right now, we show the Counter for both Admin and Normal modes.
    HideEmailCarouselCounter: {
        admin: false,
        normal: false
    },

    // Shows or Hides the number of Image on the email Image Viewer
    // Right now, we show the Counter on the Image Viewer for both Admin and Normal modes.
    HideEmailImageViewerCounter: {
        admin: false,
        normal: false
    },

    // Shows or Hides the new email button, per Sender.
    // Right now, the buttons are being hidden for both modes.
    // Right now, we are using the Big Red New Email button on the Toolbar.
    HideNewEmailButton: {
        admin: true,
        normal: true
    },

    // This Config turns off the Dynamic Sort of the Sender List.
    // Right now, the Sort is off for both Normal and Admin.
    SortSenderListDynamically: {
        admin: false,
        normal: false
    },

    EmailImageThumbLimit: 50,

    // AJAX request timeout for getting emails
    // Value Milliseconds
    GetEmailByPersonTimeoutLimit: 180000,

    // For Polling email updates on Contacts list
    // Value in Milliseconds
    AddressBookReloadTime: {
        admin: 10000,
        normal: 10000
    },

    // Shows or Hides the Delete Account button on the Settings window.
    // Right now, we hide the button for Normal mode and show it for Admin mode.
    HideDeleteAccountBtn: {
        admin: false,
        normal: true
    },

    // Shows or Hides the Delete Account Data Only button on the Settings window.
    // Right now, we hide the button for Normal mode and show it for Admin mode.
    HideDeleteDataOnlyBtn: {
        admin: false,
        normal: true
    },

    // Shows or Hides the Assign Dropbox account button on the Settings window
    // Right now, we hide the button for Normal mode and for Admin mode.
    HideAssignDropboxBtn: {
        admin: true,
        normal: true
    },

    // Shows or Hides the Clear Dropbox button on the Settings window
    // Right now, we hide the button for Normal mode and for Admin mode.
    HideClearDropboxBtn: {
        admin: true,
        normal: true
    },

    // Shows or Hides the contacts list Refresh button
    // Right now, we show the Refresh button for both Admin and Normal modes.
    HideContactsRefreshBtn: {
        admin: false,
        normal: false
    },

    // Shows or Hides the window which confirms that a reply message has been sent
    // Right now, we hide the confirm message box for both modes.
    HideReplyMessageSentConfirmMsgBox: {
        admin: true,
        normal: true
    },

    // Shows or Hides the New Email button on the top toolbar
    // This is the Big Red New Email button
    // Right now, we hide this Big Red Button in Admin mode.  We show it for the Normal mode.
    HideToolbarNewEmailBtn: {
        admin: false,
        normal: false
    },

    // Shows or Hides the RED Border around the Sender.
    // Right now they are both ON.  Right now, we show in both modes.
    ShowNewEmailBorder: {
        admin: false,
        normal: false
    },

    // Scrolls to the previous selected sender on tapping the refresh button
    ScrollSelectedSenderToView: {
        admin: false,
        normal: false
    },

    // To show the HTML version of email
    // ON - shows HTML from the param BodyTextHtml
    // OFF - shows text fromt he param BodyText
    DisplayHtmlInBody: {
        admin: true,
        normal: false
    },

    // LocalStorage limit for storing emails on browser
    // Value in millions
    // Most browsers have 2,600,000 characters limit
    EmailStoreLocalStorageLimit: 2,

    // This sets the number of records that will be deleted
    // when the Storage Limit (EmailStoreLocalStorageLimit) is reached
    EmailStoreCacheManagerNumberOfRecordToRemove: 5,

    // Retains records on Email store and send existingEmailIds
    EnableCacheOfEmails: {
        admin: false,
        normal: false
    },

    // Proxy to use on Email Store
    // ON - uses localStorage proxy
    // OFF -  uses memory proxy
    UseLocalStorageEmailStore: {
        admin: false,
        normal: false
    },

    // Shows or Hides the Reply / Quick Message Save button
    // Right now, we show the button for the Admin mode and hide the button for Normal mode.
    ShowQuickMsgSaveBtn: {
        admin: true,
        normal: false
    },

    // Shows or Hides the Reply / Quick Message Delete button
    // Right now, we show the button for the Admin mode and hide the button for Normal mode.
    ShowQuickMsgDeleteBtn: {
        admin: true,
        normal: false
    },

    // Shows or Hides the Reply / Quick Message Update button
    // Right now, we show the button for the Admin mode and hide the button for Normal mode.
    ShowQuickMsgUpdateBtn: {
        admin: true,
        normal: false
    },

    // Step 1 registration form mask timeout
    // Delay time to show the mask
    step1FormRegistrationTimeout: 500,

    // Email loading mask timeout
    // Delay time to show the mask
    emailLoadingMaskTimeout: 2500,


//    DEVICE ELEMENT RENDER
//    Config options:
//    carouselBorder: true - has previews on previous and next carousel with floating affordances
//    carouselBorder: false - Native sencha touch carousel. No modifications
//    affordances: true - Adds a floating Left and Right affordances
//    bottomControls: true - adds a bottom left and right control

    // For iPad 1 and 2
    iPad12: {
        carouselBorder: false,
        infiniteCarousel: true,
        bottomControls: true
    },

    // For iPad 3
    iPad3: {
        carouselBorder: false,
        infiniteCarousel: true,
        bottomControls: true
    },

    // Devices with 800 x 600 resolution
    Device_800x600: {
        carouselBorder: false,
        infiniteCarousel: true,
        bottomControls: true
    },

    // Device with 1200 x 800 resolution
    Device_1200x800: {
        carouselBorder: false,
        infiniteCarousel: true,
        bottomControls: true
    },

    // For all other device
    OtherDevice: {
        carouselBorder: false,
        infiniteCarousel: true,
        bottomControls: true
    },

    // Further config for the Carousel Border
    // Applies only when [deviceType].carouselBorder is set to tue

    emailsCarouselBorder: {
        // Email carousel item offset
        // Should be even number
        itemOffset: 26,
        // Use sencha carousel
        useNative: false
    },

    // Resize level of Contats List panel
    // Value in pixels
    contactsList: {
        resize: {
            // For screen width 800px and up
            level800Up: 350,
            // For screen width 600px to 800px
            level600To800: 210,
            // For screen width 600px and below
            level600Below: 170
        }
    },

    contactsListScrollToYLength: 150

    // End of DEVICE ELEMENT RENDER
}

