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
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import Resizer from 'react-image-file-resizer';
import Loader from '../layout/Loader';
import { Context } from '../../context';
import PageLoader from '../layout/PageLoader';

const { confirm } = Modal;

const ManagePartness = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: '',
    description: '',
    loading: false,
  });
  const [success, setSuccess] = useState(false);
  const [ok, setOk] = useState(false);
  const [okey, setOkey] = useState(false);
  const [partness, setPartness] = useState([]);
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
    showPartness();
  }, [success]);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const showPartness = async () => {
    try {
      setValues({ ...values, loading: true });
      setOk(true);
      const { data } = await axios.get(`/api/admin/partness`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setPartness(data.partners);
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
      const { data } = await axios.post(
        `/api/admin/partness`,
        {
          ...values,
          profileImage,
        },
        { headers: { authorization: `Bearer ${user.token}` } },
      );
      toast.success('Success');
      setValues({ ...values, name: '', loading: false });
      setImagePreview('');
      setSuccess(false);
    } catch (err) {
      console.log(err);
      setValues({ ...values, name: '', loading: false });
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
        let { data } = await axios.post(
          `/api/user/profileimage`,
          {
            profileImage: uri,
          },
          { headers: { authorization: `Bearer ${user.token}` } },
        );
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

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get('/api/user/currentuser', {
        headers: { authorization: `Bearer ${user.token}` },
      });
      // console.log('data', data);
      if (data.ok) setOkey(true);
    } catch (err) {
      console.log(err);
      setOkey(false);
      router.push('/');
    }
  };

  const handleDelete = async (index) => {
    try {
      confirm({
        title: `Are you sure delete this  partner`,
        icon: <ExclamationCircleOutlined />,
        content: 'It will be deleted permanentily if you click Yes',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',

        onOk() {
          setValues({ ...values, loading: true });
          let allPartness = partness;
          const removed = allPartness.splice(index, 1);
          setPartness(allPartness);
          // send request to server
          const { data } = axios.delete(
            `/api/admin/partness/${removed[0]._id}`,
            { headers: { authorization: `Bearer ${user.token}` } },
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

  const setData = () => {
    const data = {
      columns: [
        {
          label: 'Image',
          field: 'image',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
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

    partness &&
      partness.forEach((partner, index) => {
        data.rows.push({
          image: (
            <Avatar
              size={30}
              src={
                <Image
                  src={partner && partner.image && partner.image.Location}
                />
              }
            />
          ),
          name: `${partner && partner.name}`,

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
        <Layout title="Manage Partness">
          <AdminRoute>
            <div className="container m-2">
              <div className="row">
                <div className="col-md-4">
                  <h1 className="lead">Manage Partness</h1>
                </div>
                <div className="col-md-4 offset-md-2">
                  <p
                    className="btn text-white float-right btn-success"
                    onClick={showModal}
                  >
                    {' '}
                    Add New Partner
                  </p>
                </div>
                <Modal
                  title="Add Partner"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        className="form-control mb-4 p-2"
                        placeholder="Enter name"
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

                    <div className="d-grid gap-2 my-2 ">
                      <button
                        className="btn btn-primary"
                        disabled={!values.name || loading}
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
            {/* <pre>{JSON.stringify(categories, null, 4)}</pre> */}
          </AdminRoute>
        </Layout>
      )}
    </>
  );
};

export default ManagePartness;
