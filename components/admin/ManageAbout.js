import React, { useEffect, useState, useContext } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Progress, Spin, Modal } from 'antd';
import {
  ExclamationCircleOutlined,
  SyncOutlined,
  EditOutlined,
} from '@ant-design/icons';
import AdminRoute from '../routes/AdminRoutes';
import Layout from '../layout/Layout';
import TextTruncate from 'react-text-truncate';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../layout/Loader';
import Link from 'next/link';
import { Context } from '../../context';
import { useRouter } from 'next/router';
import PageLoader from '../layout/PageLoader';
import renderHTML from 'react-render-html';

const { confirm } = Modal;

const ManageAbout = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    description: '',
    loading: false,
  });
  const [success, setSuccess] = useState(false);
  const [ok, setOk] = useState(false);
  const [okey, setOkey] = useState(false);
  const [abouts, setAbouts] = useState([]);
  const [uploadButtonText, setUploadButtonText] = useState('Upload Video');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [video, setVideo] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    showAbout();
  }, [success]);
  // console.log('previewVideo', video);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const showAbout = async () => {
    try {
      setValues({ ...values, loading: true });
      setOk(true);
      const { data } = await axios.get(`/api/admin/about`);
      setAbouts(data);
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
      const { data } = await axios.post(`/api/admin/about`, {
        ...values,
        video,
      });
      toast.success('Success');
      setValues({ ...values, description: '', loading: false });
      setSuccess(false);
    } catch (err) {
      console.log(err);
      setValues({ ...values, description: '', loading: false });
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
      //   console.log(data);
      setVideo(data);
      // setValues({ ...values, video: data });
      setUploadButtonText('Upload Video');
      toast.success('Success');
      setLoading(false);
    } catch (err) {
      // console.log(err.response.data);
      setLoading(false);
      setUploadButtonText('Upload Video');
      toast.error('Video upload failed');
    }
  };

  const handleDelete = async (index) => {
    try {
      confirm({
        title: `Are you sure delete this price category`,
        icon: <ExclamationCircleOutlined />,
        content: 'It will be deleted permanentily if you click Yes',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',

        onOk() {
          setValues({ ...values, loading: true });
          let allPrices = prices;
          const removed = allPrices.splice(index, 1);
          setPrices(allPrices);
          // send request to server
          const { data } = axios.delete(`/api/admin/prices/${removed[0]._id}`);
          toast.success('Price Deleted Successfully');
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

    abouts &&
      abouts.forEach((about, index) => {
        data.rows.push({
          name: `${about && about.name}`,
          description: (
            <TextTruncate
              className="MessagesSnapshot-item"
              line={1}
              element="span"
              truncateText="…"
              text={
                about.description ? (
                  <div>{renderHTML(about.description)}</div>
                ) : null
              }
            />
          ),

          action: (
            <>
              <div className="row">
                <div className="col-md-12">
                  <Link href={`/admin/about/${about.slug}`}>
                    <a>
                      {' '}
                      <EditOutlined
                        className="text-success d-flex justify-content-center "
                        style={{ cursor: 'pointer', fontSize: '30px' }}
                      />
                    </a>
                  </Link>
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
        <Layout title="Manage About">
          <AdminRoute>
            <div className="container m-2">
              <div className="row">
                <div className="col-md-4">
                  <h1 className="lead">Manage About</h1>
                </div>
                {/* <div className="col-md-4 offset-md-2">
                  <p
                    className="btn text-white float-right btn-success"
                    onClick={showModal}
                  >
                    {' '}
                    Add New About
                  </p>
                </div> */}
                <Modal
                  title="Add About"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <form onSubmit={handleSubmit}>
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

                    <div className="form-group">
                      <textarea
                        rows="7"
                        name="description"
                        style={{ width: '100%', padding: '5px' }}
                        value={values.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="d-grid gap-2 my-2 ">
                      <button
                        className="btn btn-primary btn-block"
                        disabled={!values.description || loading}
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
            {/* <pre>{JSON.stringify(prices, null, 4)}</pre> */}
          </AdminRoute>
        </Layout>
      )}
    </>
  );
};

export default ManageAbout;
