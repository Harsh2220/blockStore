import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'
import { createReactClient, LivepeerConfig, studioProvider } from '@livepeer/react';

const client = createReactClient({
  provider: studioProvider({ apiKey: 'enter your api' }),
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
