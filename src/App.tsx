import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { config } from "./config";
import {
  useConnectors,
  useConnect,
  WagmiProvider,
  useAccount,
  useDisconnect,
  useReadContract,
} from "wagmi";
import Whale from "./whale";
import { formatUnits } from "viem";
import UsdtBalance from "./usdtBalace";

const client = new QueryClient();
function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectWallet />
        <TotalSupply />
        <BalanceOf />
        <Account />
        <UsdtBalance />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function TotalSupply() {
  const { data, isLoading, error } = useReadContract({
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    abi: [
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "totalSupply",
  });
  if (isLoading) {
    return <div>loading..</div>;
  }
  if (error) return <div>Error loading balance</div>;

  const supply = data ? Number(data) / 1_000_000 : 0;
  return <div>Total supply of USDT is {supply.toLocaleString()}</div>;
}

function BalanceOf() {
  const { address } = useAccount();
  const { data, isLoading, error } = useReadContract({
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
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
    args: [address ?? "0x833eBFc380f63Dfa450bFC2517B60Fb155e5Fc85"],
    chainId: 1,
    account: undefined,
  });
  if (isLoading) {
    return <div>loading..</div>;
  }
  if (error) return <div>Error loading balance: {error.message}</div>;

  const balance = data ? Number(data) / 1_000_000 : 0;
  return <div>Balance is {balance.toLocaleString()} USDT</div>;
}

function Account() {
  const { address } = useAccount();

  return (
    <div>
      {address ? "You are connected " + address : "You are not connected"}
    </div>
  );
}

function ConnectWallet() {
  const connectors = useConnectors();
  const { connect } = useConnect();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  if (address) {
    return (
      <div>
        You are connected {address}
        <button
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((c) => (
        <button key={c.uid} onClick={() => connect({ connector: c })}>
          Connect via {c.name}
        </button>
      ))}
    </div>
  );
}

export default App;
