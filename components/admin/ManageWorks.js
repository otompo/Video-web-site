import React, { useEffect, useState, useContext } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Spin, Modal, Progress } from 'antd';
import {
  DeleteOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import AdminRoute from '../routes/AdminRoutes';
import Layout from '../layout/Layout';
import { toast } from 'react-toastify';
import { Context } from '../../context';
import { useRouter } from 'next/router';
import PageLoader from '../layout/PageLoader';

const { confirm } = Modal;

const ManageWorks = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: '',
    description: '',
    loading: false,
  });
  const [ourWorks, setOurWorks] = useState('');
  const [uploadButtonText, setUploadButtonText] = useState('Upload Video');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [video, setVideo] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [okey, setOkey] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]); // categories

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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    showourWorks();
    loadCategories();
  }, [success]);

  useEffect(() => {
    if (!user) {
      return router.push('/');
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get(`/api/admin/category`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setCategories(data.category);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(selectedCategory);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setValues({ ...values, loading: true });
      setSuccess(true);
      const { data } = await axios.post(
        `/api/admin/ourworks`,
        {
          ...values,
          video,
          selectedCategory,
        },
        { headers: { authorization: `Bearer ${user.token}` } },
      );
      toast.success('Success');
      setValues({ ...values, name: '', description: '', loading: false });
      setSuccess(false);
    } catch (err) {
      console.log(err);
      setValues({ ...values, name: '', description: '', loading: false });
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

  const showourWorks = async () => {
    try {
      setValues({ ...values, loading: true });
      const { data } = await axios.get(`/api/admin/ourworks`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setOurWorks(data);
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err.response);
      setValues({ ...values, loading: false });
    }
  };

  const handleDelete = (index) => {
    confirm({
      title: `Are you sure delete`,
      icon: <ExclamationCircleOutlined />,
      content: 'It will be deleted permanentily if you click Yes',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',

      onOk: async () => {
        try {
          //   const answer = window.confirm('Are you sure you want to delete?');
          //   if (!answer) return;
          setLoading(true);
          let allworks = ourWorks;
          const removed = allworks.splice(index, 1);
          // console.log('removed', removed[0]._id);
          setOurWorks(allworks);
          // send request to server
          const { data } = await axios.delete(
            `/api/admin/ourworks/${removed[0]._id}`,
            { headers: { authorization: `Bearer ${user.token}` } },
          );
          // console.log('LESSON DELETED =>', data);
          toast.success('Work Deleted Successfully');
          setLoading(false);
        } catch (err) {
          toast.error(err.response.data.message);
          setLoading(false);
        }
      },
      onCancel() {
        return;
      },
    });
  };

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get('/api/user/currentuser', {
        headers: { authorization: `Bearer ${user.token}` },
      });
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
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Category',
          field: 'category',
          sort: 'asc',
        },
        {
          label: 'Created At',
          field: 'createdat',
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

    ourWorks &&
      ourWorks.forEach((ourWork, index) => {
        data.rows.push({
          name: `${ourWork.name}`,
          category: `${
            ourWork &&
            ourWork.category &&
            ourWork.category.map((c, i) => `${c && c.title}`)
          }`,
          createdat: `${moment(ourWork.createdAt).fromNow()}`,

          action: (
            <>
              <span
                onClick={() => handleDelete(index)}
                // className="pt-1 pl-3"
              >
                <DeleteOutlined
                  className="text-danger d-flex justify-content-center"
                  style={{ cursor: 'pointer' }}
                />
              </span>
            </>
          ),
        });
      });

    return data;
  };

  const handleToggle = (c) => () => {
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    // console.log(all);
    setChecked(all);
    setSelectedCategory(all);
    // formData.set('categories', all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleToggle(c._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{c.title}</label>
        </li>
      ))
    );
  };

  return (
    <>
      {!okey ? (
        <PageLoader />
      ) : (
        <Layout title="Manage Our Works">
          <AdminRoute>
            <div className="container ourWorks">
              <div className="row m-4">
                <div className="col-md-6">
                  <h1 className="lead">Manage Our Works</h1>
                </div>
                <div className="col-md-6">
                  <p
                    className="btn text-white float-right btn-success m-2"
                    onClick={showModal}
                  >
                    {' '}
                    Add New Work
                  </p>
                  {/* <Link href="/admin/works/create">
                <a className="btn text-white float-right new-room btn-success m-2">
                  {' '}
                  Add New Work
                </a>
              </Link> */}
                </div>
                <Modal
                  title="Add Work"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <div className="row">
                    <div className="col-md-6">
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
                            style={{ width: '100%', padding: '10px' }}
                            value={values.description}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                        <div className="d-grid gap-2 my-2 ">
                          <button
                            className="btn btn-primary"
                            disabled={
                              !values.name || !values.description || loading
                            }
                            type="submit"
                          >
                            {values.loading ? <SyncOutlined spin /> : 'Submit'}
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-6">
                      <h1 className="lead  ml-5">Categories</h1>
                      <hr />
                      <ul style={{ maxHeight: '200px' }}>{showCategories()}</ul>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
            <hr />
            {/* <pre>{JSON.stringify(categories, null, 4)}</pre> */}
            <MDBDataTable
              data={setData()}
              className="px-3"
              bordered
              striped
              hover
            />
          </AdminRoute>
        </Layout>
      )}
    </>
  );
};

export default ManageWorks;
