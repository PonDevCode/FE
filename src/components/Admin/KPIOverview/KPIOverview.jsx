import React from 'react'
import KPICards from './KPICard'
import { dataKPI } from './constant'
const KPIOverviews = () => {
  return (
    <div className='h-[80px] flex justify-between gap-3' >
      {dataKPI.map((item, i) => {
        return (
          <KPICards title={item.title} value={item.value} key={i} color={item.color} />
        )
      })}
    </div>
  )
}

export default KPIOverviews