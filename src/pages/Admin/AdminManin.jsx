import React, { useState } from 'react'
import Header from '../../components/Admin/Header/Header'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Admin/Footer/Footer'

const AdminMain = () => {
    const [status, setSatus] = useState(true)
    return (
        <div className='flex w-full h-[100vh] bg-[#E8DFDD] '>
            <div>
                <Sidebar status={status} setSatus={setSatus} />
            </div>
            <div className='w-full px-4 pt-2 overflow-hidden overflow-y-auto '>
                <div className='pt-20px'>
                    <Header />
                </div>
                <div >
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AdminMain