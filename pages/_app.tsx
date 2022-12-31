import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import {
  createReactClient,
  LivepeerConfig,
  studioProvider,
} from "@livepeer/react";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultClient,
} from "connectkit";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const alchemyId = "SH8NoQMHqmNkqexUapP5tVgv5KRQoFVx";

const { chains } = configureChains([polygonMumbai], [publicProvider()]);

const wagmiClient = createClient(
  getDefaultClient({
    appName: "Your App Name",
    alchemyId,
    chains,
  })
);

const client = createReactClient({
  provider: studioProvider({ apiKey: "0c554a6b-fbe0-4399-a1db-25518848307c" }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <ConnectKitProvider>
        <LivepeerConfig client={client}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </LivepeerConfig>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
