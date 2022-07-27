// Load the AWS SDK for Node.js
import AWS from 'aws-sdk';
import fs from 'fs-extra'
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})
// Set the region 
AWS.config.update({region: process.env.REGION});

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10', region: process.env.REGION});
fs.appendFile('../../.env', `TABLE_NAME="KuriTable"`);         

const params = {
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'KuriTable',
  StreamSpecification: {
    StreamEnabled: false
  }
};

// Call DynamoDB to create the table
ddb.createTable(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});