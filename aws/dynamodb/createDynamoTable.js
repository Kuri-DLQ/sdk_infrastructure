<<<<<<< HEAD
import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../clients/ddbClient.js";

export const params = {
  TableName: "Kuri-DLQ-table",
  AttributeDefinitions: [
    {
      AttributeName: "id", //ATTRIBUTE_NAME_1
      AttributeType: "S", //ATTRIBUTE_TYPE
    },
  ],
  KeySchema: [
    {
      AttributeName: "id", //ATTRIBUTE_NAME_1
      KeyType: "HASH",
=======
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
>>>>>>> e3ccbaeee7c4661bc5076000d7a5b502b12b2d70
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
<<<<<<< HEAD
    WriteCapacityUnits: 1,
  },
  StreamSpecification: {
    StreamEnabled: false,
  },
};

export const run = async () => {
  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log("Table Created", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
run();
=======
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
>>>>>>> e3ccbaeee7c4661bc5076000d7a5b502b12b2d70
