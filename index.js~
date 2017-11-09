'use strict';
const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');
   
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    
   
   
    


  
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});












