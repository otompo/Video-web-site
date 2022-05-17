import ManageMessages from '../../../components/admin/ManageMessages';
import PageLoader from '../../../components/layout/PageLoader';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../../../context';

const MessagesIndex = () => {
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

  return <ManageMessages />;
};

export default MessagesIndex;
