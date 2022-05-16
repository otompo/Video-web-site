import { useEffect, useContext } from 'react';
import ManageAbout from '../../../components/admin/ManageAbout';
import PageLoader from '../../../components/layout/PageLoader';
import { Context } from '../../../context';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
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
    if (user && !user.isAdmin) {
      router.push('/');
    }
  }, []);

  return (
    <>{!user || (user && !user.isAdmin) ? <PageLoader /> : <ManageAbout />}</>
  );
};

export default Index;
