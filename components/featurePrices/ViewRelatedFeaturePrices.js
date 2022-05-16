import { useEffect, useState } from 'react';
import TopTitle from '../home/TopTitle';
import Layout from '../layout/Layout';
import Loader from '../layout/Loader';
import { useRouter } from 'next/router';
import { Spin, Button, Card, Popover } from 'antd';
import axios from 'axios';
const { Meta } = Card;
function ViewRelatedFeaturePrices(props) {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(false);
  const [relatedFeaturePrices, setRelatedFeaturePrices] = useState([]);

  useEffect(() => {
    loadRelatedFeaturePrices();
  }, [slug]);
  const loadRelatedFeaturePrices = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/prices/${slug}`);
      setRelatedFeaturePrices(data);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.message);
      setLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('fffff');
  };
  const content = () => (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            className="form-control mb-4 p-2"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            className="form-control mb-4 p-2"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            // value={subject}
            // onChange={(e) => setSubject(e.target.value)}
            className="form-control mb-4 p-2"
            placeholder="Enter contact"
            required
          />
        </div>

        <div className="d-grid gap-2 my-2 ">
          <button
            className="btn btn-primary"
            // disabled={!name || !email || !subject || !message}
            type="submit"
          >
            {/* {loading ? <Spin /> : 'Submit'} */}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
  return (
    <Layout title={slug}>
      <div className="container-fluid industries-bnr">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="text-center  " style={{ marginTop: '150px' }}>
              <TopTitle
                slogan={`Prices Related to ${slug} Videos`}
                welc={slug}
                // cname={`Total Video(s) ${relatedWorks && relatedWorks.length}`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="container">
              <div className="row">
                {loading ? (
                  <Loader />
                ) : relatedFeaturePrices && relatedFeaturePrices.length <= 0 ? (
                  <div className="row">
                    <div className="col-md-8 offset-md-2 mt-5 text-center">
                      <h1
                        style={{
                          fontWeight: 'bold',
                          color: '#33195a',
                          fontSize: 25,
                          margin: 50,
                        }}
                      >
                        No Data
                      </h1>
                    </div>
                  </div>
                ) : (
                  relatedFeaturePrices.map((item) => (
                    <div className="col-md-3 my-3" key={item._id}>
                      <Card
                        title={
                          <span
                            style={{
                              fontWeight: 'bold',
                              color: '#33195a',
                              fontSize: 25,
                            }}
                          >
                            {item && item.title}
                          </span>
                        }
                        // extra={
                        //   <span
                        //     style={{ fontWeight: 'bold', color: '#f58220' }}
                        //   >
                        //     Offer: GHS {item && item.price}.00
                        //   </span>
                        // }
                        style={{ width: 300 }}
                      >
                        <p>
                          {' '}
                          {item &&
                            item.features &&
                            item.features.map((feature, i) => (
                              <ul key={i}>
                                <li
                                  style={{ marginLeft: '-40px', fontSize: 20 }}
                                >
                                  <p> {feature.name}</p>
                                </li>
                              </ul>
                            ))}
                        </p>
                        <Meta
                          title={
                            // <span
                            //   style={{ fontWeight: 'bold', color: '#f58220' }}
                            // >
                            //   Offer: GHS {item && item.price}.00
                            // </span>
                            <Popover content={content} title="OFFER">
                              <Button
                                type="primary"
                                shape="round"
                                size={35}
                                // block
                              >
                                Offer
                              </Button>
                            </Popover>
                          }
                        />
                      </Card>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(relatedFeaturePrices, null, 4)}</pre> */}
    </Layout>
  );
}

export default ViewRelatedFeaturePrices;
