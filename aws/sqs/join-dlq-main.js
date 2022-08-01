import { SetQueueAttributesCommand } from  "@aws-sdk/client-sqs";
import { sqsClient } from  "../clients/sqsClient.js";
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})

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
    console.log('params from join module: ', params)
    try {
      const data = await sqsClient.send(new SetQueueAttributesCommand(params));
      resolve()
    } catch (err) {
      reject(err)
    }
  })
};
