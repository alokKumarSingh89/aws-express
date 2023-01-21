const AWS = require('aws-sdk');
const express = require('express');
const router = express.Router();

const USERS_TABLE = process.env.USERS_TABLE;


const dynamodbDbClientParams = {};
if(process.env.IS_OFFLINE){
    dynamodbDbClientParams.region = 'localhost';
    dynamodbDbClientParams.endpoint = 'http://localhost:8000'
}
const dynamodbClient = new AWS.DynamoDB.DocumentClient(dynamodbDbClientParams);

router.get('/', async function(req, res) {
    console.log("Get User");
    const params = {
        TableName: USERS_TABLE
    };
    const result = [];
    let items;
    do{
        items = await dynamodbClient.scan(params).promise();
        items.Items.forEach((item)=> result.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey !== 'undefined')
    return res.status(200).json({data:result})
})
router.post('/', async function(req, res) {
    console.log("add User");
    const {userId, name} = req.body;
    if(typeof userId !== 'string'){
        res.status(400).json({error: 'UserId must be a string'});
    }else if(typeof name !== 'string'){
        res.status(400).json({error: 'Name must be a string'});
    }

    const params = {
        TableName: USERS_TABLE,
        Item:{
            userId: userId,
            name: name
        }
    };

    try {
        await dynamodbClient.put(params).promise();
        return res.status(200).json({userId, name});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Could not create user'});
    }
});
module.exports = router;