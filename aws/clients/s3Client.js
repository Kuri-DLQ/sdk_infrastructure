// import dotenv from 'dotenv'
// dotenv.config()
import { store } from '../../utils/store.js'

import { S3Client } from "@aws-sdk/client-s3";
const s3Client = new S3Client({ region: store.region });
export { s3Client };