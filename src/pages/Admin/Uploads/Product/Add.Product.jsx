import React, { useEffect } from 'react'
import DynamicFrom from '../../../../components/Admin/DynamicFrom/from'
import Model from '../../../../components/Admin/Model/model'
import { useState } from 'react';
import { Button, Form, Table, notification, Spin } from 'antd';
import { addProduct, getCate, updateProduct } from '../../../../../Utils/api';
import { fethProductRedux } from '../../../../redux/api/apiRequest';
import { useDispatch } from 'react-redux';
import { limitWords } from './text'
import FormDelete from '../../../../components/Admin/FormDelete/FormDelete';
import { uploadImg } from '../../../../../Utils/api/api.product';


const AddProduct = () => {

  const dispatch = useDispatch()
  const [formProduct] = Form.useForm()
  const [fromEdit] = Form.useForm()
  const [open, setOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState('');
  const [render, setRender] = useState(false)
  const [isloading, setIsloading] = useState(false)

  // List Data
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState({})
  const [listProduct, setListProduct] = useState([])



  const fields = [
    {
      name: 'name',
      label: 'Name Product',
      type: 'input',
      rules: [{ required: true, message: 'Please input category name!' }],
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      rules: [{ required: true, message: 'Please input category category!' }],
      options: category
    },
    {
      name: 'price',
      label: 'Price',
      type: 'input',
    },
    {
      name: 'priceSale',
      label: 'Price Sale',
      type: 'input',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
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
      title: 'Category',
      dataIndex: 'categoryData',
      key: 'category',
      className: 'w-40',
      render: (categoryData) => <a className='font-bold'>{categoryData?.name || 'No category'}</a>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      className: 'w-40 items-center',
      render: (image) => <div className='flex items-center'><img src={`${import.meta.env.VITE_BACKEND_URL}/uploads/images/${image[0]}`}
        className="w-16 h-16 object-cover rounded-md bg-auto  " /></div>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      className: 'w-20 items-center',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: text => <a className="line-clamp-2">{limitWords(text, 15)}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      className: 'w-40',
      render: (item) => {
        return (
          <div className='flex gap-4' >
            <Button variant='filled' color='yellow' onClick={() => { handleEdit(item) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </Button>
            <Button variant='filled' color='red' onClick={() => { handleDelete(item) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </Button>
          </div>
        )
      }

    },
  ];

  // Call Api 

  useEffect(() => {
    const fetchData = async () => {
      const categoryData = await getCate();
      setCategory(categoryData.cate);
      const productData = await fethProductRedux(dispatch);
      setListProduct(productData);
    };
    fetchData();
  }, [render]);

  // Hanlde UI
  const handleAddProduct = () => {
    setOpen(!open)
    setModelTitle('Add Product New')
    formProduct.resetFields();

  }
  const onFinishAdd = async (values) => {
    console.log('values', values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("description", values.description || '');
    formData.append("price", values.price || '');
    formData.append("priceSale", values.priceSale || '');

    if (values.image && values.image.length > 0) {
      values.image.forEach(fileWrapper => {
        formData.append("image", fileWrapper.originFileObj);
      });
    }
    setIsloading(true)
    setOpen(!open)
    const res = await addProduct(formData);
    setIsloading(false)
    if (res && res.EC === 0) {
      notification.success({ message: "Add Product", description: res?.EM });
      formProduct.resetFields();
      setRender(!render);
    } else {
      notification.error({ message: "Error", description: res?.EM || "Add failed" });
    }
    return res;
  }
  const handleDelete = (product) => {
    setOpen(!open)
    setModelTitle('Delete Product')
    setProduct(product)
  }
  const handleEdit = (product) => {
    setOpen(!open)
    setModelTitle('Edit Product')
    setProduct(product)
    const imageList = product.image.map((img, index) => ({
      uid: `${index}`,
      name: img,
      status: 'done',
      url: `${import.meta.env.VITE_BACKEND_URL}/uploads/images/${img}`,
    }));
    fromEdit.setFieldsValue({
      name: product.name,
      category: product.category?._id || product.category,
      price: product.price,
      priceSale: product.priceSale,
      description: product.description,
      image: imageList
    });
  }
  const onFinishEdit = async () => {
    const formData = fromEdit.getFieldsValue();
    const newImages = [];
    const oldImages = [];

    // lọc ra img xóa trong mớ img cũ được load lên
    const removedImages = product.image.filter(
      (img) => !formData.image.some((file) => file.name === img)
    );

    // phân chia ảnh củ và mới
    formData.image.forEach((file) => {
      if (file.originFileObj) {
        newImages.push(file.originFileObj);
      } else {
        oldImages.push(file.name)
      }
    });
    // nếu có ảnh mới được thêm vào
    if (newImages.length > 0) {
      // tạo formdata để upload nhiều ảnh
      const imageFormData = new FormData();
      newImages.forEach((file) => {
        imageFormData.append("image", file);
      })
      
      setOpen(!open);
      setIsloading(true)
      // upload ảnh mới được thêm vào
      const resImg = await uploadImg(product._id, imageFormData)
      // lấy ảnh mới được thêm vào ra
      const uploadImgNew = resImg.result;
      // Tạo list ảnh được thêm vào sau + ảnh củ khi được load lên
      const finalImageList = [...oldImages, ...uploadImgNew];
      // ném vào payload call api update + nếu có ảnh củ xóa kèm theo
      const payload = {
        ...formData,
        image: finalImageList,
        imageDelete: removedImages
      };
      const res = await updateProduct(payload, product._id);
      if (res && res.EC === 0) {
        notification.success({ message: "update product success", description: res?.EM });
        setRender(!render)
        fromEdit.resetFields();
        setIsloading(false)
      } else {
        notification.error({ message: "Error", description: res?.EM || "Add failed" });
        setIsloading(false)
      }
    } else {
      const payload = {
        ...formData,
        image: oldImages,
        imageDelete: removedImages
      };
      setOpen(!open);
      setIsloading(true)
      const res = await updateProduct(payload, product._id);
      if (res && res.EC === 0) {
        notification.success({ message: "update product success", description: res?.EM });
        setRender(!render)
        fromEdit.resetFields();
        setOpen(!open);
        setIsloading(false)

      } else {
        notification.error({ message: "Error", description: res?.EM || "Add failed" });
        setIsloading(false)

      }
    }
  }



  let UI;
  switch (modelTitle) {
    case 'Add Product New':
      UI = (
        <div>
          <div className='text-center font-bold text-[16px] mb-4'> Add Product New</div>

          <DynamicFrom key={'add'} form={formProduct} fields={fields} onFinish={onFinishAdd} />
        </div>
      )
      break;
    case 'Edit Product':
      UI = (
        <div>
          <div className='text-center font-bold text-[16px] mb-4'>Edit Product</div>
          <div> <DynamicFrom key={'Edit'} form={fromEdit} fields={fields} onFinish={onFinishEdit} /></div>
        </div>
      )
      break;
    case 'Delete Product':
      UI = (
        <div>
          <FormDelete
            title={`Xóa sản phẩm ${product.name}`}
            span={`Bạn có chắc chắn muốn xóa sản phẩm ${product.name}?`}
            item={product} url={'product'}
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
      <div className='flex justify-between items-center mb-4'>
        <div className='text-[16px] font-bold'>Danh Sách Sản Phẩm</div>
        <div>
          <div>
            <Button type="primary" onClick={() => { handleAddProduct() }}>
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
        <Table columns={columns} dataSource={listProduct} pagination={{ pageSize: 3 }} rowKey="_id" />
      </div>

    </div>
  )
}

export default AddProduct

