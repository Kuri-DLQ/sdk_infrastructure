import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../clients/s3Client.js";
import path from "path";
import fs from "fs";
import dotenv from 'dotenv'


export const pushLambdasToS3 = async () => {
  dotenv.config({path:'../sdk_infrastructure/.env'})
  const BUCKET_NAME = process.env.BUCKET_NAME
  return new Promise(async (resolve, reject) => {
    const publishLambda = "../sdk_infrastructure/aws/lambda/handlers/publishToSnsLambda.js.zip";
    const pusblishLambdaFileStream = fs.createReadStream(publishLambda);
  
    const writeToDynamo = "../sdk_infrastructure/aws/lambda/handlers/writeToDynamoLambda.js.zip";
    const writeToDynamoFileStream = fs.createReadStream(writeToDynamo);
  
    const postToSlack = "../sdk_infrastructure/aws/lambda/handlers/postToSlackLambda.js.zip";
    const postToSlackFileStream = fs.createReadStream(postToSlack);
  
    
    const publishSnsParams = {
      Bucket: BUCKET_NAME, // need to change to unique bucket name per person
      Key: path.basename(publishLambda),
      Body: pusblishLambdaFileStream,
    };

    const writeDynamoParams = {
      Bucket: BUCKET_NAME,
      Key: path.basename(writeToDynamo),
      Body: writeToDynamoFileStream,
    };

    const postSlackParams = {
      Bucket: BUCKET_NAME,
      Key: path.basename(postToSlack),
      Body: postToSlackFileStream,
    };
  
    try {
      const data = await s3Client.send(new PutObjectCommand(publishSnsParams));
      const data1 = await s3Client.send(new PutObjectCommand(writeDynamoParams));
      const data2 = await s3Client.send(new PutObjectCommand(postSlackParams));
    } catch (err) {
      console.log("Error", err);
      reject(err)
    } finally {
      resolve()
    }

    // try {
    //   const data = await s3Client.send(new PutObjectCommand(writeDynamoParams));
    //   console.log("Success", data);
    // } catch (err) {
    //   console.log("Error", err);
    //   reject(err)
    // }

    // try {
    //   const data = await s3Client.send(new PutObjectCommand(postSlackParams));
    //   console.log("Success", data);
    // } catch (err) {
    //   console.log("Error", err);
    //   reject(err)
    // }

    // resolve();
  });
};
