import React from 'react'
import { logoutRedux } from '../../../redux/api/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { notification } from 'antd';




const Header = () => {

  const dispatch = useDispatch()
  let navigate = useNavigate();
  const handleLogout = () => {
    const logout = logoutRedux(dispatch, navigate);
    if (logout) {
     notification.success({ message: "Đăng xuất", description: 'Bạn đã đăng xuất thành công' });
    } else {
      notification.error({ message: "Error", description: ''});
    }
  }

  return (
    <div className='w-full h-[60px] rounded'>
      <div className='flex justify-between items-center'>
        <div>
          <input type='text' placeholder='Tìm kiếm ....' className='text-[12px] w-42 p-2 rounded outline-none' />
        </div>
        <div className='flex gap-1 items-center'>
          <div className='text-white'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </div>
          <div className='flex gap-6 items-center'>
            <div className='flex gap-1'>
              <span className='text-gray-400'>xin chào,</span> <p>Admin</p>
            </div>
            <div className='flex gap-2 text-[12px] items-center bg-white px-2 py-1 rounded-[5px] cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ease-in-out '>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              <span className='font-bold' onClick={() => { handleLogout() }}>Đăng xuất</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header