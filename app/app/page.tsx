"use client"

import { useState } from "react"
import Link from "next/link"
import { ConnectButton } from "@/components/wallet/ConnectButton"
import { Wallet, Zap, TrendingUp, Anchor, Activity, ArrowRight, Menu, X, ShieldCheck, Trophy } from "lucide-react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div style={{ background: "#000", color: "#fff" }} className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between selection:bg-white selection:text-black">
      {/* Background Video */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 scale-105"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4"
            type="video/mp4"
          />
        </video>
        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
      </div>

      {/* Page Container */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        {/* Header */}
        <header className="px-6 md:px-12 py-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <svg className="w-6 h-6 text-white transform -rotate-30 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
              <g transform="rotate(-30 12 12)">
                <circle cx="7.3" cy="3.2" r="1.45" />
                <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
                <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
                <circle cx="16.7" cy="20.8" r="1.45" />
              </g>
            </svg>
            <span className="text-xl font-bold tracking-tight">
              Monad Market <span className="font-normal text-muted-foreground">Sim</span>
            </span>
          </Link>

          {/* Navigation Pills (Desktop) */}
          <nav className="hidden md:flex items-center gap-2 bg-black/40 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
            <Link href="/dashboard" className="liquid-pill">
              Markets & Trade
            </Link>
            <Link href="/portfolio" className="liquid-pill">
              Portfolio
            </Link>
            <Link href="/leaderboard" className="liquid-pill">
              Leaderboard
            </Link>
            <Link href="/onboarding" className="liquid-pill">
              Get Started
            </Link>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <ConnectButton />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-white/20 bg-black/50 text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Backdrop / Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 md:hidden">
            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium hover:text-primary">
              Markets & Trade
            </Link>
            <Link href="/portfolio" onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium hover:text-primary">
              Portfolio
            </Link>
            <Link href="/leaderboard" onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium hover:text-primary">
              Leaderboard
            </Link>
            <Link href="/onboarding" onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium hover:text-primary">
              Get Started
            </Link>
          </div>
        )}

        {/* Hero Section */}
        <main className="container mx-auto px-6 py-12 flex flex-col items-center text-center max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/15 bg-gradient-to-r from-[#3a3a3a] via-[#1a1a1a] to-black text-xs text-[#f2f2f2] font-normal mb-8 shadow-lg">
            <svg className="w-4 h-4 text-white filter drop-shadow-[0_0_3px_rgba(255,255,255,0.45)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
            </svg>
            <span>Operational AI Infrastructure & Hybrid Equity AMM</span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            <span className="block">
              Trade <em className="font-instrument font-normal not-italic text-[#9a9a9a]">Real Equities</em> on
            </span>
            <span className="block">on-chain bonding curves.</span>
          </h1>

          {/* Subtitle / Lede */}
          <p className="text-base sm:text-lg text-[#9a9a9a] max-w-xl mb-10 leading-relaxed font-normal">
            Experience real-world stock markets (AAPL, TSLA, NVDA) anchored to 24-hour closing prices with instant intraday bonding curve execution on Monad.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link href="/onboarding">
              <button className="btn-solid-glass gap-2">
                <Wallet className="h-4 w-4" /> Start for Free (100k SUSD)
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="btn-ghost-glass gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" /> View Live Markets
              </button>
            </Link>
          </div>
        </main>

        {/* Stats Footer */}
        <footer className="px-6 md:px-16 py-8 border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#d8d8d8]">
            {/* Stat 1 */}
            <div className="inline-flex items-center gap-3">
              <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="none">
                <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#grad1)" />
                <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#grad2)" />
                <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a" />
                <defs>
                  <linearGradient id="grad1" x1="3" y1="2" x2="14" y2="22">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
                    <stop offset="100%" stopColor="#3a3a3a" stopOpacity="0.62" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="3" y1="2" x2="14" y2="22">
                    <stop offset="0%" stopColor="#3a3a3a" stopOpacity="0.38" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.62" />
                  </linearGradient>
                </defs>
              </svg>
              <span>4.2M+ workflows & on-chain trades automated</span>
            </div>

            {/* Stat 2 */}
            <div className="inline-flex items-center gap-3">
              <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center text-black font-bold text-[10px]">
                ⚡
              </div>
              <span>&lt;1s sub-second finality on Monad testnet</span>
            </div>

            {/* Stat 3 */}
            <div className="inline-flex items-center gap-3">
              <svg className="w-9 h-5" viewBox="0 0 40 22" fill="none">
                <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b" />
                <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4" />
                <circle cx="20.2" cy="11" r="9.2" fill="#ffffff" />
                <circle cx="18.5" cy="10" r="1.5" fill="#111111" />
                <circle cx="22" cy="10" r="1.5" fill="#111111" />
                <circle cx="30.2" cy="11" r="9.2" fill="#22c55e" />
                <text x="30.2" y="14.8" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">M</text>
              </svg>
              <span>180+ active liquidity pools & trading teams</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}