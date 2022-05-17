import SingleOfferMessage from '../../../components/admin/SingleOfferMessage';
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

  return <SingleOfferMessage />;
};

export default Index;
