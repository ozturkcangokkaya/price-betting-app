import { renderHook, act } from "@testing-library/react-hooks";
import useBetStore from "../betStore";

describe("useBetStore", () => {
  it("should initialize with countdown of 0 and isBusy set to false", () => {
    const { result } = renderHook(() => useBetStore());
    expect(result.current.countdown).toBe(0);
    expect(result.current.isBusy()).toBe(false);
  });

  it("should toggle isBusy depending on the countdown value ", () => {
    const { result } = renderHook(() => useBetStore());
    act(() => {
      result.current.setCountdown(10);
    });
    expect(result.current.isBusy()).toBe(true);

    act(() => {
      result.current.setCountdown(10);
    });
    expect(result.current.isBusy()).toBe(true);
  });

  it("should decrease countdown", () => {
    const { result } = renderHook(() => useBetStore());
    act(() => {
      result.current.setCountdown(10);
      result.current.decreaseCountdown();
    });
    expect(result.current.countdown).toBe(9);
  });
});
