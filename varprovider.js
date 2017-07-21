'use strict';

var AWS = require('aws-sdk');
// log to amazone s3
console.log('creation s3');
 // Load the SDK for JavaScript
//var AWS = require('aws-sdk');
 exports.AWS_ACCESS_KEY_ID=process.env.AWS_ACCESS_KEY_ID;
 exports.AWS_SECRET_ACCESS_KEY=process.env.AWS_SECRET_ACCESS_KEY;
exports.BUCKET_NAME=process.env.BUCKET_NAME;
exports.CALENDAR_ID=process.env.CALENDAR_ID;
