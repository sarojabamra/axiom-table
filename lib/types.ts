export type Token = {
  id: string;
  name: string;
  symbol?: string;
  icon?: string | null;
  timeString?: string;
  ageString?: string;
  marketCap: number;
  volume24h: number;
  fValue?: number | null;
  txCount?: number | null;
  txBuyPercent?: number; // Percentage of buy transactions for progress bar
  p1?: number | undefined;
  p2?: number | undefined;
  p3?: number | undefined;
  p4?: number | undefined;
  p5?: number | undefined;
  address?: string;
  userCount?: number;
  proTraderCount?: number;
  trophyCount?: number;
  crownCount?: string;
  bondingProgress?: number; // 0-100 percentage
  bondingType?: "Virtual Curve" | "Pump V1";
  status?: "bonding" | "migrating" | "migrated";
};
