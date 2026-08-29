"use client"

import { useEffect, useState } from "react"
import { useAccount, useConnect, useDisconnect, useReadContract } from "wagmi"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut } from "lucide-react"
import { formatUnits, shortenAddress } from "@/lib/utils"
import { PLAY_MONEY_ADDRESS, playMoneyAbi } from "@/lib/contracts/contracts"

export function ConnectButton({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false)
  const { address, isConnected } = useAccount()
  const { connectAsync, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data: balance } = useReadContract({
    address: PLAY_MONEY_ADDRESS,
    abi: playMoneyAbi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address && mounted },
  })

  const handleConnect = async () => {
    try {
      const connector = connectors.find((c) => c.id === "metaMask" || c.id === "injected") || connectors[0]
      if (connector) {
        await connectAsync({ connector })
      }
    } catch (e) {
      console.error("Connect error:", e)
    }
  }

  // Render a static fallback during SSR / before hydration
  if (!mounted) {
    return (
      <button
        className={`inline-flex items-center gap-2 border border-white/20 bg-gradient-to-r from-[#050505] via-[#2a2a2a] to-[#4a4a4a] text-white px-4 py-2 rounded-md text-sm font-medium opacity-50 cursor-not-allowed ${className || ""}`}
        disabled
      >
        <Wallet className="h-4 w-4 text-white" />
        Connect Wallet
      </button>
    )
  }

  if (!isConnected) {
    return (
      <Button
        onClick={handleConnect}
        className={`gap-2 border border-white/20 bg-gradient-to-r from-[#050505] via-[#2a2a2a] to-[#4a4a4a] text-white hover:border-white/40 px-4 py-2 text-sm font-medium shadow-inner ${className || ""}`}
      >
        <Wallet className="h-4 w-4 text-white" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className || ""}`}>
      <div className="flex items-center gap-3 px-4 py-2 bg-black/80 border border-white/15 backdrop-blur-sm rounded-lg">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-white" />
          <span className="font-mono text-sm font-semibold text-white">{address ? shortenAddress(address) : ""}</span>
        </div>
        {typeof balance === "bigint" && (
          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">
            {formatUnits(balance)} SUSD
          </span>
        )}
      </div>
      <Button variant="ghost" size="sm" onClick={() => disconnect()} className="text-[#9a9a9a] hover:text-white hover:bg-white/10">
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  )
}