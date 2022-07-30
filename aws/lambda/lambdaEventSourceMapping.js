import AWS from 'aws-sdk'
// import dotenv from 'dotenv'
// dotenv.config({path:'../../.env'})
import { store } from '../../utils/store.js'

const lambda = new AWS.Lambda({apiVersion: '2015-03-31', region: store.region});

export const setEventSourceMapping = () => {
  return new Promise((resolve, reject) => {
    const publishToSnsParams = {
      FunctionName: 'publishToSnsLambda',
      BatchSize: '10',
      Enabled: true || false,
      EventSourceArn: store.dlq_arn,
    };
    
    lambda.createEventSourceMapping(publishToSnsParams, function(err, data) {
      if (err) {
        // console.log(err, err.stack);
        reject(err)
      }
      // else     console.log('success', data);
    });
    
    resolve()
  })
}