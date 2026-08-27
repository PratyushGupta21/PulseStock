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
    <Link href="/" className="flex items-center gap-2 group">
      {/* 2D Vector Emblem matching the P+S Monogram + Trend Arrow design */}
      <div className="relative flex items-center justify-center w-8 h-8 group-hover:scale-105 transition-transform duration-300">
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]"
        >
          {/* P-Circle Metallic Boundary */}
          <path 
            d="M 22 90 V 64 A 38 38 0 1 1 84 24" 
            stroke="#E4E4E7" 
            strokeWidth="6" 
            strokeLinecap="round" 
            fill="none" 
          />

          {/* S Monogram inside */}
          <path 
            d="M 62 26 C 42 20 36 36 50 48 C 64 60 58 76 38 72" 
            stroke="#E4E4E7" 
            strokeWidth="6" 
            strokeLinecap="round" 
            fill="none" 
          />

          {/* Electric Green Pulse Stock Trend Arrow */}
          <path 
            d="M 14 74 L 34 48 L 44 60 L 84 16" 
            stroke="#22C55E" 
            strokeWidth="7" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
          />
          {/* Arrowhead */}
          <path 
            d="M 66 16 H 84 V 34" 
            stroke="#22C55E" 
            strokeWidth="7" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
          />
        </svg>
      </div>

      {/* Styled Brand Wordmark */}
      <div className="flex items-baseline text-xl tracking-tight select-none ml-1">
        <span className="font-sans font-bold text-white">Pulse</span>
        <span className={`${instrumentSerif.className} italic text-zinc-400 font-normal ml-1`}>Stock</span>
      </div>
    </Link>
  )
}
