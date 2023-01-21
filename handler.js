const serverless = require('serverless-http');
const express = require('express');
var bodyParser = require('body-parser')
const users = require('./routes/users');

const app = express();
app.use(bodyParser.json())
app.use("/user",users);
app.get('/', (req, res) => {
    return res.status(200).json({ message: "Hello" })
})
module.exports.handler = serverless(app);