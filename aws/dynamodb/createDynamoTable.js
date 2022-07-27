import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../clients/ddbClient.js";

export const params = {
  TableName: "Kuri-DLQ-table",
  AttributeDefinitions: [
    {
      AttributeName: "id", //ATTRIBUTE_NAME_1
      AttributeType: "S", //ATTRIBUTE_TYPE
    },
  ],
  KeySchema: [
    {
      AttributeName: "id", //ATTRIBUTE_NAME_1
      KeyType: "HASH",
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  StreamSpecification: {
    StreamEnabled: false,
  },
};

export const run = async () => {
  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log("Table Created", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
run();