// Example response from Binance API
// [
//   [
//     1499040000000,      // Kline open time
//     "0.01634790",       // Open price
//     "0.80000000",       // High price
//     "0.01575800",       // Low price
//     "0.01577100",       // Close price
//     "148976.11427815",  // Volume
//     1499644799999,      // Kline Close time
//     "2434.19055334",    // Quote asset volume
//     308,                // Number of trades
//     "1756.87402397",    // Taker buy base asset volume
//     "28.46694368",      // Taker buy quote asset volume
//     "0"                 // Unused field, ignore.
//   ]
// ]

export async function getBtcPriceAtTimestamp(
  timestamp: number
): Promise<number> {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1s&startTime=${timestamp}&limit=1`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Bitcoin price");
    }

    const data = await response.json();

    if (data.length === 0 || !data[0] || !data[0][4]) {
      throw new Error("No data available for the specified timestamp");
    }

    // NOTE: [0][4] = Close price
    const btcPrice = parseFloat(data[0][4]);

    return btcPrice;
  } catch (error) {
    throw error;
  }
}
