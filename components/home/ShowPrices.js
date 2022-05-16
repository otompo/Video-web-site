import React, { useEffect, useState } from 'react';
import ButtonComponent from '../button/Button';
import PricesCard from './PricesCard';
import ReactPlayer from 'react-player';
import Loader from '../layout/Loader';
import axios from 'axios';
import { Modal } from 'antd';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
const { confirm } = Modal;

function ShowPrices(props) {
  const [firstName, setFirstName] = useState('');
  const [surName, setSurName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState('');
  const [tempData, setTempData] = useState([]);

  //******************************************************************** */
  const [ok, setOk] = useState(false);
  const [prices, setPrices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // console.log('selectedOffer', tempData[0]);

  const loadModalData = (_id, name) => {
    let offerData = [_id, name];
    setTempData((item) => [...offerData]);

    return showModal();
  };

  useEffect(() => {
    showPrices();
  }, []);

  const showPrices = async () => {
    try {
      setOk(true);
      const { data } = await axios.get(`/api/prices`);
      setPrices(data);
      setOk(false);
    } catch (err) {
      console.log(err);
      setOk(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/offermessage`, {
        firstName,
        surName,
        email,
        budget,
        city,
        selectedOffer: tempData[1],
        phoneNumber,
        message,
      });
      setFirstName('');
      setSurName('');
      setEmail('');
      setMessage('');
      setCity('');
      setBudget('');
      setPhoneNumber('');
      setSelectedOffer('');
      toast.success('Message Successfully');
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  return (
    <div className="container-fluid p-3" id="showprices">
      <div className="row">
        {ok ? (
          <Loader />
        ) : (
          prices.map((item) => (
            <div
              className="col-md-3 my-4"
              key={item._id}
              // onClick={showModal}
              onClick={() => {
                loadModalData(item._id, item.name);
              }}
              style={{ cursor: 'pointer' }}
            >
              <PricesCard
                video={
                  <ReactPlayer
                    url={item && item.video && item.video.Location}
                    controls={false}
                    width="100%"
                    height="200px"
                    playing={true}
                    muted={true}
                    loop={true}
                  />
                }
                title={item && item.name}
                body={item && item.description}
                button={
                  // <Link href={`/prices/${item.slug}`}>
                  //   <a>
                  <ButtonComponent title="Get Offer" />
                  //   </a>
                  // </Link>
                }
              />
              {/* <Link href={`/prices/${item.slug}`}>
                <a>
                 
                </a>
              </Link> */}
            </div>
          ))
        )}
      </div>
      <Modal
        title="GET OFFER HERE"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-title text-center fw-bolder">
                GET OFFER HERE
              </div>
              <p className="text-center">
                Tell us your NEEDS and BUDGET. The price of a video production
                depends a lot on your needs and budget. You are welcome to
                describe your wishes here, so that together we can find the
                right solution and price for you.
              </p>
              <div className="card-body">
                <form onSubmit={handleSubmit} className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        value={surName}
                        onChange={(e) => setSurName(e.target.value)}
                        className="form-control mb-4 p-2"
                        placeholder="Enter surname"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control mb-4 p-2"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phonenumber"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control mb-4 p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control mb-4 p-2"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="Your Budget Framework"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control mb-4 p-2"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City and Country"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <textarea
                      rows="7"
                      style={{ width: '100%', padding: 10 }}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us your needs"
                    ></textarea>
                  </div>
                  <p className="text-center ">
                    We will responses to your inquiry by email within the next
                    24 hours
                  </p>
                  {/* <div className="col-md-12">
                <div className="form-group">{showCategories()}</div>
              </div> */}
                  <div className="d-grid gap-2 my-2 ">
                    <button
                      className="btn btn-primary"
                      // disabled={!name || !email || !subject || !message}
                      type="submit"
                    >
                      {loading ? <Spin /> : 'Submit'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ShowPrices;
