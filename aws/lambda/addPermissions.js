import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config({path: '../../.env'})
import { getAccountId } from './awsAccountId.js'

const lambda = new AWS.Lambda({apiVersion: '2015-03-31', region: process.env.REGION});
const awsAccountId = getAccountId();

const writeToDynamoParams = {
  Action: 'lambda:InvokeFunction', /* required */
  FunctionName: 'writeToDynamoLambda', /* required */
  Principal: '*', /* required */
  StatementId: 'WriteToDynamoDB', /* required */
  // EventSourceToken: 'STRING_VALUE',
  // FunctionUrlAuthType: NONE | AWS_IAM,
  // PrincipalOrgID: 'STRING_VALUE',
  // Qualifier: 'STRING_VALUE',
  // RevisionId: 'STRING_VALUE',
  SourceAccount: awsAccountId,
  SourceArn: process.env.SNS_ARN

};


lambda.addPermission(writeToDynamoParams, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

const slackParams = {
  Action: 'lambda:InvokeFunction', /* required */
  FunctionName: 'postToSlackLambda', /* required */
  Principal: '*', /* required */
  StatementId: 'postToSlackLambda', /* required */
  // EventSourceToken: 'STRING_VALUE',
  // FunctionUrlAuthType: NONE | AWS_IAM,
  // PrincipalOrgID: 'STRING_VALUE',
  // Qualifier: 'STRING_VALUE',
  // RevisionId: 'STRING_VALUE',
  SourceAccount: awsAccountId,
  SourceArn: process.env.SNS_ARN

};


lambda.addPermission(slackParams, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});