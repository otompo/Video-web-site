import { useEffect, useState, useContext } from 'react';
import AdminRoute from '../../../../components/routes/AdminRoutes';
import Layout from '../../../../components/layout/Layout';
import { useRouter } from 'next/router';
import moment from 'moment';
import axios from 'axios';
import { Context } from '../../../../context';
import PageLoader from '../../../../components/layout/PageLoader';

const UserProfilePage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [loading, setLoading] = useState('');
  const [okey, setOkey] = useState(false);
  const [userInfor, setUserInfor] = useState({});
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    loadUser();
  }, [username]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/profile/${username}`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      // console.log(data);
      setUserInfor(data);
      setLoading(false);
    } catch (err) {
      console.log(err.response);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get('/api/user/currentuser', {
        headers: { authorization: `Bearer ${user.token}` },
      });
      // console.log('data', data);
      if (data.ok) setOkey(true);
    } catch (err) {
      console.log(err);
      setOkey(false);
      router.push('/');
    }
  };

  const editUserProfileForm = () => {
    return (
      <>
        {!okey ? (
          <PageLoader />
        ) : (
          <div className="container-fluid mt-3">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="card">
                  <div className="card-body">
                    <table className="table caption-top table-striped">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Role</th>
                          <th scope="col">Generated Password</th>
                          <th scope="col">Joined At</th>
                          <th scope="col">Last login</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{userInfor && userInfor.name}</td>
                          <td>{userInfor && userInfor.email}</td>
                          <td>{userInfor && userInfor.role}</td>
                          <td>{userInfor && userInfor.generatedPasword}</td>
                          <td>{moment(userInfor.createdAt).fromNow()}</td>
                          <td>{moment(userInfor.last_login_date).fromNow()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <Layout title={user && user.name}>
      <AdminRoute>
        <div>
          <h1 className="lead">{user && user.name}`s Profile</h1>
          <hr />
          {editUserProfileForm()}
        </div>
      </AdminRoute>
    </Layout>
  );
};

export default UserProfilePage;
