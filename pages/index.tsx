import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useAccount, useSigner } from 'wagmi'
import useIsMounted from '../hooks/useIsMounted'
import { polygonMumbai } from 'wagmi/chains'
import { ethers } from 'ethers'
import Header from '../components/Header'
import FindID from '../components/FindID'

const Home = () => {


  const mounted = useIsMounted()

  const { address, isConnected, } = useAccount()
  const { data: signer} = useSigner({
    chainId:polygonMumbai.id,
  })




  return (
    <>
      {mounted && (
        <div>
          <Header />
          {/* {mounted ? address && <p>My address is {address}</p> : null} */}
          <FindID />
        </div>
      )}
    </>
  )
}

export default Home



