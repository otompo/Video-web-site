import { useState, Fragment } from 'react';
import TopTitle from '../components/home/TopTitle';
import axios from 'axios';
import { SyncOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import Layout from '../components/layout/Layout';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // router
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/auth/password/reset-password`, {
        email,
      });
      setSuccess(true);
      toast.success('Check your Email for Short Code');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/auth/reset-password`, {
        email,
        code,
        newPassword,
      });
      setEmail('');
      setCode('');
      setNewPassword('');
      setLoading(false);
      toast.success('Great! Now you can  login with your new password');
      router.push('/login');
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  return (
    <Layout title="Forgot Password">
      <Fragment>
        <div className="container-fluid industries-bnr">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="text-center" style={{ marginTop: '150px' }}>
                <TopTitle
                  welc={'Password Reset'}
                  slogan={'LEARN, BUILD & GROW'}
                  // cname={"CODE SMART WEBSOFT"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mb-5 mt-3">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Forgot Password</h5>
                  <form onSubmit={success ? handleResetPassword : handleSubmit}>
                    <input
                      type="email"
                      className="form-control mb-4 p-2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      required
                    />

                    {success && (
                      <Fragment>
                        <input
                          type="password"
                          className="form-control mb-4 p-2"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="Enter secret code"
                          required
                        />

                        <input
                          type="password"
                          className="form-control mb-4 p-2"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          required
                        />
                      </Fragment>
                    )}
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={loading || !email}
                      >
                        {loading ? <SyncOutlined spin /> : 'Submit'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({
    req: context.req,
  });
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default ForgotPassword;
