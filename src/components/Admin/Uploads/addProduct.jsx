import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  notification,
  Upload,
  Anchor,
  Space,
  Select
} from 'antd';
import { addProduct, addVariantProduct, deleteProduct, getCate, updateProduct } from '../../../../Utils/api';
import TableProduct from '../tableProduct/tableProduct';
import { fethProductRedux } from '../../../redux/api/apiRequest';
import { useDispatch } from 'react-redux';
import Popconfirms from '../popconfirm/popconfirm';
import Model from '../Model/model';
import DynamicFrom from '../DynamicFrom/from';
const normFile = (e) => {
  console.log('Upload event:', e);
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



const fieldsVariant = [
  {
    name: 'size',
    label: 'size',
    type: 'select',
    rules: [{ required: true, message: 'Please input category category!' }],
    options: [
      { _id: 'S', name: 'S' },
      { _id: 'M', name: 'M' },
      { _id: 'L', name: 'L' },
      { _id: 'XL', name: 'XL' },
      { _id: 'XXL', name: 'XXL' },
    ]
  },
  {
    name: 'price',
    label: 'Price',
    type: 'input',
  },
  {
    name: 'stock',
    label: 'stock',
    type: 'input',
  }
];





const AddProduct = ({ render, setRender }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [productForm] = Form.useForm();     // Form cho sản phẩm
  const [variantForm] = Form.useForm();     // Form cho variant (modal)
  const [category, setCategory] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [productDetail, setProductDetail] = useState({})
  const [modelTitle, setModelTitle] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCate();
      setCategory(data.cate);
    };
    fetchCategory();
  }, [render]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await fethProductRedux(dispatch);
      setListProduct(data);
      setRender(false);
    };
    fetchProduct();
  }, [render]);

  const handleDelete = async (id) => {
    console.log(id);
    const result = await deleteProduct(id);
    return result;
  };
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
    // {
    //   name: 'image',
    //   label: 'Image',
    //   type: 'upload',
    //   multiple: false,
    // },
  ];
  const onFinish = async (values) => {
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
    const res = await addProduct(formData);
    if (res && res.EC === 0) {
      notification.success({ message: "Add Product", description: res?.EM });
      form.resetFields();
      setRender(true);
    } else {
      notification.error({ message: "Error", description: res?.EM || "Add failed" });
    }
    return res;
  };
  const onFinishVariant = async (values) => {
    const formData = {
      size: values.size,
      price: values.price,
      product: productDetail._id,
      stock: Number(values.stock)
    }
    const res = await addVariantProduct(formData)
    if (res && res.EC === 0) {
      notification.success({ message: "Add Variant product success", description: res?.EM });
      setRender(true)
      variantForm.resetFields();
      alert('song')
      setOpen(false);
    } else {
      notification.error({ message: "Error", description: res?.EM || "Add failed" });
    }

  };

  const onFinishUpdate = async () => {
    const formData = productForm.getFieldsValue();
    const res = await updateProduct(formData, productDetail._id);
    if (res && res.EC === 0) {
      notification.success({ message: "update product success", description: res?.EM });
      setRender(true)
      productForm.resetFields();
      setOpen(false);
      setRender(true);
    } else {
      notification.error({ message: "Error", description: res?.EM || "Add failed" });
    }
  };
  const handleUpdate = async (product) => {
    setModelTitle('Update Product');
    setOpen(true);
    setProductDetail(product)
    productForm.setFieldsValue({
      name: product.name,
      category: product.category?._id || product.category,
      price: product.price,
      priceSale: product.priceSale,
      description: product.description,
    });
  };
  const handleAddVariant = (product) => {
    setModelTitle('Add Variant Product');
    setOpen(true);
    setProductDetail(product)
  };
  const columns = [
    { title: 'ID', dataIndex: '_id' },
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'Category',
      dataIndex: 'categoryData',
      render: (categoryData) => categoryData?.name || 'No category',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image) => {
        return (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/images/${image[0]}`}
            alt="product"
            className="w-16 h-16 object-cover rounded-md"
          />
        );
      }
    }
    ,
    { title: 'Price', dataIndex: 'price' },
    {
      title: 'Action',
      key: 'action',
      render: (product) => (
        <Space size="middle">
          <a onClick={() => { handleUpdate(product) }} className='text-yellow-300'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
          </a>
          <Popconfirms data={icon} id={product._id} setRender={setRender} onDelete={() => { handleDelete(product._id) }} />
          <a onClick={() => { handleAddVariant(product) }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </a>
        </Space>
      )
    },
  ];
  return (
    <div>
      <div className='flex justify-center w-full ml-[-40px]'>
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 22 }}
          layout="horizontal"
          style={{ minWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item label="Name" name='name' rules={[{ required: true, message: 'Please input produce name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Category" name='category' rules={[{ required: true, message: 'Please input category !' }]}>
            <Select>
              {category.map((opt, index) => (
                <Select.Option key={index} value={opt._id}>
                  {opt.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Price" name='price' rules={[{ required: true, message: 'Please input price!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Price Sale" name='priceSale'>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name='description'>
            <TextArea rows={4} />
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
            <Button type="primary" htmlType="submit">Add Product</Button>
          </Form.Item>
        </Form>
      </div>

      <Model setOpen={setOpen} open={open} title={modelTitle} formData={DynamicFrom}>
        {
          modelTitle === 'Update Product'
            ? <DynamicFrom key={'update'} form={productForm} fields={fields} onFinish={onFinishUpdate} />
            : <DynamicFrom key={'variant'} form={variantForm} fields={fieldsVariant} onFinish={onFinishVariant} />
        }
      </Model>

      <TableProduct columns={columns} data={listProduct} />
    </div>
  );
};

export default AddProduct
