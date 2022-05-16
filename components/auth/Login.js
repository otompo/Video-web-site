import React, { useEffect, useState, Fragment, useContext } from 'react';
import TopTitle from '../home/TopTitle';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import { Context } from '../../context';
import { useRouter } from 'next/router';
import PageLoader from '../layout/PageLoader';
import Cookies from 'js-cookie';
import axios from 'axios';

const Login = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const [email, setEmail] = useState('sasco@gmail.com');
  const [password, setPassword] = useState('otompo123@');
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/');
      return fetchCurrentUser();
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get('/api/user/currentuser', {
        headers: { authorization: `Bearer ${user.token}` },
      });
      // console.log('data', data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/login', {
        email,
        password,
      });
      dispatch({
        type: 'LOGIN',
        payload: data,
      });
      // save in local storage
      window.localStorage.setItem('userInfor', JSON.stringify(data));
      Cookies.set('user', data);
      router.push('/user');
      toast.success('SignIn Success');
      setLoading(false);
    } catch (err) {
      // console.log(err.response);
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {ok ? (
        <PageLoader />
      ) : (
        <>
          <div className="container-fluid industries-bnr">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="text-center" style={{ marginTop: '150px' }}>
                  <TopTitle
                    welc={'LOGIN'}
                    // cname={"CODE SMART WEBSOFT"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="container my-5">
            <div className="row">
              <div className="col-md-6 offset-md-4">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <input
                        type="email"
                        className="form-control mb-4 p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                      />
                      <input
                        type="password"
                        className="form-control mb-4 p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                      />
                      <div className="d-grid gap-2">
                        <button
                          disabled={!email || !password || loading}
                          className="btn btn-primary"
                          type="submit"
                        >
                          {loading ? <SyncOutlined spin /> : 'Login'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Login;
