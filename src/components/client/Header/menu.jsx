import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
const items = [
    {
        label: <Link to="/">Home</Link>,
        key: 'mail',
        icon: <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg></div>,
    },
    {
        label: <Link to="/Page">HomePage</Link>,
        key: 'SubMenu',
        icon: <SettingOutlined />,
    },
    {
        key: 'Menu',
        label: (
            <a>
                Menu
            </a>
        ),
        children: [
            {
                type: 'group',
                label: <Link to="/Login">Login</Link>,
            },
            {
                type: 'group',
                label: <Link to="/Register">Register</Link>,
            },
        ],
    },
];
const Header = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };



    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;