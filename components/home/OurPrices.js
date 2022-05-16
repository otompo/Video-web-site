import { Fragment } from 'react';
import ShowcaseTitle from './ShowcaseTitle';
import ShowPrices from './ShowPrices';

const OurPrices = ({ color = '#aabfd2' }) => {
  // const [ok, setOk] = useState(false);
  // const [prices, setPrices] = useState([]);

  // useEffect(() => {
  //   showPrices();
  // }, []);

  // const showPrices = async () => {
  //   try {
  //     setOk(true);
  //     const { data } = await axios.get(`/api/prices`);
  //     setPrices(data);
  //     setOk(false);
  //   } catch (err) {
  //     console.log(err);
  //     setOk(false);
  //   }
  // };

  return (
    <Fragment>
      <div
        className="container-fluid service-area"
        style={{ backgroundColor: color }}
      >
        <div className="row">
          <div className="col-md-12 text-center">
            <ShowcaseTitle
              title="Our Prices"
              subtitle="Get our Afordable prices. Afrotalian provide all range of plans to choose from as per your needs "
              subtitlestyle={{ fontSize: '18px' }}
            />
          </div>

          <ShowPrices />
        </div>
        <div
          className="hanging-triangle"
          style={{ borderTop: '25px solid #fff' }}
        ></div>
      </div>
    </Fragment>
  );
};

export default OurPrices;
