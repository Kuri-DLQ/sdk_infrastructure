import { lambdaClient } from '../clients/lambdaClient.js'
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})
import { CreateFunctionCommand } from "@aws-sdk/client-lambda";
import AWS from 'aws-sdk'

function createParams(lambdaFile, bucketName) {
  const params = {
    Code: {
      S3Bucket: bucketName,
      S3Key: `${lambdaFile}.js.zip`,
    },
    FunctionName: lambdaFile,
    Role: `${process.env.ROLE_ARN}`,
    Environment: {
      Variables: {
          "SNS_ARN": process.env.SNS_ARN,
          "TABLE_NAME": process.env.TABLE_NAME,
          "QUEUE_NAME": process.env.MAIN_QUEUE_NAME,
          "DLQ_NAME": process.env.DLQ_NAME
      }
    },
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

const retry = false
export const createLambdas = async (bucketName) => {
  return new Promise(async (resolve, reject) => {
    lambdaFunctions.forEach(async lambdaFunction => {
      try {
        let lambda = new AWS.Lambda({apiVersion: '2015-03-31', region: process.env.REGION });
        await lambda.createFunction(createParams(lambdaFunction, bucketName), (err, data) => {
          if (err) {
            console.log('error', err.stack)
            reject(err);
          }
        })
      } catch (err) {
        // console.log("Error", err);
        // reject(err)
        retry = true
        while (retry) {
          let lambda = new AWS.Lambda({apiVersion: '2015-03-31', region: process.env.REGION });
          await lambda.createFunction(createParams(lambdaFunction), (err, data) => {
            if (err) {
              console.log('error', err.stack)
              reject('error from createAllLambdas', err);
            }
          })
        }
      }
    });

    setTimeout(() => resolve(), 10000);
  });  
};

// createLambdas();