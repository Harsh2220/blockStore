import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import {
  createReactClient,
  LivepeerConfig,
  studioProvider,
} from "@livepeer/react";
import { WagmiConfig, createClient, configureChains, goerli } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultClient,
} from "connectkit";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { GeneralProvider } from "../context";
const alchemyId = "SH8NoQMHqmNkqexUapP5tVgv5KRQoFVx";

const { chains } = configureChains([goerli], [publicProvider()]);

const wagmiClient = createClient(
  getDefaultClient({
    appName: "Your App Name",
    alchemyId,
    chains,
  })
);

const client = createReactClient({
  provider: studioProvider({ apiKey: "ff1b0e50-c8e1-4f5f-b462-d1e8c961e232" }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ConnectKitProvider>
        <LivepeerConfig client={client}>
          <ChakraProvider theme={theme}>
            <GeneralProvider>
            <Component {...pageProps} />
            </GeneralProvider>
          </ChakraProvider>
        </LivepeerConfig>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
