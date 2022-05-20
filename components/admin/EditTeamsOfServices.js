import React, { useEffect, useState, useContext } from 'react';
import PageLoader from '../layout/PageLoader';
import { Progress, Spin } from 'antd';
import AdminRoute from '../routes/AdminRoutes';
import Layout from '../layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Context } from '../../context';

function EditTeamsOfServices(props) {
  const router = useRouter();
  const { slug } = router.query;

  const [values, setValues] = useState({
    description: '',
    loading: false,
  });
  const [success, setSuccess] = useState(false);
  const [ok, setOk] = useState(false);
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
    loadSingleTeamsOfService();
  }, [slug, success]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const loadSingleTeamsOfService = async () => {
    try {
      //   setOk(true);
      const { data } = await axios.get(`/api/admin/teamsofservice/${slug}`);
      setValues(data);
      //   setOk(false);
    } catch (err) {
      console.log(err);
      //   setOk(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setValues({ ...values, loading: true });
      setSuccess(true);
      const { data } = await axios.put(`/api/admin/teamsofservice/${slug}`, {
        ...values,
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

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get('/api/user/currentuser');
      // console.log('data', data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push('/');
    }
  };

  return (
    <>
      {!ok ? (
        <PageLoader />
      ) : (
        <Layout title={`Manage ${slug}`}>
          <AdminRoute>
            <div className="container m-2">
              <div className="row">
                <div className="col-md-4">
                  <h1 className="lead">Manage Teams Of Service</h1>
                </div>
                <div className="col-md-6 "></div>
              </div>
              <hr />
              <div className="row my-5">
                <div className="col-md-8 offset-md-2">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <textarea
                        rows="7"
                        name="description"
                        style={{
                          width: '100%',
                          height: '50vh',
                          padding: '10px',
                        }}
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
              </div>
            </div>
            {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
          </AdminRoute>
        </Layout>
      )}
    </>
  );
}

export default EditTeamsOfServices;
