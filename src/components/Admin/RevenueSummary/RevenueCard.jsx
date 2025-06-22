import React from 'react'
const RevenueCard = ({ title, value, icon }) => {
    return (
        <div>
            <div className=" p-4 flex items-center gap-4 ">
                <div>
                    {icon}
                </div>
                <div className='flex flex-col space-y-[-11px]'>
                    <div className="text-blue-500 text-sm mb-1">{title}</div>
                    <div className="text-lg font-mono">{value} đ</div>
                </div>
            </div>

        </div>
    )
}

export default RevenueCard
