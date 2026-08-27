"use client"

import Link from "next/link"
import { ConnectButton } from "@/components/wallet/ConnectButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Wallet, Zap, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080C14] text-[#F8FAFC]">
      {/* Top Header */}
      <header className="border-b border-[#1E293B] bg-[#0F172A] sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#080C14] rounded-lg border border-[#1E293B]">
              <BarChart3 className="h-5 w-5 text-[#38BDF8]" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#F8FAFC]">Monad Market Sim</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors">
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

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <section className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F172A] border border-[#1E293B] text-xs font-mono text-[#38BDF8] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            Institutional Financial Terminal • Monad Testnet (10143)
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-[#F8FAFC] leading-tight">
            Institutional Synthetic Market Terminal
          </h1>
          <p className="text-lg md:text-xl text-[#94A3B8] mb-10 leading-relaxed max-w-2xl mx-auto">
            Trade synthetic equities with constant-product bonding curve pricing. Sub-second execution speed powered by Monad's high-throughput parallel EVM.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/onboarding">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-[#22C55E] text-[#080C14] hover:bg-[#16a34a] border border-[#22C55E] px-8 py-4 text-base font-semibold">
                <Wallet className="h-5 w-5" />
                Claim Starter Funds
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8]/10 px-8 py-4 text-base font-semibold">
                <TrendingUp className="h-5 w-5 text-[#38BDF8]" />
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none hover:border-[#38BDF8]/40 transition-colors">
            <CardHeader className="p-0 mb-4">
              <div className="p-3 bg-[#080C14] w-fit rounded-lg border border-[#1E293B] mb-3">
                <Zap className="h-6 w-6 text-[#38BDF8]" />
              </div>
              <CardTitle className="font-serif text-2xl text-[#F8FAFC]">Sub-Second Execution</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Monad's parallel execution pipeline delivers sub-second block finality. Trade quotes confirm instantly on-chain without visual latency.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none hover:border-[#38BDF8]/40 transition-colors">
            <CardHeader className="p-0 mb-4">
              <div className="p-3 bg-[#080C14] w-fit rounded-lg border border-[#1E293B] mb-3">
                <TrendingUp className="h-6 w-6 text-[#22C55E]" />
              </div>
              <CardTitle className="font-serif text-2xl text-[#F8FAFC]">Algorithmic AMM</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                5 synthetic equities (MNDX, CHAI, VIBE, GRIT, TECH) driven by independent bonding curves ($x \cdot y = k$) for continuous liquidity and deterministic price discovery.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none hover:border-[#38BDF8]/40 transition-colors">
            <CardHeader className="p-0 mb-4">
              <div className="p-3 bg-[#080C14] w-fit rounded-lg border border-[#1E293B] mb-3">
                <ShieldCheck className="h-6 w-6 text-[#38BDF8]" />
              </div>
              <CardTitle className="font-serif text-2xl text-[#F8FAFC]">On-Chain Transparency</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                100% serverless, zero-backend execution. All order book state and event logs reside directly on the Monad EVM blockchain.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA Banner */}
        <section className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-12 text-center max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
            Ready to Begin Trading?
          </h2>
          <p className="text-[#94A3B8] mb-8 max-w-xl mx-auto">
            Connect your MetaMask wallet, claim 100,000 SUSD starter funds, and build your synthetic portfolio on Monad.
          </p>
          <Link href="/onboarding">
            <Button size="lg" className="gap-2 bg-[#22C55E] text-[#080C14] hover:bg-[#16a34a] border border-[#22C55E] px-8 py-4 text-base font-semibold">
              Get Started Now <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E293B] bg-[#080C14] py-8">
        <div className="container mx-auto px-6 text-center text-sm text-[#94A3B8]">
          <p className="font-mono">Built for Monad Blitz Hackathon • Institutional Financial Terminal Architecture</p>
        </div>
      </footer>
    </div>
  )
}