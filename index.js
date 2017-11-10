/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


console.log("hello");

var events = require('events');
var eventEmitter = new events.EventEmitter();
var ConfigConnector = require('./ConfigConnector');
var DBclient=require('./databaseclient');

ConfigConnector.ReadParametresTechniques(eventEmitter);

var OnConfigReaderReady = function() {
var parametresTechniques=ConfigConnector.GetparametresTechniques();
DBclient.SetConfig(parametresTechniques.DATABASE_URL);
DBclient.TestClientDB();
};


eventEmitter.on('Config ok', OnConfigReaderReady);


