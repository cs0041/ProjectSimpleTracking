import React, {createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractABI,contractAddress } from '../utils/ContractTracking'

interface IContract {
  loadMap: (_id: string) => Promise<void>
  orderMap: MapRoute[]
  loadingMap: boolean
  loadAllIDByOwner: () => Promise<void>
  allIdOwner: IDByOnwer[]
  loadingAllIdOwner:boolean
  // loadingOrderSell: boolean
  // loadingOrderBuy: boolean
  // loadOrderBook: () => Promise<void>
  // orderBookSell: Order[]
  // orderBookBuy: Order[]
  // priceToken: string
  // sendTxMarketOrder: (side: number, amount: number | string) => Promise<void>
  // balancesSpotToken0: string
  // balancesTradeToken0: string
  // balancesSpotToken1: string
  // balancesTradeToken1: string
  // sendTxLimitOrder : (side: number, amount: number | string, price: number | string) => Promise<void>
  // isLoadingOrderBookByAddress:boolean
  // orderBookByAddress:Order[]
  // loadOrderBookByAddress: (address: string) => Promise<void>
  // sendTxCancelOrder: (side: number, id: number | string) => Promise<void>
  // sendTxUpdateOrder: (side: number, id: number, newAmount: number | string, newPriceOrder: number | string) => Promise<void>
  // marketEvent: EventMarketOrder[]
  // historyOrderEvent:EventAllOrder[]
  // sumMarketEvent:EventMarketOrder[]
  // sendTxDeposit: (amount: number | string, addressToken: string) => Promise<void>
  // sendTxWithdraw: (amount: number | string, addressToken: string) => Promise<void>
}

export const ContractContext = createContext<IContract>({
  loadMap: async () => {},
  orderMap: [],
  loadingMap: false,
  loadAllIDByOwner: async () => {},
  allIdOwner:[],
  loadingAllIdOwner:false
  // loadingOrderSell: false,
  // loadingOrderBuy: false,
  // loadOrderBook: async () => {},
  // orderBookSell: [],
  // orderBookBuy: [],
  // priceToken: "",
  // sendTxMarketOrder: async () => {},
  // balancesSpotToken0: "",
  // balancesTradeToken0: "",
  // balancesSpotToken1: "",
  // balancesTradeToken1: "",
  // sendTxLimitOrder: async () => {},
  // isLoadingOrderBookByAddress: false,
  // orderBookByAddress: [],
  // loadOrderBookByAddress: async () => {},
  // sendTxCancelOrder: async () => {},
  // sendTxUpdateOrder: async () => {},
  // marketEvent: [],
  // historyOrderEvent: [],
  // sumMarketEvent: [],
  // sendTxDeposit: async () => {},
  // sendTxWithdraw:async () => {},
})


const getTrackingContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any )
  const signer = provider.getSigner()
  const contract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )

  return contract
}

interface ChildrenProps {
  children: React.ReactNode
}


export const ContractProvider = ({ children }: ChildrenProps) => {


  const [initialLoading, setInitialLoading] = useState(true)

  // Map
  const [orderMap, setOrderMap] = useState<MapRoute[]>([])
  const [loadingMap, setLoadingMap] = useState(false)

  // All ID By Owner
  const [allIdOwner, setAllIdOwner] = useState<IDByOnwer[]>([])
  const [loadingAllIdOwner, setLoadingAllIdOwner] = useState(false)

  // helper
  // const toString = (bytes32) => ethers.utils.parseBytes32String(bytes32)
  const toWei = (ether :string|number) => ethers.utils.parseEther(String(ether))
  const toEther = (wei : string|number|ethers.BigNumber) => ethers.utils.formatEther(wei)
  const toFixUnits = (amount : number, decimal :string) => ethers.utils.formatUnits(amount, decimal)
  const toEtherandFixFloatingPoint  = (amount : ethers.BigNumber) => Number(Number(ethers.utils.formatEther(amount)).toFixed(0))


 
  
  useEffect(() => {
    if (!window.ethereum) return console.log('Please install metamask')
    setInitialLoading(false)

   }, [])

  //  const sendTxAdd = async (_id : string , where : string) => {
  //    if (!window.ethereum) return console.log('Please install metamask')
  //    try {
  //     const contract = getTrackingContract()
  //     const transactionHash = await contract.addMapRoute(_id, where)
  //     console.log(transactionHash.hash)
  //     await transactionHash.wait()
  //    } catch (error) {
  //      console.log(error)
  //    }
  //    loadBalances()
  //  }
  


  const loadMap = async (_id : string) => {
    if (!window.ethereum) return console.log('Please install metamask')

    setLoadingMap(true)
    try {
      if(_id === "") return alert("pls input")
      console.log("Load map")
    
      setOrderMap([])

      const contract = getTrackingContract()

      const data= await contract.readRoute(Number(_id))
  
      data.map((item:item) => {
        const structMap: MapRoute = {
           where: item.where,
           owner: item.sender
        }
        setOrderMap((prev) => [...prev, structMap])
      })


      setLoadingMap(false)

    } catch (error) {
       setLoadingMap(false)
       setOrderMap([])
       console.log(error)
    }

  }

  const loadAllIDByOwner = async () => {
    if (!window.ethereum) return console.log('Please install metamask')

    setLoadingAllIdOwner(true)
    try {
      console.log('Load loadAllIDByOwner')
    
      setAllIdOwner([])

      const contract = getTrackingContract()

      const data = await contract.readAllIDOwner()
      console.log("data",data)
      data.map((item:IDByOnwer) => {
        const structID: IDByOnwer = {
          id: toEtherandFixFloatingPoint(item as any)
        }
        console.log('structID', structID)
        setAllIdOwner((prev) => [...prev, structID])
      })


      setLoadingAllIdOwner(false)

    } catch (error) {
       setLoadingAllIdOwner(false)
       setAllIdOwner([])
       console.log(error)
    }

  }

  
  

  return (
    <ContractContext.Provider
      value={{
        loadMap,
        orderMap,
        loadingMap,
        loadAllIDByOwner,
        allIdOwner,
        loadingAllIdOwner
      }}
    >
      {!initialLoading && children}
    </ContractContext.Provider>
  )
}
