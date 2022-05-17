import ManagePrices from '../../../components/admin/ManagePrices';
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
      return router.push('/');
    }
  }, []);

  return (
    <>
      <ManagePrices />
    </>
  );
};

export default Index;
