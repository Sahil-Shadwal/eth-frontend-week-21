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
} from "wagmi";

const client = new QueryClient();
function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <ConnectWallet />
      </QueryClientProvider>
    </WagmiProvider>
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
