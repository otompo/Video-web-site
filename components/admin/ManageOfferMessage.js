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

const ManageOfferMessages = () => {
  const { confirm } = Modal;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/admin/offermessages`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
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
          budget: `${message.budget}`,
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
  );
};

export default ManageOfferMessages;
