import React, { useState } from 'react';
import Testimonial from 'react-testimonial';
import ContactForm from './forms/ContactForm';
import { Modal } from 'antd';
const { confirm } = Modal;

const Hero = () => {
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
        <source src="/videos/video-2.mp4" type="video/mp4" />
      </video>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="content">
              <p>Afrotalian</p>
              <div>
                <Testimonial>
                  <div className="testi mx-auto">
                    BEST VIDEO PRODUCTION FOR FILM-MAKING, WEDDING,
                  </div>
                  <div className="testi mx-auto">
                    COMMERCIAL & PRIVATE EVENTS AND ADVERTISING
                  </div>
                </Testimonial>
              </div>
              {/* <p>
                The Best Video Production For Filmmaking, Wedding Commercial &
                Private Event And Advertising
              </p> */}
              <p>VIDEO CREATION THAT TELL YOUR STORY</p>
              <button href="/" className="button center" onClick={showModal}>
                GET OFFER Now
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
              {/* <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 arrow"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </p> */}
              {/* <p>
                <div class="center-con">
                  <a data-scroll href="#bob">
                    <div class="round">
                      <div id="cta">
                        <span class="arrow primera next"></span>
                        <span class="arrow segunda next"></span>
                      </div>
                    </div>
                  </a>
                </div>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
