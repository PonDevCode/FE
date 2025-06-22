import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography } from 'antd';
const items = [
    {
        key: '1',
        label: 'Item 1',
    },
    {
        key: '2',
        label: 'Item 2',
    },
    {
        key: '3',
        label: 'Item 3',
    },
];
const Dropdowns = ({ title }) => (
    <Dropdown
        menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ['3'],
        }}
        className='text-black'
    >
        <Typography.Link style={{ color: 'black' }}>
            <Space>
                {title}
                <DownOutlined />
            </Space>
        </Typography.Link>
    </Dropdown>
);
export default Dropdowns;