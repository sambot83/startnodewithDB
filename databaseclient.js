'use strict';



var pg = require('pg');
const url = require('url');
const Pool = require('pg-pool');

pg.defaults.ssl = true;
console.log('database client ');


var  config;
exports.SetConfig=function(DATABASE_URL)
{
 


const params = url.parse(DATABASE_URL);
const auth = params.auth.split(':');

config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};
};



exports.TestClientDB=function()
{

// connection using created pool
var pool = new Pool(config);
pool.connect(function(err, client, done) {
    
    if(err)
    {
         console.error(err);
         return;
    }
    
    client.query( 'drop table IF EXISTS slots');
 client.query(' CREATE TABLE IF NOT EXISTS slots (nom varchar(80),start timestamp)');
     client.query('INSERT INTO slots (nom, start) values($1, $2)',["clientbaseOK", new Date()]);
     client.query('SELECT * FROM slots', function(err, result) {
      done();
      if (err)
       {
           console.error(err); 
       }
      else
       { 
            
          console.log(result.rows);
        }
    });
   
    
}
        );

// pool shutdown
pool.end();




};


