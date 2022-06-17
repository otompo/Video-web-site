import { useState, useContext, useEffect } from 'react';
import axios from 'axios';

const useContact = () => {
  // state
  const [contactTitleOne, setContactTitleOne] = useState('');
  const [contactTitleTwo, setContactTitleTwo] = useState('');
  const [contactTitleThree, setContactTitleThree] = useState('');
  const [contactTitleFour, setContactTitleFour] = useState('');

  const [contactDescriptionOne, setContactDescriptionOne] = useState('');
  const [contactDescriptionTwo, setContactDescriptionTwo] = useState('');
  const [contactDescriptionThree, setContactDescriptionThree] = useState('');
  const [contactDescriptionFour, setContactDescriptionFour] = useState('');

  useEffect(() => {
    loadHomepage();
  }, []);

  const loadHomepage = async () => {
    try {
      const { data } = await axios.get('/api/admin/websitecontact/contact');
      //   console.log(data);
      setContactTitleOne(data.contactTitleOne);
      setContactTitleTwo(data.contactTitleTwo);
      setContactTitleThree(data.contactTitleThree);
      setContactTitleFour(data.contactTitleFour);

      setContactDescriptionOne(data.contactDescriptionOne);
      setContactDescriptionTwo(data.contactDescriptionTwo);
      setContactDescriptionThree(data.contactDescriptionThree);
      setContactDescriptionFour(data.contactDescriptionFour);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    contactTitleOne,
    contactTitleTwo,
    contactTitleThree,
    contactTitleFour,

    contactDescriptionOne,
    contactDescriptionTwo,
    contactDescriptionThree,
    contactDescriptionFour,

    setContactTitleOne,
    setContactTitleTwo,
    setContactTitleThree,
    setContactTitleFour,

    setContactDescriptionOne,
    setContactDescriptionTwo,
    setContactDescriptionThree,
    setContactDescriptionFour,
  };
};

export default useContact;
