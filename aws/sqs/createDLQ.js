import { CreateQueueCommand, GetQueueAttributesCommand } from  "@aws-sdk/client-sqs";
import { sqsClient } from  "../clients/sqsClient.js";
import fs from 'fs-extra'
import { getQueueName } from "./queueName.js"
import { store } from '../../utils/store.js'

const params = {
  QueueName: "KuriDeadLetterQueue",
};

export const createDLQ = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const dlq = await sqsClient.send(new CreateQueueCommand(params));
      const dlqARN = await (await sqsClient.send(new GetQueueAttributesCommand({ QueueUrl: dlq.QueueUrl, AttributeNames: ['QueueArn']}))).Attributes.QueueArn;
      const dlqName = getQueueName(dlq.QueueUrl)
      // await fs.appendFile('../../.env', `DLQ_ARN="${dlqARN}"\nDLQ_NAME="${dlqName}"\nDLQ_URL="${dlq.QueueUrl}"\n`);
      store.dlq_arn = dlqARN;
      store.dlq_name = dlqName;
      store.dlq_url = dlq.QueueUrl;
      // return dlq;
      resolve(dlq);
    } catch (err) {
      // console.log("Error", err);
      reject(err);
    }
  })

};

// createDLQ();