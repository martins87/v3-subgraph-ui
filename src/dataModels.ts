import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  {
    transactions {
      id
      timestamp
      mints {
        origin
        token0 {
          name
        }
        token1 {
          name
        }
        amount0
        amount1
        amountUSD
      }
      burns {
        origin
        token0 {
          name
        }
        token1 {
          name
        }
        amount0
        amount1
        amountUSD
      }
      swaps {
        origin
        token0 {
          name
        }
        token1 {
          name
        }
        amount0
        amount1
        amountUSD
      }
    }
  }
`;

export const GET_TOP_POOLS = gql`
{
  pools(orderBy: totalValueLockedUSD, orderDirection: desc) {
    id
    totalValueLockedUSD
    token0 { symbol }
    token1 { symbol }
  }
}
`;

export const GET_TOKENS_AVAILABLE = gql`
  {
    tokens(orderBy: totalValueLockedUSD, orderDirection: desc) {
      id
      name
      symbol
      totalValueLockedUSD
      tokenDayData {
        id
        date
        priceUSD
        open
        high
        low
        close
      }
    }
  }
`;

const pools: string = `
{
  pools(orderBy: totalValueLockedUSD, orderDirection: desc) {
    id
    totalValueLockedUSD
    token0 {
      symbol
      name
    }
    token1 {
      symbol
      name
    }
  
  }
}`;

const pool: string = `
{
  pool (id: "0x5c128d25a21f681e678cb050e551a895c9309945") {
    feeGrowthGlobal0X128
    feeGrowthGlobal1X128
    liquidity
    volumeToken0
    volumeToken1
    volumeUSD
    untrackedVolumeUSD
    feesUSD
    collectedFeesUSD
    token0 { symbol }
    token1 { symbol }
  }
}
`;