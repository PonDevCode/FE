
import React, { useState } from 'react'
import img from '../../assets/img/logo-admin.png'
import logo from '../../assets/img/logo-removebg-preview.png'
import { useNavigate } from "react-router";
import { loginUserRedux } from '../../redux/api/apiRequest';
import { useDispatch } from 'react-redux';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { notification } from 'antd';
const Login = () => {

  const [name , setName] = useState('')
  const [password , setPassword] = useState('')

  let navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
     e.preventDefault(); 
    const user = {
      email: name,
      password: password
    }
    const res = await loginUserRedux(user, dispatch, navigate);

    if (res && res.EC === 0) {
      notification.success({ message: "Login", description: "success" })
      navigate("/admin/home");
    } else {
      notification.error({ message: "Login user error", description: res?.EM ?? "error" })
      navigate("/login");
    }
  };
  return (
    <div className='h-[100vh] w-full flex justify-between overflow-hidden relative' >
      <div className='flex w-[60%] justify-center'>
        <div className='pt-[50px]'>
          <div className='w-[400px] overflow-hidden'>
            <img src={logo} width={200} />
            <h1 className='font-bold text-[32px] mb-4'>Login</h1>
          </div>

          <form onSubmit={handleLogin} encType="multipart/form-data">
            <div className='mb-4'>
              <label className='block mb-1'>Email / Name</label>
              <input
                type="text"
                name="username"
                onChange={(e)=>{setName(e.target.value)}}
                placeholder="Nhập tài khoản"
                className="border px-4 py-2 rounded-xl w-full outline-none"
              />
            </div>
            <div className='mb-4'>
              <label className='block mb-1'>Password</label>
              <input
                type="password"
                name="password"
                onChange={(e)=>{setPassword(e.target.value)}}
                placeholder="Nhập mật khẩu"
                className="border px-4 py-2 rounded-xl w-full outline-none "
              />
            </div>
            <div className='flex justify-center'>
              <button type='submit' onClick={(e)=>handleLogin(e)} className='px-6 py-1 rounded-[20px] bg-teal-400 w-full'>Sign in</button>
            </div>
          </form>
          <div className='flex items-center gap-2 mt-4'>
            <div className='w-full h-[0.5px] bg-black' />
            <span>Hoặc</span>
            <div className='w-full  h-[0.5px] bg-black' />
          </div>

          <div className='flex justify-between text-[20px] mt-4'>
            <button className='px-12 py-2 border rounded-[20px]'><FcGoogle /></button>
            <button className='px-12 py-2 border rounded-[20px] text-blue-600'><FaFacebook /></button>
            <button className='px-12 py-2 border rounded-[20px]'><FaGithub /></button>
          </div>
          <div className='flex justify-center mt-10'>
            <div>Pon Design ©{new Date().getFullYear()} Created by Pon</div>
          </div>
        </div>
        <div className='right-0 absolute'>
          <img src={img} className='h-[500px]' />
        </div>

      </div>
      <div className='w-[30%] rounded-l-3xl h-100 bg-teal-400'>
      </div>
    </div>
  )
}

export default Login
