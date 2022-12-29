import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function Home() {
  return (
    <>
    <ConnectButton />
      <Navbar />
      <Hero />
    </>
  )
}
