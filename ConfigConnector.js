/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

var AWS = require('aws-sdk');
var VARPROV=require('./VarProvider/varprovider');
var AWS_ACCESS_KEY_ID=VARPROV.AWS_ACCESS_KEY_ID;
var  AWS_SECRET_ACCESS_KEY=VARPROV.AWS_SECRET_ACCESS_KEY;
var BUCKET_NAME=VARPROV.BUCKET_NAME;














/// CREATION DU JWT CLIENT 

   console.log('instantiation Config Reader');
// log to amazone s3
console.log('*creation client AWS S3');
let s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});
var ClientS3=s3;
if(ClientS3!==undefined)
{console.log("**Client S3 OK");}
//this.eventEmitter=;

var parametresTechniques;




exports.ReadParametresTechniques=function(eventEmitter)
{
    console.log('lecture parametres techniques');
    var params = {Bucket: BUCKET_NAME, Key: "parametresTechniques.json"};

//exports.eventEmitter=eventEmitter;

ClientS3.getObject(params, function(err, json_data)
   {
      if (!err) {
          parametresTechniques = JSON.parse(new Buffer(json_data.Body).toString("utf8"));

//console.log('in getter Ihave Json');
console.log('lecture parametres techniques ok');
console.log(parametresTechniques);

eventEmitter.emit('Config ok');
       
    }
else
{
 console.log("Error getting parametres techniques from S3", err);
//Fire the 'scream' event:

}
   });
 
};



exports.GetparametresTechniques=function()
{
return parametresTechniques;
};


