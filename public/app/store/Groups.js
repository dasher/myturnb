Ext.define('testing.store.Groups', {
    extend: 'Ext.data.Store',
    requires: ['testing.proxy.CrossAjax'],
    currentGroupName: '',

    config: {
        model: 'testing.model.Group',
        storeId: 'groups',
        proxy: {
            type: 'crossajax',
            cacheString: 'dcdcdc',
            url : 'api/data/groups.json',
            api: {
                destroy: 'api/data/doNothing.json',
                update: 'api/data/doNothing.json'
            },
            reader: 'json'
        },
        autoLoad: true,
        autoSync: false,
        listeners: {
            load: function(){
                this.autoSelectCurrentGroup();
            },
            beforesync: function(){
                UI.showMask('Saving...');
            },
            write: function(){
                UI.hideMask();
                this.autoSelectCurrentGroup();
                this.load(); // Fixes "undefined" bug when creating 2 or more groups before the groups are auto-refreshed by the GroupsRefresher controller
            }
        }
    },

    setCurrentGroupName: function(name){
        this.currentGroupName = name;
    },

    autoSelectCurrentGroup: function(){
        var index = this.findExact('name', this.currentGroupName);

        if(index != -1){
            var group = this.getAt(index);
            if(group){
                var selectField = Ext.getCmp('groupSelect');
                selectField.setValue(group.getData('name'));
            }
        }
    }
});
