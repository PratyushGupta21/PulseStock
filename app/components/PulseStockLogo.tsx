"use client"

import Link from "next/link"
import Image from "next/image"
import { Instrument_Serif } from "next/font/google"

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
})

export function PulseStockLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group select-none">
      <div className="relative w-8 h-8 flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="PulseStock Emblem"
          width={32}
          height={32}
          priority
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex items-baseline text-xl tracking-tight">
        <span className="font-sans font-bold text-white">Pulse</span>
        <span className={`${instrumentSerif.className} italic text-zinc-400 font-normal ml-1`}>Stock</span>
      </div>
    </Link>
  )
}
