import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../layout/Layout';
import Loader from '../layout/Loader';
import PricesCard from '../home/PricesCard';
import ReactPlayer from 'react-player';
import axios from 'axios';
import TopTitle from '../home/TopTitle';
import Zoom from 'react-reveal/Zoom';

const ViewRelatedWorks = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [loading, setLoading] = useState(false);
  const [relatedWorks, setRelatedWorks] = useState([]);

  useEffect(() => {
    loadRelatedWorks();
  }, [slug]);

  const loadRelatedWorks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/ourworks/${slug}`);
      setRelatedWorks(data);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Layout title={slug}>
      <>
        <div className="container-fluid industries-bnr">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="text-center  " style={{ marginTop: '150px' }}>
                <TopTitle
                  slogan={`Enjoy Our Sample ${slug} Videos`}
                  welc={slug}
                  cname={`Total Video(s) ${
                    relatedWorks && relatedWorks.length
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid" id="showprices">
          <div className="row">
            {loading ? (
              <Loader />
            ) : relatedWorks && relatedWorks.length <= 0 ? (
              <div className="row">
                <div className="col-md-8 offset-md-2 my-5 text-center">
                  <h1
                    style={{
                      fontWeight: 'bold',
                      color: '#33195a',
                      fontSize: 25,
                      margin: 50,
                    }}
                  >
                    No Data
                  </h1>
                </div>
              </div>
            ) : (
              relatedWorks.map((item) => (
                <div className="col-md-3 my-4" key={item._id}>
                  <Zoom>
                    <div className="parent">
                      <div className="child">
                        <div className="video-content">
                          <ReactPlayer
                            url={item && item.video && item.video.Location}
                            controls={true}
                            width="100%"
                            height="30vh"
                          />
                        </div>
                      </div>
                    </div>
                  </Zoom>
                </div>
              ))
            )}
            {/* <pre>{JSON.stringify(relatedWorks, null, 4)}</pre> */}
          </div>
        </div>
      </>
    </Layout>
  );
};

export default ViewRelatedWorks;
