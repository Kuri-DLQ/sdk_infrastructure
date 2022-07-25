import { iamClient } from "../clients/iamClient.js";
import { CreateRoleCommand } from "@aws-sdk/client-iam";
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})

// Set the parameters.
let params = {
  AssumeRolePolicyDocument: JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal:
        {
            'AWS': `${process.env.USER_ARN}` // The ARN of the user.
        },
        Action: [
          'sts:AssumeRole',
        ],
      },
    ],
  }),
  Path: '/',
  RoleName: "kurirole"
};

// params = JSON.stringify(params)

const run = async () => {
    try {
        const data = await iamClient.send(new CreateRoleCommand(params));
        console.log("Success. Role created. Role Arn: ", data.Role.RoleName);
        } catch (err) {
            console.log("Error", err);
        }
};
run();

///////////////////////////////////////

// // Import required AWS SDK clients and commands for Node.js.
// import { iamClient } from "./libs/iamClient.js";
// import { CreateRoleCommand } from "@aws-sdk/client-iam";

// // Sample assume role policy JSON.
// const role_json = {
//     Version: "2012-10-17",
//     Statement: [
//         {
//             Effect: "Allow",
//             Principal: {
//                 AWS: "USER_ARN", // The ARN of the user.
//             },
//             Action: "sts:AssumeRole",
//         },
//     ],
// };
// // Stringify the assume role policy JSON.
// const myJson = JSON.stringify(role_json);

// // Set the parameters.
// const params = {
//     AssumeRolePolicyDocument: myJson,
//     Path: "/",
//     RoleName: "ROLE_NAME"
// };

// const run = async () => {
//     try {
//         const data = await iamClient.send(new CreateRoleCommand(params));
//         console.log("Success. Role created. Role Arn: ", data.Role.RoleName);
//         } catch (err) {
//             console.log("Error", err);
//         }
// };
// run();

