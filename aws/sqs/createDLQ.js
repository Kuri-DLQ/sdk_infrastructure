import { CreateQueueCommand, GetQueueAttributesCommand } from  "@aws-sdk/client-sqs";

import { sqsClient } from  "../clients/sqsClient.js";
import fs from 'fs-extra'

// Set the parameters
const params = {
  QueueName: "KuriDeadLetterQueue",
};

export const run = async () => {
  try {
    const dlq = await sqsClient.send(new CreateQueueCommand(params));
    console.log("Success", dlq);
    const dlqARN = await (await sqsClient.send(new GetQueueAttributesCommand({ QueueUrl: dlq.QueueUrl, AttributeNames: ['QueueArn']}))).Attributes.QueueArn;
    fs.appendFile('../../.env', `DLQ_ARN="${dlqARN}"\n`);         
    return dlq;
  } catch (err) {
    console.log("Error", err);
  }
};
run();