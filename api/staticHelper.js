
module.exports = {

	cordova: function(req, res, next){
		var path = require("path");
		var libPath = path.join(__dirname, "..", "node_modules/cordova/cordova.js");
		console.log("sending cordova...\n", libPath);

		var options = {
			dotfiles: 'deny',
			headers: {
				'x-timestamp': Date.now(),
				'x-sent': true
			}
		};

		res.sendFile(libPath, options, function (err) {
			if (err) {
				console.log(err);
				res.status(err.status).end();
			}
			else {
				console.log('Sent:', libPath);
			}
		});

	}

}
