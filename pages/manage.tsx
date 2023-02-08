import React, { useContext, useEffect } from 'react'
import Card from '../components/Card'
import Header from '../components/Header'
import Loader from '../components/Loader'
import { ContractContext } from '../context/ContratContext'
import useIsMounted from '../hooks/useIsMounted'

type Props = {}

function create({}: Props) {
  const { loadAllIDByOwner, allIdOwner, loadingAllIdOwner } = useContext(ContractContext)

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
              <button className="bg-red-500 rounded-md p-2 text-xl font-semibold">
                create
              </button>
            </div>

            {loadingAllIdOwner ? (
              <Loader />
            ) : (
              <div className="h-1/3 overflow-auto">
                {allIdOwner.length > 0 ? (
                  allIdOwner.map((item) => (
                     <Card id={item.id}/>
                  ))
                ) : (
                  <h1>No have this id</h1>
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