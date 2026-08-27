"use client"

import { Navbar } from "@/components/Navbar"
import { ConnectButton } from "@/components/wallet/ConnectButton"
import { ClaimFundsButton } from "@/components/onboarding/ClaimFundsButton"
import { StockCard } from "@/components/dashboard/StockCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Anchor, Activity, Zap, MousePointerClick, TrendingUp } from "lucide-react"
import { STOCKS } from "@/lib/contracts/contracts"
import { useAccount } from "wagmi"

export default function DashboardPage() {
  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-[#080C14] text-[#F8FAFC]">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-[#F8FAFC] mb-3 flex items-center gap-3">
            <Activity className="h-8 w-8 text-[#38BDF8]" />
            Live Market Dashboard & Equities
          </h1>
          <p className="text-[#94A3B8] text-base max-w-3xl flex items-center gap-2">
            <MousePointerClick className="h-4 w-4 text-[#38BDF8] shrink-0" />
            Click any stock card below to open its instant Trade modal. Real 24h market price anchors ($AAPL, $TSLA, $NVDA, etc.) paired with sensitive bonding curves on Monad.
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
            />
          ))}
        </div>

        {/* Architecture Info Footer Box */}
        <Card className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="font-serif text-2xl font-bold text-[#F8FAFC] flex items-center gap-3">
              <Activity className="h-6 w-6 text-[#38BDF8]" />
              Hybrid Bonding-Curve Architecture
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-3 gap-6 text-sm text-[#94A3B8]">
              <div className="p-6 bg-[#080C14] rounded-lg border border-[#1E293B]">
                <h4 className="font-serif text-lg font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
                  <Anchor className="h-4 w-4 text-[#38BDF8]" />
                  24h Real Price Anchor
                </h4>
                <p className="leading-relaxed">Base prices are updated daily from real market closing prices (AAPL, TSLA, NVDA, GOOGL, MSFT, etc.).</p>
              </div>
              <div className="p-6 bg-[#080C14] rounded-lg border border-[#1E293B]">
                <h4 className="font-serif text-lg font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#22C55E]" />
                  Sensitive Bonding Curve
                </h4>
                <p className="leading-relaxed">Every trade shifts the spot price dynamically relative to the daily anchor using constant product $x \cdot y = k$ math.</p>
              </div>
              <div className="p-6 bg-[#080C14] rounded-lg border border-[#1E293B]">
                <h4 className="font-serif text-lg font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[#38BDF8]" />
                  Instant On-Chain Execution
                </h4>
                <p className="leading-relaxed">Trades execute in sub-second blocks on Monad parallel EVM. Contract log events drive instant chart updates.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}