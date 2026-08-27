"use client"

import Link from "next/link"
import { Instrument_Serif } from "next/font/google"
import { Zap } from "lucide-react"

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
})

export function Footer() {
  const platformLinks = [
    { href: "/docs", label: "Documentation" },
    { href: "/faqs", label: "FAQs" },
    { href: "/wallet-guide", label: "Wallet Guide" },
  ]

  const companyLinks = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/press", label: "Press" },
    { href: "/blog", label: "Blog" },
  ]

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/affiliate", label: "Affiliate Program" },
  ]

  return (
    <footer className="border-t border-white/10 bg-black/80 backdrop-blur-md py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl tracking-tight mb-4">
              <div className="p-1.5 bg-white/10 rounded-lg text-white border border-white/20">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              <span className="font-sans font-bold text-white">Pulse</span>
              <span className={`${instrumentSerif.className} italic text-zinc-400 font-normal text-2xl -ml-1`}>Stock</span>
            </Link>
            <p className="text-[#9a9a9a] text-sm leading-relaxed">
              Synthetic equity trading anchored to real-world closing prices, powered by Monad&apos;s parallel EVM.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#9a9a9a] text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#9a9a9a] text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#9a9a9a] text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#9a9a9a] text-xs font-mono">
            © 2026 PulseStock. Built for Monad Blitz Hackathon.
          </p>
          <p className="text-[#9a9a9a] text-xs font-mono">
            Real Equity Anchors • Institutional Terminal Architecture
          </p>
        </div>
      </div>
    </footer>
  )
}
