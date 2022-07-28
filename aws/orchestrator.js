import { createRole } from "./IAM/createRole"
import { createMainQueue } from "./sqs/createMainQueue"
import { createDLQ } from "./sqs/createDLQ"
import { joinDlqMain } from "./sqs/join-dlq-main"
import { createTopic } from "./sns/createTopic"
import { createTable } from "./dynamodb/createDynamoTable"
import { createBucket } from "./s3/createBucket"
import { replaceEnvVariables } from "../../../sdk_infrastructure/utils/replaceEnvVariables"
import { createZipFiles } from "./lambda/createZipFile"
import { pushLambdasToS3 } from "./lambda/pushLambdasToS3"
import { createLambdas } from "./lambda/createAllLambdas"
import { setEventSourceMapping } from "./lambda/lambdaEventSourceMapping"
import { suscribeToSns } from "./lambda/subscribeToSns"
import { addPermissions } from "./lambda/addPermissions"

const orchestrator = {
  createRole,
  createMainQueue,
  createDLQ,
  joinDlqMain,
  createTopic,
  createTable,
  createBucket,
  replaceEnvVariables,
  createZipFiles,
  pushLambdasToS3,
  createLambdas,
  setEventSourceMapping,
  suscribeToSns,
  addPermissions  
}

export default orchestrator