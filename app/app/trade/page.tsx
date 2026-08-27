"use client"

import { Navbar } from "@/components/Navbar"
import { ConnectButton } from "@/components/wallet/ConnectButton"
import { ClaimFundsButton } from "@/components/onboarding/ClaimFundsButton"
import { StockCard } from "@/components/dashboard/StockCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react"
import { STOCKS } from "@/lib/contracts/contracts"
import { useAccount } from "wagmi"

export default function TradePage() {
  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-[#080C14] text-[#F8FAFC]">
      <Navbar />

      {/* Main Container */}
      <main className="container mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-[#F8FAFC] mb-3 flex items-center gap-3">
            <Activity className="h-8 w-8 text-[#38BDF8]" />
            Markets & Live Trade
          </h1>
          <p className="text-[#94A3B8] text-base max-w-3xl">
            Click on any stock card below to open its buy/sell trading panel and dual-line graph comparison. All prices are anchored to real market closes with instant bonding curve execution.
          </p>
        </div>

        {!isConnected && (
          <Card className="mb-10 bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#F8FAFC] mb-1">Connect Your Wallet to Access Trading</h3>
                  <p className="text-sm text-[#94A3B8]">MetaMask required • Monad Testnet (Chain ID: 10143)</p>
                </div>
                <div className="flex items-center gap-3">
                  <ConnectButton />
                  <ClaimFundsButton />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {STOCKS.map((stock) => (
            <StockCard
              key={stock.id}
              stockId={stock.id}
              ticker={stock.ticker}
              name={stock.name}
              defaultBasePrice={stock.defaultBasePrice}
            />
          ))}
        </div>

        {/* Execution Rules Card */}
        <Card className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="font-serif text-2xl font-bold text-[#F8FAFC] flex items-center gap-3">
              <ArrowUpRight className="h-6 w-6 text-[#22C55E]" />
              <ArrowDownRight className="h-6 w-6 text-[#EF4444]" />
              Execution Mechanics Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-8 text-sm text-[#94A3B8]">
              <div className="bg-[#080C14] p-6 rounded-lg border border-[#1E293B]">
                <h4 className="font-serif text-lg font-bold text-[#F8FAFC] mb-3">Buy Orders (SUSD → Shares)</h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Spot price moves up deterministically with order size</li>
                  <li>Shares Out: <code className="font-mono text-xs text-[#38BDF8] bg-[#0F172A] px-1.5 py-0.5 rounded border border-[#1E293B]">(shareReserve × cashIn) / (cashReserve + cashIn)</code></li>
                  <li>SUSD transferred directly from wallet to AMM contract</li>
                </ul>
              </div>
              <div className="bg-[#080C14] p-6 rounded-lg border border-[#1E293B]">
                <h4 className="font-serif text-lg font-bold text-[#F8FAFC] mb-3">Sell Orders (Shares → SUSD)</h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Spot price moves down with share redemptions</li>
                  <li>Cash Out: <code className="font-mono text-xs text-[#38BDF8] bg-[#0F172A] px-1.5 py-0.5 rounded border border-[#1E293B]">(cashReserve × sharesIn) / (shareReserve + sharesIn)</code></li>
                  <li>SUSD transferred directly from AMM contract back to wallet</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}