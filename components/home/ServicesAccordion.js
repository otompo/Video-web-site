import React, { useEffect, useState } from 'react';
import { Card, Image } from 'antd';
import axios from 'axios';
import Loader from '../layout/Loader';

function ServicesAccordion(props) {
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
    <div className="container-fluid" id="accordion">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="row">
            {loading ? (
              <Loader />
            ) : (
              services &&
              services.map((service, i) => (
                <>
                  <div className="col-md-4 my-3" key={i}>
                    <div className="card" style={{ height: '100%' }}>
                      <div className="card-body">
                        <Image
                          preview={false}
                          src={
                            service && service.image && service.image.Location
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 my-3">
                    <Card hoverable style={{ height: '100%' }}>
                      <h4>{service && service.title}</h4>
                      {service && service.description}
                    </Card>
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesAccordion;
