import { Button, Form, notification, Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import Model from '../../../../components/Admin/Model/model';
import { useDispatch } from 'react-redux';
import { addCate } from '../../../../../Utils/api';
import { limitWords } from './text';
import DynamicFrom from '../../../../components/Admin/DynamicFrom/from';
import { fethCategoryRedux } from '../../../../redux/api/apiRequest';
import FormDelete from '../../../../components/Admin/FormDelete/FormDelete';

const AddCategory = () => {

  const dispatch = useDispatch()
  const [formCate] = Form.useForm()

  const [open, setOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState('');
  const [render, setRender] = useState(false)
  const [isloading, setIsloading] = useState(false)


  const [category, setCategory] = useState({})
  const [listCategory , setListCategory] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const cate = await fethCategoryRedux(dispatch);
      setListCategory(cate.cate);
    };
    fetchData();
  }, [render]);

  const fields = [
    {
      name: 'name',
      label: 'Name Product',
      type: 'input',
      rules: [{ required: true, message: 'Please input category name!' }],
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      multiple: false,
    },
  ];
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: 'w-60',
      render: text => <a>{limitWords(text, 5)}</a>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      className: 'w-40 items-center',
      render: (image) => (
        <div className='flex items-center'>
          {
            Array.isArray(image) && image[0] ? (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/images/${image}`}
                className="w-16 h-16 object-cover rounded-md bg-auto"
              />
            ) : 'No Image'
          }
        </div>
      )
    },
    {
      title: 'Action',
      key: 'action',
      className: 'w-20',
      render: (item) => {
        return (
          <div className='flex gap-4' >
            <Button variant='filled' color='yellow' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </Button>
              <Button variant='filled' color='red' onClick={()=>{handleDelete(item)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </Button>
          </div>
        )
      }

    },
  ];
   const handleAddCategory = () => {
    setOpen(!open)
    setModelTitle('Add')
    formCate.resetFields();
  }
  const onFinishAdd = async (values) => {
    console.log('values', values);
    console.log('img', values.image);
    
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.image && values.image.length > 0) {
      values.image.forEach(fileWrapper => {
        formData.append("image", fileWrapper.originFileObj);
      });
    }
    setIsloading(true)
    setOpen(!open)
    const res = await addCate(formData);
    setIsloading(false)
    if (res && res.EC === 0) {
      notification.success({ message: "Thêm Danh Mục" , description: 'Thêm Danh Mục Thành Công'});
      formCate.resetFields();
      setRender(!render);
    } else {
      notification.error({ message: "Error", description: res?.EM || "Add failed" });
    }
    return res;
  }
  const handleDelete = (category) => {
    setOpen(!open)
    setModelTitle('Delete')
    setCategory(category)
    
  }



  let UI;
  switch (modelTitle) {
    case 'Add':
      UI = (
        <div>
          <div className='text-center font-bold text-[16px] mb-4'> Add Category New</div>
          <DynamicFrom key={'add'} form={formCate} fields={fields} onFinish={onFinishAdd} />
        </div>
      )
      break;
    case 'Edit':
      UI = (
        <div>
          <div className='text-center font-bold text-[16px] mb-4'>Edit Product</div>
          {/* <div> <DynamicFrom key={'Edit'} form={fromEdit} fields={fields} onFinish={onFinishEdit} /></div> */}
        </div>
      )
      break;
    case 'Delete':
      UI = (
        <div>
          <FormDelete
            title={`Xóa sản phẩm ${category.name}`}
            span={`Bạn có chắc chắn muốn xóa sản phẩm ${category.name}?`}
            item={category} url={'category'}
            render={render}
            setRender={setRender}
            setOpen={setOpen}
            open={open}
            setIsloading={setIsloading}
            isloading={isloading}
          />
        </div>
      )
      break;

    default:
      break;
  }





  return (
    <div>
      <div>
        <div className='flex justify-between items-center mb-4'>
          <div className='text-[16px] font-bold'>Danh Sách Danh Mục</div>
          <div>
            <div>
              <Button type="primary" onClick={()=>{handleAddCategory()}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Button>
            </div>

            <Model setOpen={setOpen} open={open} title={modelTitle}>
              {UI}
            </Model>
          </div>
        </div>
        <div className='w-full bg-white rounded'>
          {isloading && (
            <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
              <Spin size="large" />
            </div>
          )}
          <Table columns={columns} dataSource={listCategory} rowKey="_id" />
        </div>

      </div>
    </div>
  )
}

export default AddCategory