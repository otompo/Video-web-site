import { useState, useContext, useEffect } from 'react';
import axios from 'axios';

const useHome = () => {
  // state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [testimonialTitleOne, setTestimonialTitleOne] = useState('');
  const [testimonialTitleTwo, setTestimonialTitleTwo] = useState('');

  useEffect(() => {
    loadHomepage();
  }, []);

  const loadHomepage = async () => {
    try {
      const { data } = await axios.get('/api/admin/website/home');
      //   console.log(data);
      setTitle(data.title);
      setSubtitle(data.subtitle);
      setTestimonialTitleOne(data.testimonialTitleOne);
      setTestimonialTitleTwo(data.testimonialTitleTwo);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    title,
    subtitle,
    testimonialTitleOne,
    testimonialTitleTwo,
    setTitle,
    setSubtitle,
    setTestimonialTitleOne,
    setTestimonialTitleTwo,
  };
};

export default useHome;
