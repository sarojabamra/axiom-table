/**
 * Utility functions for token status and bonding colors
 */

export type TokenStatus = "bonding" | "migrating" | "migrated";
export type BondingType = "Virtual Curve" | "Pump V1";

/**
 * Get color values for a given bonding type
 */
export function getBondingColors(bondingType: BondingType) {
  const isPump = bondingType === "Pump V1";
  return {
    hex: isPump ? "#14F195" : "#FF4662",
    class: isPump ? "text-[#14F195]" : "text-[#FF4662]",
  };
}

/**
 * Get tooltip information based on token status
 */
export function getStatusTooltip(
  status: TokenStatus,
  bondingType: BondingType,
  bondingProgress?: number
) {
  switch (status) {
    case "migrating":
      return {
        text: "Migrating",
        color: "text-[#5B7FFF]", // Purple
      };
    case "migrated":
      return {
        text: bondingType,
        color: "text-[#FFD700]", // Yellow/Gold
      };
    default: // bonding
      return {
        text: `Bonding: ${Math.floor(bondingProgress || 0)}%`,
        color: getBondingColors(bondingType).class,
      };
  }
}

/**
 * Get stroke color for token image based on status
 */
export function getStatusStroke(
  status: TokenStatus,
  bondingType: BondingType
): string {
  if (status === "migrated") {
    return "#FFD700"; // Gold
  }
  if (status === "bonding" || status === "migrating") {
    return getBondingColors(bondingType).hex;
  }
  return "transparent";
}

/**
 * Check if token should show loading overlay (migrating status)
 */
export function shouldShowOverlay(status: TokenStatus): boolean {
  return status === "migrating";
}

/**
 * Format percentage values with color classes
 */
export function getPercentageColor(value: number): string {
  if (value > 0) return "text-increase";
  if (value < 0) return "text-decrease";
  return "text-textSecondary";
}

/**
 * Format large numbers (market cap, volume, etc.)
 */
export function formatLargeNumber(num: number): string {
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(1)}K`;
  }
  return `$${num}`;
}
