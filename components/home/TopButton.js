import React from 'react';

const TopButton = ({ works, contact }) => {
  return (
    <div>
      <div className="row text-center">
        <div className="col-md-6 offset-md-3">
          <p className="btn btn-danger m-3">{works}</p>
          <p className="btn btn-primary m-3">{contact}</p>
        </div>

        {/* <div className="col-md-6">
                <p className="btn btn-primary my-3">Contact us</p>
              </div> */}
      </div>
    </div>
  );
};

export default TopButton;
