import { Fragment, useEffect, useState } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import ReactPlayer from 'react-player';
import axios from 'axios';
import Loader from '../layout/Loader';
import ShowcaseTitle from './ShowcaseTitle';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const TestimonialSlider = () => {
  const [reviews, setReviews] = useState([]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    showReviews();
  }, []);

  const showReviews = async () => {
    try {
      setOk(true);
      const { data } = await axios.get(`/api/reviews`);
      setReviews(data);
      setOk(false);
    } catch (err) {
      console.log(err);
      setOk(false);
    }
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Fragment>
      <div className="container-fluid testimonial-container">
        <div className="row">
          <div className="col-md-12 text-center">
            <ShowcaseTitle title="STORIES" />
          </div>
        </div>
        <Carousel
          responsive={responsive}
          // autoPlay={false}
          shouldResetAutoplay={false}
          ssr={true}
          infinite={true}
        >
          {reviews &&
            reviews.map((review, i) => (
              <div className="mx-4  tesmonial">
                <ReactPlayer
                  url={review && review.video && review.video.Location}
                  controls={true}
                  width="100%"
                  playing={false}
                  muted={false}
                  loop={false}
                />
              </div>
            ))}
        </Carousel>

        {/* <div
          className="hanging-triangle"
          style={{ borderTop: '25px solid #aabfd2' }}
        ></div> */}
      </div>
    </Fragment>
  );
};

export default TestimonialSlider;

const contentStyle = {
  height: '290px',
  color: '#fff',
  lineHeight: '120px',
  textAlign: 'center',
  background: '#364d79',
};
