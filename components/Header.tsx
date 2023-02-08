import React, { useContext } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'


type Props = {}

function Header({}: Props) {


  return (
    <div className="flex flex-1 justify-between items-center   bg-red-500/80 p-4 space-x-10">
      <div className="flex flex-row space-x-10 font-bold ml-10">
        <Link href="/">
          <h1 className="hover:opacity-70 cursor-pointer ">Find Tracking</h1>
        </Link>
        <Link href="/manage">
         <h1 className="hover:opacity-70 cursor-pointer ">Manage All Responsible</h1>
        </Link>
      </div>

      <ConnectButton
        label="connect web3"
        accountStatus={'full'}
        chainStatus={'full'}
      />
    </div>
  )
}

export default Header
