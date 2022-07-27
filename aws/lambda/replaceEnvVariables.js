import {readFile, writeFile, writeFileSync, promises as fsPromises} from 'fs';
import dotenv from 'dotenv'
dotenv.config({path:'../../.env'})

async function replaceInFile(filename, regex, replacement) {
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8');
    const replaced = contents.replace(regex, replacement);

    await fsPromises.writeFile(filename, replaced);
  } catch (err) {
    console.log(err);
  }
}

const regionRegex = new RegExp(/KURI_REGION/);
const snsArnRegex = new RegExp(/KURI_SNS_ARN/);
const slackPathRegex = new RegExp(/KURI_SLACK_PATH/);

const replaceAllFiles = async () => {
  await replaceInFile('./publishToSnsLambda.js', regionRegex, process.env.REGION);
  await replaceInFile('./writeToDynamoLambda.js', regionRegex, process.env.REGION);
  await replaceInFile('./publishToSnsLambda.js', snsArnRegex, process.env.SNS_ARN);
  await replaceInFile('./postToSlackLambda.js', slackPathRegex, process.env.SLACK_PATH);
}

replaceAllFiles();


