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





   



// fonctions test


exports.getevents=function()
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
exports.addevent=function()
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




exports.myDateTime = function () {
    return Date();
}; 



