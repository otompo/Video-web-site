import React, { Fragment, useState, useEffect } from 'react';
import TopTitle from '../components/home/TopTitle';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import Loader from '../components/layout/Loader';
import Link from 'next/link';
import { Card, Image } from 'antd';
const { Meta } = Card;

const Portfolio = () => {
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setOk(true);
      const { data } = await axios.get(`/api/category`);
      setCategories(data.category);
      setOk(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Layout title="Portfolio">
      <Fragment>
        <div className="container-fluid industries-bnr">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="text-center  " style={{ marginTop: '150px' }}>
                <TopTitle
                  slogan={
                    'Take a look at some of the wonderful works we have built for our clients'
                  }
                  welc={'Portfolio'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container my-5" id="our-work">
          <div className="row">
            {ok ? (
              <Loader />
            ) : (
              categories &&
              categories.map((category, i) => (
                <div className="col-md-3" key={i}>
                  <Link href={`/portfolio/${category.slug}`}>
                    <a>
                      <Card
                        hoverable
                        style={{ height: '100%' }}
                        cover={
                          <Image
                            preview={false}
                            src={
                              category &&
                              category.image &&
                              category.image.Location
                            }
                            alt="preview"
                            style={{
                              height: '200px',
                              objectFit: 'cover',
                            }}
                            className="p-1"
                          />
                        }
                      >
                        <Meta
                          title={category && category.title}
                          description={category && category.description}
                        />
                      </Card>
                    </a>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </Fragment>
    </Layout>
  );
};

export default Portfolio;
