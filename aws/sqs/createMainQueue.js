import { CreateQueueCommand } from  "@aws-sdk/client-sqs";
import { sqsClient } from  "../clients/sqsClient.js";
import fs from 'fs-extra'
import { getQueueName } from "./queueName.js"

const params = {
  QueueName: "KuriMainQueue",
};

export const createMainQueue = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const mainQueue = await sqsClient.send(new CreateQueueCommand(params));
      const queueName = getQueueName(mainQueue.QueueUrl)
      fs.appendFileSync('../sdk_infrastructure/.env', `MAIN_QUEUE_URL="${mainQueue.QueueUrl}"\nMAIN_QUEUE_NAME="${queueName}"\n`);
      resolve()
    } catch (err) {
      reject(err)
    }
  })
};
