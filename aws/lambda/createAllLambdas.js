import { lambdaClient } from '../clients/lambdaClient.js'
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})
import { CreateFunctionCommand } from "@aws-sdk/client-lambda";
import AWS from 'aws-sdk'
import { store } from '../../utils/store.js'
  
export const createLambdas = async () => {
  function createParams(lambdaFile) {
    const params = {
      Code: {
        S3Bucket: `${store.bucket_name}`,
        S3Key: `${lambdaFile}.js.zip`,
      },
      FunctionName: lambdaFile,
      Role: `${store.role_arn}`,
      // Environment: {
      //   Variables: {
      //       "SNS_ARN": process.env.SNS_ARN,
      //       "TABLE_NAME": process.env.TABLE_NAME,
      //       "QUEUE_NAME": process.env.QUEUE_NAME,
      //       "DLQ_NAME": process.env.DLQ_NAME
      //   }
      // },
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
  console.log(store)
  return new Promise(async (resolve, reject) => {
    lambdaFunctions.forEach(async lambdaFunction => {
      try {
        let lambda = new AWS.Lambda({apiVersion: '2015-03-31', region: 'ca-central-1'}); //hard coded region ***
        await lambda.createFunction(createParams(lambdaFunction), (err, data) => {
          if (err) {
            console.log('error', err.stack)
            reject(err);
          }
        })
      } catch (err) {
        console.log("Error", err);
        reject(err)
      }
    });
    resolve();
  });  
};

createLambdas();