import React from 'react'
import Dropdowns from '../../../components/Admin/dropdown/dropdown'
import { Button } from 'antd'
import RevenueSummary from '../../../components/Admin/revenueSummary/RevenueSummary'
import BarChart from '../../../components/Admin/chart/chart'
import KPIOverviews from '../../../components/Admin/KPIOverview/KPIOverview'
import { RiFileExcel2Fill } from "react-icons/ri";
const HomeAdmin = () => {
  return (
    <div className='text-left'>
      <div className='text-[18px] font-bold mb-4'>
        TỔNG QUAN KINH DOANH
      </div>
      <div className='flex justify-between'>
        <div className=' flex gap-4 mb-4'>
          <Button >
            <Dropdowns title={'Tháng này'} />
          </Button>
          <Button>
            <Dropdowns title={'Không so sánh'} />
          </Button>
        </div>
        <div>
          <Button>
            <RiFileExcel2Fill className='text-green-600' />
            Xuất Báo Excel
          </Button>
        </div>
      </div>
      <div className='mb-4'>
        <RevenueSummary />
      </div>
      <div className='mb-4'>
        <KPIOverviews />
      </div>
      <div className='text-[18px] font-bold mb-5'>
        <h1>DOANH THU TỔNG HỢP</h1>
      </div>
      <BarChart />

    </div>

  )
}

export default HomeAdmin