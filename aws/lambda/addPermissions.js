import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config({path: '../../.env'})
import { getAccountId } from './awsAccountId.js'

const sqs = new AWS.SQS({apiVersion: '2015-03-31', region: process.env.REGION});
const awsAccountId = getAccountId();

const params = {
  AWSAccountIds: [ /* required */
    awsAccountId    
    /* more items */
  ],
  Actions: [ /* required */
    'SendMessage',
    /* more items */
  ],
  Label: 'Send-messasge-to-publish-lambda', /* required */
  QueueUrl: `'${process.env.QUEUE_URL}'` /* required */
};


sqs.addPermission(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});