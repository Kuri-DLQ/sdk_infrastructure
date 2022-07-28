import AWS from 'aws-sdk';
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})
import { getAccountId } from './awsAccountId.js';

const sns = new AWS.SNS({apiVersion: '2015-03-31', region: process.env.REGION})

export const subscribeToSns = () => {
  const dynamoParams = {
    Protocol: 'lambda',
    TopicArn: process.env.SNS_ARN,
    Endpoint: `arn:aws:lambda:${process.env.REGION}:${getAccountId()}:function:writeToDynamoLambda`,
    ReturnSubscriptionArn: true || false
  };
  
  sns.subscribe(dynamoParams, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log('success', data);
  });
  
  const slackParams = {
    Protocol: 'lambda',
    TopicArn: process.env.SNS_ARN,
    Endpoint: `arn:aws:lambda:${process.env.REGION}:${getAccountId()}:function:postToSlackLambda`,
    ReturnSubscriptionArn: true || false
  };
  
  sns.subscribe(slackParams, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log('success', data);
  });  
}