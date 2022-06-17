import ContactUs from '../../components/Contact';
import Layout from '../../components/layout/Layout';
import useContact from '../../hooks/useContact';

function index(props) {
  const {
    contactTitleOne,
    contactTitleTwo,
    contactTitleThree,
    contactTitleFour,

    contactDescriptionOne,
    contactDescriptionTwo,
    contactDescriptionThree,
    contactDescriptionFour,

    // setContactTitleOne,
    // setContactTitleTwo,
    // setContactTitleThree,
    // setContactTitleFour,

    // setContactDescriptionOne,
    // setContactDescriptionTwo,
    // setContactDescriptionThree,
    // setContactDescriptionFour,
  } = useContact();

  return (
    <Layout title="Contact Us">
      <ContactUs
        contactTitleOne={contactTitleOne}
        contactTitleTwo={contactTitleTwo}
        contactTitleThree={contactTitleThree}
        contactTitleFour={contactTitleFour}
        contactDescriptionOne={contactDescriptionOne}
        contactDescriptionTwo={contactDescriptionTwo}
        contactDescriptionThree={contactDescriptionThree}
        contactDescriptionFour={contactDescriptionFour}
      />
    </Layout>
  );
}

export default index;
