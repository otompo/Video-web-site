import React, { useState, useEffect, useContext } from 'react';
import UserRouter from '../../components/routes/UserRoutes';
import Layout from '../../components/layout/Layout';
import { Context } from '../../context';
import { useRouter } from 'next/router';
import axios from 'axios';
import PageLoader from '../../components/layout/PageLoader';
import moment from 'moment';
const UserIndex = () => {
  const router = useRouter();
  const [ok, setOk] = useState(false);
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const { redirect } = router.query;

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get('/api/user/currentuser');
      // console.log('data', data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push(redirect || '/');
    }
  };

  return (
    <>
      {!ok ? (
        <PageLoader />
      ) : (
        <Layout title="Dashboard">
          <UserRouter>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <di className="card">
                    <div className="card-body">
                      <h4 className="d-inline">
                        Welcome Back{' '}
                        <span className="text-primary lead">
                          {user && user.name}
                        </span>
                      </h4>{' '}
                    </div>
                  </di>
                </div>
              </div>
            </div>
            {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}
          </UserRouter>
        </Layout>
      )}
    </>
  );
};

export default UserIndex;
