import { CreateQueueCommand } from  "@aws-sdk/client-sqs";
import { sqsClient } from  "../clients/sqsClient.js";
import fs from 'fs-extra'

// Set the parameters
const params = {
  QueueName: "KuriMainQueue",
};

export const run = async () => {
  try {
    const mainQueue = await sqsClient.send(new CreateQueueCommand(params));
    console.log("Success", mainQueue);
    fs.appendFile('../../.env', `MAIN_QUEUE_URL="${mainQueue.QueueUrl}"\n`);         
    return mainQueue; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
run();