
Ext.define('testing.controller.UserReport', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.MessageBox'],
    config: {
        refs: {
            userReportView: "userReportView",
            userReportData: "#userReportData",
            mainView: "mainView",
            loginView: "loginView",
            discussionView: "discussionView"
        }
    },

    messageBox: null,

    doUsersSaved: function(dataContainer) {
        var userReportData = this.getUserReportData();
        var store = userReportData.getStore();

        store.remove(store.getRange());

        var length = dataContainer && dataContainer.data ? dataContainer.data.length : 0;

        for(var i = 0; i < length; i++) {
            var user = dataContainer.data[i];
            store.add({ name: user.name, elapsedTime: user.elapsedTime });
        }

        var mainView = this.getMainView();
        var discussionView = this.getDiscussionView();
        var userReportView = this.getUserReportView();

        discussionView.setDisabled(true);
        userReportView.setDisabled(false);

        mainView.setActiveItem(userReportView);
        
        //Ext.getCmp('loginRepeatButton').show();
    },

    clearMessageBox: function() {
        if(this.messageBox) {
            this.messageBox.hide();
            this.messageBox.setModal(false);
            this.messageBox = null;
        }
    },

    doRepeatingDiscussion: function() {
        var mainView = this.getMainView();
        mainView.setActiveItem(this.getDiscussionView());
        this.getUserReportView().setDisabled(true);
        this.clearMessageBox();
    },

    init: function() {
        this.getApplication().on({
            usersSaved: this.doUsersSaved,
            repeatDiscussion: this.doRepeatingDiscussion,
            discussionOver: this.clearMessageBox,
            scope: this
        });
    },

    launch: function() {
        var store = this.getUserReportData().getStore();
        store.remove(store.getRange());
    }
});