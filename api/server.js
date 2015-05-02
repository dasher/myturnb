var express = require('express'),
    app = module.exports = express(),
    bodyParser = require("body-parser"),
    multer = require("multer"),
    room = require('./models/room'),
    invitation = require('./models/invitation.js'),
	vote = require('./models/vote.js'),
	messageDispatcherInstance = require('./messageDispatcher'),
	groupIgnoreMap = {},
    db = require('./db.js'),
    uuid = require('node-uuid');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(function() {
	messageDispatcherInstance.on('persistRoomData', function(roomName) {
		groupIgnoreMap[roomName] = true;
	});
	messageDispatcherInstance.on('repeatingDiscussionInServer', function(roomName) {
		if (groupIgnoreMap[roomName]) {
			delete groupIgnoreMap[roomName];
		}
	});
	messageDispatcherInstance.on('discussionOverInServer', function(roomName) {
		if (groupIgnoreMap[roomName]) {
			delete groupIgnoreMap[roomName];
		}
	});
});

app.get('/data/groups.json', function(req, res) {
    var result = db.load('groups');
    var resultData = result == null ? [] : result.data;
    var filteredData = [];
    var length = resultData ? resultData.length : 0;
    for (var i=0; i < length; i++) {
    	var group = resultData[i];
    	if (!groupIgnoreMap[group.name]) {
    		filteredData.push(group);
    	}
    }

    res.send(filteredData);
});

app.post('/data/doNothing.json', function (req, res) {
    res.send([], 200);
});

app.post('/data/groups.json', function(req, res) {
    var newGroupData = req.body;
    var result = db.load('groups');
    if(result == null) {
        result = { data: [] };
    }
    var newGroup = new room(newGroupData);
    newGroup.id = uuid.v4();
    result.data.push(newGroup);
    console.log('Created new group (ID: ' + newGroup.id + ' / Name: ' + newGroup.name + ' / Discussion length: ' + newGroup.discussionLength + ')');
    db.save({ id: 'groups', data: result.data });
    res.send(result.data, 200);
});
