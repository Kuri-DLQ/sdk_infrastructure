import { lambdaClient } from '../clients/lambdaClient.js'
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})
// Load the Lambda client.
import {
  CreateFunctionCommand
} from "@aws-sdk/client-lambda";


export async function createLambda(args) {
// Set the parameters.
const params = {
  Code: {
    S3Bucket: process.env.BUCKET_NAME, // BUCKET_NAME
    S3Key: "publishToSnsLambda.js.zip", // ZIP_FILE_NAME
  },
  FunctionName: args.functionName,
  Handler: args.handler,
  Role: `${process.env.ROLE_ARN}`, // IAM_ROLE_ARN; e.g., arn:aws:iam::650138640062:role/v3-lambda-tutorial-lambda-role
  Runtime: "nodejs16.x",
  Description: args.description,
  };
  
  const run = async () => {
  try {
    const data = await lambdaClient.send(new CreateFunctionCommand(params));
    console.log("Success", data); // successful response
  } catch (err) {
    console.log("Error", err); // an error occurred
  }
  };
  run();
}

let args = {
  functionName: 'publishToSnsLambda',
  handler: 'publishToSnsLambda.handler',
  description: 'Take message from DLQ and send to SNS'
}

createLambda(args)