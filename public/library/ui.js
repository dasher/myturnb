var UI = {
	alert: function(title, message, callback) {
		if(arguments.length == 1){
			message = title;
			title = '';
		}

		Ext.Msg.alert(title, message, callback);
	},

	alertNoBtn: function(message, top, left, hideOnMaskTap) {
		Ext.Msg.show({message:message, buttons: [], top:top, left:left, hideOnMaskTap: hideOnMaskTap || true});
	},

	confirm: function(title, message, yes, no) {
		Ext.Msg.confirm(title, message,
		function(answer, value, opt) {
			if(answer == 'yes') yes();
			else if(no) no();
		});
	},

	prompt: function(title, message, placeholder, callback) {
		Ext.Msg.prompt(
		    title,
		    message,
		    function (buttonId, value) {
		        callback(buttonId, value);
		    },
		    null,
		    false,
		    null,
		    {
		        autoCapitalize: true,
		        placeHolder: placeholder
		    }
		);
	},
	
	showMask: function(message, onTapCallback) {
		if(this.mask){
			this.mask.setMessage(message);
		}
		else{
			this.mask = Ext.Viewport.add({
		       xtype: 'loadmask',
		       message: message,
		       indicator: true,
		       listeners: {
		       	  tap: function(){
		       	  	if(onTapCallback) onTapCallback();
		       	  }
		       }
			});
		}
	},

	hideMask: function() {
		if(!this.mask) return;

		Ext.Viewport.remove(this.mask);
		this.mask = null;
	}
};