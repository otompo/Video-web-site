import React, { useState, useEffect, useContext } from 'react';
import UserRouter from '../../components/routes/UserRoutes';
import Layout from '../../components/layout/Layout';
import { Context } from '../../context';
import { useRouter } from 'next/router';
import axios from 'axios';
import PageLoader from '../../components/layout/PageLoader';

const UserIndex = () => {
  const router = useRouter();
  const [current, setCurrent] = useState('');
  const [ok, setOk] = useState(false);
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const { redirect } = router.query;

  // useEffect(() => {
  //   process.browser && setCurrent(window.location.pathname);
  // }, [process.browser && window.location.pathname]);
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
      const { data } = await axios.get('/api/user/currentuser', {
        headers: { authorization: `Bearer ${user.token}` },
      });
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
            {/* <pre> {JSON.stringify(user, null, 4)}</pre> */}
          </UserRouter>
        </Layout>
      )}
    </>
  );
};

export default UserIndex;
