/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


console.log("hello");

var events = require('events');
var eventEmitter = new events.EventEmitter();
var ConfigConnector = require('./ConfigConnector');
ConfigConnector.ReadParametresTechniques(eventEmitter);
