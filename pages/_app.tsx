import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'
import { createReactClient, LivepeerConfig, studioProvider } from '@livepeer/react';

const client = createReactClient({
  provider: studioProvider({ apiKey: 'be276656-3e1a-4b0b-b42b-61e8461b1fd4' }),
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
