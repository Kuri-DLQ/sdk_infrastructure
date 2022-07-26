import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../clients/s3Client.js";
import path from "path";
import fs from "fs";

const publishLambda = "../lambda/publishToSnsLambda.js.zip";
const pusblishLambdaFileStream = fs.createReadStream(publishLambda);

const writeToDynamo = "../lambda/writeToDynamoLambda.js.zip";
const writeToDynamoFileStream = fs.createReadStream(writeToDynamo);

const postToSlack = "../lambda/postToSlackLambda.js.zip";
const postToSlackFileStream = fs.createReadStream(postToSlack);

export const uploadParams = [
  {
    Bucket: "kuri-dlq-bucket-tony", // need to change to unique bucket name per person
    Key: path.basename(publishLambda),
    Body: pusblishLambdaFileStream,
  },
  {
    Bucket: "kuri-dlq-bucket-tony",
    Key: path.basename(writeToDynamo),
    Body: writeToDynamoFileStream,
  },
  {
    Bucket: "kuri-dlq-bucket-tony",
    Key: path.basename(postToSlack),
    Body: postToSlackFileStream,
  },
];

export const pushToBucket = async () => {
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
pushToBucket();