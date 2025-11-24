import type { Token } from "@/lib/types";
import { createBatchTokenUpdates } from "./mockDataGenerator";
import { generateNewToken, incrementTimeString } from "./tokenGenerator";
import { updateTokenBonding } from "./bondingUtils";

type UpdateCallback = (updates: Array<Partial<Token> & { id: string }>) => void;
type TokensCallback = (tokens: Token[]) => void;

/**
 * Mock WebSocket Service
 * Simulates real-time server updates for token data
 * Handles token generation, destruction, and time updates
 */
class MockWebSocketService {
  private updateInterval: NodeJS.Timeout | null = null;
  private timeUpdateInterval: NodeJS.Timeout | null = null;
  private callbacks: Set<UpdateCallback> = new Set();
  private tokensCallbacks: Set<TokensCallback> = new Set();
  private tokens: Token[] = [];
  private startTime: number = Date.now();
  private isConnected: boolean = false;
  private nextTokenId: number = 1000;

  /**
   * Initialize the service with initial token data
   */
  initialize(tokens: Token[]) {
    // Create a mutable copy to avoid readonly issues
    this.tokens = tokens.map(t => ({ ...t }));
    this.startTime = Date.now();
    this.nextTokenId = Math.max(...this.tokens.map(t => parseInt(t.id) || 0)) + 1;
  }

  /**
   * Connect and start sending updates
   */
  /**
   * Connect and start sending updates
   */
  connect() {
    if (this.isConnected) {
      console.warn("WebSocket already connected");
      return;
    }

    this.isConnected = true;
    console.log("Mock WebSocket connected");

    // Update times every second
    this.timeUpdateInterval = setInterval(() => {
      if (!this.isConnected || this.tokens.length === 0) return;

      // Update all token times
      this.tokens = this.tokens.map(token => ({
        ...token,
        timeString: incrementTimeString(token.timeString || "0s"),
        ageString: incrementTimeString(token.ageString || "0s"),
      }));

      // Notify subscribers with full token list
      this.tokensCallbacks.forEach((callback) => callback([...this.tokens]));
    }, 1000);

    // Send percentage/data updates every 2-5 seconds
    const sendUpdate = () => {
      if (!this.isConnected || this.tokens.length === 0) return;

      const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
      const updates = createBatchTokenUpdates(this.tokens, elapsedSeconds);

      // Update local token cache
      updates.forEach((update) => {
        const index = this.tokens.findIndex((t) => t.id === update.id);
        if (index !== -1) {
          // Apply standard updates
          let updatedToken = { ...this.tokens[index], ...update };

          // Add slow fluctuations to V, MC, and TX (10% chance per update)
          if (Math.random() > 0.9) {
            // Market Cap fluctuation: ±1-5%
            const mcChange = (Math.random() - 0.5) * 0.1; // -5% to +5%
            updatedToken.marketCap = Math.max(1000, updatedToken.marketCap * (1 + mcChange));
            
            // Volume fluctuation: ±2-8%
            const volChange = (Math.random() - 0.5) * 0.16; // -8% to +8%
            updatedToken.volume24h = Math.max(100, updatedToken.volume24h * (1 + volChange));
            
            // TX count fluctuation: ±0-3 transactions
            const txChange = Math.floor(Math.random() * 7) - 3; // -3 to +3
            updatedToken.txCount = Math.max(0, (updatedToken.txCount || 0) + txChange);
          }

          // Apply bonding progress update (50% chance per update cycle)
          if (Math.random() > 0.5) {
            // Handle Bonding -> Migrating
            if ((updatedToken.bondingProgress || 0) < 100 && updatedToken.status === "bonding") {
              const bondingUpdate = updateTokenBonding(updatedToken);
              updatedToken = { ...updatedToken, ...bondingUpdate };

              // Check if we just hit 100%
              if ((updatedToken.bondingProgress || 0) >= 100) {
                updatedToken.status = "migrating";
                // Schedule migration completion after 3-5 seconds
                setTimeout(() => {
                  const migratedTokenIndex = this.tokens.findIndex(t => t.id === updatedToken.id);
                  if (migratedTokenIndex !== -1) {
                    const migratedToken = { ...this.tokens[migratedTokenIndex] };
                    migratedToken.status = "migrated";
                    this.tokens[migratedTokenIndex] = migratedToken;
                    this.tokensCallbacks.forEach((callback) => callback([...this.tokens]));
                  }
                }, 3000 + Math.random() * 2000);
              }

              (update as Partial<Token>).bondingProgress = updatedToken.bondingProgress;
              (update as Partial<Token>).status = updatedToken.status;
            }
          }

          this.tokens[index] = updatedToken;
        }
      });

      // Notify all subscribers
      this.callbacks.forEach((callback) => callback(updates));
      // Randomly add new tokens (10% chance, less frequent)
      if (Math.random() > 0.9 && this.tokens.length < 30) {
        const newToken = generateNewToken(String(this.nextTokenId++));
        this.tokens.unshift(newToken); // Add to beginning (newest first)
        console.log("🆕 New token generated:", newToken.name, "Total:", this.tokens.length);
        this.tokensCallbacks.forEach((callback) => callback([...this.tokens]));
      }

      // Randomly remove old tokens (5% chance if more than 20 tokens)
      if (Math.random() > 0.95 && this.tokens.length > 20) {
        const removed = this.tokens.pop(); // Remove oldest
        console.log("🗑️ Token removed:", removed?.name, "Total:", this.tokens.length);
        this.tokensCallbacks.forEach((callback) => callback([...this.tokens]));
      }

      // Schedule next update with random interval (2-5 seconds)
      const nextInterval = 2000 + Math.random() * 3000;
      this.updateInterval = setTimeout(sendUpdate, nextInterval);
    };

    // Start sending updates
    sendUpdate();
  }

  /**
   * Disconnect and stop sending updates
   */
  disconnect() {
    if (!this.isConnected) return;

    this.isConnected = false;
    if (this.updateInterval) {
      clearTimeout(this.updateInterval);
      this.updateInterval = null;
    }
    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
      this.timeUpdateInterval = null;
    }
    console.log("Mock WebSocket disconnected");
  }

  /**
   * Subscribe to updates
   */
  subscribe(callback: UpdateCallback) {
    this.callbacks.add(callback);
    return () => {
      this.callbacks.delete(callback);
    };
  }

  /**
   * Subscribe to full token list updates (for add/remove)
   */
  subscribeToTokens(callback: TokensCallback) {
    this.tokensCallbacks.add(callback);
    return () => {
      this.tokensCallbacks.delete(callback);
    };
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

// Export singleton instance
export const mockWebSocket = new MockWebSocketService();
