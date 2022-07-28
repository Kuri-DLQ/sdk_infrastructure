import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../clients/s3Client.js";
import path from "path";
import fs from "fs";
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})

const publishLambda = "../lambda/handlers/publishToSnsLambda.js.zip";
const pusblishLambdaFileStream = fs.createReadStream(publishLambda);

const writeToDynamo = "../lambda/handlers/writeToDynamoLambda.js.zip";
const writeToDynamoFileStream = fs.createReadStream(writeToDynamo);

const postToSlack = "../lambda/handlrs/postToSlackLambda.js.zip";
const postToSlackFileStream = fs.createReadStream(postToSlack);

export const uploadParams = [
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

export const pushLambdasToS3 = async () => {
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