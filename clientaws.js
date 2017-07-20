'use strict';

var AWS = require('aws-sdk');
// log to amazone s3
console.log('creation s3');
 // Load the SDK for JavaScript
//var AWS = require('aws-sdk');
 var AWS_ACCESS_KEY_ID=process.env.AWS_ACCESS_KEY_ID;
var  AWS_SECRET_ACCESS_KEY=process.env.AWS_SECRET_ACCESS_KEY;




let s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

exports.s3=s3;
