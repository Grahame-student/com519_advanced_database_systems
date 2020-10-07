/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const http = require("http");
const server = http.createServer();

const { PerformanceObserver, performance } = require('perf_hooks');

const obs = new PerformanceObserver((items) => {
    const period = items.getEntries()[0].duration;
    const message = `Operation took ${period} ms`;
    console.log(message);
    performance.clearMarks();
});

obs.observe({entryTypes: ["measure"]});
performance.measure("Start to Now");

server.on("request", async (req, res) => {
   const {url, headers} = req;
   try
   {
       performance.mark("A");
       const data = await readFile();
       const parsed_data = JSON.parse(data);
       await populateDatabase(parsed_data);
       performance.mark("B");
       
       performance.measure('A to B', 'A', 'B');
       res.end("All good");       
   }
   catch (e)
   {
       console.log(e);
       res.end("All not good");       
   }
});

async function readFile() {
    const fs = require("fs");
    const path = require("path");
    const dataPath = path.join("data", "wine_data.json");
    
    return await fs.promises.readFile(dataPath, "utf8");
}

async function populateDatabase(parsed_data)
{
    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost:27017";
    const client = new MongoClient(url, {useNewUrlParser: true});
    
    const dbName = "wineTasting";
    const dbCollection = "tastes";

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(dbCollection);
    await collection.drop();
    await collection.insertMany(parsed_data);    
}

server.listen(80);
