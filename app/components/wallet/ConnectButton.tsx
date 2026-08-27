"use client"

import { useState, useEffect } from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut } from "lucide-react"
import { formatUnits, shortenAddress } from "@/lib/utils"
import { PLAY_MONEY_ADDRESS, playMoneyAbi } from "@/lib/contracts/contracts"
import { useReadContract } from "wagmi"

export function ConnectButton() {
  const [mounted, setMounted] = useState(false)
  const { address, isConnected } = useAccount()
  const { connectAsync, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const { data: balance } = useReadContract({
    address: PLAY_MONEY_ADDRESS,
    abi: playMoneyAbi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleConnect = async () => {
    const connector = connectors.find((c) => c.id === "metaMask" || c.id === "injected") || connectors[0]
    if (connector) {
      await connectAsync({ connector })
    }
  }

  // Render a static fallback during SSR / before hydration
  if (!mounted) {
    return (
      <button
        className="inline-flex items-center gap-2 bg-[#0F172A] text-[#F8FAFC] px-5 py-2 rounded-md border border-[#38BDF8] text-sm font-medium opacity-50 cursor-not-allowed"
        disabled
      >
        <Wallet className="h-4 w-4 text-[#38BDF8]" />
        Connect Wallet
      </button>
    )
  }

  if (!isConnected) {
    return (
      <Button
        onClick={handleConnect}
        className="gap-2 bg-[#0F172A] text-[#F8FAFC] hover:bg-[#38BDF8]/10 border border-[#38BDF8] px-5 py-2 text-sm font-medium"
      >
        <Wallet className="h-4 w-4 text-[#38BDF8]" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3 px-4 py-2 bg-[#0F172A] border border-[#1E293B] rounded-lg">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-[#38BDF8]" />
          <span className="font-mono text-sm font-semibold text-[#F8FAFC]">{address ? shortenAddress(address) : ""}</span>
        </div>
        {typeof balance === "bigint" && (
          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-[#080C14] text-[#38BDF8] border border-[#1E293B]">
            {formatUnits(balance)} SUSD
          </span>
        )}
      </div>
      <Button variant="ghost" size="sm" onClick={() => disconnect()} className="text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]">
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  )
}