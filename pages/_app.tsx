import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'
import { createReactClient, LivepeerConfig, studioProvider } from '@livepeer/react';

const client = createReactClient({
  provider: studioProvider({ apiKey: 'c8d436ea-0f8b-495b-bec3-967a2a399e85'}),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LivepeerConfig client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </LivepeerConfig>
  )
}
