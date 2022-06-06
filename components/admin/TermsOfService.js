import React, { useEffect, useState, useContext } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Spin, Modal } from 'antd';
import { EditFilled } from '@ant-design/icons';
import AdminRoute from '../routes/AdminRoutes';
import Layout from '../layout/Layout';
import TextTruncate from 'react-text-truncate';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../layout/Loader';
import Link from 'next/link';
import { Context } from '../../context';
import { useRouter } from 'next/router';
import PageLoader from '../layout/PageLoader';
const { confirm } = Modal;
import renderHTML from 'react-render-html';

function TermsOfService(props) {
  const router = useRouter();
  const [values, setValues] = useState({
    description: '',
    loading: false,
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [teams, setTeams] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    showTeamsOfService();
  }, [success]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const showTeamsOfService = async () => {
    try {
      setValues({ ...values, loading: true });
      setLoading(true);
      const { data } = await axios.get(`/api/admin/teamsofservice`);
      setTeams(data);
      setValues({ ...values, loading: false });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setValues({ ...values, loading: true });
      setSuccess(true);
      const { data } = await axios.post(`/api/admin/teamsofservice`, {
        ...values,
      });
      toast.success('Success');
      setValues({ ...values, description: '', loading: false });
      setSuccess(false);
    } catch (err) {
      console.log(err);
      setValues({ ...values, description: '', loading: false });
      setSuccess(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get('/api/user/currentuser');
      // console.log('data', data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push('/');
    }
  };

  const setData = () => {
    const data = {
      columns: [
        {
          label: 'Description',
          field: 'description',
          sort: 'asc',
        },

        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    teams &&
      teams.forEach((team, index) => {
        data.rows.push({
          description: (
            <TextTruncate
              className="MessagesSnapshot-item"
              line={2}
              element="span"
              truncateText="…"
              text={
                team.description ? (
                  <div>{renderHTML(team.description)}</div>
                ) : null
              }
            />
          ),

          action: (
            <>
              <div className="row">
                <div className="col-md-12">
                  <Link href={`/admin/termsofservice/${team.slug}`}>
                    <a>
                      {' '}
                      <EditFilled
                        className="text-success d-flex justify-content-center "
                        style={{ cursor: 'pointer', fontSize: '35px' }}
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </>
          ),
        });
      });

    return data;
  };

  return (
    <>
      {!ok ? (
        <PageLoader />
      ) : (
        <Layout title="Manage Teams of Service">
          <AdminRoute>
            <div className="container m-2">
              <div className="row">
                <div className="col-md-4">
                  <h1 className="lead">Manage Teams of Service</h1>
                </div>
                {/* <div className="col-md-4 offset-md-2">
                  <p
                    className="btn text-white float-right btn-success"
                    onClick={showModal}
                  >
                    {' '}
                    Add Teams of Service
                  </p>
                </div> */}
                <Modal
                  title="Add Teams of Service"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <textarea
                        rows="7"
                        name="description"
                        style={{ width: '100%', padding: '10px' }}
                        value={values.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="d-grid gap-2 my-2 ">
                      <button
                        className="btn btn-primary"
                        disabled={!values.description}
                        type="submit"
                      >
                        {values.loading ? <Spin /> : 'Submit'}
                      </button>
                    </div>
                  </form>
                </Modal>
              </div>
            </div>
            <hr />
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setData()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
            {/* <pre>{JSON.stringify(prices, null, 4)}</pre> */}
          </AdminRoute>
        </Layout>
      )}
    </>
  );
}

export default TermsOfService;
