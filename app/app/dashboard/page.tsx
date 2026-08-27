"use client"

import { ConnectButton } from "@/components/wallet/ConnectButton"
import { ClaimFundsButton } from "@/components/onboarding/ClaimFundsButton"
import { StockCard } from "@/components/dashboard/StockCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Zap, TrendingUp, BarChart3 } from "lucide-react"
import { STOCKS } from "@/lib/contracts/contracts"
import { useAccount } from "wagmi"

export default function DashboardPage() {
  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-[#080C14] text-[#F8FAFC]">
      {/* Header Navigation */}
      <header className="border-b border-[#1E293B] bg-[#0F172A] sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 bg-[#080C14] rounded-lg border border-[#1E293B]">
              <BarChart3 className="h-5 w-5 text-[#38BDF8]" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#F8FAFC]">Monad Market Sim</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-semibold text-[#38BDF8]">
              Dashboard
            </Link>
            <Link href="/trade" className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors">
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

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-[#F8FAFC] mb-3">
            Live Market Dashboard
          </h1>
          <p className="text-[#94A3B8] text-base">
            Real-time constant-product bonding curve spot prices for 5 synthetic equities. Sub-second streaming logs.
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {STOCKS.map((stock) => (
            <StockCard key={stock.id} stockId={stock.id} ticker={stock.ticker} />
          ))}
        </div>

        {/* Architecture Info Footer Box */}
        <Card className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="font-serif text-2xl font-bold text-[#F8FAFC] flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-[#38BDF8]" />
              Market Mechanics & Bonding Curve Design
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-3 gap-6 text-sm text-[#94A3B8]">
              <div className="p-6 bg-[#080C14] rounded-lg border border-[#1E293B]">
                <h4 className="font-serif text-lg font-bold text-[#F8FAFC] mb-2">Constant Product Invariant</h4>
                <p className="leading-relaxed">Every stock operates on $x \cdot y = k$. Buys adjust cash reserve upwards while reducing share supply, driving spot price deterministically higher.</p>
              </div>
              <div className="p-6 bg-[#080C14] rounded-lg border border-[#1E293B]">
                <h4 className="font-serif text-lg font-bold text-[#F8FAFC] mb-2">Sub-Second Streaming</h4>
                <p className="leading-relaxed">Recharts components directly subscribe to contract <code className="font-mono text-xs text-[#38BDF8] bg-[#0F172A] px-1 py-0.5 rounded border border-[#1E293B]">Trade</code> log topics for latency-free chart rendering on Monad.</p>
              </div>
              <div className="p-6 bg-[#080C14] rounded-lg border border-[#1E293B]">
                <h4 className="font-serif text-lg font-bold text-[#F8FAFC] mb-2">5 Isolated Markets</h4>
                <p className="leading-relaxed">MNDX, CHAI, VIBE, GRIT, and TECH feature independent reserve pools, eliminating cross-pair contagion or liquidity slippage.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}