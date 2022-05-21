import React, { useEffect, useState, useContext } from 'react';
import TopTitle from '../components/home/TopTitle';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import { LoadingOutlined } from '@ant-design/icons';

const TeamsOfService = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    showTeamsOfService();
  }, []);

  const showTeamsOfService = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/admin/teamsofservice`);
      setTeams(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <LoadingOutlined
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '50px',
          color: 'red',
          overflowX: 'hidden',
        }}
      />
    );
  }

  return (
    <>
      <Layout title="Teams of service">
        <div className="container-fluid industries-bnr">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="text-center" style={{ marginTop: '150px' }}>
                <TopTitle welc={' Teams of Service'} />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1 my-5">
              {teams &&
                teams.map((team, i) => (
                  <p className="footer-subscription-text text-justify" key={i}>
                    {team.description}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TeamsOfService;
