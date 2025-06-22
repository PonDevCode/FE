import React from 'react';
import { Button, message, Popconfirm } from 'antd';

const Popconfirms = ({ data, id, setRender, onDelete }) => {
  const confirm = async () => {
    try {
      await onDelete(id);
      message.success('Deleted successfully');
      if (setRender) {
        setRender(true);
      }
    } catch (err) {
      message.error('Delete failed', err);
    }
  };
  const cancel = () => {
    // console.log(e);
    message.error('Click on No');
  };




  return (
    <>
      <Popconfirm
        title="Delete the category"
        description="Are you sure to delete category"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        {data}
      </Popconfirm>
    </>
  )
};
export default Popconfirms;