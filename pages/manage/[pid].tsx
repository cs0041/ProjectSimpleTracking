import React, { useContext, useEffect, useState } from 'react'
import Card from '../../components/Card'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import { ContractContext } from '../../context/ContratContext'
import useIsMounted from '../../hooks/useIsMounted'
import { useRouter } from 'next/router'
import Modal from '../../components/Modal'

type Props = {}

enum ActionStatus {
  add,
  edit,
  transferOwner
}

function edit({}: Props) {
  const {
    loadMap,
    loadingMap,
    orderMap,
    loadDataById,
    dataMap,
    sendTxAdd,
    sendTxEdit,
    sendTxTransferOwer,
    sendTxcloseTracking,
  } = useContext(ContractContext)
  const router = useRouter()
  const { pid } = router.query

    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [sendAction, setSendAction] = useState<(id:string,where:string) => void>()
    const [status, setStatus] = useState<ActionStatus>(ActionStatus.add)

    useEffect(() => {
       loadMap(pid as any)
       loadDataById(pid as any)
    }, [])

  const mounted = useIsMounted()
  return (
    <>
      <Header />
      {mounted && (
        <div className="flex flex-col items-center justify-center p-10 space-y-5">
          <h1 className="text-3xl font-bold">Manage id : {pid}</h1>
          <h1 className="text-3xl font-bold">Owner : {dataMap.address}</h1>
          <h1 className="text-3xl font-bold">
            Status : {dataMap.isOpen === true ? 'Open' : 'Close'}
          </h1>
          {loadingMap ? (
            <Loader />
          ) : (
            <>
              <h1 className="text-2xl font-bold">ALL MAP</h1>
              <div className="h-1/3 overflow-auto">
                {orderMap.length > 0 ? (
                  orderMap.map((item) => (
                    <div>
                      {item.where} ---- owner {item.owner}
                    </div>
                  ))
                ) : (
                  <h1>No have this id</h1>
                )}
              </div>
              <div className="flex flex-row space-x-5">
                <button
                  onClick={() => {
                    setStatus(ActionStatus.add)
                    setShowUpdateModal(true)
                  }}
                  className="bg-green-500 rounded-md p-2"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setStatus(ActionStatus.edit)
                    setShowUpdateModal(true)
                  }}
                  className="bg-orange-500 rounded-md p-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setStatus(ActionStatus.transferOwner)
                    setShowUpdateModal(true)
                  }}
                  className="bg-yellow-700 rounded-md p-2"
                >
                  TransferOwner
                </button>
                <button
                  onClick={() => {
                    sendTxcloseTracking(pid as any)
                  }}
                  className="bg-red-500 rounded-md p-2"
                >
                  Close
                </button>
              </div>
            </>
          )}
          {showUpdateModal && (
            <Modal
              color={
                status === ActionStatus.add
                  ? 'bg-green-500'
                  : status === ActionStatus.edit
                  ? 'bg-orange-500'
                  : 'bg-yellow-700'
              }
              title={
                status === ActionStatus.add
                  ? 'Add'
                  : status === ActionStatus.edit
                  ? 'Edit'
                  : 'TransferOwner'
              }
              id={pid as any}
              action={
                status === ActionStatus.add
                  ? sendTxAdd
                  : status === ActionStatus.edit
                  ? sendTxEdit
                  : sendTxTransferOwer
              }
              onClose={() => setShowUpdateModal(false)}
            />
          )}
        </div>
      )}
    </>
  )
}

export default edit
