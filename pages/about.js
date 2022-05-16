import React, { Fragment } from 'react';
import TopTitle from '../components/home/TopTitle';
import Layout from '../components/layout/Layout';
import About from '../components/About';

const Index = () => {
  return (
    <Fragment>
      <Layout title="About Us">
        <div className="container-fluid  industries-bnr">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="text-center" style={{ marginTop: '150px' }}>
                <TopTitle
                  slogan={
                    'We are innovate and provide advanced quality products and exclusive solutions.'
                  }
                  welc={'ABOUT'}
                />
              </div>
            </div>
          </div>
        </div>

        <About />
      </Layout>
    </Fragment>
  );
};

export default Index;
