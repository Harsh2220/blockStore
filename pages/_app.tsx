import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'
import { createReactClient, LivepeerConfig, studioProvider } from '@livepeer/react';

const client = createReactClient({
  provider: studioProvider({ apiKey: '42998a57-4a72-4aeb-990d-036a1667be81'}),
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
