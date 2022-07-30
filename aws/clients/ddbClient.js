// import dotenv from 'dotenv'
// dotenv.config({path:'../../.env'})
import { store } from '../../utils/store.js'

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
const ddbClient = new DynamoDBClient({ region: store.region });
export { ddbClient };
