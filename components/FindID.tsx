import { useContext, useEffect, useState } from "react"
import { ContractContext } from "../context/ContratContext"
import Loader from "./Loader"

type Props = {}

function FindID({}: Props) {
  const {loadMap,loadingMap,orderMap,setOrderMap} = useContext(ContractContext)
  const [id, setId] = useState<string>("")

  useEffect(() => {
  //  loadMap("-1")
  setOrderMap([])
  }, [])
  

  return (
    <div className="flex flex-col flex-1 w-1/3 m-auto my-10 space-y-10">
      <h1 className="text-center text-3xl font-bold">Tracking item</h1>
      <form className="flex items-center flex-1 ">
        <div className="relative w-full ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="number"
            onKeyPress={(event) => {
              if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
                event.preventDefault()
              }
            }}
            onChange={(e) => {
              setId(e.target.value)
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5  "
            placeholder="Search"
            required
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            loadMap(id)
          }}
          className="p-2.5 ml-2 text-sm font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 "
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>

      {loadingMap ? (
        <Loader />
      ) : (
        <div className="h-1/3 overflow-auto">
          {orderMap.length > 0 ?
          orderMap.map((item) => (
            <div>
              {item.where} ---- owner {item.owner}
            </div>
          )) : (<h1>Empty</h1>)}
        </div>
      )}
    </div>
  )
}

export default FindID



