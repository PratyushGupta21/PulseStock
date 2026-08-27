"use client"

import { useEffect, useState } from "react"
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { PLAY_MONEY_ADDRESS, playMoneyAbi } from "@/lib/contracts/contracts"

export function ClaimFundsButton() {
  const [mounted, setMounted] = useState(false)
  const { address, isConnected } = useAccount()

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data: hasClaimed } = useReadContract({
    address: PLAY_MONEY_ADDRESS,
    abi: [
      {
        inputs: [{ name: "", type: "address" }],
        name: "hasClaimed",
        outputs: [{ name: "", type: "bool" }],
        stateMutability: "view",
        type: "function"
      }
    ] as const,
    functionName: "hasClaimed",
    args: address ? [address] : undefined,
    query: { enabled: !!address && mounted },
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleClaim = () => {
    if (!address) return
    writeContract({
      address: PLAY_MONEY_ADDRESS,
      abi: playMoneyAbi,
      functionName: "claimStarterFunds",
    })
  }

  if (!mounted || !isConnected) {
    return (
      <Button disabled variant="secondary" className="gap-2 bg-[#0F172A] text-[#94A3B8] border border-[#1E293B]">
        Connect Wallet First
      </Button>
    )
  }

  if (hasClaimed) {
    return (
      <Button variant="secondary" disabled className="gap-2 bg-[#080C14] text-[#22C55E] border border-[#22C55E]/40 font-mono">
        <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
        100,000 SUSD Claimed
      </Button>
    )
  }

  if (isPending || isConfirming) {
    return (
      <Button disabled className="gap-2 bg-[#1E293B] text-[#38BDF8] border border-[#38BDF8]/40">
        <Loader2 className="h-4 w-4 animate-spin text-[#38BDF8]" />
        Claiming Faucet...
      </Button>
    )
  }

  if (isSuccess) {
    toast.success("Starter funds claimed!", { description: "100,000 SUSD minted to your wallet" })
    return (
      <Button variant="secondary" disabled className="gap-2 bg-[#080C14] text-[#22C55E] border border-[#22C55E]/40 font-mono">
        <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
        100,000 SUSD Claimed
      </Button>
    )
  }

  return (
    <Button onClick={handleClaim} className="gap-2 bg-[#22C55E] text-[#080C14] hover:bg-[#16a34a] border border-[#22C55E] px-6 py-3 font-semibold">
      Claim 100,000 SUSD
    </Button>
  )
}