import { Button, notification } from 'antd'
import Item from 'antd/es/list/Item'
import React from 'react'
import { deleteCategory, deleteProduct } from '../../../../Utils/api'

const FormDelete = ({ title, span, url, item, setRender, render, setOpen, open, setIsloading }) => {

    let urlAPI;

    switch (url) {
        case 'product':
            urlAPI = deleteProduct
            break;
        case 'category':
            urlAPI = deleteCategory
            break;
        default:
            break;
    }

    const handleDelete = async (id) => {
        setOpen(!open)
        setIsloading(true)
        const result = await urlAPI(id)

        if (result) {
            notification.success({ message: "Delete Product", description: result?.EM })
            setRender(!render)
            setIsloading(false)
        }else{
            notification.success({ message: "ERR", description: result?.EM })
            setRender(!render)
            setIsloading(false)
        }
        
    }



    return (
        <div className=''>
            <div className='text-[14px] mb-4 text-center font-bold border-b-2'>{title}</div>
            <div className='text-[14px] text-gray-700 mb-8'>
                <span>{span}</span>
            </div>
            <div className='flex justify-end gap-2'>
                <Button variant='filled' color='default' className='text-[12px]' onClick={() => { setOpen(!open) }}>Hủy</Button>
                <Button type='primary' className='text-[12px]' onClick={() => { handleDelete(item._id) }}>Xác Nhận</Button>
            </div>
        </div>
    )
}

export default FormDelete