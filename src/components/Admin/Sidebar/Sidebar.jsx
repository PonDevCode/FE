import React, { Children } from 'react'
import Logo from '../../../assets/img/logo-removebg-preview.png'
import { dataSidebar } from './constant'
import { NavLink } from 'react-router-dom'


const icon = {
    icon1: (
        <svg xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
        </svg>
    ),
    icon2: (
        <svg xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>

    ),
    icon3: (
        <svg xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
        </svg>

    ),
    icon4: (
        <svg xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>

    ),
    icon5: (
        <svg xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>

    ),

}
const Sidebar = ({ setSatus, status }) => {
    return (
        <aside className={`relative  border h-screen  transition-all ${status === true ? 'w-full' : 'w-[66px]'} shadow-xl px-1`}>
            <div className='flex mb-4 justify-between items-center p-4' >
                {
                    status ?
                        <>
                            <img
                                src={Logo}
                                onClick={() => setSatus(!status)}
                                className={`overflow-hidden transition-all ${status ? "w-32" : "w-0"
                                    }`}
                            />
                        </>
                        :
                        <>
                            <svg onClick={() => setSatus(!status)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                            </svg>

                        </>

                }

                {/* <img height={'100%'} width={'100%'} onClick={() => { setSatus(!status) }} src={Logo} /> */}
            </div>
            <div className=''>
                <div className={'px-4 py-2 flex w-full  items-center'}>
                    <span className={`overflow-hidden  transition-all text-gray-600 ${status ? 'w-24 ' : 'w-0 h-0'} `}>Quản lý</span>
                </div>
                <ul className=''>
                    {dataSidebar.map((item, i) => (
                        <NavLink
                            to={item.url}
                            key={i}
                            className={({ isActive }) =>
                                ` px-4 py-2 flex w-full items-center rounded mb-2 transition-all duration-200
                                    group relative
                                 ${isActive
                                    ? 'bg-white from-indigo-200 to-indigo-100 text-gray-800'
                                    : 'hover:bg-white text-gray-600'
                                }`
                            }
                        >
                            <div>{icon[item.icon]}</div>
                            <li
                                className={`overflow-hidden whitespace-nowrap  transition-all duration-300 ease-in-out 
                                font-bold text-[12px]
                                ${status ? 'opacity-100 max-w-[200px] ml-2' : 'opacity-0 max-w-0 ml-0'
                                    }`}
                            >
                                {item.title}
                            </li>
                            {/* <div className={`${status === true  ? 'opacity-0 w-0 h-0' : '-translate-x-3 group-hover:z-50  bg-slate-400 group-hover:translate-x-0 group-hover:opacity-100' 
                             } absolute left-20 transition-all duration-300 ease-in-out w-24  p-2 rounded-md`}>
                                    <span className={`${status === true  ? 'hidden' : ''} text-white `}>{item.title}</span>
                            </div> */
                            }
                            {!status && (
                                <div className="absolute left-20 z-50 opacity-0 -translate-x-3 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-in-out bg-slate-400 w-max max-w-[200px] p-2 rounded-md">
                                    <span className="text-white text-sm">{item.title}</span>
                                </div>
                            )}

                        </NavLink>
                    ))}
                </ul>
            </div>
        </aside>


    )
}

export default Sidebar