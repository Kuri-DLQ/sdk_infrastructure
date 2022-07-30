import AWS from "aws-sdk"
// import dotenv from 'dotenv'
// dotenv.config({path:'../../.env'})
const sns = new AWS.SNS({ apiVersion: '2010-03-31', region: process.env.REGION })
import { getAccountId } from '../lambda/awsAccountId';
import { store } from '../../utils/store.js';

const dynamoParams = {
  Protocol: 'lambda',
  TopicArn: store.sns_arn,
  Endpoint: `arn:aws:lambda:${store.region}:${getAccountId()}:function:writeToDynamoLambda`,
  ReturnSubscriptionArn: true || false
};
sns.subscribe(dynamoSubscription, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  // else     console.log('success' ,data);           // successful response
});

const slackParams = {
  Protocol: 'lambda',
  TopicArn: store.sns_arn,
  Endpoint: `arn:aws:lambda:${store.region}:${getAccountId()}:function:writeToDynamoLambda`,
  ReturnSubscriptionArn: true || false
};
sns.subscribe(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  // else     console.log('success' ,data);           // successful response
});