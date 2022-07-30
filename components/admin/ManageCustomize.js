import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Row, Col, Input, Button } from 'antd';
import AdminRoute from '../routes/AdminRoutes';
import axios from 'axios';
import { toast } from 'react-toastify';
import useHome from '../../hooks/useHome';
import useContact from '../../hooks/useContact';
const { TextArea } = Input;

function ManageCustomize(props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const {
    contactTitleOne,
    contactTitleTwo,
    contactTitleThree,
    contactTitleFour,

    contactDescriptionOne,
    contactDescriptionTwo,
    contactDescriptionThree,
    contactDescriptionFour,

    setContactTitleOne,
    setContactTitleTwo,
    setContactTitleThree,
    setContactTitleFour,

    setContactDescriptionOne,
    setContactDescriptionTwo,
    setContactDescriptionThree,
    setContactDescriptionFour,
  } = useContact();

  const handleHomeSave = async () => {
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

  const handleContactSave = async () => {
    try {
      setSuccess(true);
      const { data } = await axios.post('/api/admin/websitecontact', {
        page: 'contact',
        contactTitleOne,
        contactTitleTwo,
        contactTitleThree,
        contactTitleFour,
        contactDescriptionOne,
        contactDescriptionTwo,
        contactDescriptionThree,
        contactDescriptionFour,
      });
      setSuccess(false);
      toast.success('Saved');
    } catch (err) {
      console.log(err);
      setSuccess(false);
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
          <div className="col-md-6 ">
            <div className="card" style={{ height: '100%' }}>
              <div className="card-body">
                <div className="card-title">
                  <h5>Home</h5>
                </div>
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
                    onClick={handleHomeSave}
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
          <div className="col-md-6 ">
            <div className="card" style={{ height: '100%' }}>
              <div className="card-body">
                <div className="card-title">
                  <h5>Contact</h5>
                </div>
                <Row>
                  <Col span={12}>
                    <Input
                      size="large"
                      placeholder="Card one  title"
                      value={contactTitleOne}
                      onChange={(e) => setContactTitleOne(e.target.value)}
                      style={{
                        marginRight: 10,
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      size="large"
                      placeholder="Card two  title"
                      value={contactTitleTwo}
                      onChange={(e) => setContactTitleTwo(e.target.value)}
                      style={{
                        margin: '0px 15px 20px 5px',
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Input
                      style={{
                        marginRight: 10,
                      }}
                      size="large"
                      placeholder="Card three  title"
                      value={contactTitleThree}
                      onChange={(e) => setContactTitleThree(e.target.value)}
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      size="large"
                      placeholder="Card four  title"
                      value={contactTitleFour}
                      onChange={(e) => setContactTitleFour(e.target.value)}
                      style={{
                        margin: '0px 15px 20px 5px',
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={12}>
                    <TextArea
                      rows={5}
                      placeholder="Card one Description"
                      value={contactDescriptionOne}
                      onChange={(e) => setContactDescriptionOne(e.target.value)}
                      style={{
                        marginRight: 10,
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <TextArea
                      rows={5}
                      placeholder="Card two Description"
                      value={contactDescriptionTwo}
                      onChange={(e) => setContactDescriptionTwo(e.target.value)}
                      style={{ margin: '0px 20px 20px 5px' }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={12}>
                    <TextArea
                      rows={5}
                      placeholder="Card three Description"
                      value={contactDescriptionThree}
                      onChange={(e) =>
                        setContactDescriptionThree(e.target.value)
                      }
                      style={{
                        marginRight: 10,
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <TextArea
                      rows={5}
                      placeholder="Card four Description"
                      value={contactDescriptionFour}
                      onChange={(e) =>
                        setContactDescriptionFour(e.target.value)
                      }
                      style={{ margin: '0px 20px 20px 5px' }}
                    />
                  </Col>
                </Row>

                <Button
                  onClick={handleContactSave}
                  type="primary"
                  style={{ margin: '10px 0px 10px 0px' }}
                  loading={success}
                  block
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AdminRoute>
    </Layout>
  );
}

export default ManageCustomize;
