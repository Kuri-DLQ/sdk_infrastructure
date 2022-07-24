import dotenv from 'dotenv'
dotenv.config()

import  { SNSClient } from "@aws-sdk/client-sns";
const REGION = process.env.REGION
const snsClient = new SNSClient({ region: REGION });
export  { snsClient };