import React, {createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractABI,contractAddress } from '../utils/ContractTracking'



interface IContract {
  loadMap: (_id: string) => Promise<void>
  orderMap: MapRoute[]
  loadingMap: boolean
  loadAllIDByOwner: () => Promise<void>
  allIdOwner: IDByOnwer[]
  loadingAllIdOwner: boolean
  sendTxCreate: () => Promise<void>
  loadingDataMap: boolean
  loadDataById: (_id: string) => Promise<void>
  dataMap: DataMap
  sendTxAdd: (_id: string, where: string) => Promise<void>
  sendTxEdit: (_id: string, where: string) => Promise<void>
  sendTxTransferOwer: (_id: string, _address: string) => Promise<void>
  sendTxcloseTracking: (_id: string) => Promise<void>
  loadingTx: boolean
  setOrderMap: React.Dispatch<React.SetStateAction<MapRoute[]>>
}

export const ContractContext = createContext<IContract>({
  loadMap: async () => {},
  orderMap: [],
  loadingMap: false,
  loadAllIDByOwner: async () => {},
  allIdOwner: [],
  loadingAllIdOwner: false,
  sendTxCreate: async () => {},
  loadingDataMap: false,
  loadDataById: async () => {},
  dataMap: { address: '', isOpen: false },
  sendTxAdd: async () => {},
  sendTxEdit: async () => {},
  sendTxTransferOwer: async () => {},
  sendTxcloseTracking: async () => {},
  loadingTx: false,
  setOrderMap: (() => undefined),
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

  // Data Map By ID
  const [dataMap, setDataMap] = useState<DataMap>({address:"",isOpen:false})
  const [loadingDataMap, setLoadingDataMap] = useState(false)

  // tx status
  const [loadingTx,setLoadingTx] = useState(false)

  // helper
  // const toString = (bytes32) => ethers.utils.parseBytes32String(bytes32)
  const toWei = (ether :string|number) => ethers.utils.parseEther(String(ether))
  const toEther = (wei : string|number|ethers.BigNumber) => ethers.utils.formatEther(wei)
  const toFixUnits = (amount : number, decimal :string) => ethers.utils.formatUnits(amount, decimal)
  const toEtherandFixFloatingPoint  = (amount : ethers.BigNumber) => Number(Number(ethers.utils.formatEther(amount)).toFixed(0))


 
  
  useEffect(() => {
    if (!window.ethereum) return alert('Please install metamask')
    setInitialLoading(false)

   }, [])

   const sendTxCreate = async () => {
     
     try {
       setLoadingTx(true)
       const contract = getTrackingContract()
       const transactionHash = await contract.createNewRouteTracking()
       await transactionHash.wait()
        setLoadingTx(false)
     } catch (error) {
      setLoadingTx(false)
       alert(error)
     }
     loadAllIDByOwner()
   }
   const sendTxAdd = async (_id : string , where : string) => {
     
     try {
      setLoadingTx(true)
      const contract = getTrackingContract()
      const transactionHash = await contract.addMapRoute(_id, where)
      await transactionHash.wait()
      setLoadingTx(false)
     } catch (error) {
      setLoadingTx(false)
       alert(error)
     }
     loadMap(_id)
   }
   const sendTxEdit = async (_id : string , where : string) => {
     
     try {
      setLoadingTx(true)
      const contract = getTrackingContract()
      const transactionHash = await contract.editMapRoute(_id, where)
      await transactionHash.wait()
      setLoadingTx(false)
     } catch (error) {
      setLoadingTx(false)
       alert(error)
     }
     loadMap(_id)
   }
   const sendTxTransferOwer = async (_id: string, _address: string) => {
     
     try {
      setLoadingTx(true)
       const contract = getTrackingContract()
       const transactionHash = await contract.transferOwerTracking(_id, _address)
       await transactionHash.wait()
       setLoadingTx(false)
     } catch (error) {
      setLoadingTx(false)
       alert(error)
     }
      loadDataById(_id)
   }
   const sendTxcloseTracking = async (_id: string) => {
     try {
       setLoadingTx(true)
       const contract = getTrackingContract()
       const transactionHash = await contract.closeTracking(_id)
       await transactionHash.wait()
       setLoadingTx(false)
     } catch (error) {
      setLoadingTx(false)
       alert(error)
     }
     loadDataById(_id)
   }
  


  const loadMap = async (_id : string) => {

    setLoadingMap(true)
    try {
      if(_id === "") return alert("pls input")
    
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
       alert(error)
    }

  }

  const loadAllIDByOwner = async () => {

    setLoadingAllIdOwner(true)
    try {

    
      setAllIdOwner([])

      const contract = getTrackingContract()

      const data = await contract.readAllIDOwner()
      data.map((item: ethers.BigNumber) => {
        const structID: IDByOnwer = {
          id: item.toNumber(),
        }
        setAllIdOwner((prev) => [...prev, structID])
      })


      setLoadingAllIdOwner(false)

    } catch (error) {
       setLoadingAllIdOwner(false)
       setAllIdOwner([])
       alert(error)
    }

  }

  const loadDataById = async (_id:string) => {


    setLoadingDataMap(true)
    try {
    
      setDataMap({ address: '', isOpen: false })

      const contract = getTrackingContract()

      const data = await contract.getDataByID(_id)

        const structID: DataMap = {
          address: data.owner,
          isOpen: data.isOpen,
        }

        setDataMap(structID)
      


      setLoadingDataMap(false)

    } catch (error) {
       setLoadingDataMap(false)
       setDataMap({ address: '', isOpen: false })
       alert(error)
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
        loadingAllIdOwner,

        loadingDataMap,
        loadDataById,
        dataMap,

        loadingTx,

        setOrderMap,


        sendTxCreate,
        sendTxAdd,
        sendTxEdit,
        sendTxTransferOwer,
        sendTxcloseTracking,
      }}
    >
      {!initialLoading && children}
    </ContractContext.Provider>
  )
}
