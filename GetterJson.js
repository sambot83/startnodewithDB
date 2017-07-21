'use strict';
var events = require('events');

var AWSCLIENT = require('./clientaws');
var VARPROV=require('./varprovider');
var eventEmitter = new events.EventEmitter();


/// CREATION DU JWT CLIENT 

// get json secret google from s3
var KEY_NAME="secret-code.json";
var BUCKET_NAME=VARPROV.BUCKET_NAME;
 var params = {Bucket: BUCKET_NAME, Key: KEY_NAME};

var theJson;
exports.eventEmitter=eventEmitter;

AWSCLIENT.s3.getObject(params, function(err, json_data)
   {
      if (!err) {
          theJson = JSON.parse(new Buffer(json_data.Body).toString("utf8"));

console.log('in getter Ihave Json');
eventEmitter.emit('jsonpret');

       
    }
else
{
 console.log("Error getting json from S3", err);
//Fire the 'scream' event:

}
   });


exports.getjson=function()
{
return theJson;
}




