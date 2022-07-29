import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../clients/s3Client.js";
import path from "path";
import fs from "fs";
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})

export const pushLambdasToS3 = async () => {
  const publishLambda = "../../sdk_infrastructure/aws/lambdas/handlers/publishToSnsLambda.js.zip";
  const pusblishLambdaFileStream = fs.createReadStream(publishLambda);

  const writeToDynamo = "../../sdk_infrastructure/aws/lambdas/handlers/writeToDynamoLambda.js.zip";
  const writeToDynamoFileStream = fs.createReadStream(writeToDynamo);

  const postToSlack = ".../../sdk_infrastructure/aws/lambdas/handlers/postToSlackLambda.js.zip";
  const postToSlackFileStream = fs.createReadStream(postToSlack);

  const uploadParams = [
    {
      Bucket: process.env.BUCKET_NAME, // need to change to unique bucket name per person
      Key: path.basename(publishLambda),
      Body: pusblishLambdaFileStream,
    },
    {
      Bucket: process.env.BUCKET_NAME,
      Key: path.basename(writeToDynamo),
      Body: writeToDynamoFileStream,
    },
    {
      Bucket: process.env.BUCKET_NAME,
      Key: path.basename(postToSlack),
      Body: postToSlackFileStream,
    },
  ];


  uploadParams.forEach(async param => {
    try {
      const data = await s3Client.send(new PutObjectCommand(param));
      console.log("Success", data);
      return data;
    } catch (err) {
      console.log("Error", err);
    }
  });
};

// pushToBucket();