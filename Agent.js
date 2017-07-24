/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
var Cal = require('./calendarbusiness');
class Agent{

 constructor(ID){
    this.ID = ID ;
    this.state=1;
    this.datederniereutilisation = new Date();
   //this.Cal= require('./calendarbusiness');
 }

 print(){
    console.log('Name is :'+ this.name);
 }
 DerniereUtilisation()
 {
     return this.datederniereutilisation;
 }
 GetID()
 {
     return this.ID;
 }
 repondre(req, res)
{
    this.state+=1;
    this.datederniereutilisation = new Date();
      try {
        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';
//Cal.getevents();
//Cal.addevent();
//Cal.myDateTime();
if(requestBody.sessionId)
{
    speech +=' STATE '+this.state;
}
 if(requestBody.result.resolvedQuery)
{
//speech += requestBody.result.resolvedQuery;
  //                  speech += ' indev ';
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
}

 


 
}

exports.Agent=Agent;