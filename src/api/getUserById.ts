import { docClient } from "@/api/dynamoConfig";
import { User } from "@/types";
import { TABLE_NAME } from "@/api/constants";

export async function getUserById(id: string): Promise<User | null> {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      userId: id,
    },
  };

  try {
    const data = await docClient.get(params).promise();
    return data.Item as User;
  } catch (error) {
    throw Error(`Unable to fetch user with ID ${id}`);
  }
}
