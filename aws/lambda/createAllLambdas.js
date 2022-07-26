import { lambdaClient } from '../clients/lambdaClient.js'
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})
import { CreateFunctionCommand } from "@aws-sdk/client-lambda";
import AWS from 'aws-sdk'

function createParams(lambdaFile) {
  const params = {
    Code: {
      S3Bucket: `${process.env.BUCKET_NAME}`,
      S3Key: `${lambdaFile}.js.zip`,
    },
    FunctionName: lambdaFile,
    Role: `${process.env.ROLE_ARN}`,
    EphemeralStorage: {
      Size: '512'
    },
    Handler: `${lambdaFile}.handler`,
    Runtime: "nodejs12.x"
  };
  return params;
}

const lambdaFunctions = [
  'publishToSnsLambda',
  'postToSlackLambda',
  'writeToDynamoLambda'
]
  
const createLambdas = async () => {
  lambdaFunctions.forEach(async lambdaFunction => {
    try {
      let lambda = new AWS.Lambda({apiVersion: '2015-03-31', region: process.env.REGION});
      await lambda.createFunction(createParams(lambdaFunction), (err, data) => {
        console.log('success', data)
        if (err) {
          console.log('error', err.stack)
        }
      })
    } catch (err) {
      console.log("Error", err);
    }
  })
};
createLambdas();