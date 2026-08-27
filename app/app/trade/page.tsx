"use client"

import { ConnectButton } from "@/components/wallet/ConnectButton"
import { ClaimFundsButton } from "@/components/onboarding/ClaimFundsButton"
import { TradePanel } from "@/components/trade/TradePanel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowUpRight, ArrowDownRight, BarChart3 } from "lucide-react"
import { STOCKS } from "@/lib/contracts/contracts"
import { useAccount } from "wagmi"

export default function TradePage() {
  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-[#080C14] text-[#F8FAFC]">
      {/* Top Header Navigation */}
      <header className="border-b border-[#1E293B] bg-[#0F172A] sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 bg-[#080C14] rounded-lg border border-[#1E293B]">
              <BarChart3 className="h-5 w-5 text-[#38BDF8]" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#F8FAFC]">Monad Market Sim</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors">
              Dashboard
            </Link>
            <Link href="/trade" className="text-sm font-semibold text-[#38BDF8]">
              Trade
            </Link>
            <Link href="/portfolio" className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors">
              Portfolio
            </Link>
            <Link href="/leaderboard" className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors">
              Leaderboard
            </Link>
            <ConnectButton />
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-[#F8FAFC] mb-3">
            Trade Synthetic Equities
          </h1>
          <p className="text-[#94A3B8] text-base">
            Execute instant buy and sell orders on bonding curves ($x \cdot y = k$). Sub-second block execution on Monad testnet.
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

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {STOCKS.map((stock) => (
            <TradePanel key={stock.id} stockId={stock.id} ticker={stock.ticker} />
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