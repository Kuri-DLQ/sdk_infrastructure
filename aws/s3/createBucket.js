import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../clients/s3Client.js";
import fs from 'fs-extra'
// import dotenv from 'dotenv'
// dotenv.config({path:'../../.env'})
import { store } from '../../utils/store.js'
// import { v4 as uuidv4 } from 'uuid';
const bucketParams = { Bucket: `kuri-dlq-bucket-10` };

export const createBucket = async () => {
  // await fs.appendFile('../sdk_infrastructure/.env', `\nBUCKET_NAME="kuri-dlq-bucket-a"\n`)
  store.bucket_name = 'kuri-dlq-bucket-10'
  console.log(store);
  return new Promise (async (resolve, reject) => {
    try {
      const data = await s3Client.send(new CreateBucketCommand(bucketParams));
      // return data;
      resolve(data);
    } catch (err) {
      // console.log("Error", err);
      reject(err);
    }
  });
};

// createBucket();