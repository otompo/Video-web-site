import { useEffect, useContext } from 'react';
import EditAbout from '../../../components/admin/EditAbout';
import PageLoader from '../../../components/layout/PageLoader';
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

  return <EditAbout />;
};

export default Index;
