"use client"

import { useEffect, useState } from "react"
import { useWatchContractEvent } from "wagmi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Trophy, TrendingUp } from "lucide-react"
import { STOCK_AMM_ADDRESS, stockAmmAbi } from "@/lib/contracts/contracts"
import { useReadContract } from "wagmi"

interface PortfolioData {
  address: string
  shares: Record<number, bigint>
  cash: bigint
  totalValue: number
}

export function Leaderboard() {
  const [portfolios, setPortfolios] = useState<PortfolioData[]>([])
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const { data: prices } = useReadContract({
    address: STOCK_AMM_ADDRESS,
    abi: stockAmmAbi,
    functionName: "getPrice",
    args: [BigInt(0)],
    query: { refetchInterval: 5000 },
  })

  useWatchContractEvent({
    address: STOCK_AMM_ADDRESS,
    abi: stockAmmAbi,
    eventName: "Trade",
    onLogs: (logs) => {
      logs.forEach((log: any) => {
        if (!log.args) return
        const { user, stockId, isBuy, amountOut } = log.args
        const addr = user ? user.toLowerCase() : ""
        if (!addr) return

        setPortfolios((prev) => {
          const existing = prev.find((p) => p.address === addr)
          const shares = { ...(existing?.shares || {}) }
          const curShare = shares[Number(stockId)] || BigInt(0)
          shares[Number(stockId)] = curShare + (isBuy ? amountOut : -amountOut)

          const newPortfolio: PortfolioData = {
            address: addr,
            shares,
            cash: existing?.cash || BigInt(0),
            totalValue: 0,
          }
          return existing ? prev.map((p) => (p.address === addr ? newPortfolio : p)) : [...prev, newPortfolio]
        })
      })
      setLastUpdate(new Date())
    },
  })

  useEffect(() => {
    if (prices) {
      setPortfolios((prev) =>
        prev.map((p) => {
          let total = Number(p.cash) / 1e18
          Object.entries(p.shares).forEach(([_, shares]) => {
            total += (Number(shares) / 1e18) * (Number(prices) / 1e18)
          })
          return { ...p, totalValue: total }
        })
      )
    }
  }, [prices])

  const sorted = [...portfolios].sort((a, b) => b.totalValue - a.totalValue)

  return (
    <Card className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none">
      <CardHeader className="p-0 mb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="font-serif text-2xl font-bold text-[#F8FAFC] flex items-center gap-3">
            <Trophy className="h-6 w-6 text-[#38BDF8]" />
            Trader Leaderboard & Ranking
          </CardTitle>
          <span className="text-xs font-mono text-[#38BDF8] px-3 py-1 rounded bg-[#080C14] border border-[#1E293B]">
            Live Feed: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {sorted.length === 0 ? (
          <div className="bg-[#080C14] p-12 text-center rounded-lg border border-[#1E293B] text-[#94A3B8]">
            <p className="font-serif text-lg font-semibold text-[#F8FAFC] mb-1">No Trade Events Recorded Yet</p>
            <p className="text-sm">Initiate a buy or sell order on the Trade tab to rank on the global leaderboard.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-[#080C14] border-b border-[#1E293B]">
                <TableHead className="text-[#94A3B8] font-mono text-xs uppercase font-semibold w-24">Rank</TableHead>
                <TableHead className="text-[#94A3B8] font-mono text-xs uppercase font-semibold">Wallet Address</TableHead>
                <TableHead className="text-right text-[#94A3B8] font-mono text-xs uppercase font-semibold">Net Portfolio Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-[#0F172A] divide-y divide-[#1E293B]">
              {sorted.slice(0, 10).map((p, i) => (
                <TableRow key={p.address} className="hover:bg-[#1E293B]/50 border-b border-[#1E293B]">
                  <TableCell className="font-serif font-bold text-[#F8FAFC] text-base">
                    {i === 0 && <Trophy className="h-4 w-4 text-[#38BDF8] inline mr-2" />}
                    #{i + 1}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-[#F8FAFC]">
                    {p.address.slice(0, 8)}...{p.address.slice(-6)}
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-[#22C55E]">
                    {p.totalValue.toFixed(2)} SUSD
                    <TrendingUp className="h-3.5 w-3.5 inline text-[#22C55E] ml-1.5" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}