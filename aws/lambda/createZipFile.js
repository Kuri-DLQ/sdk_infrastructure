import JSZip from 'jszip';
import fs from 'fs';

const publishToSnsLambdaZip = new JSZip();

export const createZipFiles = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const publishToSnsLambda = fs.readFileSync('../sdk_infrastructure/aws/lambda/handlers/publishToSnsLambda.js');
  
      publishToSnsLambdaZip.file("publishToSnsLambda.js", publishToSnsLambda);
  
      publishToSnsLambdaZip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
          .pipe(fs.createWriteStream('../sdk_infrastructure/aws/lambda/handlers/publishToSnsLambda.js.zip'))
          .on('finish', function () {
              // console.log("publishToSnsLambda.js.zip written.");
          });
  
    } catch (err) {
        // console.error(err)
        reject(err);
    }
  
    const writeToDynamoLambdaZip = new JSZip();
  
    try {
      const writeToDynamoLambda = fs.readFileSync('../sdk_infrastructure/aws/lambda/handlers/writeToDynamoLambda.js');
  
      writeToDynamoLambdaZip.file("writeToDynamoLambda.js", writeToDynamoLambda);
  
      writeToDynamoLambdaZip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
          .pipe(fs.createWriteStream('../sdk_infrastructure/aws/lambda/handlers/writeToDynamoLambda.js.zip'))
          .on('finish', function () {
              // console.log("writeToDynamoLambda.js.zip written.");
          });
  
    } catch (err) {
      // console.error(err)
      reject(err);
    }
  
    const postToSlackLambdaZip = new JSZip();
  
    try {
      const postToSlackLambda = fs.readFileSync('../sdk_infrastructure/aws/lambda/handlers/postToSlackLambda.js');
  
      postToSlackLambdaZip.file("postToSlackLambda.js", postToSlackLambda);
  
      postToSlackLambdaZip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
          .pipe(fs.createWriteStream('../sdk_infrastructure/aws/lambda/handlers/postToSlackLambda.js.zip'))
          .on('finish', function () {
              // console.log("postToSlackLambda.js.zip written.");
          });
  
    } catch (err) {
      // console.error(err)
      reject(err);
    }

    resolve();
  })
  
}