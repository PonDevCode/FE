import React from 'react'

const KPICards = ({ title, value, color }) => {
  return (
    <div className='flex w-1/4 bg-white text-[16px]  overflow-hidden shadow rounded font-bold h-full gap-1 items-center border '>
      <div className='w-[4px] h-full' style={{ backgroundColor: color }} />
      <div className='bg-white'>
        <h1>{title}</h1>
        <span>{value}</span>
      </div>
    </div>
  )
}

export default KPICards