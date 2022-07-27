import JSZip from 'jszip'
import fs from 'fs'

try {
  const zip = new JSZip();
  const publishToSnsData = fs.readFileSync('./publishToSnsLambda.js');
  zip.file('./publishToSnsLambda.js', publishToSnsData);

  zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    .pipe(fs.createWriteStream('pusblishToSnsLambda.js.zip'))
} catch (err) {
    console.error(err)
}

try {
  const zip = new JSZip();
  const publishToSnsData = fs.readFileSync('./writeToDynamoLambda.js');
  zip.file('./writeToDynamoLambda.js', publishToSnsData);

  zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    .pipe(fs.createWriteStream('writeToDynamoLambda.js.zip'))
} catch (err) {
    console.error(err)
}

try {
  const zip = new JSZip();
  const publishToSnsData = fs.readFileSync('./postToSlackLambda.js');
  zip.file('./postToSlackLambda.js', publishToSnsData);

  zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    .pipe(fs.createWriteStream('postToSlackLambda.js.zip'))
} catch (err) {
    console.error(err)
}

