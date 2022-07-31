import { CreateQueueCommand, GetQueueAttributesCommand } from  "@aws-sdk/client-sqs";

import { sqsClient } from  "../clients/sqsClient.js";
import fs from 'fs-extra'
import { getQueueName } from "./queueName.js"

const params = {
  QueueName: "KuriDeadLetterQueue",
};

export const createDLQ = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const dlq = await sqsClient.send(new CreateQueueCommand(params));
      const dlqARN = await (await sqsClient.send(new GetQueueAttributesCommand({ QueueUrl: dlq.QueueUrl, AttributeNames: ['QueueArn']}))).Attributes.QueueArn;
      const dlqQueueNamee = getQueueName(dlq.QueueUrl)
      fs.appendFileSync('../sdk_infrastructure/.env', `DLQ_ARN="${dlqARN}"\nDLQ_NAME="${dlqQueueNamee}"\nDLQ_URL="${dlq.QueueUrl}"\n`);         
      resolve(dlq);
    } catch (err) {
      reject(err);
    }
  })

};
