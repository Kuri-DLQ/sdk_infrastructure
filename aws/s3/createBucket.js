import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../clients/s3Client.js";

export const bucketParams = { Bucket: "kuri_infrastructure_bucket" };

export const run = async () => {
  try {
    const data = await s3Client.send(new CreateBucketCommand(bucketParams));
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
run();