"use client"

import { ConnectButton } from "@/components/wallet/ConnectButton"
import { Portfolio } from "@/components/portfolio/Portfolio"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { BarChart3 } from "lucide-react"
import { useAccount } from "wagmi"

export default function PortfolioPage() {
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
            <Link href="/dashboard" className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors">
              Dashboard
            </Link>
            <Link href="/trade" className="text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] transition-colors">
              Trade
            </Link>
            <Link href="/portfolio" className="text-sm font-semibold text-[#38BDF8]">
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
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-[#F8FAFC] mb-3">
            Portfolio & Asset Management
          </h1>
          <p className="text-[#94A3B8] text-base">
            Comprehensive overview of your synthetic stock positions and liquid SUSD cash reserves.
          </p>
        </div>

        {!isConnected && (
          <Card className="mb-8 bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none">
            <CardContent className="p-0 text-center space-y-4">
              <p className="font-serif text-lg font-bold text-[#F8FAFC]">Connect your wallet to view your active portfolio</p>
              <div className="flex justify-center">
                <ConnectButton />
              </div>
            </CardContent>
          </Card>
        )}

        <Portfolio />
      </main>
    </div>
  )
}