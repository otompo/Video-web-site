import React, { useEffect, useState, useContext } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Spin, Modal, Progress, Image } from 'antd';
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import AdminRoute from '../routes/AdminRoutes';
import Layout from '../layout/Layout';
import moment from 'moment';
import TextTruncate from 'react-text-truncate';
import axios from 'axios';
import { toast } from 'react-toastify';
import Resizer from 'react-image-file-resizer';
import Loader from '../layout/Loader';
import { Context } from '../../context';

const { confirm } = Modal;

const ManageReviews = () => {
  const [values, setValues] = useState({
    name: '',
    loading: false,
  });
  const [success, setSuccess] = useState(false);
  const [ok, setOk] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [uploadButtonText, setUploadButtonText] = useState('Upload Video');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [video, setVideo] = useState({});
  // const [imagePreview, setImagePreview] = useState('');
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
    showReviews();
  }, [success]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const showReviews = async () => {
    try {
      setValues({ ...values, loading: true });
      setOk(true);
      const { data } = await axios.get(`/api/admin/reviews`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setReviews(data);
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
        `/api/admin/reviews`,
        {
          ...values,
          video,
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

  // const handleImage = (e) => {
  //   e.preventDefault();
  //   let file = e.target.files[0];
  //   setImagePreview(window.URL.createObjectURL(file));

  //   setLoading(true);
  //   // resize image and send image to backend
  //   Resizer.imageFileResizer(file, 720, 500, 'JPEG', 100, 0, async (uri) => {
  //     try {
  //       let { data } = await axios.post(`/api/user/profileimage`, {
  //         profileImage: uri,
  //       });
  //       // set image in the state
  //       setProfileImage(data);
  //       setLoading(false);
  //       setUploadButtonText('Upload Image');
  //       toast.success('Success');
  //     } catch (err) {
  //       console.log(err.response.data.message);
  //       setUploadButtonText('Upload Image');
  //       setLoading(false);
  //     }
  //   });
  // };

  const handleDelete = async (index) => {
    try {
      confirm({
        title: `Are you sure delete this reviews `,
        icon: <ExclamationCircleOutlined />,
        content: 'It will be deleted permanentily if you click Yes',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',

        onOk() {
          setValues({ ...values, loading: true });
          let allReview = reviews;
          const removed = allReview.splice(index, 1);
          setReviews(allReview);
          // send request to server
          const { data } = axios.delete(
            `/api/admin/reviews/${removed[0]._id}`,
            { headers: { authorization: `Bearer ${user.token}` } },
          );
          toast.success('Reviews Deleted Successfully');
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
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },

        {
          label: 'Created Date',
          field: 'created',
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

    reviews &&
      reviews.forEach((review, index) => {
        data.rows.push({
          name: `${review && review.name}`,
          created: `${moment(review.createdAt).fromNow()}`,
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
    <Layout title="Manage Reviews">
      <AdminRoute>
        <div className="container m-2">
          <div className="row">
            <div className="col-md-4">
              <h1 className="lead">Manage Reviews</h1>
            </div>
            <div className="col-md-4 offset-md-2">
              <p
                className="btn text-white float-right btn-success"
                onClick={showModal}
              >
                {' '}
                Add New Review
              </p>
            </div>
            <Modal
              title="Add Review"
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

                <div className="form-group">
                  <label
                    className="btn btn-dark btn-block text-left mt-3 text-center"
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
                      onChange={handleVideo}
                      accept="video/*"
                      hidden
                    />
                  </label>
                </div>
                <div className="form-group">
                  {progress > 0 && (
                    <Progress
                      className="d-flex justify-content-center pt-2 my-3"
                      percent={progress}
                      steps={10}
                      // style={{ marginRight: '152px' }}
                    />
                  )}
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
        {/* <pre>{JSON.stringify(prices, null, 4)}</pre> */}
      </AdminRoute>
    </Layout>
  );
};

export default ManageReviews;
