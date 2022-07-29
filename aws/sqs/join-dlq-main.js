import { SetQueueAttributesCommand } from  "@aws-sdk/client-sqs";
import { sqsClient } from  "../clients/sqsClient.js";
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})


// Set the parameters
const params = {
  Attributes: {
    RedrivePolicy:
      `{"deadLetterTargetArn":"${process.env.DLQ_ARN}",` +
      '"maxReceiveCount":"3"}',
  },
  QueueUrl: process.env.MAIN_QUEUE_URL,
};



export const joinDlqMain = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await sqsClient.send(new SetQueueAttributesCommand(params));
      // console.log("Success", data);
      resolve()
      // return data; // For unit tests.
    } catch (err) {
      // console.log("Error", err);
      reject(err)
    }
  })
};

// joinDlqMain();

