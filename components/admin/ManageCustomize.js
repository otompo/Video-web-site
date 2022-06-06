import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Row, Col, Input, Button, Image, Divider } from 'antd';
import AdminRoute from '../routes/AdminRoutes';
import axios from 'axios';
import { toast } from 'react-toastify';
import useHome from '../../hooks/useHome';

function ManageCustomize(props) {
  const [loading, setLoading] = useState('');

  const {
    title,
    subtitle,
    testimonialTitleOne,
    testimonialTitleTwo,
    setTitle,
    setSubtitle,
    setTestimonialTitleOne,
    setTestimonialTitleTwo,
  } = useHome();
  const handleSave = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/admin/website', {
        page: 'home',
        title,
        subtitle,
        testimonialTitleOne,
        testimonialTitleTwo,
      });
      setLoading(false);
      toast.success('Saved');
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Layout title="Customize">
      <AdminRoute>
        <div className="container-fluid m-2">
          <div className="row">
            <div className="col-md-4">
              <h1 className="lead">Customize</h1>
            </div>
            <div className="col-md-4 offset-md-2"></div>
          </div>
          <hr />
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card">
              <div className="card-body">
                <Col span={24}>
                  <Input
                    style={{ margin: '20px 0px 20px 0px' }}
                    size="large"
                    placeholder="Give it a title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <Input
                    style={{ margin: '20px 0px 20px 0px' }}
                    size="large"
                    placeholder="Give it a subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                  />
                  <Input
                    style={{ margin: '20px 0px 20px 0px' }}
                    size="large"
                    placeholder="Give it a subtitle"
                    value={testimonialTitleOne}
                    onChange={(e) => setTestimonialTitleOne(e.target.value)}
                  />
                  <Input
                    style={{ margin: '20px 0px 20px 0px' }}
                    size="large"
                    placeholder="Give it a subtitle"
                    value={testimonialTitleTwo}
                    onChange={(e) => setTestimonialTitleTwo(e.target.value)}
                  />

                  <Button
                    onClick={handleSave}
                    type="primary"
                    style={{ margin: '10px 0px 10px 0px' }}
                    loading={loading}
                    block
                  >
                    Save
                  </Button>
                </Col>
              </div>
            </div>
          </div>
        </div>
      </AdminRoute>
    </Layout>
  );
}

export default ManageCustomize;
