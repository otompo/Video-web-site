import { useEffect, useContext } from 'react';
import ManageAbout from '../../../components/admin/ManageAbout';
import PageLoader from '../../../components/layout/PageLoader';
import { Context } from '../../../context';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, []);

  return <ManageAbout />;
};

export default Index;
