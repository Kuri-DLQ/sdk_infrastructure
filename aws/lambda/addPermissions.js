import AWS from 'aws-sdk'
// import dotenv from 'dotenv'
// dotenv.config({path: '../../.env'})
import { getAccountId } from './awsAccountId.js'
import { store } from '../../utils/store.js'
const lambda = new AWS.Lambda({apiVersion: '2015-03-31', region: store.region});

export const addPermissions = () => {
  return new Promise((resolve, reject) => {
    const awsAccountId = getAccountId();
    const writeToDynamoParams = {
      Action: 'lambda:InvokeFunction',
      FunctionName: 'writeToDynamoLambda',
      Principal: '*',
      StatementId: 'WriteToDynamoDB',
      SourceAccount: awsAccountId,
      SourceArn: store.sns_arn
    };
    
    lambda.addPermission(writeToDynamoParams, function (err, data) {
      if (err) {
        // console.log(err, err.stack);
        reject()
      }
      // else     console.log(data);
    });
    
    const slackParams = {
      Action: 'lambda:InvokeFunction',
      FunctionName: 'postToSlackLambda',
      Principal: '*',
      StatementId: 'postToSlackLambda',
      SourceAccount: awsAccountId,
      SourceArn: store.sns_arn
    
    };
    
    lambda.addPermission(slackParams, function (err, data) {
      if (err) {
        // console.log(err, err.stack);
        reject()
      }
      // else     console.log(data);
    });

    resolve()
  })
}