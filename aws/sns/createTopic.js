import { CreateTopicCommand } from "@aws-sdk/client-sns";
import { snsClient } from "../clients/snsClient.js";

// Set the parameters
const params = { Name: "KuriTopic" };

export const run = async () => {
  try {
    const topic = await snsClient.send(new CreateTopicCommand(params));
    console.log("Success.",  topic);
    return topic;
  } catch (err) {
    console.log("Error", err.stack);
  }
};
run();