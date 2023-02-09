import { useContext, useEffect, useState } from 'react'
import { ContractContext } from '../context/ContratContext'
import MuiModal from '@mui/material/Modal'

interface Props {
  onClose: () => void
  action: (id:string,where:string) => void
  id: string
  color:string
  title:string
}

function Modal({ onClose, action, id ,color,title}: Props) {

  const [showModal, setShowModal] = useState(true)

  const [whereInput, setWhereInput] = useState<string>("")


  const handleCLose = () => {
    setShowModal(false)
    onClose()
  }

  return (
    <MuiModal
      open={showModal}
      onClose={handleCLose}
      className="flxex m-auto w-2/5 h-1/6   justify-center items-center
   rounded-md bg-black border-[1px] border-white p-10"
    >
      <div className="space-y-4">
        <div className="bg-gray-900 flex flex-row text-xl">
          <input
            type="text"
            // onKeyPress={(event) => {
            //   if (!/^[0-9]*[.,]?[0-9]*$/.test(event.key)) {
            //     event.preventDefault()
            //   }
            // }}
            onChange={(e) => {
              setWhereInput(e.target.value)
            }}
            className="  w-full py-2 pr-2 text-center  bg-transparent outline-none  text-white"
          />
        </div>
        <button
          onClick={() => {
            action(id, whereInput)
          }}
          className={`w-full text-white rounded ${color} py-3 font-semibold`}
        >
          {title}
        </button>
      </div>
    </MuiModal>
  )
}

export default Modal