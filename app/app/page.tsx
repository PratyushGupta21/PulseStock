"use client"

import Link from "next/link"
import { Navbar } from "@/components/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Zap, TrendingUp, Anchor, ShieldCheck, Activity, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080C14] text-[#F8FAFC]">
      <Navbar />

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <section className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F172A] border border-[#1E293B] text-xs font-mono text-[#38BDF8] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            Institutional Terminal • Monad Parallel EVM & Real Equity Oracles
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-[#F8FAFC] leading-tight">
            Institutional Synthetic <br className="hidden sm:inline" />
            <span className="text-[#38BDF8]">Equity Terminal</span>
          </h1>

          <p className="text-lg md:text-xl text-[#94A3B8] mb-10 leading-relaxed max-w-2xl mx-auto">
            Trade real-world equities (AAPL, TSLA, NVDA, GOOGL, MSFT) anchored to 24h market closing prices with sensitive intraday bonding curves on Monad.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/onboarding">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-[#22C55E] text-[#080C14] hover:bg-[#16a34a] border border-[#22C55E] px-8 py-4 text-base font-semibold">
                <Wallet className="h-5 w-5" />
                Claim 100k SUSD & Start
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8]/10 px-8 py-4 text-base font-semibold">
                <TrendingUp className="h-5 w-5 text-[#38BDF8]" />
                Live Markets & Trade
              </Button>
            </Link>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
          <Card className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none hover:border-[#38BDF8]/40 transition-colors">
            <CardHeader className="p-0 mb-4">
              <div className="p-3 bg-[#080C14] w-fit rounded-lg border border-[#1E293B] mb-3">
                <Anchor className="h-6 w-6 text-[#38BDF8]" />
              </div>
              <CardTitle className="font-serif text-2xl text-[#F8FAFC]">24h Real Price Anchors</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Base prices re-anchor daily to real market closing prices (AAPL, TSLA, NVDA, etc.), preventing runaway market drift.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none hover:border-[#38BDF8]/40 transition-colors">
            <CardHeader className="p-0 mb-4">
              <div className="p-3 bg-[#080C14] w-fit rounded-lg border border-[#1E293B] mb-3">
                <Activity className="h-6 w-6 text-[#22C55E]" />
              </div>
              <CardTitle className="font-serif text-2xl text-[#F8FAFC]">Sensitive Bonding Curves</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Intraday trades shift spot prices dynamically using constant-product math ($x \cdot y = k$). Every order impacts live market depth.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none hover:border-[#38BDF8]/40 transition-colors">
            <CardHeader className="p-0 mb-4">
              <div className="p-3 bg-[#080C14] w-fit rounded-lg border border-[#1E293B] mb-3">
                <Zap className="h-6 w-6 text-[#38BDF8]" />
              </div>
              <CardTitle className="font-serif text-2xl text-[#F8FAFC]">Sub-Second Execution</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Monad&apos;s parallel EVM confirms trades in &lt;1 second. Web3 contract events drive instant chart updates without WebSockets.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA Banner */}
        <section className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-12 text-center max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4">
            Ready to test your trading strategy?
          </h2>
          <p className="text-[#94A3B8] mb-8 max-w-xl mx-auto">
            Get 100,000 SimUSD (SUSD) starter funds minted directly to your browser wallet with one click.
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
          <p className="font-mono">Built for Monad Blitz Hackathon • Real Equity Anchors • Institutional Terminal Architecture</p>
        </div>
      </footer>
    </div>
  )
}