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

    const numShares = typeof shares === "bigint" ? Number(shares) / 1e18 : 0
    const numPrice = typeof price === "bigint" ? Number(price) / 1e18 : stock.defaultBasePrice
    const value = numShares * numPrice

    return { stock, price, shares, numShares, numPrice, value }
  })

  const totalPositionsValue = holdings.reduce((acc, h) => acc + h.value, 0)
  const cashVal = typeof cashBalance === "bigint" ? Number(cashBalance) / 1e18 : 0
  const totalValue = cashVal + totalPositionsValue

  if (!isConnected) {
    return (
      <Card className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none">
        <CardContent className="p-0 text-center">
          <p className="text-[#94A3B8]">Connect wallet to view portfolio valuation</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="font-serif text-2xl font-bold text-[#F8FAFC]">Asset Holdings & Valuation</CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4 bg-[#080C14] p-6 rounded-lg border border-[#1E293B]">
          <div>
            <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1">Total Net Portfolio Value</div>
            <div className="font-serif text-3xl font-bold text-[#38BDF8]">
              ${totalValue.toFixed(2)} SUSD
            </div>
          </div>
          <div>
            <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1">Liquid Cash Balance</div>
            <div className="font-mono text-2xl font-semibold text-[#22C55E]">
              {typeof cashBalance === "bigint" ? `${formatUnits(cashBalance)} SUSD` : "0.0000 SUSD"}
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-[#080C14] border-b border-[#1E293B]">
              <TableHead className="text-[#94A3B8] font-mono text-xs uppercase font-semibold">Ticker</TableHead>
              <TableHead className="text-[#94A3B8] font-mono text-xs uppercase font-semibold">Company</TableHead>
              <TableHead className="text-right text-[#94A3B8] font-mono text-xs uppercase font-semibold">24h Anchor</TableHead>
              <TableHead className="text-right text-[#94A3B8] font-mono text-xs uppercase font-semibold">Spot Price</TableHead>
              <TableHead className="text-right text-[#94A3B8] font-mono text-xs uppercase font-semibold">Held Quantity</TableHead>
              <TableHead className="text-right text-[#94A3B8] font-mono text-xs uppercase font-semibold">Position Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#0F172A] divide-y divide-[#1E293B]">
            {holdings.map(({ stock, price, shares, numShares, value }) => (
              <TableRow key={stock.id} className="hover:bg-[#1E293B]/50 border-b border-[#1E293B]">
                <TableCell className="font-serif font-bold text-[#F8FAFC] text-base">{stock.ticker}</TableCell>
                <TableCell className="text-[#94A3B8] text-sm">{stock.name}</TableCell>
                <TableCell className="text-right font-mono text-[#94A3B8]">${stock.defaultBasePrice.toFixed(2)}</TableCell>
                <TableCell className="text-right font-mono text-[#38BDF8]">
                  {typeof price === "bigint" ? `${formatPrice(price)} SUSD` : `$${stock.defaultBasePrice.toFixed(2)}`}
                </TableCell>
                <TableCell className="text-right font-mono text-[#94A3B8]">
                  {typeof shares === "bigint" ? `${(Number(shares) / 1e18).toFixed(4)}` : "0.0000"}
                </TableCell>
                <TableCell className="text-right font-mono font-semibold text-[#F8FAFC]">
                  ${value.toFixed(2)} SUSD
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <p className="text-xs font-mono text-[#94A3B8]">
          * Live share balances updated via on-chain StockAMM.getUserShares queries on Monad Testnet.
        </p>
      </CardContent>
    </Card>
  )
}