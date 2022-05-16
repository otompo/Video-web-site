import { Fragment } from 'react';
import { Card, Badge } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import Fade from 'react-reveal/Fade';

const { Meta } = Card;

const OurWorkCard = ({ ourWork }) => {
  const { image, name, url } = ourWork;

  return (
    <Fragment>
      <Fade bottom>
        <Link href={`${url}`}>
          <a target="blank">
            <Card
              // className="mb-4"
              cover={
                <img
                  src={ourWork.image && image.Location}
                  alt={name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              }
            >
              <h5 className="font-weight-bold lead">
                {/* {name}{' '} */}
                <Badge count={name} style={{ backgroundColor: '#03a9f4' }} />
              </h5>

              {/* <p className="card-text">{renderHTML(excerpt)}</p> */}
              {/* {blog.excerpt ? <p>{renderHTML(excerpt)}</p> : null} */}
            </Card>
          </a>
        </Link>
      </Fade>
    </Fragment>
  );
};

export default OurWorkCard;
