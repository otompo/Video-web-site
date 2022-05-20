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
        {ok ? (
          <Loader />
        ) : (
          abouts &&
          abouts.map((about, i) => (
            <>
              <div className="col-md-6  mt-5" key={i}>
                <ReactPlayer
                  url={about && about.video && about.video.Location}
                  controls={true}
                  width="100%"
                  // height="380px"
                  playing={false}
                  muted={false}
                  loop={false}
                />
              </div>
              <div className="col-md-6  mt-5">
                <p className="content">{about.description}</p>
                <div className="social-icons">
                  <a
                    target="_blank"
                    href="https://web.facebook.com/afrotalian1"
                  >
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
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default About;
