import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})

const lambda = new AWS.Lambda({apiVersion: '2015-03-31', region: process.env.REGION});

const publishToSnsParams = {
  FunctionName: 'publishToSnsLambda',
  BatchSize: '10',
  Enabled: true || false,
  EventSourceArn: process.env.DLQ_ARN,
};

lambda.createEventSourceMapping(publishToSnsParams, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log('success', data);           // successful response
});

// const writeToDynamoParams = {
//   FunctionName: 'writeToDynamoLambda',
//   BatchSize: '10',
//   Enabled: true || false,
//   EventSourceArn: process.env.SNS_ARN,
// };

// lambda.createEventSourceMapping(writeToDynamoParams, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

// const postToSlackParams = {
//   FunctionName: 'postToSlackLambda',
//   BatchSize: '10',
//   Enabled: true || false,
//   EventSourceArn: process.env.SNS_ARN,
// };

// lambda.createEventSourceMapping(postToSlackParams, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });