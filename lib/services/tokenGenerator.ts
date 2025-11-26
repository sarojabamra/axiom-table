import type { Token } from "@/lib/types";

// Generate a new random token
export function generateNewToken(id: string): Token {
  const names = ["MoonShot", "RocketCoin", "DiamondHands", "ToTheMoon", "SafeGem", "LuckyDoge", "GoldenBull", "CryptoKing"];
  const symbols = ["HODL", "MOON", "GEM", "SAFE", "BULL", "KING", "RICH", "PUMP"];
  
  // Curated list of real Unsplash image IDs (animals/pets)
  const unsplashImages = [
    "photo-1543466835-00a7907e9de1", // Dog
    "photo-1514888286974-6c03e2ca1dba", // Cat
    "photo-1518791841217-8f162f1e1131", // Cat eyes
    "photo-1425082661705-1834bfd09dca", // Frog
    "photo-1534361960057-19889db9621e", // Dog portrait
    "photo-1537151608828-ea2b11777ee8", // Dog close-up
    "photo-1583511655857-d19b40a7a54e", // Dog happy
    "photo-1548199973-03cce0bbc87b", // Dog outdoor
    "photo-1560807707-8cc77767d783", // Puppy
    "photo-1444212477490-ca407925329e", // Birds
    "photo-1568572933382-74d440642117", // White dog
    "photo-1605568427561-40dd23c2acea", // Husky
    "photo-1612536981610-4e23e5c3f1e5", // Corgi
    "photo-1517849845537-4d257902454a", // Pug
    "photo-1633722715463-d30f4f325e24", // Golden retriever
    "photo-1505628346881-b72b27e84530", // Beagle
    "photo-1530281700549-e82e7bf110d6", // Chihuahua
  ];
  
  const name = names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 1000);
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  const randomImage = unsplashImages[Math.floor(Math.random() * unsplashImages.length)];
  
  return {
    id,
    name,
    symbol,
    icon: `https://images.unsplash.com/${randomImage}?w=68&h=68&fit=crop`,
    timeString: "1s",
    ageString: "1s",
    marketCap: Math.floor(Math.random() * 5000000) + 1000,
    volume24h: Math.floor(Math.random() * 100000) + 100,
    fValue: Math.random() * 0.5,
    txCount: Math.floor(Math.random() * 500) + 1,
    txBuyPercent: Math.floor(Math.random() * 100),
    p1: Math.floor(Math.random() * 61) - 30,
    p2: Math.floor(Math.random() * 61) - 30,
    p3: Math.floor(Math.random() * 61) - 30,
    p4: Math.floor(Math.random() * 61) - 30,
    p5: Math.floor(Math.random() * 61) - 30,
    address: `${Math.random().toString(36).substring(2, 6).toUpperCase()}...pump`,
    userCount: Math.floor(Math.random() * 200) + 1,
    proTraderCount: Math.floor(Math.random() * 20),
    trophyCount: Math.floor(Math.random() * 10),
    crownCount: `${Math.floor(Math.random() * 10)}/${Math.floor(Math.random() * 500) + 1}`,
    bondingProgress: Math.floor(Math.random() * 30), // New tokens start with low bonding progress
    bondingType: Math.random() > 0.5 ? "Virtual Curve" : "Pump V1",
    status: "bonding",
  };
}

// Parse time string to seconds
export function parseTimeToSeconds(timeString: string): number {
  const match = timeString.match(/^(\d+)([smh])$/);
  if (!match) return 0;
  
  const value = parseInt(match[1]);
  const unit = match[2];
  
  switch (unit) {
    case 's': return value;
    case 'm': return value * 60;
    case 'h': return value * 3600;
    default: return 0;
  }
}

// Increment time string by 1 second
export function incrementTimeString(timeString: string): string {
  const seconds = parseTimeToSeconds(timeString) + 1;
  
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h`;
}
