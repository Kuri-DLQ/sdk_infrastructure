// import dotenv from 'dotenv'
// dotenv.config()
import { store } from '../../utils/store.js'

import  { SNSClient } from "@aws-sdk/client-sns";
const snsClient = new SNSClient({ region: store.region });
export  { snsClient };