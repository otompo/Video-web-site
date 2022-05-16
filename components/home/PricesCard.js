import { Fragment } from 'react';
import Zoom from 'react-reveal/Zoom';

const ServiceCard = ({ title, body, video, button }) => {
  return (
    <Fragment>
      <Zoom>
        {/* <div className="card">
          {video}
          <div className="card-body">
            <h5
              className="card-title"
              style={{ textAlign: 'center', fontSize: 25 }}
            >
              {title}
            </h5>
            <p className="card-text">{body}</p>
            {button ? <p className="card-button">{button}</p> : <></>}
          </div>
        </div> */}
        <div className="parent">
          <div className="child">
            <div className="content">
              {video}
              <h5>{title}</h5>
              <p>{body}</p>

              <div className="button">{button}</div>
            </div>
          </div>
        </div>
      </Zoom>
    </Fragment>
  );
};

export default ServiceCard;
