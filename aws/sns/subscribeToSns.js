import AWS from "aws-sdk"
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})
const sns = new AWS.SNS({ apiVersion: '2010-03-31', region: process.env.REGION })

var params = {
  Protocol: 'lambda', /* required */
  TopicArn: process.env.SNS_ARN, /* required */
  // Attributes: {
  //   '<attributeName>': 'STRING_VALUE',
  //   /* '<attributeName>': ... */
  // },
  Endpoint: 'arn:aws:lambda:ca-central-1:003330079433:function:writeToDynamoLambda',
  ReturnSubscriptionArn: true || false
};
sns.subscribe(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log('success' ,data);           // successful response
});