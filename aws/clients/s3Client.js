import dotenv from 'dotenv'
dotenv.config()

import { S3Client } from "@aws-sdk/client-s3";
const REGION = provess.env.REGION
const s3Client = new S3Client({ region: REGION });
export { s3Client };