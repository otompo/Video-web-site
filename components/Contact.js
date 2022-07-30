import React, { useState, Fragment } from 'react';
import { Modal, Card } from 'antd';
import TopTitle from '../components/home/TopTitle';
import { PhoneFilled, MailFilled, WhatsAppOutlined } from '@ant-design/icons';
import ContactCard from '../components/home/ContactCard';

const ContactUs = ({
  contactTitleOne = '+4591412161',
  contactTitleTwo = '+4591412161',
  contactTitleThree = 'Kalundborg-Denmark',
  contactTitleFour = 'info@afrotalian.com',
  contactDescriptionOne = 'Reach us by calling the number above and our customer service representative will be glad to help you.',
  contactDescriptionTwo = 'You can also reach us through this whatsapp number provided above and our customer service representative will be glad to help you.',
  contactDescriptionThree = 'Visit us at Kalundborg - Denmark so, we can discuss your amazing project',
  contactDescriptionFour = 'Email us now, so we can contact you to discuss your beautiful project. We cant wait to start an amazing journey with you.',
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <Fragment>
      <div className="container-fluid industries-bnr">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="text-center" style={{ marginTop: '150px' }}>
              <TopTitle
                slogan={
                  "While we're good with our services, there are simpler ways for you to get in touch and answer your questions"
                }
                welc={'Contact'}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid ">
        <div className="row mx-3">
          <div className="col-md-3 my-3 text-center">
            <a href={`tel:${contactTitleOne}`} style={{ color: '#000' }}>
              <ContactCard
                icon={
                  <PhoneFilled style={{ fontSize: '110px' }} rotate={110} />
                }
                title={
                  <h5>
                    <a
                      href={`tel:${contactTitleOne}`}
                      style={{ color: '#000' }}
                    >
                      {' '}
                      {contactTitleOne}
                    </a>
                  </h5>
                }
                body={contactDescriptionOne}
              />
            </a>
          </div>
          <div className="col-md-3 my-3 text-center">
            <a
              target="_blank"
              href={`https://wa.me/${contactTitleTwo}`}
              style={{ color: '#000' }}
            >
              <ContactCard
                icon={<WhatsAppOutlined style={{ fontSize: '110px' }} />}
                title={
                  <h5>
                    <a
                      target="_blank"
                      href={`https://wa.me/${contactTitleTwo}`}
                      style={{ color: '#000' }}
                    >
                      {contactTitleTwo}
                    </a>
                  </h5>
                }
                body={contactDescriptionTwo}
              />
            </a>
          </div>
          <div className="col-md-3 my-3 text-center">
            <a
              onClick={() => {
                setVisible(true);
              }}
            >
              <ContactCard
                icon={
                  <svg
                    xmlns="https://icons8.com/icon/7880/icon"
                    width="114"
                    height="114"
                    viewBox="0 0 24 24"
                    style={{ margin: '0 auto', paddingTop: '5px' }}
                  >
                    <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                  </svg>
                }
                title={contactTitleThree}
                body={contactDescriptionThree}
              />
            </a>
          </div>
          <div className="col-md-3 my-3 text-center">
            <a href={`mailto:${contactTitleFour}`} style={{ color: '#000' }}>
              <ContactCard
                icon={<MailFilled style={{ fontSize: '110px' }} />}
                title={
                  <a
                    href={`mailto:${contactTitleFour}`}
                    style={{ color: '#000' }}
                  >
                    {contactTitleFour}
                  </a>
                }
                body={contactDescriptionFour}
              />
            </a>
          </div>
        </div>
      </div>
      <Modal
        visible={visible}
        title="OUR LOCATION"
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <iframe
          width="100%"
          height="550"
          style={{ border: 0 }}
          loading="lazy"
          allowfullscreen
          src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJx4IFL3d1TUYRM1Mt0M9mAXg&key=AIzaSyCskgSvhGgV5BeK6FqUqGKYoKg3fwoM_M8"
        />
      </Modal>
    </Fragment>
  );
};

export default ContactUs;
