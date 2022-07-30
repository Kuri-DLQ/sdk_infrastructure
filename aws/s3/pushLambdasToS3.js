import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../clients/s3Client.js";
import path from "path";
import fs from "fs";
// import dotenv from 'dotenv'
// dotenv.config({path:'../sdk_infrastructure/.env'})
import { store } from '../../utils/store.js'

export const pushLambdasToS3 = async () => {
const BUCKET_NAME = store.bucket_name
  console.log('The bucket name from pushLambdasToS3:', BUCKET_NAME)
  return new Promise(async (resolve, reject) => {
    const publishLambda = "../sdk_infrastructure/aws/lambda/handlers/publishToSnsLambda.js.zip";
    const pusblishLambdaFileStream = fs.createReadStream(publishLambda);
  
    const writeToDynamo = "../sdk_infrastructure/aws/lambda/handlers/writeToDynamoLambda.js.zip";
    const writeToDynamoFileStream = fs.createReadStream(writeToDynamo);
  
    const postToSlack = "../sdk_infrastructure/aws/lambda/handlers/postToSlackLambda.js.zip";
    const postToSlackFileStream = fs.createReadStream(postToSlack);
  
    const uploadParams = [
      {
        Bucket: BUCKET_NAME, // need to change to unique bucket name per person
        Key: path.basename(publishLambda),
        Body: pusblishLambdaFileStream,
      },
      {
        Bucket: BUCKET_NAME,
        Key: path.basename(writeToDynamo),
        Body: writeToDynamoFileStream,
      },
      {
        Bucket: BUCKET_NAME,
        Key: path.basename(postToSlack),
        Body: postToSlackFileStream,
      },
    ];
  
  
    uploadParams.forEach(async param => {
      try {
        const data = await s3Client.send(new PutObjectCommand(param));
        // console.log("Success", data);
        return data;
      } catch (err) {
        console.log("Error", err);
        reject(err)
      }
    });
    resolve()
  })
};

// pushLambdasToS3();