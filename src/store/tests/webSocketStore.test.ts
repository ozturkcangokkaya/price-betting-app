import { renderHook, act } from "@testing-library/react-hooks";
import useWebSocketStore from "../webSocketStore";

describe("useWebSocketStore", () => {
  beforeEach(() => {
    // Reset WebSocket store state before each test
    useWebSocketStore.getState().isConnected = false;
  });

  it("should initialize with isConnected set to false", () => {
    const { result } = renderHook(() => useWebSocketStore());
    expect(result.current.isConnected).toBe(false);
  });

  it("should connect", () => {
    const { result } = renderHook(() => useWebSocketStore());
    act(() => {
      result.current.connect();
    });
    expect(result.current.isConnected).toBe(true);
  });

  it("should disconnect", () => {
    const { result } = renderHook(() => useWebSocketStore());
    act(() => {
      result.current.disconnect();
    });
    expect(result.current.isConnected).toBe(false);
  });
});
