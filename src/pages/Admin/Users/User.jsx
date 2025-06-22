import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button, Form, notification } from 'antd';
import { deleteUser, editUser, getUser } from '../../../../Utils/api';
import DynamicFrom from '../../../components/Admin/DynamicFrom/from';
import Model from '../../../components/Admin/Model/model';
import { addUserRedux } from '../../../redux/api/apiRequest';
import { useDispatch } from 'react-redux';
import Popconfirms from '../../../components/Admin/Popconfirm/Popconfirm';

const fields = [
  {
    name: 'name',
    label: 'Name user',
    type: 'input',
    rules: [{ required: true, message: 'Please input category name!' }],
  },
  {
    name: 'email',
    label: 'Email',
    type: 'input',
    rules: [{ required: true, message: 'Please input category category!' }],
  },
  {
    name: 'password',
    label: 'Password',
    type: 'input',
    rules: [{ required: true, message: 'Please input category category!' }],
  },
];
const fields2 = [
  {
    name: 'name',
    label: 'Name user',
    type: 'input',
    rules: [{ required: true, message: 'Please input category name!' }],
  },
  {
    name: 'email',
    label: 'Email',
    type: 'input',
    rules: [{ required: true, message: 'Please input category category!' }],
  },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    options: [
      { _id: 'Admin', name: 'Admin' },
      { _id: 'Nhân Viên', name: 'Nhân Viên' },

    ]
  },
];
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

const User = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState([])
  const [render, setRender] = useState(false)
  const [userForm] = Form.useForm()
  const [userEditForm] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [modelTitle, setModelTitle] = useState('')
  const [userDetail, setUserDetail] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUser()
      setUser(result)
    }
    fetchUser()
  }, [render])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: 'w-40',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',

    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      className: 'w-40',
      render: (role, index) => {
        return (
          <Tag color={role === 'Admin' ? "green" : "volcano"} key={index}>
            {role.toUpperCase()}
          </Tag>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      className: 'w-40',
      render: (user) => (
        <Space size="middle">
          <a onClick={() => { handleEdit(user) }} className='text-yellow-300'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
          </a>
          <Popconfirms data={icon} id={user._id} setRender={setRender} onDelete={() => { handleDelete(user._id) }} />
        </Space>
      ),
    },
  ];
  const handleAdd = () => {
    setOpen(true)
    setModelTitle('Create User')
  }
  const onFinishAdd = async (values) => {
    const { name, email, password } = values;
    const user = {
      name: name,
      email: email,
      password: password
    }
    const res = await addUserRedux(user, dispatch);
    if (res && res.EC === 0) {
      notification.success({ message: "CREATE USER", description: res?.EM ?? "success" })
      userForm.resetFields();
      setRender(!render)
      setOpen(false)
    } else {
      notification.error({ message: "CREATE USER error", description: res?.EM ?? "error" })
    }
  }
  const handleDelete = async (id) => {
    const result = await deleteUser(id);
    setRender(!render)
    return result;
  };
  const handleEdit = async (user) => {
    setOpen(true)
    setModelTitle('Edit User')
    setUserDetail(user)
    userEditForm.setFieldsValue({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }
  const onFinishEdit = async () => {
    const formData = userEditForm.getFieldsValue();
    console.log(formData);

    console.log(userDetail._id);

    const res = await editUser(userDetail._id, formData);
    if (res && res.EC === 0) {
      notification.success({ message: "Edit success", description: res?.EM });
      setRender(!render)
      userEditForm.resetFields();
      setOpen(false);
    } else {
      notification.error({ message: "Error", description: res?.EM || "Edit failed" });
    }

  }

  return (
    <>
      <div className='w-full flex justify-between items-center mb-4 '>
        <div>
          <h1 className='text-[16px] font-bold'>Danh Sách Thành Viên</h1>
        </div>
        <Button type="primary" onClick={() => { handleAdd() }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </Button>
      </div>
      <Model setOpen={setOpen} open={open} title={modelTitle} >
        {
          modelTitle === "Create User"
            ? < DynamicFrom key={'Create User'} form={userForm} fields={fields} onFinish={onFinishAdd} />
            : < DynamicFrom key={'Edit User'} form={userEditForm} fields={fields2} onFinish={onFinishEdit} />
        }
      </Model>
      <Table columns={columns} dataSource={user} rowKey="_id" />
    </>
  )
}

export default User;