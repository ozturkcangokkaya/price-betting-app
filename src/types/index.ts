export type BetDirection = "up" | "down";
export type BetResult = "profit" | "break even" | "loss";

export type Bet = {
  betId: string;
  direction: BetDirection;
  openedAt: number;
  openPrice: number;
  closePrice?: number;
  result?: BetResult;
};

export type User = {
  userId: string;
  score: number;
  bets: Bet[];
};
