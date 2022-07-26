import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})

const lambda = new AWS.Lambda({apiVersion: '2015-03-31', region: process.env.REGION});

const params = {
  FunctionName: 'publishToSnsLambda', /* required */
  BatchSize: '10',
  // BisectBatchOnFunctionError: true || false,
  // DestinationConfig: {
  //   OnFailure: {
  //     Destination: process.env.SNS_ARN
  //   },
  //   OnSuccess: {
  //     Destination: process.env.SNS_ARN
  //   }
  // },
  Enabled: true || false,
  EventSourceArn: process.env.DLQ_ARN,
  // FilterCriteria: {
  //   Filters: [
  //     {
  //       Pattern: 'STRING_VALUE'
  //     },
  //     /* more items */
  //   ]
  // },
  // FunctionResponseTypes: [
  //   ReportBatchItemFailures,
  //   /* more items */
  // ],
  // MaximumBatchingWindowInSeconds: 'NUMBER_VALUE',
  // MaximumRecordAgeInSeconds: 'NUMBER_VALUE',
  // MaximumRetryAttempts: 'NUMBER_VALUE',
  // ParallelizationFactor: 'NUMBER_VALUE',
  // Queues: [
  //   'STRING_VALUE',
  //   /* more items */
  // ],
  // SelfManagedEventSource: {
  //   Endpoints: {
  //     '<EndPointType>': [
  //       'STRING_VALUE',
  //       /* more items */
  //     ],
  //     /* '<EndPointType>': ... */
  //   }
  // },
  // SourceAccessConfigurations: [
  //   {
  //     Type: BASIC_AUTH | VPC_SUBNET | VPC_SECURITY_GROUP | SASL_SCRAM_512_AUTH | SASL_SCRAM_256_AUTH | VIRTUAL_HOST | CLIENT_CERTIFICATE_TLS_AUTH | SERVER_ROOT_CA_CERTIFICATE,
  //     URI: 'STRING_VALUE'
  //   },
  //   /* more items */
  // ],
  // StartingPosition: TRIM_HORIZON | LATEST | AT_TIMESTAMP,
  // StartingPositionTimestamp: new Date || 'Wed Dec 31 1969 16:00:00 GMT-0800 (PST)' || 123456789,
  // Topics: [
  //   'STRING_VALUE',
  //   /* more items */
  // ],
  // TumblingWindowInSeconds: 'NUMBER_VALUE'
};

lambda.createEventSourceMapping(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
