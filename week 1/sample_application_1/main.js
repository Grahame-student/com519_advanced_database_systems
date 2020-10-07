/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
    const {method, url, headers} = req;
    
    console.log(method);
    console.log(url);
    console.log(headers);
    
    res.end("hello world");
});

server.listen(80);

