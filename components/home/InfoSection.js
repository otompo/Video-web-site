import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import Loader from '../layout/Loader';
import renderHTML from 'react-render-html';

const InfoSection = () => {
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
    <div className="container-fluid" id="infoSection">
      <div className="row mx-4">
        <>
          {ok ? (
            <Loader />
          ) : (
            abouts &&
            abouts.map((about, i) => (
              <>
                <div className="col-md-6  my-5" key={i}>
                  <div className="player">
                    <ReactPlayer
                      url={about && about.video && about.video.Location}
                      controls={true}
                      width="100%"
                      playing={false}
                      muted={false}
                      loop={false}
                    />
                  </div>
                </div>
                <div className="col-md-6  my-5">
                  <p className="content">
                    {about.description ? (
                      <div>{renderHTML(about.description)}</div>
                    ) : null}
                  </p>
                </div>
              </>
            ))
          )}
        </>
      </div>
    </div>
  );
};

export default InfoSection;
