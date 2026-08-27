"use client"

import { ConnectButton } from "@/components/wallet/ConnectButton"
import { Leaderboard } from "@/components/leaderboard/Leaderboard"
import Link from "next/link"
import { BarChart3, Trophy } from "lucide-react"

export default function LeaderboardPage() {
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
            <Link href="/trade" className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors">
              Trade
            </Link>
            <Link href="/portfolio" className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors">
              Portfolio
            </Link>
            <Link href="/leaderboard" className="text-sm font-semibold text-[#38BDF8]">
              Leaderboard
            </Link>
            <ConnectButton />
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-[#F8FAFC] mb-3 flex items-center gap-3">
            <Trophy className="h-8 w-8 text-[#38BDF8]" />
            Global Trader Rankings
          </h1>
          <p className="text-[#94A3B8] text-base">
            Live ranking of top traders by net portfolio valuation. Aggregated from real-time smart contract events.
          </p>
        </div>

        <Leaderboard />
      </main>
    </div>
  )
}