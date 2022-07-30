import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../clients/ddbClient.js";
import { store } from '../../utils/store.js'

const tableName = "Kuri-DLQ-table"
store.tableName = tableName

export const params = {
  TableName: tableName,
  AttributeDefinitions: [
    {
      AttributeName: "id",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "id",
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

export const createTable = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await ddbClient.send(new CreateTableCommand(params));
      // console.log("Table Created", data);
      resolve()
      // return data;
    } catch (err) {
      // console.log("Error", err);
      reject(err)
    }
  })
};

// createTable();
