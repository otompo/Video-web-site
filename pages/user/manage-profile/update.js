import UserRoute from '../../../components/routes/UserRoutes';
import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../../components/layout/Layout';
import Profile from '../../../components/user/Profile';
import { useRouter } from 'next/router';
import { Context } from '../../../context';
import axios from 'axios';
import PageLoader from '../../../components/layout/PageLoader';

const UserProfilePage = () => {
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
      const { data } = await axios.get('/api/user/currentuser', {
        headers: { authorization: `Bearer ${user.token}` },
      });
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push(redirect || '/');
    }
  };
  return <>{!ok ? <PageLoader /> : <Profile />}</>;
};

export default UserProfilePage;
