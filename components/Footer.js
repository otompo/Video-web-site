import React from 'react';
import Link from 'next/link';
import moment from 'moment';

const Footer = () => {
  return (
    <div className="footer-container">
      {/* <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Data protection and privacy
        </p>
        <p className="footer-subscription-text">
          We take your privacy very seriously. I store all my photos in Dropbox,
          which is compliant with all the latest data protection standards.
          Sometimes I post selected videos to my blog and my social media
          accounts. I do that only after your explicit consent Needless to say,
          I ask first and do not post anything anywhere unless we agreed about
          it. I do not record personally identifiable data in website logs, but
          I use standard features of Google Analytics to analyze aggregated
          visitor behaviour on my website. At your request I will send you all
          your videos that I currently keep in my storage. I will also delete
          all your videos that I store at your request
        </p>
      </section> */}
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h3>ADDRESS</h3>

            <p>Geoge Wame Bonny</p>
            <p>Kalundborg-Denmark</p>
            <p>
              <a href="tel:+4591431537">+45 91 41 21 61</a>
            </p>
            <p>Email:</p>
            <p>CVR: 39964074</p>
          </div>

          <div className="footer-link-items">
            <h3>ABOUT US</h3>
            <Link href="/">
              <a>Terms of Service</a>
            </Link>
            <Link href="/privacy-policy">
              <a>Privacy Policy</a>
            </Link>
          </div>
        </div>
        {/* new start */}
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h3>CATEGORY</h3>
            <Link href="/contactus">
              <a>Contact</a>
            </Link>
            <Link href="/">
              <a>Service</a>
            </Link>
            <Link href="/prices">
              <a>Prices</a>
            </Link>
            <Link href="/portfolio">
              <a>Portfolio</a>
            </Link>
            <Link href="/about">
              <a>About</a>
            </Link>
          </div>
          <div className="footer-link-items">
            <h3>SOCIAL MEDIA</h3>

            <a target="_blank" href="https://web.facebook.com/afrotalian1">
              Facebook
            </a>
            <a target="_blank" href="https://web.facebook.com/afrotalian1">
              Instagram
            </a>
            <a target="_blank" href="https://web.facebook.com/afrotalian1">
              linkedIn
            </a>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link href="/" className="social-logo">
              <a>
                <img
                  width={150}
                  src="/img/logo.png"
                  alt="code smart websoft logo"
                  className="pb-1 ant-menu-item"
                />
              </a>
            </Link>
          </div>
          <small className="website-rights">
            Afrotalain Production © {new Date().getFullYear()} Inc. All rights
            reserved CVR/Danish business-39964074 <br />
            <p className="text-center">
              Powered by{' '}
              <a
                style={{ fontSize: 15 }}
                href="https://codesmartwebsoft.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                Code Smart Websoft
              </a>
            </p>
          </small>
          <div className="social-icons">
            <a target="_blank" href="https://web.facebook.com/afrotalian1">
              <i className="fab fa-facebook-f" />
            </a>

            <a href="/" target="_blank">
              <i className="fab fa-instagram" />
            </a>

            <a href="/" target="_blank">
              <i className="fab fa-linkedin" />
            </a>
          </div>
        </div>
      </section>
      <div
        className="hanging-triangle"
        style={{ borderTop: '25px solid #fff' }}
      ></div>
    </div>
  );
};

export default Footer;
