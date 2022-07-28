import { CreateTopicCommand } from "@aws-sdk/client-sns";
import { snsClient } from "../clients/snsClient.js";
import fs from 'fs-extra';

// Set the parameters
const params = { Name: "KuriTopic" };

export const createTopic = async () => {
  try {
    const topic = await snsClient.send(new CreateTopicCommand(params));
    fs.appendFile('../../.env', `SNS_ARN="${topic.TopicArn}"\n`);
    console.log("Success.",  topic);
    return topic;
  } catch (err) {
    console.log("Error", err.stack);
  }
};

// createTopic();