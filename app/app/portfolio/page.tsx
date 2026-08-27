"use client"

import { Navbar } from "@/components/Navbar"
import { ConnectButton } from "@/components/wallet/ConnectButton"
import { Portfolio } from "@/components/portfolio/Portfolio"
import { Card, CardContent } from "@/components/ui/card"
import { useAccount } from "wagmi"

export default function PortfolioPage() {
  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <Navbar />

      {/* Main Container */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white mb-3">
            Portfolio & Asset Management
          </h1>
          <p className="text-[#9a9a9a] text-base font-medium">
            Comprehensive overview of your synthetic stock positions and liquid SUSD cash reserves across real equities.
          </p>
        </div>

        {!isConnected && (
          <Card className="mb-8 bg-black/80 backdrop-blur-sm border border-white/10 p-8 rounded-xl shadow-md">
            <CardContent className="p-0 text-center space-y-4">
              <p className="font-serif text-lg font-bold text-white">Connect your wallet to view your active portfolio</p>
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