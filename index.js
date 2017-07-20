'use strict';
const express = require('express');
const bodyParser = require('body-parser');
var Cal = require('./calendarbusiness');
var google = require('googleapis');


console.log(Cal.myDateTime());
// Load the SDK for JavaScript
var AWS = require('aws-sdk');



// log to amazone s3
console.log('hello s3');
 // Load the SDK for JavaScript
//var AWS = require('aws-sdk');
 var AWS_ACCESS_KEY_ID=process.env.AWS_ACCESS_KEY_ID;

  var  AWS_SECRET_ACCESS_KEY=process.env.AWS_SECRET_ACCESS_KEY;
var BUCKET_NAME=process.env.BUCKET_NAME;



let s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

// get json secret google from s3
var KEY_NAME="secret-code.json";
 var params = {Bucket: BUCKET_NAME, Key: KEY_NAME};
var jwtClient;
var id_calendrier=process.env.CALENDAR_ID;

s3.getObject(params, function(err, json_data)
   {
      if (!err) {
        var jsonsecret = JSON.parse(new Buffer(json_data.Body).toString("utf8"));
        var client_email=jsonsecret.client_email;//process.env.GOOGLE_CLIENT_EMAIL; // defined in Heroku

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





   



// fonctions test


var getevents=function()
{
jwtClient.authorize(function (err, tokens) 
{
if (err) {
    console.log(err);
    return ;
  }
var calendar = google.calendar('v3');
calendar.events.list({
    auth: jwtClient,
    calendarId: id_calendrier,
   timeMin: (new Date()).toISOString(),
    maxResults: 10,
   singleEvents: true,
    orderBy: 'startTime'
  }, 
  	 function(err, response) {
   		 if (err) {
   		   console.log('The API returned an error: ' + err);
   		   return ;
   			 }
                //    console.log(response);
  		  var events = response.items;
  		  if (events.length == 0) 
  		  {console.log('No upcoming events found.');}
   		 else 
  		  {
  		    console.log('Upcoming 10 events:');
   		   	for (var i = 0; i < events.length; i++)
   		   	{
   		  	   var event = events[i];
    			    var start = event.start.dateTime || event.start.date;
      			  console.log('%s - %s', start, event.summary);
     		 	}
    		    }
 				 }
);





});
}// fin fonction  get events
var addevent=function()
{
jwtClient.authorize(function (err, tokens) 
{
if (err) {
    console.log(err);
    return;
  }
var calendar = google.calendar('v3');


// Refer to the Node.js quickstart on how to setup the environment:
// https://developers.google.com/google-apps/calendar/quickstart/node
// Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
// stored credentials.

var event = {
  'summary': 'ber test',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'insert from heroku',
  'start': {
    'dateTime': '2017-07-17T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2017-07-17T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'},
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};

calendar.events.insert({
  auth: jwtClient,
  calendarId: id_calendrier,
  resource: event,
}, function(err, event) {
  if (err) {
    console.log('There was an error contacting the Calendar service: ' + err);
    return;
  }
  console.log('Event created: %s', event.htmlLink);
});

  


});
}// fin fonction  add event

// test sur google calendar
//getevents();
//addevent();






// debut du service 

const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';
getevents();
addevent();
 if(requestBody.result.resolvedQuery)
{
speech += requestBody.result.resolvedQuery;
                    speech += ' '+Cal.myDateTime()+' ';
}

                if (requestBody.result.action) {
                    speech += 'action: ' + requestBody.result.action;
                }
            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'apiai-webhook-sample'
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});












