import { formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";

export default function UsdtBalance() {
  const { address } = useAccount();

  const { data, isLoading, error } = useReadContract({
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT mainnet
    abi: [
      {
        name: "balanceOf",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "account", type: "address" }],
        outputs: [{ type: "uint256" }],
      },
    ],
    functionName: "balanceOf",
    args: ["0x587EFaEe4f308aB2795ca35A27Dff8c1dfAF9e3f"], // only query if connected
    chainId: 1,
  });

  if (!address) return <div>Connect wallet to see your USDT balance</div>;
  if (isLoading) return <div>Loading balance…</div>;
  if (error) return <div>Error loading balance: {error.message}</div>;

  const balance = data ? formatUnits(data as bigint, 6) : "0";
  return <div>Your USDT balance: {balance}</div>;
}
