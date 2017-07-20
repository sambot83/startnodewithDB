'use strict';
var google = require('googleapis');

var AWSCLIENT = require('./clientaws');


// get json secret google from s3
var KEY_NAME="secret-code.json";
var BUCKET_NAME=process.env.BUCKET_NAME;
 var params = {Bucket: BUCKET_NAME, Key: KEY_NAME};
var jwtClient;
var id_calendrier=process.env.CALENDAR_ID;

AWSCLIENT.s3.getObject(params, function(err, json_data)
   {
      if (!err) {
        var jsonsecret = JSON.parse(new Buffer(json_data.Body).toString("utf8"));
        var client_email=jsonsecret.client_email;//process.env.GOOGLE_CLIENT_EMAIL; // defined in Heroku
process.env.CLIENT_EMAIL=client_email;
var private_key=jsonsecret.private_key;//process.env.GOOGLE_PRIVATE_KEY; // defined in Heroku
console.log(client_email);

jwtClient = new google.auth.JWT(
  client_email,
  null,
  private_key,
  ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/calendar'], // an array of auth scopes
  null
);
if(jwtClient==null)
{
console.log('pb google client');
}
else
{
console.log('google client ok');
}

//console.log(json);
     //jsonsecret=json;
     // return json;
       // PROCESS JSON DATA
     //      ......
    }
else
{
 console.log("Error getting json from S3", err);

}
   });



exports.jwtClient=jwtClient;
