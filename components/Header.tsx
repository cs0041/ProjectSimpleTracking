import React, { useContext } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import { ContractContext } from '../context/ContratContext'


type Props = {}

function Header({}: Props) {

 const { loadingTx } = useContext(ContractContext)
  return (
    <div className="flex flex-1 justify-between items-center   bg-red-500/80 p-4 space-x-10">
      <div className="flex flex-row space-x-10 font-bold ml-10">
        <Link href="/">
          <h1 className="hover:opacity-70 cursor-pointer ">Find Tracking</h1>
        </Link>
        <Link href="/manage">
          <h1 className="hover:opacity-70 cursor-pointer ">
            Manage All Responsible
          </h1>
        </Link>
      </div>
      <div className="flex flex-row space-x-10">
        <div className="px-5 space-x-3 flex justify-center items-center text-black font-bold bg-white rounded-lg">
          <h1>Status :</h1>
          <h1>
            {loadingTx && (
              <div className="flex justify-center items-center py-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-700" />
              </div>
            )}
          </h1>
        </div>
        <ConnectButton
          label="connect web3"
          accountStatus={'full'}
          chainStatus={'full'}
        />
      </div>
    </div>
  )
}

export default Header
