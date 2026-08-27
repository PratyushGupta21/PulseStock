"use client"

import { useAccount, useReadContract } from "wagmi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { formatUnits, formatPrice } from "@/lib/utils"
import { PLAY_MONEY_ADDRESS, playMoneyAbi, STOCK_AMM_ADDRESS, stockAmmAbi, STOCKS } from "@/lib/contracts/contracts"

export function Portfolio() {
  const { address, isConnected } = useAccount()

  const { data: cashBalance } = useReadContract({
    address: PLAY_MONEY_ADDRESS,
    abi: playMoneyAbi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 5000 },
  })

  const holdings = STOCKS.map((stock) => {
    const { data: stockData } = useReadContract({
      address: STOCK_AMM_ADDRESS,
      abi: stockAmmAbi,
      functionName: "getStock",
      args: [BigInt(stock.id)],
      query: { refetchInterval: 3000 },
    })

    const { data: price } = useReadContract({
      address: STOCK_AMM_ADDRESS,
      abi: stockAmmAbi,
      functionName: "getPrice",
      args: [BigInt(stock.id)],
      query: { refetchInterval: 3000 },
    })

    const { data: shares } = useReadContract({
      address: STOCK_AMM_ADDRESS,
      abi: stockAmmAbi,
      functionName: "getUserShares",
      args: address ? [address, BigInt(stock.id)] : undefined,
      query: { enabled: !!address, refetchInterval: 3000 },
    })

    const displayTicker = stockData?.[0] || stock.ticker
    const displayName = stockData?.[1] || stock.name
    const basePrice = stockData?.[4] ? Number(stockData[4]) / 1e18 : 0

    const numShares = typeof shares === "bigint" ? Number(shares) / 1e18 : 0
    const numPrice = typeof price === "bigint" ? Number(price) / 1e18 : (stockData?.[6] ? Number(stockData[6]) / 1e18 : basePrice)
    const value = numShares * numPrice

    return { stock, displayTicker, displayName, basePrice, price, shares, numShares, numPrice, value }
  })

  const totalPositionsValue = holdings.reduce((acc, h) => acc + h.value, 0)
  const cashVal = typeof cashBalance === "bigint" ? Number(cashBalance) / 1e18 : 0
  const totalValue = cashVal + totalPositionsValue

  if (!isConnected) {
    return (
      <Card className="bg-black/80 backdrop-blur-sm border border-white/10 p-8 rounded-xl shadow-md">
        <CardContent className="p-0 text-center">
          <p className="text-[#9a9a9a]">Connect wallet to view portfolio valuation</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-black/80 backdrop-blur-sm border border-white/10 p-8 rounded-xl shadow-md">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="font-serif text-2xl font-bold text-white">Asset Holdings & Valuation</CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4 bg-black p-6 rounded-lg border border-white/10">
          <div>
            <div className="text-xs font-mono text-[#9a9a9a] uppercase tracking-wider mb-1">Total Net Portfolio Value</div>
            <div className="font-serif text-3xl font-bold text-white">
              ${totalValue.toFixed(2)} SUSD
            </div>
          </div>
          <div>
            <div className="text-xs font-mono text-[#9a9a9a] uppercase tracking-wider mb-1">Liquid Cash Balance</div>
            <div className="font-mono text-2xl font-semibold text-[#22C55E]">
              {typeof cashBalance === "bigint" ? `${formatUnits(cashBalance)} SUSD` : "0.0000 SUSD"}
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-black border-b border-white/10">
              <TableHead className="text-[#9a9a9a] font-mono text-xs uppercase font-semibold">Ticker</TableHead>
              <TableHead className="text-[#9a9a9a] font-mono text-xs uppercase font-semibold">Company</TableHead>
              <TableHead className="text-right text-[#9a9a9a] font-mono text-xs uppercase font-semibold">24h Anchor</TableHead>
              <TableHead className="text-right text-[#9a9a9a] font-mono text-xs uppercase font-semibold">Spot Price</TableHead>
              <TableHead className="text-right text-[#9a9a9a] font-mono text-xs uppercase font-semibold">Held Quantity</TableHead>
              <TableHead className="text-right text-[#9a9a9a] font-mono text-xs uppercase font-semibold">Position Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-zinc-950/40 divide-y divide-white/10">
            {holdings.map(({ stock, displayTicker, displayName, basePrice, price, shares, value }) => (
              <TableRow key={stock.id} className="hover:bg-zinc-900/40 border-b border-white/10 transition-colors">
                <TableCell className="font-serif font-bold text-white text-base">{displayTicker}</TableCell>
                <TableCell className="text-[#9a9a9a] text-sm">{displayName}</TableCell>
                <TableCell className="text-right font-mono text-[#9a9a9a]">${basePrice > 0 ? basePrice.toFixed(2) : "..."}</TableCell>
                <TableCell className="text-right font-mono text-white font-semibold">
                  {typeof price === "bigint" ? `${formatPrice(price)} SUSD` : (basePrice > 0 ? `$${basePrice.toFixed(2)}` : "...")}
                </TableCell>
                <TableCell className="text-right font-mono text-[#9a9a9a]">
                  {typeof shares === "bigint" ? `${(Number(shares) / 1e18).toFixed(4)}` : "0.0000"}
                </TableCell>
                <TableCell className="text-right font-mono font-semibold text-white">
                  ${value.toFixed(2)} SUSD
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <p className="text-xs font-mono text-[#9a9a9a]">
          * Live share balances updated via on-chain StockAMM.getUserShares queries on Monad Testnet.
        </p>
      </CardContent>
    </Card>
  )
}