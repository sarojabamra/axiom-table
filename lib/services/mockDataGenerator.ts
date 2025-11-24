import type { Token } from "@/lib/types";

/**
 * Generate random time string based on elapsed seconds
 */
export function generateRandomTimeString(baseSeconds: number): string {
  const seconds = baseSeconds + Math.floor(Math.random() * 10);
  
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h`;
}

/**
 * Generate random percentage change (-30 to +30)
 */
export function generateRandomPercentage(): number {
  return Math.floor(Math.random() * 61) - 30; // -30 to +30
}

/**
 * Generate random small percentage change (-10 to +10) for noticeable updates
 * Returns whole numbers only
 */
export function generateSmallPercentageChange(current: number): number {
  const change = Math.floor((Math.random() * 21) - 10); // -10 to +10 whole numbers
  const newValue = current + change;
  // Clamp between -50 and +50 for more dramatic swings
  return Math.max(-50, Math.min(50, newValue));
}

/**
 * Generate random market cap fluctuation
 */
export function generateMarketCapChange(current: number): number {
  const changePercent = (Math.random() * 0.1) - 0.05; // -5% to +5%
  return Math.max(1000, current + (current * changePercent));
}

/**
 * Generate random volume fluctuation
 */
export function generateVolumeChange(current: number): number {
  const changePercent = (Math.random() * 0.2) - 0.1; // -10% to +10%
  return Math.max(100, current + (current * changePercent));
}

/**
 * Create a random token update
 */
export function createRandomTokenUpdate(token: Token, elapsedSeconds: number): Partial<Token> & { id: string } {
  const updates: Partial<Token> & { id: string } = {
    id: token.id,
  };

  // Randomly decide which fields to update (30% chance for each)
  if (Math.random() > 0.7) {
    updates.timeString = generateRandomTimeString(elapsedSeconds);
    updates.ageString = updates.timeString;
  }

  if (Math.random() > 0.7) {
    updates.p1 = generateSmallPercentageChange(token.p1 ?? 0);
  }

  if (Math.random() > 0.7) {
    updates.p2 = generateSmallPercentageChange(token.p2 ?? 0);
  }

  if (Math.random() > 0.7) {
    updates.p3 = generateSmallPercentageChange(token.p3 ?? 0);
  }

  if (Math.random() > 0.7) {
    updates.p4 = generateSmallPercentageChange(token.p4 ?? 0);
  }

  if (Math.random() > 0.7) {
    updates.p5 = generateSmallPercentageChange(token.p5 ?? 0);
  }

  if (Math.random() > 0.9) {
    updates.marketCap = generateMarketCapChange(token.marketCap);
  }

  if (Math.random() > 0.9) {
    updates.volume24h = generateVolumeChange(token.volume24h);
  }

  return updates;
}

/**
 * Create multiple random token updates
 */
export function createBatchTokenUpdates(tokens: Token[], elapsedSeconds: number): Array<Partial<Token> & { id: string }> {
  // Update 30-50% of tokens each time
  const updateCount = Math.floor(tokens.length * (0.3 + Math.random() * 0.2));
  
  // Create a copy to avoid mutating the original array
  const tokensCopy = [...tokens];
  const tokensToUpdate = tokensCopy
    .sort(() => Math.random() - 0.5)
    .slice(0, updateCount);

  return tokensToUpdate.map((token) => createRandomTokenUpdate(token, elapsedSeconds));
}
