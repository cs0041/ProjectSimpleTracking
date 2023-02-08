import React from 'react'

interface Props  {
    id: number
}

function Card({ id }: Props) {
  return (
    <div className="p-2 bg-black/30 rounded-md border-[1px] border-gray-500 text-xl">
        <h1>Manage ID : {id}</h1>
    </div>
  )
}

export default Card