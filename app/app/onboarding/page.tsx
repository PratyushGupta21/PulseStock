"use client"

import { useAccount } from "wagmi"
import { Navbar } from "@/components/Navbar"
import { ConnectButton } from "@/components/wallet/ConnectButton"
import { ClaimFundsButton } from "@/components/onboarding/ClaimFundsButton"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Wallet, Zap, CheckCircle2, ArrowRight } from "lucide-react"

export default function OnboardingPage() {
  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-[#080C14] text-[#F8FAFC]">
      <Navbar />

      {/* Main Container */}
      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="text-center mb-12">
          <div className="p-4 bg-[#0F172A] w-fit rounded-2xl border border-[#1E293B] mx-auto mb-6">
            <Zap className="h-10 w-10 text-[#38BDF8]" />
          </div>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-[#F8FAFC] mb-3">
            Onboarding & Wallet Provisioning
          </h1>
          <p className="text-[#94A3B8] text-base max-w-xl mx-auto">
            Claim your 100,000 SUSD starter funds and trade real equities (AAPL, TSLA, NVDA, GOOGL, MSFT) on Monad testnet.
          </p>
        </div>

        {/* Step 1 Card */}
        <Card className="mb-6 bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="font-serif text-xl font-bold text-[#F8FAFC] flex items-center gap-3">
              <Wallet className="h-5 w-5 text-[#38BDF8]" />
              Step 1: Connect MetaMask Wallet
            </CardTitle>
            <CardDescription className="text-[#94A3B8]">
              Link your browser wallet to Monad Testnet (Chain ID: 10143)
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <ConnectButton />
            {isConnected && (
              <div className="flex items-center gap-2 text-[#22C55E] font-mono text-xs bg-[#080C14] p-3 rounded-lg border border-[#22C55E]/30 w-fit">
                <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
                <span>Connected to Monad Testnet</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step 2 Card */}
        <Card className="mb-6 bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="font-serif text-xl font-bold text-[#F8FAFC] flex items-center gap-3">
              <Zap className="h-5 w-5 text-[#22C55E]" />
              Step 2: Mint Starter Liquidity (SUSD)
            </CardTitle>
            <CardDescription className="text-[#94A3B8]">
              Receive 100,000 SUSD (SimUSD) play money to start trading. One-time claim per address.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ClaimFundsButton />
          </CardContent>
        </Card>

        {/* Step 3 Card */}
        <Card className="mb-10 bg-[#0F172A] border border-[#1E293B] p-8 rounded-xl shadow-none">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="font-serif text-xl font-bold text-[#F8FAFC] flex items-center gap-3">
              <ArrowRight className="h-5 w-5 text-[#38BDF8]" />
              Step 3: Start Trading Real Stocks
            </CardTitle>
            <CardDescription className="text-[#94A3B8]">
              Head to the dashboard to view live prices anchored to 24h real market closes.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Link href="/dashboard">
              <Button className="w-full bg-[#22C55E] text-[#080C14] hover:bg-[#16a34a] border border-[#22C55E] py-3 text-base font-semibold">
                Open Live Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Network Details Summary */}
        <div className="bg-[#080C14] p-6 rounded-xl border border-[#1E293B] text-xs font-mono text-[#94A3B8]">
          <p className="font-serif text-sm font-bold text-[#F8FAFC] mb-3">Monad Network Parameters:</p>
          <ul className="space-y-1.5">
            <li><span className="text-[#38BDF8] font-semibold">Network Name:</span> Monad Testnet</li>
            <li><span className="text-[#38BDF8] font-semibold">Chain ID:</span> 10143</li>
            <li><span className="text-[#38BDF8] font-semibold">RPC URL:</span> https://testnet-rpc.monad.xyz</li>
            <li><span className="text-[#38BDF8] font-semibold">Faucet Asset:</span> SUSD (SimUSD ERC-20)</li>
          </ul>
        </div>
      </main>
    </div>
  )
}