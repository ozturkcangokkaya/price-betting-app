import { createUser } from "@/api/createUser";
import { docClient } from "@/api/dynamoConfig";

jest.mock("../../../src/api/dynamoConfig", () => ({
  docClient: {
    put: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  },
}));

const mockUserId = "mockUserId";

describe("createUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user and return the user object", async () => {
    const createdUser = await createUser(mockUserId);

    expect(docClient.put).toHaveBeenCalledWith({
      TableName: expect.any(String),
      Item: {
        userId: mockUserId,
        score: 0,
        bets: [],
      },
    });

    expect(createdUser).toEqual({
      userId: mockUserId,
      score: 0,
      bets: [],
    });
  });

  it("should throw an error if unable to create user", async () => {
    const mockError = new Error("Mock DynamoDB error");
    (docClient.put as jest.Mock).mockImplementationOnce(() => {
      throw mockError;
    });

    await expect(createUser(mockUserId)).rejects.toThrow(
      "Unable to save user. Error JSON:"
    );
  });
});
