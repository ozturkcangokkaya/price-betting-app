import { renderHook, act } from "@testing-library/react-hooks";
import usePriceStore from "../priceStore";

describe("usePriceStore", () => {
  it("should initialize with price of 0", () => {
    const { result } = renderHook(() => usePriceStore());
    expect(result.current.price).toBe(0);
  });

  it("should set price", () => {
    const { result } = renderHook(() => usePriceStore());
    act(() => {
      result.current.setPrice(10);
    });
    expect(result.current.price).toBe(10);
  });
});
