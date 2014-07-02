Ext.define('testing.util.UrlUtils', {
	singleton: true,
	getBaseUrl: function() {
		var isNative = EnvUtils.isNative();
		var url = isNative || (location.href.indexOf('http://localhost/') != -1) ? 'http://aplimovil.net:3000/' : 'http://localhost:3000/';
		return url;
	}
});