import type { Token } from "@/lib/types";

/**
 * Increment bonding progress gradually
 */
export function incrementBondingProgress(current: number): number {
  // Increase by 0.5-2% each update
  const increase = Math.random() * 1.5 + 0.5;
  return Math.min(100, current + increase);
}

/**
 * Update token with bonding progress increment
 */
export function updateTokenBonding(token: Token): Partial<Token> & { id: string } {
  const newProgress = incrementBondingProgress(token.bondingProgress || 0);
  
  return {
    id: token.id,
    bondingProgress: newProgress,
  };
}
