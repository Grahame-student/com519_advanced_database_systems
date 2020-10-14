/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const express = require("express");
const app = express();
const port=3000;

app.get("/", (req, res) => {
   res.send("Hello World!"); 
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
