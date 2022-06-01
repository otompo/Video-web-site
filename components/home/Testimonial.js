import { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ReactPlayer from 'react-player';
import axios from 'axios';
import Loader from '../layout/Loader';
import ShowcaseTitle from './ShowcaseTitle';

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

  return (
    <Fragment>
      <div className="container-fluid testimonial-container">
        <div className="row">
          <div className="col-md-12 text-center">
            <ShowcaseTitle title="STORIES" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <Carousel interval={null}>
              {ok ? (
                <Loader />
              ) : (
                reviews &&
                reviews.map((review, i) => {
                  return (
                    <Carousel.Item>
                      <div className="carouselUnit" key={i}>
                        <Carousel.Caption>
                          <div className="row">
                            <div className="col-md-8 offset-md-2 my-2">
                              <ReactPlayer
                                url={
                                  review &&
                                  review.video &&
                                  review.video.Location
                                }
                                controls={true}
                                width="100%"
                                height="370px"
                                playing={false}
                                muted={false}
                                loop={false}
                              />
                            </div>
                            {/* <div className="col-md-6 my-2">
                            <ReactPlayer
                              url={review.preview}
                              controls={true}
                              width="100%"
                              height="270px"
                              playing={false}
                              muted={false}
                              loop={false}
                            />
                          </div> */}
                          </div>
                        </Carousel.Caption>
                      </div>
                    </Carousel.Item>
                  );
                })
              )}
            </Carousel>
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

export default TestimonialSlider;

const contentStyle = {
  height: '290px',
  color: '#fff',
  lineHeight: '120px',
  textAlign: 'center',
  background: '#364d79',
};
