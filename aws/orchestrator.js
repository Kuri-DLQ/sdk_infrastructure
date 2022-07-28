import { createRole } from "./IAM/createRole.js"
import { createMainQueue } from "./sqs/createMainQueue.js"
import { createDLQ } from "./sqs/createDLQ.js"
import { joinDlqMain } from "./sqs/join-dlq-main.js"
import { createTopic } from "./sns/createTopic.js"
import { createTable } from "./dynamodb/createDynamoTable.js"
import { createBucket } from "./s3/createBucket.js"
import { replaceEnvVariables } from "../utils/replaceEnvVariables.js"
import { createZipFiles } from "./lambda/createZipFile.js"
import { pushLambdasToS3 } from "./s3/pushLambdasToS3.js"
import { createLambdas } from "./lambda/createAllLambdas.js"
import { setEventSourceMapping } from "./lambda/lambdaEventSourceMapping.js"
import { subscribeToSns } from "./lambda/subscribeToSns.js"
import { addPermissions } from "./lambda/addPermissions.js"

class Orchestrator {
  createIAMRole() {
    createRole()
  }
  // createMainQueue,
  // createDLQ,
  // joinDlqMain,
  // createTopic,
  // createTable,
  // createBucket,
  // replaceEnvVariables,
  // createZipFiles,
  // pushLambdasToS3,
  // createLambdas,
  // setEventSourceMapping,
  // subscribeToSns,
  // addPermissions
}

const orchestrator = new Orchestrator();

export default orchestrator