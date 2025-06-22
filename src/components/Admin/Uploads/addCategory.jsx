import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  notification,
  Upload,
  Space,
  Popconfirm
} from 'antd';
import { addCate, deleteCategory, updateCate } from '../../../../Utils/api';
import TableProduct from '../tableProduct/tableProduct';
import { fethCategoryRedux } from '../../../redux/api/apiRequest';
import { useDispatch } from 'react-redux';
import Popconfirms from '../popconfirm/popconfirm';
import DynamicFrom from '../DynamicFrom/from';
import Model from '../Model/model';
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const { TextArea } = Input;
const icon = (
  <a className="text-red-600" style={{ cursor: 'pointer' }} >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 
             1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 
             0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 
             .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 
             0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 
             1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  </a>
);


const AddCategory = ({ render, setRender }) => {

  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const [categoryForm] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState('');
  const [categoryDetail, setCategoryDetail] = useState({})


  const [listCate, setListCate] = useState([])
  const fields = [
    {
      name: 'name',
      label: 'Name Category',
      type: 'input',
      rules: [{ required: true, message: 'Please input category name!' }],
    },
  ];
  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.image && values.image.length > 0) {
      formData.append("file", values.image[0].originFileObj);
    }
    const addCategory = async () => {
      const res = await addCate(formData)
      console.log(res);

      if (res && res.EC === 0) {
        // save access_token localStorage
        notification.success({ message: "Add Category", description: res?.EM })
        setRender(true)
        form.resetFields();
      } else {
        notification.error({ message: "Add Category error", description: res?.EM ?? "error" })
      }
      return res
    }
    addCategory()
  }
  useEffect(() => {
    const fectProduct = async () => {
      const data = await fethCategoryRedux(dispatch)
      setListCate(data.cate)
      setRender(false)
    }
    fectProduct()
  }, [render])
  const handleDelete = async (id) => {
    const result = await deleteCategory(id)
    console.log(result);
  }
  const handleUpdate = async (product) => {
    setModelTitle('Update Product');
    setOpen(true);
    setCategoryDetail(product)
    categoryForm.setFieldsValue({
      name: product.name,
      category: product.category?._id || product.category,
      price: product.price,
      priceSale: product.priceSale,
      description: product.description,
    });
  };
  const onFinishUpdate = async () => {
    const formData = categoryForm.getFieldsValue();
    const res = await updateCate(formData, categoryDetail._id);
    if (res && res.EC === 0) {
      notification.success({ message: "update product success", description: res?.EM });
      setRender(true)
      categoryForm.resetFields();
      setOpen(false);
      setRender(true);
    } else {
      notification.error({ message: "Error", description: res?.EM || "Add failed" });
    }
  };



  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image) => (
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/images/${image}`}
          alt="category"
          className="w-16 h-16 object-cover rounded-md"
        />
      ),
    },
    {
      title: 'Action', // Tiêu đề của cột, hiển thị trên header
      key: 'action',   // Khóa duy nhất của cột
      render: (category) => (  // Hàm render cho nội dung của ô trong cột này
        <Space size="middle">
          <a onClick={() => { handleUpdate(category) }} className='text-yellow-300'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
          </a>
          <Popconfirms data={icon} id={category._id} setRender={setRender} onDelete={handleDelete} />
        </Space>
      )
    },
  ];
  return (
    <div >
      <div className='flex justify-center w-full ml-[-40px]'>
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 22 }}
          layout="horizontal"
          style={{ minWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item label="Name" name='name' rules={[{ required: true, message: 'Please input category name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Image" name='image' valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card" beforeUpload={() => false}>
              <button
                style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                type="button"
              >
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add Category</Button>
          </Form.Item>
        </Form>
      </div>
      <Model setOpen={setOpen} open={open} title={modelTitle} formData={DynamicFrom}>
        {
          <DynamicFrom key={'update'} form={categoryForm} fields={fields} onFinish={onFinishUpdate} />
        }
      </Model>



      <TableProduct columns={columns} data={listCate} />
    </div>
  )
}

export default AddCategory