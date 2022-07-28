import { CreateQueueCommand, GetQueueAttributesCommand } from  "@aws-sdk/client-sqs";

import { sqsClient } from  "../clients/sqsClient.js";
import fs from 'fs-extra'
import { getQueueName } from "./queueName.js"

// Set the parameters
const params = {
  QueueName: "KuriDeadLetterQueue",
};

export const createDLQ = async () => {
  try {
    const dlq = await sqsClient.send(new CreateQueueCommand(params));
    console.log("Success", dlq);
    const dlqARN = await (await sqsClient.send(new GetQueueAttributesCommand({ QueueUrl: dlq.QueueUrl, AttributeNames: ['QueueArn']}))).Attributes.QueueArn;
    const dlqQueueNamee = getQueueName(dlq.QueueUrl)
    fs.appendFile('../../.env', `DLQ_ARN="${dlqARN}"\nDLQ_NAME="${dlqQueueNamee}"\nDLQ_URL="${dlq.QueueUrl}"\n`);         
    return dlq;
  } catch (err) {
    console.log("Error", err);
  }
};

// createDLQ();