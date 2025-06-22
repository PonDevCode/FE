import React, { Children } from 'react';
import { Button, Modal } from 'antd';
const Model = ({ open, setOpen, children }) => {
    return (
        <>
            <Modal

                open={open}
                onCancel={() => setOpen(false)}
                className='mt-[-60px]'
                width={700}
                styles={{
                    body: {
                        maxHeight: '70vh',
                        overflowY: 'auto',
                        // padding: "24px",
                        marginTop: "20px"
                    },
                }}
                footer={null}
            >
                <div className="scrollbar-thin scrollbar-thumb-g-red-500 scrollbar-track-gray-200">
                    {children}
                </div>
            </Modal>
        </>
    );
};
export default Model;