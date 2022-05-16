import React from 'react';
import Layout from '../../components/layout/Layout';
import UserRoute from '../../components/routes/UserRoutes';

const FAQ = () => {
  return (
    <Layout>
      <UserRoute>
        <h1 className="lead">FAQS Center</h1>
        <hr />
      </UserRoute>
    </Layout>
  );
};

export default FAQ;
