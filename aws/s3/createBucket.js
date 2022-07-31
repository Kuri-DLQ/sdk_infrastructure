import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../clients/s3Client.js";
import fs from 'fs-extra'
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})
console.log(process.cwd())
const bucketParams = { Bucket: `kuri-dlq-bucket-tony` };

export const createBucket = async () => {
  await fs.appendFile('../sdk_infrastructure/.env', `BUCKET_NAME="kuri-dlq-bucket-tony"\n`)

  return new Promise (async (resolve, reject) => {
    try {
      const data = await s3Client.send(new CreateBucketCommand(bucketParams));
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};
