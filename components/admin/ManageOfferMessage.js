import React, { useEffect, useState, useContext } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Tooltip, Modal } from 'antd';
import { EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import AdminRoute from '../routes/AdminRoutes';
import Layout from '../layout/Layout';
import Loader from '../layout/Loader';
import moment from 'moment';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Context } from '../../context';
import PageLoader from '../layout/PageLoader';

const ManageOfferMessages = () => {
  const { confirm } = Modal;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [okey, setOkey] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get('/api/user/currentuser');
      // console.log('data', data);
      if (data.ok) setOkey(true);
    } catch (err) {
      console.log(err);
      setOkey(false);
      router.push('/');
    }
  };

  const loadMessages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/admin/offermessages`);
      setMessages(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleDelete = (index) => {
    confirm({
      title: `Are you sure remove this Message`,
      icon: <ExclamationCircleOutlined />,
      content: 'It will be deleted permanentily if you click Yes',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',

      onOk: async () => {
        try {
          setLoading(true);
          let allmessages = messages;
          const removed = allmessages.splice(index, 1);
          // console.log('removed', removed[0]._id);
          setMessages(allmessages);
          // send request to server
          const { data } = await axios.delete(
            `/api/admin/messages/${removed[0]._id}`,
          );
          // console.log('LESSON DELETED =>', data);
          toast.success('Message Deleted Successfully');
          setLoading(false);
        } catch (err) {
          toast.error(err.response.data.message);
          setSuccess(false);
        }
      },

      onCancel() {
        return;
      },
    });
  };

  const setData = () => {
    const data = {
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
        },
        {
          label: 'Phone Number',
          field: 'phoneNumber',
          sort: 'asc',
        },
        {
          label: 'City',
          field: 'city',
          sort: 'asc',
        },
        {
          label: 'Selected Offer',
          field: 'selectedoffer',
          sort: 'asc',
        },
        {
          label: 'Budget',
          field: 'budget',
          sort: 'asc',
        },

        {
          label: 'Send Date',
          field: 'send',
          sort: 'asc',
        },
        {
          label: 'View',
          field: 'view',
          sort: 'asc',
        },

        // {
        //   label: 'Action',
        //   field: 'action',
        //   sort: 'asc',
        // },
      ],
      rows: [],
    };

    messages &&
      messages.forEach((message, index) => {
        data.rows.push({
          name: `${message.firstName}`,
          email: `${message.email}`,
          phoneNumber: `${message.phoneNumber}`,
          city: `${message.city}`,
          selectedoffer: `${message.selectedOffer}`,
          budget: `Kr ${Number(message.budget).toFixed(2)}`,
          send: `${moment(message.createdAt).fromNow()}`,
          view: (
            <Tooltip title="View message">
              <Link href={`/admin/offermessage/${message._id}`}>
                <a>
                  <EyeOutlined className="text-success d-flex justify-content-center" />
                </a>
              </Link>
            </Tooltip>
          ),

          // action: (
          //   <>
          //     <div className="row">
          //       <div className="col-md-6">
          //         <span onClick={() => handleDelete(index)}>
          //           <DeleteOutlined
          //             className="text-danger d-flex justify-content-center "
          //             style={{ cursor: 'pointer' }}
          //           />
          //         </span>
          //       </div>
          //     </div>
          //   </>
          // ),
        });
      });

    return data;
  };

  return (
    <>
      {!okey ? (
        <PageLoader />
      ) : (
        <Layout title="Manage Price Offer Messages">
          <AdminRoute>
            <h1 className="lead">Manage Price Offer Messages</h1>
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
          </AdminRoute>
        </Layout>
      )}
    </>
  );
};

export default ManageOfferMessages;
