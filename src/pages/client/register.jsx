import React from 'react'
import { Button, Form, Input, notification } from 'antd';
import { useNavigate } from "react-router";
import { rigisterUserRedux } from '../../redux/api/apiRequest';
import { useDispatch } from 'react-redux';

const RegisterPage = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const onFinish = async (values) => {

        const { name, email, password } = values;
        const user = {
            name: name, 
            email: email,
            password: password
        }
        const res = await rigisterUserRedux(user , dispatch , navigate);
        console.log("cheack 1",res);
        
        if (res && res.EC === 0) {
            notification.success({ message: "CREATE USER", description: res?.EM ?? "success" })
            navigate("/login");
        } else {
            notification.error({ message: "CREATE USER error", description: res?.EM ?? "error" })
        }
    };
    return (
        <>
            <div className='text-[50px] font-bold text-center'>
                <h1>Register</h1>
            </div>
            <div className='flex justify-center w-full'>
                <Form
                    onFinish={onFinish}
                    layout='vertical'
                    className='w-[600px]'
                >
                    <Form.Item
                        label="name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default RegisterPage;