import React, { useEffect, useState, useContext } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Modal, Progress } from 'antd';
import Link from 'next/link';
import {
  DeleteOutlined,
  EyeOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import AdminRoute from '../routes/AdminRoutes';
import Layout from '../layout/Layout';
import { toast } from 'react-toastify';
import { Context } from '../../context';
const { confirm } = Modal;

const ManagePriceDetail = () => {
  const [values, setValues] = useState({
    title: '',
    price: '',
    loading: false,
  });
  const [featurprices, setFeaturprices] = useState([]);
  const [uploadButtonText, setUploadButtonText] = useState('Upload Video');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ok, setOk] = useState(false);
  const [video, setVideo] = useState({});
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [prices, setPrices] = useState([]);
  const [checked, setChecked] = useState([]); // categories
  const [inputList, setInputList] = useState([{ name: '' }]);
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
    showFeaturePrices();
    showPrices();
  }, [success]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  const handleAddInput = (e) => {
    setInputList([...inputList, { name: '' }]);
  };
  const handleRemoveInput = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const showPrices = async () => {
    try {
      setOk(true);
      const { data } = await axios.get(`/api/admin/prices`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setPrices(data);
      setOk(false);
    } catch (err) {
      console.log(err);
      setOk(false);
    }
  };
  //   console.log(selectedCategory);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setValues({ ...values, loading: true });
      setSuccess(true);
      const { data } = await axios.post(
        `/api/admin/featureprice`,
        {
          ...values,
          selectedCategory,
          inputList,
          // video,
        },
        { headers: { authorization: `Bearer ${user.token}` } },
      );
      toast.success('Success');
      setValues({ ...values, title: '', price: '', loading: false });
      setSelectedCategory('');
      setInputList([{ name: '' }]);
      setSuccess(false);
    } catch (err) {
      console.log(err.response.data);
      setValues({ ...values, title: '', price: '', loading: false });
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
      const { data } = await axios.post(
        `/api/upload/video`,
        { headers: { authorization: `Bearer ${user.token}` } },
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        },
      );
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

  const showFeaturePrices = async () => {
    try {
      setValues({ ...values, loading: true });
      const { data } = await axios.get(`/api/admin/featureprice`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setFeaturprices(data);
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
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
          let allFeaturprices = featurprices;
          const removed = allFeaturprices.splice(index, 1);
          // console.log('removed', removed[0]._id);
          setFeaturprices(allFeaturprices);
          // send request to server
          const { data } = await axios.delete(
            `/api/admin/featureprice/${removed[0]._id}`,
          );
          // console.log('LESSON DELETED =>', data);
          toast.success('Deleted Successfully');
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
  };

  const showPriceCategories = () => {
    return (
      prices &&
      prices.map((price, i) => (
        <ul key={i} style={{ maxHeight: '200px' }} className="list-group">
          <li className="list-unstyled list-group-item pl-5">
            <input
              onChange={handleToggle(price._id)}
              type="checkbox"
              className=" form-check-input me-1 mr-2"
            />
            <label className="form-check-label">{price.name}</label>
          </li>
        </ul>
      ))
    );
  };

  const setData = () => {
    const data = {
      columns: [
        {
          label: 'Title',
          field: 'title',
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

    featurprices &&
      featurprices.forEach((featurprice, index) => {
        data.rows.push({
          title: `${featurprice.title}`,
          category: `${
            featurprice &&
            featurprice.category &&
            featurprice.category.map((c, i) => `${c && c.name}`)
          }`,
          createdat: `${moment(featurprice.createdAt).fromNow()}`,

          action: (
            <>
              <div className="row">
                <div className="col-md-6">
                  <Link
                    key={index}
                    href={`/admin/price-detail/${featurprice.slug}`}
                  >
                    <a>
                      <EyeOutlined className="text-success d-flex justify-content-center" />
                    </a>
                  </Link>
                </div>
                <div className="col-md-6">
                  <span
                    onClick={() => handleDelete(index)}
                    // className="pt-1 pl-3"
                  >
                    <DeleteOutlined
                      className="text-danger d-flex justify-content-center"
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
    <Layout title="Manage Feature Price">
      <AdminRoute>
        <div className="container ourWorks">
          <div className="row m-4">
            <div className="col-md-6">
              <h1 className="lead">Manage Feature Price</h1>
            </div>
            <div className="col-md-6">
              <p
                className="btn text-white float-right btn-success m-2"
                onClick={showModal}
              >
                {' '}
                Add New Feature Price
              </p>
              {/* <Link href="/admin/works/create">
                <a className="btn text-white float-right new-room btn-success m-2">
                  {' '}
                  Add New Work
                </a>
              </Link> */}
            </div>
            <Modal
              title="Add Price Details"
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
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        className="form-control mb-4 p-2"
                        placeholder="Enter title"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        className="form-control mb-4 p-2"
                        placeholder="Enter price"
                        required
                      />
                    </div>

                    <div className="form-group">
                      {inputList.map((item, i) => (
                        <div className="row" key={i}>
                          <div className="col-md-8">
                            <div className="form-group">
                              <input
                                type="text"
                                id="price_field"
                                className="form-control"
                                name="name"
                                value={item.ingredient}
                                onChange={(e) => handleInputChange(e, i)}
                                placeholder="Enter feature"
                              />
                            </div>
                          </div>

                          <div className="col-md-4">
                            {inputList.length !== 1 && (
                              <input
                                type="button"
                                className="btn btn-danger"
                                value="Remove"
                                onClick={handleRemoveInput}
                              />
                            )}
                          </div>
                          <div className="col-md-4">
                            {inputList.length - 1 === i && (
                              <input
                                type="button"
                                className="btn btn-primary large"
                                value="Add"
                                onClick={handleAddInput}
                                style={{ marginLeft: '-5px' }}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* <div className="form-group">
                      <label className="btn btn-dark btn-block text-left mt-3 text-center">
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
                    </div> */}
                    {/* <div className="form-group">
                      {progress > 0 && (
                        <Progress
                          className="d-flex justify-content-center pt-2"
                          percent={progress}
                          steps={10}
                        />
                      )}
                    </div> */}
                    <div className="d-grid gap-2 my-2 ">
                      <button
                        className="btn btn-primary"
                        disabled={!values.title || !values.price || loading}
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
                  {showPriceCategories()}
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
  );
};

export default ManagePriceDetail;
