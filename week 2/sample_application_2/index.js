/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const express = require("express");
const path = require("path");
const app = express();
const port=3000;

app.get("/", (req, res) => {
   res.sendFile(path.resolve(__dirname, "index.html")); 
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
