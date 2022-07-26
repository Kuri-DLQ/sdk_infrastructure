import { CognitoIdentityProvider, AmazonCognitoIdentityClient, AddCustomAttributesCommand } from "@aws-sdk/client-cognito-identity-provider";
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})
const client = new AmazonCognitoIdentityClient({ region: process.env.REGION });

const params = {
  UserPoolId: 'arjunrasodha10@gmail.com',
};
const command = new AddCustomAttributesCommand(params);

const run = async() => {
  try {
    const data = await client.send(command);
    console.log(data);
  } catch (error) {
    console.log(error)
  } finally {
    console.log('USERIDPOOL:', client.UserPoolId())
  }
}
run();