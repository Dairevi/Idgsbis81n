const express = require("express");
const cors = require ("cors");
const bodyparser = require('body-parser');
const jtw = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const app = express();
const post = require('./Models/posts');
const router = require('./Routes/posts');
mongoose.connect('mongodb://localhost:27017/testdb').then(() =>{
    console.log("Connected to database")
}).catch(() => {
    console.log("Failed to connect to database")
});

const port = 8080;
const protectedRoute = express.Router();
app.set('key', 'secret');

protectedRoute.use((req, res, next) => {
    const token = req.headers["access-token"];
    if (token){
        jwt.verify(token, app.get('key'), (err, decoded) => {
            if(err){
                return res.send({"msg": "Inpmnvalid token"});
            }
            else{
                req.decoded = decoded;
                next();
            }
        });  
    }else{
        res.send({"msg": "Token not provided"});
    }
})

app.use(express.json());
app.use(cors());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","PUT,GET,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","Content-Type");
    next();
} );

//Endpoints
app.use("/api", router);

app.get("/api/gett", function(req, res){
    res.send({
        msg: "hello", 
        content: "Hello there"
    });
});

app.post("/api/new", function(req, res){
    let body = req.body;
    res.send({
        msg: "hello", 
        content: `random stuff 'test' "test2" ${body.hola}`
    });
});

app.listen(port, function(){
    console.log ("Api is running")
});