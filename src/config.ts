import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  connectors: [injected()],
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(
      "https://eth-mainnet.g.alchemy.com/v2/ysjEI3jrpE0kY4XOBoN1Q"
    ),
    [sepolia.id]: http(
      "https://eth-sepolia.g.alchemy.com/v2/ysjEI3jrpE0kY4XOBoN1Q"
    ),
  },
});
