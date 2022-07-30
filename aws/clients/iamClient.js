// import { IAMClient } from "@aws-sdk/client-iam";
// import dotenv from 'dotenv'
// dotenv.config({path:'../../.env'})
// Set the AWS Region.
import { store } from '../../utils/store.js'

// Create an IAM service client object.
const iamClient = new IAMClient({ region: store.region });
export { iamClient };
// snippet-end:[iam.JavaScript.createclientv3]