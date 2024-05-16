import { BetResult, BetDirection, Bet, User } from "@/types";
import { TABLE_NAME } from "@/api/constants";
import { docClient } from "@/api/dynamoConfig";
import { getUserById } from "./getUserById";

type ResolveBetParams = Pick<
  Bet,
  "betId" | "direction" | "openPrice" | "closePrice"
> & { userId: string };

export async function resolveBet({
  userId,
  betId,
  direction,
  openPrice,
  closePrice = 0,
}: ResolveBetParams): Promise<Bet | undefined> {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const betIndex = findBetIndex(user.bets, betId);
    if (betIndex === -1) {
      throw new Error("Bet not found");
    }

    const bet = user.bets[betIndex];

    const { score, betResult } = calculateScoreAndResult(
      closePrice,
      direction,
      openPrice
    );

    await updateUserData(userId, user, betIndex, closePrice, score, betResult);

    return bet;
  } catch (error) {
    throw new Error("Unable to resolve bet");
  }
}

function findBetIndex(bets: Bet[], betId: string): number {
  return bets.findIndex((bet) => bet.betId === betId);
}

function calculateScoreAndResult(
  closePrice: number,
  direction: BetDirection,
  openPrice: number
): { score: number; betResult: BetResult } {
  let score = 0;
  let betResult: BetResult = "break even";
  const guessedUp = direction === "up";
  const guessedDown = direction === "down";
  const priceWentUp = closePrice > openPrice;
  const priceWentDown = closePrice < openPrice;

  const isCorrectDirection =
    (guessedUp && priceWentUp) || (guessedDown && priceWentDown);
  const isWrongDirection =
    (guessedDown && priceWentUp) || (guessedUp && priceWentDown);

  if (isCorrectDirection) {
    score = 1;
    betResult = "profit";
  } else if (isWrongDirection) {
    score = -1;
    betResult = "loss";
  }

  return { score, betResult };
}

async function updateUserData(
  userId: string,
  user: User,
  betIndex: number,
  closePrice: number,
  score: number,
  betResult: BetResult
) {
  user.score += score;
  user.bets[betIndex].closePrice = closePrice;
  user.bets[betIndex].result = betResult;

  const params = {
    TableName: TABLE_NAME,
    Key: { userId },
    UpdateExpression: "SET bets = :bets, score = :score",
    ExpressionAttributeValues: { ":bets": user.bets, ":score": user.score },
  };

  await docClient.update(params).promise();
}
