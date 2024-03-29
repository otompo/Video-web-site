import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Tabs, Row, Col, Input, Button, Progress, Spin } from 'antd';
import AdminRoute from '../routes/AdminRoutes';
import axios from 'axios';
import { toast } from 'react-toastify';
import useHome from '../../hooks/useHome';
import useContact from '../../hooks/useContact';
const { TextArea } = Input;
const { TabPane } = Tabs;

function ManageCustomize(props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState('Upload Video');
  const [progress, setProgress] = useState(0);

  const {
    title,
    subtitle,
    testimonialTitleOne,
    testimonialTitleTwo,
    video,
    setTitle,
    setSubtitle,
    setTestimonialTitleOne,
    setTestimonialTitleTwo,
    setVideo,
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

  // console.log('video', video);

  const handleHomeSave = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/admin/website', {
        page: 'home',
        title,
        subtitle,
        testimonialTitleOne,
        testimonialTitleTwo,
        video,
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

  const handleVideo = async (e) => {
    try {
      setLoading(true);
      const file = e.target.files[0];
      setUploadButtonText(file.name);
      const videoData = new FormData();
      videoData.append('video', file);
      //   console.log(file);
      // save progress bar and send video as form data to backend
      const { data } = await axios.post(`/api/upload/video`, videoData, {
        onUploadProgress: (e) => {
          setProgress(Math.round((100 * e.loaded) / e.total));
        },
      });
      // once response is received
      setVideo(data);
      setUploadButtonText('Upload Video');
      toast.success('Success');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setUploadButtonText('Upload Video');
      toast.error('Video upload failed');
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
        <Tabs defaultActiveKey="1" style={{ width: '180%', marginRight: 50 }}>
          <TabPane tab="CUSTOMIZE HERO SECTION" key="1">
            <Row>
              <Col span={9} offset={2} style={{ marginRight: 5 }}>
                <div className="form-group">
                  <label
                    className="btn btn-dark btn-block text-left my-3 text-center"
                    style={{ width: '100%' }}
                  >
                    {loading ? (
                      <span className="spinLoader">
                        <Spin />
                      </span>
                    ) : (
                      `${uploadButtonText}`
                    )}

                    <input
                      onChange={handleVideo}
                      // value={values.video}
                      type="file"
                      accept="video/*"
                      hidden
                    />
                  </label>
                </div>

                <div className="form-group">
                  {progress > 0 && (
                    <Progress
                      className="d-flex justify-content-center pt-2"
                      percent={progress}
                      steps={10}
                    />
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={9} offset={2} style={{ marginRight: 5 }}>
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
            </Row>
          </TabPane>
          <TabPane tab="CUSTOMIZE CONTACT SECTION" key="2">
            <Row>
              <Col span={5} style={{ marginRight: 5 }}>
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
              <Col span={5} style={{ marginRight: 5 }}>
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
              <Col span={5} style={{ marginRight: 5 }}>
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
              <Col span={5} style={{ marginRight: 5 }}>
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
              <Col span={5} style={{ marginRight: 5 }}>
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
              <Col span={5} style={{ marginRight: 5 }}>
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
              <Col span={5} style={{ marginRight: 5 }}>
                <TextArea
                  rows={5}
                  placeholder="Card three Description"
                  value={contactDescriptionThree}
                  onChange={(e) => setContactDescriptionThree(e.target.value)}
                  style={{
                    marginRight: 10,
                  }}
                />
              </Col>
              <Col span={5} style={{ marginRight: 5 }}>
                <TextArea
                  rows={5}
                  placeholder="Card four Description"
                  value={contactDescriptionFour}
                  onChange={(e) => setContactDescriptionFour(e.target.value)}
                  style={{ margin: '0px 20px 20px 5px' }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Button
                  onClick={handleContactSave}
                  type="primary"
                  style={{ margin: '10px 0px 10px 0px' }}
                  loading={success}
                  block
                >
                  Save
                </Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </AdminRoute>
    </Layout>
  );
}

export default ManageCustomize;
