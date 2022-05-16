import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import Loader from '../layout/Loader';

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
      <div className="row">
        <div className="col-md-6 offset-md-4">
          <>
            {ok ? (
              <Loader />
            ) : (
              abouts &&
              abouts.map((about, i) => (
                <>
                  <div className="player">
                    <ReactPlayer
                      url={about && about.video && about.video.Location}
                      controls={true}
                      width="100%"
                      height="450px"
                      playing={false}
                      muted={false}
                      loop={false}
                    />
                  </div>
                  <p className="content my-3">{about.description}</p>
                </>
              ))
            )}
            {/* <pre>{JSON.stringify(abouts, null, 4)}</pre> */}
          </>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
