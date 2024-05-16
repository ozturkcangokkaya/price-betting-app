import AWS from "aws-sdk";
import { REGION } from "@/api/constants";

// TODO: Store these keys using "AWS Secrets Manager"
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY_SECRET,
  region: REGION,
});

export const docClient = new AWS.DynamoDB.DocumentClient();
