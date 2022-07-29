import {
  IAMClient,
  CreateRoleCommand,
  AttachRolePolicyCommand,
  CreatePolicyCommand
} from "@aws-sdk/client-iam";
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})
import fs from 'fs-extra'

const REGION = `${process.env.REGION}`;

const iam = new IAMClient({ region: REGION });

const ROLE = "KuriRole";
const myPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: {
        Service: "lambda.amazonaws.com",
      },
      Action: "sts:AssumeRole",
    },
  ],
};

const createParams = {
  AssumeRolePolicyDocument: JSON.stringify(myPolicy),
  RoleName: ROLE,
};

const lambdaPolicyParams = {
  PolicyArn: "arn:aws:iam::aws:policy/AWSLambda_FullAccess",
  RoleName: ROLE,
};

const dynamoPolicyParams = {
  PolicyArn: "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess",
  RoleName: ROLE,
};

const s3PolicyParams = {
  PolicyArn: "arn:aws:iam::aws:policy/AmazonS3FullAccess",
  RoleName: ROLE,
};

const snsPolicyParams = {
  PolicyArn: "arn:aws:iam::aws:policy/AmazonSNSFullAccess",
  RoleName: ROLE,
};

const sqsPolicyParams = {
  PolicyArn: "arn:aws:iam::aws:policy/AmazonSQSFullAccess",
  RoleName: ROLE,
};

export const createRole = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await iam.send(new CreateRoleCommand(createParams));
      await fs.appendFile('../sdk_infrastructure/.env', `ROLE_ARN="${data.Role.Arn}"\n`)
    } catch (err) {
      console.log("Error when creating role.");
      throw err;
    }
    try {
      await iam.send(new AttachRolePolicyCommand(lambdaPolicyParams));
      // console.log("AWSLambdaRole policy attached");
    } catch (err) {
      console.log("Error when attaching Lambda policy to role.");
      throw err;
    }
    try {
      await iam.send(new AttachRolePolicyCommand(dynamoPolicyParams));
      // console.log("DynamoDB policy attached");
    } catch (err) {
      console.log("Error when attaching dynamodb policy to role.");
      throw err;
    }
    try {
      await iam.send(new AttachRolePolicyCommand(s3PolicyParams));
      // console.log("S3 policy attached");
    } catch (err) {
      console.log("Error when attaching s3 policy to role.");
      throw err;
    }
    try {
      await iam.send(new AttachRolePolicyCommand(snsPolicyParams));
      // console.log("SNS policy attached");
    } catch (err) {
      console.log("Error when attaching S3 policy to role.");
      throw err;
    }
    try {
      await iam.send(new AttachRolePolicyCommand(sqsPolicyParams));
      // console.log("SQS policy attached");
    } catch (err) {
      console.log("Error when attaching dynamodb policy to role.");
      throw err;
    }

    resolve();
  })
};

// createRole();


