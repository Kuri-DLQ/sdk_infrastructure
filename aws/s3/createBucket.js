import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../clients/s3Client.js";
import fs from 'fs-extra'
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})

export const createBucket = async (bucketName) => {
  // await fs.appendFile('../sdk_infrastructure/.env', `BUCKET_NAME="kuri-dlq-bucket-arjun"\n`)
  const bucketParams = { Bucket: bucketName };
  return new Promise (async (resolve, reject) => {
    try {
      const data = await s3Client.send(new CreateBucketCommand(bucketParams));
      setTimeout(() => resolve(data), 10000);
    } catch (err) {
      reject(err);
    }
  });
};
