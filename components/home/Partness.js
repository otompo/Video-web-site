import { Fragment, useEffect, useState } from 'react';
import { Image } from 'antd';
import axios from 'axios';
import Loader from '../layout/Loader';
import ShowcaseTitle from './ShowcaseTitle';

const Partness = () => {
  const [partness, setPartness] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    showPartness();
  }, []);

  const showPartness = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/partness`);
      setPartness(data.partners);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="container-fluid partness-container">
        <div className="row">
          <div className="col-md-12 text-center">
            <ShowcaseTitle
              title="SELECTED CUSTOMERS"
              // subtitlestyle={{ fontSize: '18px' }}
            />
          </div>
        </div>
        <div className="container" style={{ width: '90%' }}>
          <div className="row">
            {loading ? (
              <Loader />
            ) : (
              partness &&
              partness.map((partner, i) => (
                <div className="col-md-3 mb-3" key={i}>
                  {/* <Card
                  hoverable
                  style={{ width: 310 }}
                  cover={<Image src={review.preview} />}
                /> */}
                  <div className="card" style={{ height: '100%' }}>
                    <div className="card-body">
                      <Image
                        src={partner && partner.image && partner.image.Location}
                        preview={false}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* <div
          className="hanging-triangle"
          style={{ borderTop: '25px solid #aabfd2' }}
        ></div> */}
      </div>
    </Fragment>
  );
};

export default Partness;
const contentStyle = {
  height: '290px',
  color: '#fff',
  lineHeight: '120px',
  textAlign: 'center',
  background: '#364d79',
};
