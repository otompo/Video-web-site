import React, { Fragment } from 'react';
import TopTitle from '../components/home/TopTitle';
import { PhoneFilled, MailFilled } from '@ant-design/icons';
import ContactCard from '../components/home/ContactCard';
import Layout from '../components/layout/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout title="Privacy Policy">
      <Fragment>
        <div className="container-fluid industries-bnr">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="text-center" style={{ marginTop: '150px' }}>
                <TopTitle welc={' Data Protection and Privacy'} />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2 my-5">
              <p className="footer-subscription-text">
                We take your privacy very seriously. I store all my photos in
                Dropbox, which is compliant with all the latest data protection
                standards. Sometimes I post selected videos to my blog and my
                social media accounts. I do that only after your explicit
                consent Needless to say, I ask first and do not post anything
                anywhere unless we agreed about it. I do not record personally
                identifiable data in website logs, but I use standard features
                of Google Analytics to analyze aggregated visitor behaviour on
                my website. At your request I will send you all your videos that
                I currently keep in my storage. I will also delete all your
                videos that I store at your request
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    </Layout>
  );
};

export default PrivacyPolicy;
