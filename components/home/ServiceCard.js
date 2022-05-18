import { Fragment } from 'react';

import Link from 'next/link';
import Zoom from 'react-reveal/Zoom';

const ServiceCard = ({ icon, title, body }) => {
  return (
    <Fragment>
      <Zoom>
        {/* <div
          className="card"
          style={{ height: '100%', backgroundColor: '#fff' }}
        >
          {icon}
          <div className="card-body">
            <h5
              className="card-title"
              style={{ marginBottom: '20px', fontSize: '25px' }}
            >
              {title}
            </h5>
            <p className="card-text">{body}</p>
          </div>
        </div> */}
        <div className="parent">
          <div className="child">
            <div className="content">
              <h5 className="mt-3">{title}</h5>
              <p className="mx-3">{body}</p>
            </div>
          </div>
        </div>
      </Zoom>
    </Fragment>
  );
};

export default ServiceCard;
