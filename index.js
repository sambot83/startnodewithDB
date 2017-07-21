'use strict';
const express = require('express');
const bodyParser = require('body-parser');


var AG=require('./Agent');
var monagent=new AG.Agent("toto");
// debut du service 

const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');
    console.log(monagent.print());
    
//return Agent.repondre(req,res);
return monagent.repondre(req,res);
  
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});












