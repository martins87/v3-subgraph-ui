type TokenDayData = {
  id: string;
  date: number;
  priceUSD: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  volumeUSD: string;
};
  
export type TokenData = {
  id: string;
  name: string;
  symbol: string;
  tokenDayData: TokenDayData[];
  totalValueLockedUSD: string;
};

type TokenSymbol = {
  symbol: string;
};

export type PoolData = {
  id: string;
  totalValueLockedUSD: string;
  token0: TokenSymbol;
  token1: TokenSymbol;
};

export type TransactionData = {
  id: string;
  timestamp: string;
  burns: any;
  mints: any;
  swaps: any;
};
