import { CognitoIdentityProviderClient, AddCustomAttributesCommand } from "@aws-sdk/client-cognito-identity-provider";
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})
const client = new CognitoIdentityProviderClient({ region: process.env.REGION });

const params = {
  /** input parameters */
};
const command = new AddCustomAttributesCommand(params);

const run = async() => {
  try {
    const data = await client.send(command);
    console.log(data);
  } catch (error) {
    console.log(error)
  }
}
run();