import { lambdaClient } from '../clients/lambdaClient.js'
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})
// Load the Lambda client.
import {
  CreateFunctionCommand
} from "@aws-sdk/client-lambda";

import AWS from 'aws-sdk'

export async function createLambda(args) {
// Set the parameters.
// const params = {
//   Code: {
//     S3Bucket: process.env.BUCKET_NAME, // BUCKET_NAME
//     S3Key: "publishToSnsLambda.js.zip", // ZIP_FILE_NAME
//   },
//   FunctionName: args.functionName,
//   Handler: args.handler,
//   Role: `${process.env.ROLE_ARN}`, // IAM_ROLE_ARN; e.g., arn:aws:iam::650138640062:role/v3-lambda-tutorial-lambda-role
//   Runtime: "nodejs16.x",
//   Description: args.description,
//   };

var params = {
  Code: { /* required */
    S3Bucket: `${process.env.BUCKET_NAME}`,
    S3Key: 'publishToSnsLambda.js.zip',
  },
  FunctionName: 'publishToSnsLambda', /* required */
  Role: `${process.env.ROLE_ARN}`, /* required */
  EphemeralStorage: {
    Size: '512' /* required */
  },
  Environment: {
    Variables: {
      'REGION': process.env.REGION,
      'SNS_ARN': process.env.SNS_ARN
      /* '<EnvironmentVariableName>': ... */
    }
  },
  Handler: 'publishToSnsLambda.handler',
  Runtime: "nodejs12.x"
};
  
  const run = async () => {
  try {
    // const data = await lambdaClient.send(new CreateFunctionCommand(params));
    // console.log("Success", data); // successful response

    let lambda = new AWS.Lambda({apiVersion: '2015-03-31', region: process.env.REGION});
    await lambda.createFunction(params, (err, data) => {
      console.log('success', data)
      if (err) {
        console.log('error', err.stack)
      }
    })
  } catch (err) {
    console.log("Error", err); // an error occurred
  }
  };
  run();
}

// let args = {
//   functionName: 'publishToSnsLambda',
//   handler: 'publishToSnsLambda.handler',
//   description: 'Take message from DLQ and send to SNS'
// }

createLambda()