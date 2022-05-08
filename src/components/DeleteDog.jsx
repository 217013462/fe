import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import http from '../common/http-common';
import useAuth from '../hooks/useAuth';
import { Modal, Button, Space, message } from 'antd';
import { WarningOutlined, DeleteOutlined } from '@ant-design/icons';

const DeleteDog = () => {
  const { auth } = useAuth();
  const { id } = useParams(); 
  const navigate = useNavigate();
  const accessToken = auth.accessToken;
  
  const showDeleteConfirm = () => {
  const { confirm } = Modal;
    confirm({
      title: 'Are you sure you want to delete this dog?',
      content: `Dog ID: ${id}`,
      icon: <WarningOutlined style={{ color: 'red' }}/>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        const delMsg = message.loading('Deleting...', 0);
        setTimeout(delMsg, 3500);
        http.delete(`/dog/${id}`, {
          headers: {
            'Authorization': `Basic ${accessToken}`
            }})
          .then(()=>{
            console.log('Deleted');
            message.success(`Deleted`);
            navigate('/dog'), 2000
            })
      },
      onCancel() {
        console.log('Cancel Delete');
      },
    });
  }

  return (
  <Space>
    <Button danger icon={<DeleteOutlined />} type="primary" onClick={showDeleteConfirm}>
    Delete
    </Button>
  </Space>
  );
}

export default DeleteDog;