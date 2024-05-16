import { Bet } from "@/types";
import { TABLE_NAME } from "@/api/constants";
import { docClient } from "@/api/dynamoConfig";

type CreateBetParams = Pick<
  Bet,
  "betId" | "direction" | "openedAt" | "openPrice" | "closePrice"
> & { userId: string };

export async function createBet(params: CreateBetParams): Promise<Bet> {
  const { userId, betId, openPrice, openedAt, direction, closePrice } = params;

  if (
    typeof userId !== "string" ||
    typeof betId !== "string" ||
    typeof openPrice !== "number" ||
    typeof openedAt !== "number" ||
    (direction !== "down" && direction !== "up") ||
    openPrice <= 0 ||
    (closePrice && closePrice <= 0)
  ) {
    throw new Error(
      "Invalid parameters: Ensure all parameters are of the correct type and value"
    );
  }

  const bet: Bet = {
    betId,
    openPrice,
    closePrice,
    openedAt,
    direction,
  };

  try {
    const updateExpression = "SET bets = list_append(:bet, bets)";
    const expressionAttributeValues = {
      ":bet": [bet],
    };

    const updateParams = {
      TableName: TABLE_NAME,
      Key: {
        userId,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    };

    await docClient.update(updateParams).promise();
    return bet;
  } catch (error) {
    throw new Error("Unable to create bet");
  }
}
