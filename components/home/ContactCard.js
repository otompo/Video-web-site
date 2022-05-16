import React, { Fragment } from 'react';
import Zoom from 'react-reveal/Zoom';

const ContactCard = ({ title, body, icon, button }) => {
  return (
    <Fragment>
      <Zoom>
        <div
          className="card"
          style={{
            minHeight: '250px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            boxShadow: '0 1px 6px 1px rgb(0 0 0 / 15%)',
            maxWidth: '500px',
            height: '50vh',
            height: 'auto',
            padding: '1rem',
            marginBottom: '50px',
          }}
        >
          {icon}
          <div className="card-body">
            <h5
              className="card-title"
              style={{ textAlign: 'center', fontSize: 20 }}
            >
              {title}
            </h5>
            <p className="card-text">{body}</p>

            {button}
          </div>
        </div>
      </Zoom>
    </Fragment>
  );
};

export default ContactCard;
