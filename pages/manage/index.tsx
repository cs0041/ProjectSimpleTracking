import React, { useContext, useEffect } from 'react'
import Card from '../../components/Card'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import { ContractContext } from '../../context/ContratContext'
import useIsMounted from '../../hooks/useIsMounted'
import router from 'next/router'
type Props = {}

function create({}: Props) {
  const {
    loadAllIDByOwner,
    allIdOwner,
    loadingAllIdOwner,
    sendTxCreate,
  } = useContext(ContractContext)

  useEffect(() => {
  loadAllIDByOwner()
  }, [])
  
    const mounted = useIsMounted()
  return (
    <>
      {mounted && (
        <div>
          <Header />
          <div className="flex flex-1 flex-col justify-center items-center p-10">
            <div className="flex flex-row space-x-10">
              <h1 className="text-3xl font-bold">Manage All Responsible</h1>
              <button
                onClick={sendTxCreate}
                className="bg-green-500 rounded-md p-2 text-xl font-semibold"
              >
                create
              </button>
            </div>

            {loadingAllIdOwner ? (
              <Loader />
            ) : (
              <div className="h-1/3 overflow-auto mt-5 space-y-5">
                {allIdOwner.length > 0 ? (
                  allIdOwner.map((item) => (
                    <div
                      className="cursor-pointer hover:opacity-70"
                      onClick={() => {
                        router.push('/manage/' + item.id)
                      }}
                    >
                      <Card id={item.id} />
                    </div>
                  ))
                ) : (
                  <h1>No have Manage id</h1>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default create