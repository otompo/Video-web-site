import ManageReviews from '../../../components/admin/ManageReviews';
import PageLoader from '../../../components/layout/PageLoader';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../../../context';

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
    <>{!user || (user && !user.isAdmin) ? <PageLoader /> : <ManageReviews />}</>
  );
};

export default Index;
