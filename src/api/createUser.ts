import { User } from "@/types";
import { TABLE_NAME } from "@/api/constants";
import { docClient } from "@/api/dynamoConfig";

export async function createUser(id: string): Promise<User> {
  const user = {
    userId: id,
    score: 0,
    bets: [],
  };
  const params = {
    TableName: TABLE_NAME,
    Item: user,
  };

  try {
    await docClient.put(params).promise();
    return user;
  } catch (error) {
    throw Error("Unable to save user. Error JSON:");
  }
}
