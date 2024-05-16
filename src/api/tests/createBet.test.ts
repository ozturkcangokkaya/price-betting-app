import { BetDirection } from "@/types";
import { createBet } from "@/api/createBet";
import { docClient } from "@/api/dynamoConfig";

jest.mock("../../../src/api/dynamoConfig", () => ({
  docClient: {
    update: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  },
}));

const mockUserId = "mockUserId";
const mockBetId = "mockBetId";
const mockOpenPrice = 100;
const mockOpenedAt = Date.now();
const mockDirection = "up" as BetDirection;
const mockClosePrice = 120;

const mockParams = {
  userId: mockUserId,
  betId: mockBetId,
  openPrice: mockOpenPrice,
  openedAt: mockOpenedAt,
  direction: mockDirection,
  closePrice: mockClosePrice,
};

describe("createBet", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a bet and return the bet object", async () => {
    const createdBet = await createBet(mockParams);

    expect(docClient.update).toHaveBeenCalledWith({
      TableName: expect.any(String),
      Key: { userId: mockUserId },
      UpdateExpression: "SET bets = list_append(:bet, bets)",
      ExpressionAttributeValues: {
        ":bet": [
          {
            betId: mockBetId,
            openPrice: mockOpenPrice,
            closePrice: mockClosePrice,
            openedAt: mockOpenedAt,
            direction: mockDirection,
          },
        ],
      },
    });

    expect(createdBet).toEqual({
      betId: mockBetId,
      openPrice: mockOpenPrice,
      closePrice: mockClosePrice,
      openedAt: mockOpenedAt,
      direction: mockDirection,
    });
  });

  it("should throw an error if unable to create bet", async () => {
    const mockError = new Error("Mock DynamoDB error");
    (docClient.update as jest.Mock).mockImplementationOnce(() => {
      throw mockError;
    });

    await expect(createBet(mockParams)).rejects.toThrow("Unable to create bet");
  });

  it("should throw an error for negative openPrice", async () => {
    const mockParamsWithNegativePrice = {
      ...mockParams,
      openPrice: -100,
    };

    await expect(createBet(mockParamsWithNegativePrice)).rejects.toThrow(
      "Invalid parameters: Ensure all parameters are of the correct type and value"
    );
  });

  it("should throw an error for negative closePrice", async () => {
    const mockParamsWithNegativePrice = {
      ...mockParams,
      closePrice: -100,
    };

    await expect(createBet(mockParamsWithNegativePrice)).rejects.toThrow(
      "Invalid parameters: Ensure all parameters are of the correct type and value"
    );
  });
});
