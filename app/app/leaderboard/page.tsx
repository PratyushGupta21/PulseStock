"use client"

import { Navbar } from "@/components/Navbar"
import { Leaderboard } from "@/components/leaderboard/Leaderboard"
import { Trophy } from "lucide-react"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#080C14] text-[#F8FAFC]">
      <Navbar />

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