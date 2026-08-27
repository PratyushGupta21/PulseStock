"use client"

import { useEffect, useState } from "react"
import { useReadContract, useWatchContractEvent } from "wagmi"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import { STOCK_AMM_ADDRESS, stockAmmAbi } from "@/lib/contracts/contracts"

interface StockCardProps {
  stockId: number
  ticker: string
}

export function StockCard({ stockId, ticker }: StockCardProps) {
  const [priceHistory, setPriceHistory] = useState<number[]>([])
  const [maxPoints] = useState(100)

  const { data: price } = useReadContract({
    address: STOCK_AMM_ADDRESS,
    abi: stockAmmAbi,
    functionName: "getPrice",
    args: [stockId],
    query: { refetchInterval: 2000 },
  })

  const { data: tickerName } = useReadContract({
    address: STOCK_AMM_ADDRESS,
    abi: stockAmmAbi,
    functionName: "getTicker",
    args: [stockId],
    query: { enabled: false },
  })

  useWatchContractEvent({
    address: STOCK_AMM_ADDRESS,
    abi: stockAmmAbi,
    eventName: "Trade",
    onLogs: (logs) => {
      logs.forEach((log: any) => {
        if (log.args && Number(log.args.stockId) === stockId) {
          const newPrice = Number(log.args.newPrice) / 1e18
          setPriceHistory((prev) => [...prev.slice(-maxPoints + 1), newPrice])
        }
      })
    },
  })

  useEffect(() => {
    if (price && priceHistory.length === 0) {
      const initialPrice = Number(price) / 1e18
      setPriceHistory(Array(maxPoints).fill(initialPrice))
    }
  }, [price, priceHistory.length, maxPoints])

  const displayTicker = typeof tickerName === "string" ? tickerName : ticker
  const currentPrice = price ? Number(price) / 1e18 : 0
  const priceChange = priceHistory.length >= 2
    ? priceHistory[priceHistory.length - 1] - priceHistory[priceHistory.length - 2]
    : 0
  const isPositive = priceChange >= 0

  const chartData = priceHistory.map((price, index) => ({
    time: index,
    price,
  }))

  return (
    <Card className="h-full bg-[#0F172A] border border-[#1E293B] p-5 md:p-6 rounded-xl shadow-none flex flex-col justify-between hover:border-[#38BDF8]/40 transition-colors">
      <CardHeader className="p-0 mb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-serif text-2xl font-bold text-[#F8FAFC] tracking-tight">{displayTicker}</CardTitle>
          <Badge
            variant="secondary"
            className={`gap-1 px-2.5 py-0.5 font-mono text-xs ${
              isPositive
                ? "bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30"
                : "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30"
            }`}
          >
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(4)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col justify-between">
        <div className="font-mono text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4 tracking-tight">
          {currentPrice > 0 ? `${currentPrice.toFixed(4)} SUSD` : "0.0000 SUSD"}
        </div>
        <div className="h-36 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.6} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tick={false} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#94A3B8", fontFamily: "monospace" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#080C14",
                  borderColor: "#1E293B",
                  borderRadius: "6px",
                  color: "#F8FAFC",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)"
                }}
                formatter={(value: any) => [`${Number(value).toFixed(4)} SUSD`, "Spot Price"]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "#22C55E" : "#EF4444"}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: isPositive ? "#22C55E" : "#EF4444", stroke: "#080C14", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}