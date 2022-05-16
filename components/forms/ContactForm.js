import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import { toast } from 'react-toastify';

function ContactForm() {
  const [firstName, setFirstName] = useState('');
  const [surName, setSurName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState([]); // categories
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  // console.log('selectedCategory', selectedCategory);
  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/message`, {
        firstName,
        surName,
        email,
        phoneNumber,
        message,
        selectedCategory,
      });
      setFirstName('');
      setEmail('');
      setSurName('');
      setPhoneNumber('');
      setMessage('');
      setSelectedCategory('');

      toast.success('Message successfully send');
      setLoading(false);
    } catch (err) {
      console.log(err);
      // toast.error(err.response.data);
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      // const { data } = await axios.get(`/api/category`);
      const { data } = await axios.get(`/api/prices`);
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = (c) => () => {
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    // console.log(all);
    setChecked(all);
    setSelectedCategory(all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <div class="form-check form-check-inline" key={i}>
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            onChange={handleToggle(c._id)}
          />
          <label
            class="form-check-label"
            for="inlineCheckbox1"
            style={{ textTransform: 'uppercase', fontSize: '16px' }}
          >
            {c.name}
          </label>
        </div>
      ))
    );
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-title text-center fw-bolder">GET OFFER HERE</div>
          <p className="text-center">
            The price of a video production depends a lot on which solution you
            want. Feel free to describe your wishes here. so that together we
            find the right solution and price for you.
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

              <div className="form-group">
                <textarea
                  rows="7"
                  style={{ width: '100%', padding: 10 }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us your needs"
                ></textarea>
              </div>
              <p>What do you want an offer on?</p>
              <div className="col-md-12">
                <div className="form-group">{showCategories()}</div>
              </div>
              <div className="d-grid gap-2 my-2 ">
                <button
                  className="btn btn-primary"
                  disabled={
                    !firstName || !email || !surName || !phoneNumber || !message
                  }
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
  );
}

export default ContactForm;
