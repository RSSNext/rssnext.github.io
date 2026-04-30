"use client";

import { getDefaultConfig, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { WagmiProvider, fallback, http } from "wagmi";
import { mainnet } from "wagmi/chains";

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const browserWallets = [
  {
    groupName: "Browser wallets",
    wallets: [injectedWallet],
  },
];

const config = getDefaultConfig({
  appName: "RSS3",
  projectId: walletConnectProjectId || "browser-wallets-only",
  wallets: walletConnectProjectId ? undefined : browserWallets,
  chains: [mainnet],
  transports: {
    [mainnet.id]: fallback([http("https://ethereum.publicnode.com"), http("https://1rpc.io/eth")]),
  },
  ssr: true,
});

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
          },
        },
      })
  );

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#2f67c3",
            accentColorForeground: "#fff",
            borderRadius: "large",
            fontStack: "system",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
