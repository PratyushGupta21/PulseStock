import { parseAbi } from "viem";

export const PLAY_MONEY_ADDRESS = (process.env.NEXT_PUBLIC_PLAY_MONEY_ADDRESS || "0x0000000000000000000000000000000000000000") as `0x${string}`;
export const STOCK_AMM_ADDRESS = (process.env.NEXT_PUBLIC_STOCK_AMM_ADDRESS || "0x0000000000000000000000000000000000000000") as `0x${string}`;

export const playMoneyAbi = parseAbi([
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function claimStarterFunds() external",
]);

export const stockAmmAbi = parseAbi([
  "function buy(uint8 stockId, uint256 cashAmount) external",
  "function sell(uint8 stockId, uint256 shareAmount) external",
  "function getPrice(uint8 stockId) view returns (uint256)",
  "function getUserShares(address user, uint8 stockId) view returns (uint256)",
  "function getTicker(uint8 stockId) view returns (string)",
  "event Trade(address indexed user, uint8 indexed stockId, bool isBuy, uint256 amountIn, uint256 amountOut, uint256 newPrice)",
]);

export const STOCKS = [
  { id: 0, ticker: "MNDX" },
  { id: 1, ticker: "CHAI" },
  { id: 2, ticker: "VIBE" },
  { id: 3, ticker: "GRIT" },
  { id: 4, ticker: "TECH" },
] as const;