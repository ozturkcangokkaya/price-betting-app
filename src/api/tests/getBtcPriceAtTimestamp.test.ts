import { getBtcPriceAtTimestamp } from "@/api/getBtcPriceAtTimestamp";
import fetchMock from "jest-fetch-mock";

describe("getBtcPriceAtTimestamp", () => {
  beforeEach(() => {
    fetchMock.enableMocks(); // Enable mocking for fetch
  });

  afterEach(() => {
    fetchMock.mockClear(); // Clear fetch mock between tests
  });

  it("should return the Bitcoin price at the specified timestamp", async () => {
    const mockTimestamp = 1612424976914; // Example timestamp
    const mockResponse = [
      [
        mockTimestamp, // Kline open time
        "40000", // Open price
        "41000", // High price
        "39000", // Low price
        "40500", // Close price
        "500", // Volume
        1612424977914, // Kline Close time
        "500000", // Quote asset volume
        20, // Number of trades
        "400", // Taker buy base asset volume
        "200000", // Taker buy quote asset volume
        "0", // Unused field, ignore.
      ],
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const btcPrice = await getBtcPriceAtTimestamp(mockTimestamp);

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1s&startTime=${mockTimestamp}&limit=1`
    );

    expect(btcPrice).toBe(40500); // Close price from mock response
  });

  it("should throw an error if the response is not ok", async () => {
    const mockTimestamp = 1612424976914; // Example timestamp

    fetchMock.mockResponseOnce("", { status: 400 });

    await expect(getBtcPriceAtTimestamp(mockTimestamp)).rejects.toThrow(
      "Failed to fetch Bitcoin price"
    );
  });

  it("should throw an error if no data is available for the specified timestamp", async () => {
    const mockTimestamp = 1612424976914; // Example timestamp

    fetchMock.mockResponseOnce(JSON.stringify([])); // Empty response

    await expect(getBtcPriceAtTimestamp(mockTimestamp)).rejects.toThrow(
      "No data available for the specified timestamp"
    );
  });
});
