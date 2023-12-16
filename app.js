const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;
const database = require("./db/connect");
app.get("/", (req, res) => {
  res.send(`<a href="https://www.google.com" target= "_blank">Hello World!</a>`);
});

const start = async()=>{
  try{
    console.log(uri);
    console.log(database);
    await database(uri);
    app.listen(5000, console.log(`Server started on 5000`));
  }catch(e){
    console.log(e);
  }
}

start();