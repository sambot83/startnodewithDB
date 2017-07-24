'use strict';
const express = require('express');
const bodyParser = require('body-parser');


var AG=require('./Agent');

// pour scan des agents : supprimer sessions trops vieilles
var DateDernierScanSessions=new Date();
var PeriodeScan=15*60; // en secondes periode de scan
var DelayMaxSession=45*60; // en secondes delay max pour discussion 


// debut du service 
var mesagents= {};

const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');
    var currentdate=new Date();
    var diff = (currentdate - DateDernierScanSessions)/1000;
    console.log(diff);
    if(diff>PeriodeScan)
    {
        DateDernierScanSessions=new Date();
        
         console.log(' scan agents');
         for (var key in mesagents) 
         {
                    var ag = mesagents[key];
                    var diffAge=(currentdate-ag.DerniereUtilisation())/1000;
                    if(diffAge>DelayMaxSession)
                    {
                        console.log('suppression agent '+ag.GetID());
                       
                        delete mesagents[key]; 

                    }
    
    // Use `key` and `value`
         }
    }
       

        if (req.body) 
        {
            var requestBody = req.body;

            if (requestBody.result)
            {
             
if(requestBody.sessionId)
{
    var monagent=mesagents[requestBody.sessionId];
    if(typeof monagent=='undefined')
    {
        console.log('nouvel agent');
        mesagents[requestBody.sessionId]=monagent=new AG.Agent(requestBody.sessionId);
        monagent=mesagents[requestBody.sessionId];
       // console.log(' agents');
    }
    
    return monagent.repondre(req,res);
   
}

        }
        }
    
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












