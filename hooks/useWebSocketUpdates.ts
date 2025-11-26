import { useEffect } from "react";
import { mockWebSocket } from "@/lib/services/websocketService";
import { useAppDispatch } from "@/lib/redux/hooks";
import { updateMultipleTokens, setTokens } from "@/lib/redux/slices/tokensSlice";
import type { Token } from "@/lib/types";

// Custom hook to manage WebSocket connection and updates
// Follows atomic architecture principles with single responsibility
export function useWebSocketUpdates(initialTokens: Token[]) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize WebSocket with token data
    mockWebSocket.initialize(initialTokens);
    dispatch(setTokens(initialTokens));

    // Subscribe to percentage/data updates
    const unsubscribeUpdates = mockWebSocket.subscribe((updates) => {
      dispatch(updateMultipleTokens(updates));
    });

    // Subscribe to full token list updates (for add/remove/time)
    const unsubscribeTokens = mockWebSocket.subscribeToTokens((tokens) => {
      dispatch(setTokens(tokens));
    });

    // Connect to WebSocket
    mockWebSocket.connect();

    // Cleanup on unmount
    return () => {
      unsubscribeUpdates();
      unsubscribeTokens();
      mockWebSocket.disconnect();
    };
  }, []); // Empty deps - only run once on mount

  return mockWebSocket.getConnectionStatus();
}
