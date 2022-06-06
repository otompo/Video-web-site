import React, { useState } from 'react';
import Testimonial from 'react-testimonial';
import ContactForm from './forms/ContactForm';
import { Modal } from 'antd';
const { confirm } = Modal;

const Hero = ({
  title = 'Afrotalian',
  subtitle = 'VIDEO CREATION THAT TELL YOUR STORY',
  testimonialTitleOne = 'BEST VIDEO PRODUCTION FOR FILM-MAKING, WEDDING',
  testimonialTitleTwo = 'COMMERCIAL & PRIVATE EVENTS AND ADVERTISING',
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="hero" id="hero">
      <video autoPlay loop muted className="w-full h-screen z-10 video">
        <source src="/videos/video-1.mp4" type="video/mp4" />
      </video>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="content">
              <p>{title}</p>
              <div>
                <Testimonial>
                  <div className="testi mx-auto">{testimonialTitleOne}</div>
                  <div className="testi mx-auto">{testimonialTitleTwo}</div>
                </Testimonial>
              </div>
              {/* <p>
                The Best Video Production For Filmmaking, Wedding Commercial &
                Private Event And Advertising
              </p> */}
              <p>{subtitle}</p>
              <button href="/" className="button center" onClick={showModal}>
                GET OFFER NOW
              </button>
              <Modal
                title="GET OFFER HERE"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
              >
                <ContactForm />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
