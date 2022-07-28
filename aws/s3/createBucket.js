import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../clients/s3Client.js";
import fs from 'fs-extra'
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})

export const bucketParams = { Bucket: "kuri-dlq-bucket-arjun" };
fs.appendFile('../../.env', `BUCKET_NAME="kuri-dlq-bucket-arjun"\n`)

export const createBucket = async () => {
  try {
    const data = await s3Client.send(new CreateBucketCommand(bucketParams));
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

// createBucket();