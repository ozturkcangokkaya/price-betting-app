import { resolveBet } from "@/api/resolveBet";
import { docClient } from "@/api/dynamoConfig";
import { getUserById } from "../getUserById";

jest.mock(".@/api/dynamoConfig");
jest.mock("../getUserById");

describe("resolveBet", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve a bet correctly and return the bet object", async () => {
    const mockUserId = "mockUserId";
    const mockBetId = "mockBetId";
    const mockDirection = "up";
    const mockOpenPrice = 100;
    const mockClosePrice = 120;

    const mockUser = {
      userId: mockUserId,
      score: 0,
      bets: [
        {
          betId: mockBetId,
          direction: mockDirection,
          openPrice: mockOpenPrice,
        },
      ],
    };

    const mockUpdatedUser = {
      ...mockUser,
      score: 1,
      bets: [
        {
          betId: mockBetId,
          direction: mockDirection,
          openPrice: mockOpenPrice,
          closePrice: mockClosePrice,
          result: "profit",
        },
      ],
    };

    (getUserById as jest.Mock).mockResolvedValueOnce(mockUser);
    (docClient.update as jest.Mock).mockReturnValueOnce({ promise: jest.fn() });

    const resolvedBet = await resolveBet({
      userId: mockUserId,
      betId: mockBetId,
      direction: mockDirection,
      openPrice: mockOpenPrice,
      closePrice: mockClosePrice,
    });

    expect(getUserById).toHaveBeenCalledWith(mockUserId);
    expect(docClient.update).toHaveBeenCalledWith({
      TableName: expect.any(String),
      Key: { userId: mockUserId },
      UpdateExpression: "SET bets = :bets, score = :score",
      ExpressionAttributeValues: {
        ":bets": mockUpdatedUser.bets,
        ":score": mockUpdatedUser.score,
      },
    });

    expect(resolvedBet).toEqual({
      betId: mockBetId,
      direction: mockDirection,
      openPrice: mockOpenPrice,
      closePrice: mockClosePrice,
      result: "profit",
    });
  });

  it("should throw an error if user is not found", async () => {
    const mockUserId = "nonexistentUserId";

    (getUserById as jest.Mock).mockResolvedValueOnce(null);

    await expect(
      resolveBet({
        userId: mockUserId,
        betId: "mockBetId",
        direction: "up",
        openPrice: 100,
        closePrice: 120,
      })
    ).rejects.toThrow("Unable to resolve bet");
  });

  it("should throw an error if bet is not found", async () => {
    const mockUserId = "mockUserId";
    const mockBetId = "nonexistentBetId";

    (getUserById as jest.Mock).mockResolvedValueOnce({
      userId: mockUserId,
      score: 0,
      bets: [],
    });

    await expect(
      resolveBet({
        userId: mockUserId,
        betId: mockBetId,
        direction: "up",
        openPrice: 100,
        closePrice: 120,
      })
    ).rejects.toThrow("Unable to resolve bet");
  });
});
