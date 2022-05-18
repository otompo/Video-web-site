import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import NProgress from 'nprogress';
import Router, { useRouter } from 'next/router';
import { FaBars, FaTimes } from 'react-icons/fa';
import Fade from 'react-reveal/Fade';
import axios from 'axios';
import { Context } from '../context';
Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });
NProgress.configure({ trickleSpeed: 200 });

const Navbar = () => {
  const router = useRouter();
  const [click, setClick] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  // console.log(current);
  useEffect(() => {
    loadCurrentUser();
    window.addEventListener('scroll', changebackground);
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const changebackground = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const loadCurrentUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/user/profile');
      // console.log(data);
      setCurrentUser(data);
      setLoading(false);
    } catch (err) {
      console.log(err.response);
      setLoading(false);
    }
  };

  return (
    <div className={navbar ? 'header herderactive' : 'header'}>
      <nav className="navbar">
        <Fade right>
          <div>
            <Link href="/" className="logo">
              <a>
                <img
                  src="/img/logo.png"
                  alt="logo"
                  className="pb-1 ant-menu-item"
                />
              </a>
            </Link>
            <p className="contactNum">
              <a href="tel:+4591431537">+45 91 41 21 61</a>
            </p>
          </div>
        </Fade>
        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaTimes size={30} style={{ color: '#ffffff' }} />
          ) : (
            <FaBars size={30} style={{ color: '#ffffff' }} />
          )}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className={router.pathname == '/' ? 'active-nav' : 'nav-item '}>
            <Link href="/" onClick={closeMenu}>
              <a>Home</a>
            </Link>
          </li>
          <li
            className={
              router.pathname == '/services' ? 'active-nav' : 'nav-item '
            }
          >
            <Link href="/services" onClick={closeMenu}>
              <a>Services</a>
            </Link>
          </li>
          <li
            className={
              router.pathname == '/prices' ? 'active-nav' : 'nav-item '
            }
          >
            <Link href="/prices" onClick={closeMenu}>
              <a>Prices</a>
            </Link>
          </li>

          <li
            className={
              router.pathname == '/portfolio' ? 'active-nav' : 'nav-item '
            }
          >
            <Link href="/portfolio" onClick={closeMenu}>
              <a>Portfolio</a>
            </Link>
          </li>
          <li
            className={router.pathname == '/about' ? 'active-nav' : 'nav-item '}
          >
            <Link href="/about" onClick={closeMenu}>
              <a>About</a>
            </Link>
          </li>
          <li
            className={
              router.pathname == '/contactus' ? 'active-nav' : 'nav-item '
            }
          >
            <Link href="/contactus" onClick={closeMenu}>
              <a>Contact</a>
            </Link>
          </li>
          {currentUser && (
            <li
              className={
                router.pathname == '/user' ? 'active-nav' : 'nav-item '
              }
            >
              <Link href="/user" onClick={closeMenu}>
                <a>Dashboard</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
