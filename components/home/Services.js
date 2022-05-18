import { Fragment, useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import {
  LaptopOutlined,
  MobileOutlined,
  KeyOutlined,
  SyncOutlined,
  CrownOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import ShowcaseTitle from './ShowcaseTitle';
import Loader from '../layout/Loader';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    showServices();
  }, []);

  const showServices = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/services`);
      setServices(data.services);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="container-fluid " id="service-area">
        <div className="row">
          <div className="col-md-12 text-center">
            <ShowcaseTitle title={'SERVICES'} />

            <div className="container">
              <div className="row">
                {loading ? (
                  <Loader />
                ) : (
                  services &&
                  services.map((service, i) => (
                    <div className="col-md-4 my-3" key={i}>
                      <ServiceCard
                        title={service && service.title}
                        body={service && service.description}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="hanging-triangle"
          style={{ borderTop: '25px solid #f3f3f3ea' }}
        ></div> */}
      </div>
    </Fragment>
  );
};

export default Services;
