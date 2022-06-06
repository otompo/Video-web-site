import React, { Fragment } from 'react';
import TopTitle from '../components/home/TopTitle';
import { PhoneFilled, MailFilled, WhatsAppOutlined } from '@ant-design/icons';
import ContactCard from '../components/home/ContactCard';
import Layout from '../components/layout/Layout';
import Link from 'next/link';

const ContactUs = () => {
  return (
    <Layout title="Contact Us">
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
              <a href="tel:+4591412161" style={{ color: '#000' }}>
                <ContactCard
                  icon={
                    <PhoneFilled style={{ fontSize: '110px' }} rotate={110} />
                  }
                  title={
                    <h5>
                      <a href="tel:+4591412161" style={{ color: '#000' }}>
                        {' '}
                        +45 91 41 21 61
                      </a>
                    </h5>
                  }
                  body={
                    'Reach us by calling the number above and our customer service representative will be glad to help you.'
                  }
                />
              </a>
            </div>
            <div className="col-md-3 my-3 text-center">
              <a
                target="_blank"
                href="https://wa.me/4591412161"
                style={{ color: '#000' }}
              >
                <ContactCard
                  icon={<WhatsAppOutlined style={{ fontSize: '110px' }} />}
                  title={
                    <h5>
                      <a
                        target="_blank"
                        href="https://wa.me/4591412161"
                        style={{ color: '#000' }}
                      >
                        {' '}
                        +45 91 41 21 61
                      </a>
                    </h5>
                  }
                  body={
                    'You can also reach us through this whatsapp number provided above and our customer service representative will be glad to help you.'
                  }
                />
              </a>
            </div>
            <div className="col-md-3 my-3 text-center">
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
                title={'Kalundborg-Denmark'}
                body={
                  'Visit us on the above address so that we can discuss your amazing project.'
                }
              />
            </div>
            <div className="col-md-3 my-3 text-center">
              <a href="mailto:info@afrotalian.com" style={{ color: '#000' }}>
                <ContactCard
                  icon={<MailFilled style={{ fontSize: '110px' }} />}
                  title={
                    <a
                      href="mailto:info@afrotalian.com"
                      style={{ color: '#000' }}
                    >
                      info@afrotalian.com
                    </a>
                  }
                  body={
                    'Email us now, so we can contact you to discuss your beautiful project. We cant wait to start an amazing journey with you.'
                  }
                />
              </a>
            </div>
          </div>
        </div>
      </Fragment>
    </Layout>
  );
};

export default ContactUs;
