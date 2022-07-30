import { SetQueueAttributesCommand } from  "@aws-sdk/client-sqs";
import { sqsClient } from  "../clients/sqsClient.js";
// import dotenv from 'dotenv'
// dotenv.config({path:'../../.env'})
import { store } from '../../utils/store.js'


// Set the parameters
const params = {
  Attributes: {
    RedrivePolicy:
      `{"deadLetterTargetArn":"${store.dlq_arn}",` +
      '"maxReceiveCount":"3"}',
  },
  QueueUrl: store.main_queue_url,
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

