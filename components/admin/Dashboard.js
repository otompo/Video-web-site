import { CaretUpOutlined, TeamOutlined, BookOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Context } from '../../context';
import { useRouter } from 'next/router';
import Card from './Card';
import PageLoader from '../layout/PageLoader';

const Dashboard = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [ourWorks, setOurWorks] = useState([]);
  const [usersTotal, setUsersTotal] = useState([]);
  const [category, setCategory] = useState([]);
  const [ok, setOk] = useState(false);
  const { redirect } = router.query;
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
    getTotalUsers();
    showCategory();
    showourWorks();
    fetchCurrentUser();
  }, []);

  const showourWorks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/admin/ourworks`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setOurWorks(data);
      setLoading(false);
    } catch (err) {
      console.log(err.response);
      setLoading(false);
    }
  };

  const showCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/admin/category`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      //console.log(data);
      setCategory(data.total);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getTotalUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/admin/users`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      // console.log(data);
      setUsersTotal(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

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
        <div className="container-fluid" id="admin">
          <div className="row mt-5">
            <Card
              icon={<BookOutlined style={{ color: 'green' }} />}
              cade_title="Our Works"
              cade_total={ourWorks.length}
            />
            <Card
              icon={<TeamOutlined style={{ color: 'green' }} />}
              cade_title="Total Staff"
              cade_total={usersTotal.length}
            />

            <Card
              icon={<CaretUpOutlined style={{ color: 'green' }} />}
              cade_title="Total Categories"
              cade_total={category}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
