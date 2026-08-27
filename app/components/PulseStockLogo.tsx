"use client"

import Link from "next/link"
import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
})

export function PulseStockLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {/* Translucent Glass Emblem Box */}
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-950 border border-white/15 shadow-sm group-hover:border-white/40 transition-all duration-300">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.8" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        >
          {/* Electrocardiogram Pulse merging into Candlestick Chart */}
          <path d="M2 12h3.5l2.5-5 3.5 10 3-7 2.5 4H22" />
          <rect x="10.5" y="6" width="2" height="6" rx="0.5" fill="currentColor" opacity="0.4" />
        </svg>
      </div>

      {/* Styled Brand Wordmark */}
      <div className="flex items-baseline text-xl tracking-tight select-none">
        <span className="font-sans font-bold text-white">Pulse</span>
        <span className={`${instrumentSerif.className} italic text-zinc-400 font-normal ml-1`}>Stock</span>
      </div>
    </Link>
  )
}
