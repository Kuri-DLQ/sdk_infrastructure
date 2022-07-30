import { CreateTopicCommand } from "@aws-sdk/client-sns";
import { snsClient } from "../clients/snsClient.js";
// import fs from 'fs-extra';
import { store } from '../../utils/store.js'

// Set the parameters
const params = { Name: "KuriTopic" };

export const createTopic = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const topic = await snsClient.send(new CreateTopicCommand(params));
      // await fs.appendFile('../sdk_infrastructure/.env', `SNS_ARN="${topic.TopicArn}"\n`);
      store.sns_arn = topic.TopicArn;
      // return topic;
      resolve(topic);
    } catch (err) {
      // console.log("Error", err.stack);
      reject(err);
    }
  });
};

// createTopic();