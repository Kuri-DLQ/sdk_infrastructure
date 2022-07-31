import JSZip from 'jszip';
import fs from 'fs';

const publishToSnsLambdaZip = new JSZip();
const writeToDynamoLambdaZip = new JSZip();
const postToSlackLambdaZip = new JSZip();

export const createZipFiles = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const publishToSnsLambda = fs.readFileSync('../sdk_infrastructure/aws/lambda/handlers/publishToSnsLambda.js');  
      publishToSnsLambdaZip.file("publishToSnsLambda.js", publishToSnsLambda);
      const zippedSnsLambda = await publishToSnsLambdaZip.generateAsync({ type: 'nodebuffer', streamFiles: true });
      fs.writeFileSync('../sdk_infrastructure/aws/lambda/handlers/publishToSnsLambda.js.zip', zippedSnsLambda);
      // publishToSnsLambdaZip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      //     .pipe(fs.createWriteStream('../sdk_infrastructure/aws/lambda/handlers/publishToSnsLambda.js.zip'))
      //     .on('finish', function () {
      //         // console.log("publishToSnsLambda.js.zip written.");
      //     });

      const writeToDynamoLambda = fs.readFileSync('../sdk_infrastructure/aws/lambda/handlers/writeToDynamoLambda.js');
      writeToDynamoLambdaZip.file("writeToDynamoLambda.js", writeToDynamoLambda);
      const zippedDynamoLambda = await writeToDynamoLambdaZip.generateAsync({ type: 'nodebuffer', streamFiles: true });
      fs.writeFileSync('../sdk_infrastructure/aws/lambda/handlers/writeToDynamoLambda.js.zip', zippedDynamoLambda);
      // writeToDynamoLambdaZip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      //     .pipe(fs.createWriteStream('../sdk_infrastructure/aws/lambda/handlers/writeToDynamoLambda.js.zip'))
      //     .on('finish', function () {
      //         // console.log("writeToDynamoLambda.js.zip written.");
      //     });

      const postToSlackLambda = fs.readFileSync('../sdk_infrastructure/aws/lambda/handlers/postToSlackLambda.js');
      postToSlackLambdaZip.file("postToSlackLambda.js", postToSlackLambda);
      const zippedSlackLambda = await postToSlackLambdaZip.generateAsync({ type: 'nodebuffer', streamFiles: true });
      fs.writeFileSync('../sdk_infrastructure/aws/lambda/handlers/postToSlackLambda.js.zip', zippedSlackLambda);
      // postToSlackLambdaZip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      //     .pipe(fs.createWriteStream('../sdk_infrastructure/aws/lambda/handlers/postToSlackLambda.js.zip'))
      //     .on('finish', function () {
      //         // console.log("postToSlackLambda.js.zip written.");
      //     });
      resolve();
    } catch (err) {
        // console.error(err)
        reject(err);
    }
  });  
}