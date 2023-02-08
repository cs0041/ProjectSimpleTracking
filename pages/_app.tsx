import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig,createClient,configureChains} from "wagmi"
import {  polygonMumbai,optimismGoerli} from 'wagmi/chains'
import {alchemyProvider} from "wagmi/providers/alchemy"
import {infuraProvider} from "wagmi/providers/infura"
import {publicProvider} from "wagmi/providers/public"
import "@rainbow-me/rainbowkit/styles.css"
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { ContractProvider } from '../context/ContratContext'
const { chains, provider } = configureChains(
  [polygonMumbai, optimismGoerli],
  [
    alchemyProvider({apiKey:""}),
    infuraProvider({apiKey: ""}),
    publicProvider()
 ]
)

const { connectors  } = getDefaultWallets({
  appName:"Next test wallet",
  chains,
})

const wagmiClient = createClient({
  autoConnect:true,
  connectors,
  provider,

})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContractProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ContractProvider>
  )
}

export default MyApp
