import React, { useEffect, useState, useContext } from 'react';
import { MDBDataTable } from 'mdbreact';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
import { Spin, Modal, Avatar, Image } from 'antd';
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import AdminRoute from '../routes/AdminRoutes';
import Layout from '../layout/Layout';
import TextTruncate from 'react-text-truncate';
import axios from 'axios';
import { toast } from 'react-toastify';
import Resizer from 'react-image-file-resizer';
import Loader from '../layout/Loader';
import { Context } from '../../context';
import { useRouter } from 'next/router';
import PageLoader from '../layout/PageLoader';

const { confirm } = Modal;

const ManageServices = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    title: '',
    description: '',
    loading: false,
  });
  const [success, setSuccess] = useState(false);
  const [ok, setOk] = useState(false);
  const [okey, setOkey] = useState(false);
  const [services, setServices] = useState([]);
  const [uploadButtonText, setUploadButtonText] = useState('Upload Image');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [profileImage, setProfileImage] = useState({});
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    showServices();
  }, [success]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const showServices = async () => {
    try {
      setValues({ ...values, loading: true });
      setOk(true);
      const { data } = await axios.get(`/api/admin/services`);
      setServices(data.services);
      setValues({ ...values, loading: false });
      setOk(false);
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      setOk(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setValues({ ...values, loading: true });
      setSuccess(true);
      const { data } = await axios.post(`/api/admin/services`, {
        ...values,
        profileImage,
      });
      toast.success('Success');
      setValues({ ...values, title: '', description: '', loading: false });
      setImagePreview('');
      setSuccess(false);
    } catch (err) {
      console.log(err);
      setValues({ ...values, title: '', description: '', loading: false });
      setSuccess(false);
    }
  };

  const handleImage = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    setImagePreview(window.URL.createObjectURL(file));

    setLoading(true);
    // resize image and send image to backend
    Resizer.imageFileResizer(file, 720, 500, 'JPEG', 100, 0, async (uri) => {
      try {
        let { data } = await axios.post(`/api/user/profileimage`, {
          profileImage: uri,
        });
        // set image in the state
        setProfileImage(data);
        setLoading(false);
        setUploadButtonText('Upload Image');
        toast.success('Success');
      } catch (err) {
        console.log(err.response.data.message);
        setUploadButtonText('Upload Image');
        setLoading(false);
      }
    });
  };

  const handleDelete = async (index) => {
    try {
      confirm({
        title: `Are you sure delete this  Service`,
        icon: <ExclamationCircleOutlined />,
        content: 'It will be deleted permanentily if you click Yes',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',

        onOk() {
          setValues({ ...values, loading: true });
          let allServices = services;
          const removed = allServices.splice(index, 1);
          setServices(allServices);
          // send request to server
          const { data } = axios.delete(
            `/api/admin/services/${removed[0]._id}`,
          );
          toast.success('Deleted Successfully');
          setValues({ ...values, loading: false });
        },
        onCancel() {
          return;
        },
      });
    } catch (err) {
      toast.error(err);
      setValues({ ...values, loading: false });
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get('/api/user/currentuser');
      // console.log('data', data);
      if (data.ok) setOkey(true);
    } catch (err) {
      console.log(err);
      setOkey(false);
      router.push('/');
    }
  };

  const setData = () => {
    const data = {
      columns: [
        {
          label: 'Image',
          field: 'image',
          sort: 'asc',
        },
        {
          label: 'Title',
          field: 'title',
          sort: 'asc',
        },
        {
          label: 'Description',
          field: 'description',
          sort: 'asc',
        },

        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    services &&
      services.forEach((service, index) => {
        data.rows.push({
          image: (
            <Avatar
              size={30}
              src={
                <Image
                  src={service && service.image && service.image.Location}
                />
              }
            />
          ),
          title: `${service && service.title}`,
          description: (
            <TextTruncate
              className="MessagesSnapshot-item"
              line={1}
              element="span"
              truncateText="…"
              text={service && service.description}
            />
          ),
          action: (
            <>
              <div className="row">
                <div className="col-md-12">
                  <span onClick={() => handleDelete(index)}>
                    <DeleteOutlined
                      className="text-danger d-flex justify-content-center "
                      style={{ cursor: 'pointer' }}
                    />
                  </span>
                </div>
              </div>
            </>
          ),
        });
      });

    return data;
  };
  return (
    <>
      {!okey ? (
        <PageLoader />
      ) : (
        <Layout title="Manage Service">
          <AdminRoute>
            <div className="container m-2">
              <div className="row">
                <div className="col-md-4">
                  <h1 className="lead">Manage Service</h1>
                </div>
                <div className="col-md-4 offset-md-2">
                  <p
                    className="btn text-white float-right btn-success"
                    onClick={showModal}
                  >
                    {' '}
                    Add New Service
                  </p>
                </div>
                <Modal
                  title="Add Service"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        className="form-control mb-4 p-2"
                        placeholder="Enter title"
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6">
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
                              type="file"
                              name="profileImage"
                              size="large"
                              onChange={handleImage}
                              accept="image/*"
                              hidden
                            />
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4 offset-2">
                        <div className="form-group">
                          {imagePreview ? (
                            <Avatar size={60} src={imagePreview} />
                          ) : (
                            <Avatar size={60} src="/preview.ico" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <textarea
                        rows="7"
                        name="description"
                        style={{ width: '100%', padding: '5px' }}
                        value={values.description}
                        onChange={handleChange}
                        className="p-2"
                      ></textarea>
                    </div>
                    <div className="d-grid gap-2 my-2 ">
                      <button
                        className="btn btn-primary"
                        disabled={
                          !values.title || !values.description || loading
                        }
                        type="submit"
                      >
                        {values.loading ? <SyncOutlined spin /> : 'Submit'}
                      </button>
                    </div>
                  </form>
                </Modal>
              </div>
            </div>
            <hr />
            {ok ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setData()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
            {/* <pre>{JSON.stringify(services, null, 4)}</pre> */}
          </AdminRoute>
        </Layout>
      )}
    </>
  );
};

export default ManageServices;
