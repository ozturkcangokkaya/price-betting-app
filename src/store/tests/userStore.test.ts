import { renderHook, act } from "@testing-library/react-hooks";
import { Bet } from "../@/types";
import useUserStore from "../userStore";

jest.mock("../@/api/getBtcPriceAtTimestamp.ts", () => ({
  getBtcPriceAtTimestamp: jest.fn(),
}));

describe("useUserStore", () => {
  beforeEach(() => {
    // Reset user store state before each test
    useUserStore.getState().userId = "";
    useUserStore.getState().score = 0;
    useUserStore.getState().bets = [];
  });

  it("should initialize with userId='', score=0, and empty bets array", () => {
    const { result } = renderHook(() => useUserStore());
    expect(result.current.userId).toBe("");
    expect(result.current.score).toBe(0);
    expect(result.current.bets).toEqual([]);
  });

  it("should add a bet", () => {
    const { result } = renderHook(() => useUserStore());
    const testBet: Bet = {
      betId: "1",
      direction: "up",
      openedAt: Date.now(),
      openPrice: 100,
    };
    act(() => {
      result.current.addBet(testBet);
    });
    expect(result.current.bets).toEqual([testBet]);
  });

  it("should update a bet", () => {
    const { result } = renderHook(() => useUserStore());
    const initialBet: Bet = {
      betId: "1",
      direction: "up",
      openedAt: Date.now(),
      openPrice: 100,
    };
    const updatedBet: Bet = {
      betId: "1",
      direction: "down",
      openedAt: Date.now(),
      openPrice: 90,
    };
    act(() => {
      result.current.addBet(initialBet);
      result.current.updateBet(updatedBet);
    });
    expect(result.current.bets).toEqual([updatedBet]);
  });

  it("should add a score", () => {
    const { result } = renderHook(() => useUserStore());
    act(() => {
      result.current.addScore();
    });
    expect(result.current.score).toBe(1);
  });

  it("should subtract a score", () => {
    const { result } = renderHook(() => useUserStore());
    act(() => {
      result.current.subtractScore();
    });
    expect(result.current.score).toBe(-1);
  });

  it("should login with given userId, score, and bets", () => {
    const { result } = renderHook(() => useUserStore());
    const testUserId = "testUser";
    const testScore = 10;
    const testBets: Bet[] = [
      {
        betId: "1",
        direction: "up",
        openedAt: Date.now(),
        openPrice: 100,
      },
    ];
    act(() => {
      result.current.login(testUserId, testScore, testBets);
    });
    expect(result.current.userId).toBe(testUserId);
    expect(result.current.score).toBe(testScore);
    expect(result.current.bets).toEqual(testBets);
  });
});
