import {readFile, writeFile, writeFileSync, promises as fsPromises} from 'fs';
import dotenv from 'dotenv'
dotenv.config({path:'../sdk_infrastructure/.env'})

export const setEnvVariables = () => {
  return new Promise((resolve, reject) => {
    async function replaceInFile(filename, regex, replacement) {
      try {
        const contents = await fsPromises.readFile(filename, 'utf-8');
        const replaced = contents.replace(regex, replacement);
    
        await fsPromises.writeFile(filename, replaced);
      } catch (err) {
        // console.log(err);
        reject(err)
      }
    }
    
    const regionRegex = new RegExp(/KURI_REGION/);
    const snsArnRegex = new RegExp(/KURI_SNS_ARN/);
    const slackPathRegex = new RegExp(/KURI_SLACK_PATH/);
  
    (async () => {
      await replaceInFile('../sdk_infrastructure/aws/lambda/handlers/publishToSnsLambda.js', regionRegex, process.env.REGION);
      await replaceInFile('../sdk_infrastructure/aws/lambda/handlers/writeToDynamoLambda.js', regionRegex, process.env.REGION);
      await replaceInFile('../sdk_infrastructure/aws/lambda/handlers/publishToSnsLambda.js', snsArnRegex, process.env.SNS_ARN);
      await replaceInFile('../sdk_infrastructure/aws/lambda/handlers/postToSlackLambda.js', slackPathRegex, process.env.SLACK_PATH);
    })()

    resolve()
  })
}

// setEnvVariables();

