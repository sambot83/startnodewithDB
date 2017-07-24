'use strict';


var VARPROV=require('./varprovider');
var pg = require('pg');
pg.defaults.ssl = true;
console.log('database client '+VARPROV.DATABASE_URL);

const connectionString = VARPROV.DATABASE_URL ;

exports.TestDatabase=function()
{
const client = new pg.Client(connectionString);
client.connect();

 client.query( 'drop table IF EXISTS slots');
 client.query(' CREATE TABLE IF NOT EXISTS slots (nom varchar(80),start timestamp)');
 client.query('INSERT INTO slots (nom, start) values($1, $2)',["bob", new Date()]);
 const results = [];
  // SQL Query > Select Data
   const query = client.query('SELECT * FROM slots ORDER BY start');
    // Stream results back one row at a time
 query.on('row', (row) => {  results.push(row);});
 

query.on('end', () => { 
    
        client.end();


if(results[0].nom==='bob')
{
    console.log('CLIENT DATABASE OK');
    return;
}

console.log('CLIENT DATABASE NOK');
});

 
  // Get a Postgres client from the connection pool

    //const query = client.query( ' CREATE TABLE IF NOT EXISTS slots (nom varchar(80),start date)');
   // client.query( 'drop table IF EXISTS slots');
  //const query =  client.query( ' CREATE TABLE IF NOT EXISTS slots (nom varchar(80),start date)');

        // SQL Query > Insert Data
  //  client.query('INSERT INTO slots (nom, start) values($1, $2)',
   // ["bob", ]);
   
    // After all data is returned, close connection and return results
   
 



//const client = new pg.Client(connectionString);
//client.connect();

  
 //const query = client.query( 'CREATE TABLE IF NOT EXISTS tabletest (i integer)');
 // const query = client.query( ' CREATE TABLE IF NOT EXISTS slots (nom varchar(80),start date)');
 // 'drop table tabletest;'
 
 
//query.on('end', () => { client.end(); });


}
