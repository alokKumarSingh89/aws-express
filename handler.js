const serverless = require('serverless-http');
const express = require('express');
var bodyParser = require('body-parser')
const users = require('./routes/users');

const app = express();

app.use(express.json())

app.use("/users",users);
app.get('/', (req, res) => {
    return res.status(200).json({ message: "Hello" })
});

app.use((req,res,next) => {
    return res.status(404).json({error:'Not Found'});
});
module.exports.handler = serverless(app);