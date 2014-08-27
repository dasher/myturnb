Ext.define("testing.view.Login", {
    extend: 'Ext.form.Panel',
    xtype: 'loginView',
    requires: ['Ext.Button', 'Ext.field.Text', 'Ext.field.Select', 'Ext.Img', 'Ext.form.FieldSet'],

    config: {
    	height: '100%',
    	width: '100%',
    	layout: 'fit',
        items: [
			{
    			xtype: 'container',
    			height: '100%',
    			width: '100%',
    			layout: {
    				type: 'vbox',
    				pack: 'center',
    				align: 'center'
    			},
    			items: [
                    {
                         xtype: 'fieldset',
                         maxWidth: 300,
                         items: [
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'selectfield',
                                        label: 'Group',
                                        store: 'groups',
                                        displayField: 'name',
                                        valueField: 'name',
                                        labelWidth: 120,
                                        name: 'groupName',
                                        id: 'groupSelect',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'add',
                                        ui: 'small',
                                        action: 'createGroupEvent'
                                    }
                                ]
                            },
                            {
                                xtype: 'textfield',
                                name: 'userName',
                                label: 'Name',
                                labelWidth: 120,
                                id: 'loginTextField'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            pack: 'center'
                        },
                        items: [
                            {
                                xtype: 'button',
                                action: 'loginEvent',
                                text: 'Login'
                            },
                            {
                                xtype: 'button',
                                action: 'logoutEvent',
                                text: 'Logout'
                            },
                            /*
                            {
                                id: 'loginRepeatButton',
                                xtype: 'button',
                                action: 'repeatEvent',
                                text: 'Repeat',
                                style: {
                                    margin: "0px 5px"
                                },
                                hidden: true
                            },
                            */
                            {
                                xtype: 'button',
                                text: 'Help',
                                ui: 'action',
                                style: {
                                    marginLeft: "10px"
                                },
                                action: 'readmeEvent'
                            }
                        ]
                    }
                ]
			}
        ]
    }
});