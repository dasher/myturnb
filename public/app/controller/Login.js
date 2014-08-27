
Ext.define('testing.controller.Login', {
    extend: 'Ext.app.Controller',
    requires: [
        'testing.model.DefaultUser', 
    	'Ext.Ajax', 
    	'Ext.Panel', 
    	'Ext.viewport.Viewport', 
    	'Ext.field.TextArea', 
    	'testing.util.UrlUtils'
    ],
    config: {
        control: {
            readmeButton: { tap: "doReadme" },
            loginButton: { tap: "maskOn" },
            logoutButton: { tap: "doLogout" },
            repeatButton: { tap: "repeatDiscussion" },
        },
        refs: {
            loginForm: "loginView",
            mainView: "mainView",
            readmeButton: "button[action=readmeEvent]",
            createGroupButton: "button[action=createGroupEvent]",
            loginButton: "button[action=loginEvent]",
            logoutButton: "button[action=logoutEvent]",
            repeatButton: "button[action=repeatEvent]",
            loginTextField: "#loginTextField",
            groupSelect: "#groupSelect",
            discussionView: "discussionView",
            userReportView: "userReportView"
        }
    },

    doReadme: function () {
    	var url = testing.util.UrlUtils.getBaseUrl() + 'data/readme.json';
        Ext.Ajax.request({
            disableCaching: false,
            url: url,
            method: "GET",
            scope: this,
            success: function (response, request) {
                var responseText = response.responseText;
                responseText = responseText.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');
                var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    			responseText = responseText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

                //console.log("success -- response: "+response.responseText);
                var msgbox = Ext.create('Ext.Panel', {
                    styleHtmlContent: true,
                    html: responseText,
                    layout: 'fit',
                    modal: true,
                    hideOnMaskTap: true,
                    centered: true,
                    height: '70%',
                    width: '90%',
                    scrollable: {
                        direcion: 'vertical'
                    }
                });
                /*var text = Ext.create('Ext.field.TextArea', {
                value: response.responseText,
                readOnly: true,
                maxRows: 10000000
                });
                msgbox.add(text);*/
                //if it has not been added to a container, add it to the Viewport.
                if (!msgbox.getParent() && Ext.Viewport) {
                    Ext.Viewport.add(msgbox);
                }
                msgbox.show();
            },
            failure: function (response, request) {
                console.log("failed -- response: " + response.responseText);
            }
        });
    },

    maskOn: function() {
    	this.getMainView().setMasked({
		    xtype: 'loadmask',
		    message: '',
   			indicator: true
		});
    },
    
    maskOff: function() {
    	Ext.defer(function() {
    		this.getMainView().setMasked(false);
    	}, 100, this);
    },
    
    doLogout: function () {
        var mainView = this.getMainView();
        var loginForm = this.getLoginForm();
        mainView.setActiveItem(loginForm);
        this.getDiscussionView().setDisabled(true);
        this.getLogoutButton().hide();
        this.getLoginButton().show();
        this.getLoginTextField().setDisabled(false);
        this.getCreateGroupButton().setDisabled(false);
        this.getGroupSelect().setDisabled(false);
        // put stored user in textfield
        var users = Ext.getStore('defaultUsers');
        if (users && users.getCount() > 0) {
            var defaultUser = users.getAt(0);
            var name = defaultUser.get('name');
            this.getLoginTextField().setValue(name);
        }
        this.maskOff();
        Ext.getCmp('mainPanel').getTabBar().hide();

        //this.getRepeatButton().hide();
    },

    doLogin: function () {
        var mainView = this.getMainView();
        var loginForm = this.getLoginForm();
        var userName = this.getLoginTextField().getValue();

        if(userName != ''){
            this.getDiscussionView().setDisabled(false);
            mainView.setActiveItem(this.getDiscussionView());
            this.getLogoutButton().show();
            this.getLoginButton().hide();
            this.getLoginTextField().setDisabled(true);
            this.getCreateGroupButton().setDisabled(true);
            this.getGroupSelect().setDisabled(true);
            // save user
            var users = Ext.getStore('defaultUsers');
            if (users.getCount() <= 0) {
                users.add(Ext.create('testing.model.DefaultUser'));
            }
            var defaultUser = users.getAt(0);
            defaultUser.set('name', userName);
            users.sync();
            this.maskOff();
            Ext.getCmp('mainPanel').getTabBar().show();
        }
        else{
            this.maskOff();
            UI.alert('Please indicate your name.');
        }
    },

    /*
    repeatDiscussion: function(){
        var mainView = this.getMainView();
        var discussionView = this.getDiscussionView();
        var userReportView = this.getUserReportView();

        discussionView.setDisabled(false);
        userReportView.setDisabled(true);

        this.getApplication().fireEvent('clientMessage', { type: 'repeatDiscussion' });
        this.getRepeatButton().hide();

        mainView.setActiveItem(userReportView);
    },
    */

    init: function () {
        this.getApplication().on({
            userLoggedIn: this.doLogin,
            //userLoggedOut: this.doLogout,
            scope: this
        });
    },

    launch: function () {
	    this.doLogout();
	    this.getUserReportView().setDisabled(true);
	}
});