"use client"

import { ContentPageLayout } from "@/components/ContentPageLayout"
import { HelpCircle, ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "What are synthetic assets on PulseStock?",
    a: "Synthetic assets on PulseStock are on-chain token pairs that mirror the price behavior of real-world equities (AAPL, TSLA, NVDA, GOOGL, MSFT, AMZN, META, COIN). They are not actual securities — they are simulated positions backed by a bonding curve AMM on Monad Testnet. Base prices are re-anchored daily to real market closing prices via oracle feeds."
  },
  {
    q: "How does the bonding curve determine prices?",
    a: "Each stock maintains a constant-product bonding curve: cashReserve × shareReserve = k. The spot price at any moment is cashReserve / shareReserve. When you buy shares, you deposit SUSD into the cash reserve and remove shares from the share reserve, pushing the price up. Selling does the reverse. The curve uses high-sensitivity liquidity parameters (1000 × 10¹⁸ share reserves) to create volatile, responsive price action."
  },
  {
    q: "What is SimUSD (SUSD)?",
    a: "SimUSD (SUSD) is a faucet-mintable ERC-20 stablecoin deployed on Monad Testnet. Every new user can claim 100,000 SUSD through the onboarding flow. SUSD has no real monetary value — it exists purely for simulation and testing purposes."
  },
  {
    q: "How fast are trades executed?",
    a: "PulseStock runs on Monad's parallel EVM, which achieves sub-second block finality. Trades are confirmed on-chain in under 1 second. The frontend uses contract event listeners to update charts and positions instantly without WebSocket polling."
  },
  {
    q: "How are real-world prices integrated?",
    a: "Base prices for each synthetic stock are fetched from the Marketstack API, which provides real equity closing prices. Every 24 hours, the contract owner can call resetBasePrice() to re-anchor each stock's bonding curve to the latest real closing price, preventing long-term synthetic drift."
  },
  {
    q: "Is this real money or real trading?",
    a: "No. PulseStock is a testnet simulation built for the Monad Blitz Hackathon. All assets (SUSD, synthetic shares) are testnet tokens with zero real-world value. No actual equities are bought, sold, or held. This is a demonstration of DeFi bonding curve mechanics applied to equity-like instruments."
  },
  {
    q: "What wallets are supported?",
    a: "PulseStock supports any EVM-compatible browser wallet, including MetaMask, Rabby, Rainbow, and Coinbase Wallet. You need to add the Monad Testnet network to your wallet (Chain ID: 10143, RPC: https://testnet-rpc.monad.xyz). See our Wallet Guide for step-by-step instructions."
  },
  {
    q: "What happens when the bonding curve resets?",
    a: "When the owner calls resetBasePrice(), the contract recalculates cashReserve to align with the new real-world closing price while maintaining the same shareReserve. This shifts the spot price to match reality without liquidating any positions. Your share balances remain unchanged."
  },
  {
    q: "Can I lose my testnet funds?",
    a: "Your SUSD balance can decrease if you buy shares at a high price and sell at a lower price — exactly like real trading. However, since all funds are testnet tokens, there is no financial risk. You can always claim more SUSD from the faucet."
  },
  {
    q: "Is the smart contract audited?",
    a: "The StockAMM contract was built for a hackathon demonstration and has not undergone a formal security audit. The code is open-source and available on GitHub for review. Do not deploy this contract with real assets without a comprehensive audit."
  },
]

export default function FaqsPage() {
  return (
    <ContentPageLayout>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
        Frequently Asked Questions
      </h1>
      <p className="text-[#9a9a9a] text-lg mb-12 leading-relaxed">
        Everything you need to know about synthetic equity settlement, Monad EVM execution, and PulseStock&apos;s liquidity mechanics.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group border border-white/10 bg-zinc-950/60 rounded-xl overflow-hidden"
          >
            <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
              <div className="flex items-center gap-3">
                <span className="text-white font-mono text-xs opacity-40">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-white font-semibold text-sm md:text-base">{faq.q}</h3>
              </div>
              <ChevronDown className="h-4 w-4 text-[#9a9a9a] shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-6 pt-0">
              <p className="text-[#9a9a9a] text-sm leading-relaxed pl-8">{faq.a}</p>
            </div>
          </details>
        ))}
      </div>
    </ContentPageLayout>
  )
}
