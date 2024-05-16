import { getUserById } from "../getUserById";
import { docClient } from "@/api/dynamoConfig";
import { TABLE_NAME } from "@/api/constants";

jest.mock(".@/api/dynamoConfig");

describe("getUserById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the user with the specified ID", async () => {
    const mockUserId = "mockUserId";
    const mockUser = {
      userId: mockUserId,
      score: 100,
      bets: [],
    };

    const mockData = {
      Item: mockUser,
    };

    // Mocking the DynamoDB document client's get method
    (docClient.get as jest.Mock).mockReturnValueOnce({
      promise: jest.fn().mockResolvedValueOnce(mockData),
    });

    const user = await getUserById(mockUserId);

    expect(docClient.get).toHaveBeenCalledWith({
      TableName: TABLE_NAME,
      Key: {
        userId: mockUserId,
      },
    });

    expect(user).toEqual(mockUser);
  });

  it("should return null if the user does not exist", async () => {
    const mockUserId = "nonexistentUserId";

    // Mocking the DynamoDB document client's get method
    (docClient.get as jest.Mock).mockReturnValueOnce({
      promise: jest.fn().mockResolvedValueOnce({}),
    });

    const user = await getUserById(mockUserId);

    expect(docClient.get).toHaveBeenCalledWith({
      TableName: TABLE_NAME,
      Key: {
        userId: mockUserId,
      },
    });

    expect(user).toBeUndefined();
  });

  it("should throw an error if unable to fetch the user", async () => {
    const mockUserId = "mockUserId";

    // Mocking the DynamoDB document client's get method to throw an error
    (docClient.get as jest.Mock).mockReturnValueOnce({
      promise: jest
        .fn()
        .mockRejectedValueOnce(new Error("Mock DynamoDB error")),
    });

    await expect(getUserById(mockUserId)).rejects.toThrow(
      `Unable to fetch user with ID ${mockUserId}`
    );
  });
});
