import CreateNewWork from '../../../components/crud/CreateNewWork';
import PageLoader from '../../../components/layout/PageLoader';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../../../context';

const CreateBlog = () => {
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
  return <CreateNewWork />;
};

export default CreateBlog;
