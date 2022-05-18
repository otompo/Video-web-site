import React, { useEffect, useState, useContext } from 'react';
import PageLoader from '../layout/PageLoader';
import { Progress, Spin } from 'antd';
import AdminRoute from '../routes/AdminRoutes';
import Layout from '../layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Context } from '../../context';

const EditAbout = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [values, setValues] = useState({
    description: '',
    loading: false,
  });
  const [success, setSuccess] = useState(false);
  const [ok, setOk] = useState(false);
  const [okey, setOkey] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState('Upload Video');
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
    loadSingleAbout();
  }, [slug, success]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const loadSingleAbout = async () => {
    try {
      //   setOk(true);
      const { data } = await axios.get(`/api/admin/about/${slug}`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setValues(data);
      //   setOk(false);
    } catch (err) {
      console.log(err);
      //   setOk(false);
    }
  };

  const handleAboutVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      setOk(true);
      const { data } = await axios.put(
        `/api/admin/about/${slug}`,
        {
          video,
        },
        { headers: { authorization: `Bearer ${user.token}` } },
      );
      setOk(false);
      setProgress(0);
      setVideo({});
      toast.success('Video Saved');
    } catch (err) {
      // console.log(err)
      toast.error(err.response.data);
      setOk(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setValues({ ...values, loading: true });
      setSuccess(true);
      const { data } = await axios.patch(
        `/api/admin/about/${slug}`,
        {
          ...values,
        },
        { headers: { authorization: `Bearer ${user.token}` } },
      );
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

  return (
    <>
      {!okey ? (
        <PageLoader />
      ) : (
        <Layout title={`Manage ${slug}`}>
          <AdminRoute>
            <div className="container m-2">
              <div className="row">
                <div className="col-md-4">
                  <h1 className="lead">Manage About</h1>
                </div>
                <div className="col-md-4 offset-md-2"></div>
              </div>
              <hr />
              <div className="row my-5">
                <div className="col-md-6">
                  <form onSubmit={handleSubmit}>
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
                        className="btn btn-primary"
                        disabled={!values.description}
                        type="submit"
                      >
                        {values.loading ? <Spin /> : 'Update Description'}
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-md-4 offset-md-2">
                  <form onSubmit={handleAboutVideoSubmit}>
                    <div className="form-group">
                      <label
                        className="btn btn-dark btn-block text-left my-1 text-center float-right"
                        style={{
                          width: '50%',
                          height: '20vh',
                          padding: '50px',
                        }}
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
                          className="d-flex justify-content-center pt-2 my-3"
                          percent={progress}
                          steps={10}
                          style={{ marginRight: '152px' }}
                        />
                      )}
                    </div>

                    <div className="d-grid gap-2 my-2 ">
                      <button
                        className="btn btn-primary"
                        disabled={loading}
                        type="submit"
                        style={{ width: '50%' }}
                      >
                        {ok ? <Spin /> : 'Update Video'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
          </AdminRoute>
        </Layout>
      )}
    </>
  );
};

export default EditAbout;
