import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config({path: '../../.env'})
import { getAccountId } from './awsAccountId.js'

const lambda = new AWS.Lambda({apiVersion: '2015-03-31', region: process.env.REGION});
const awsAccountId = getAccountId();

export const addPermissions = () => {
  const writeToDynamoParams = {
    Action: 'lambda:InvokeFunction',
    FunctionName: 'writeToDynamoLambda',
    Principal: '*',
    StatementId: 'WriteToDynamoDB',
    SourceAccount: awsAccountId,
    SourceArn: process.env.SNS_ARN
  };
  
  lambda.addPermission(writeToDynamoParams, function (err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
  });
  
  const slackParams = {
    Action: 'lambda:InvokeFunction',
    FunctionName: 'postToSlackLambda',
    Principal: '*',
    StatementId: 'postToSlackLambda',
    SourceAccount: awsAccountId,
    SourceArn: process.env.SNS_ARN
  
  };
  
  lambda.addPermission(slackParams, function (err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
  });
}