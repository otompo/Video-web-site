import React, { Fragment, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import Loader from './layout/Loader';

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    showAbout();
  }, []);

  const showAbout = async () => {
    try {
      setOk(true);
      const { data } = await axios.get(`/api/admin/about`);
      setAbouts(data);
      setOk(false);
    } catch (err) {
      console.log(err);
      setOk(false);
    }
  };
  return (
    <div className="container about" id="about">
      <div className="row">
        <div className="col-md-6 my-5">
          {ok ? (
            <Loader />
          ) : (
            abouts &&
            abouts.map((about, i) => (
              <>
                <ReactPlayer
                  url={about && about.video && about.video.Location}
                  controls={true}
                  width="100%"
                  height="380px"
                  playing={false}
                  muted={false}
                  loop={false}
                />
              </>
            ))
          )}
        </div>

        <div className="col-md-6 my-5">
          <h2 className="text-center">About</h2>
          <span className="line"></span>
          {abouts &&
            abouts.map((about, i) => <p Key={i}>{about.description}</p>)}

          <div className="social-icons">
            <a target="_blank" href="https://web.facebook.com/afrotalian1">
              <i className="fab fa-facebook-f" />
            </a>

            <a href="/" target="_blank">
              <i className="fab fa-instagram" />
            </a>

            <a href="/" target="_blank">
              <i className="fab fa-linkedin" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
