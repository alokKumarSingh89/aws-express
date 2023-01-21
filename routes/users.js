const express = require('express');
const router = express.Router();
const users = [];
router.get('/', function(req, res) {
    console.log("Get User");
    return res.status(200).json({data:users})
})
router.post('/', function(req, res) {
    console.log("add User");
    console.log(req.body)
    users.push(req.body);
    return res.status(200).json({data:users})
})
module.exports = router;