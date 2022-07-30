// import dotenv from 'dotenv'
// dotenv.config()
import { store } from '../../utils/store.js'

import  { SQSClient } from "@aws-sdk/client-sqs";
const sqsClient = new SQSClient({ region: store.region });
export  { sqsClient };