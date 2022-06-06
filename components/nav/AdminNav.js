import { useState, useEffect } from 'react';
import Link from 'next/link';

const AdminNav = () => {
  const [current, setCurrent] = useState('');

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills mt-2">
      <Link href="/admin">
        <a className={`nav-link  ${current === '/admin' && 'active'}`}>
          Admin Dashboard
        </a>
      </Link>
      <Link href="/admin/manage-categories">
        <a
          className={`nav-link  ${
            current === '/admin/manage-categories' && 'active'
          }`}
        >
          Manage Categories
        </a>
      </Link>
      <Link href="/admin/prices">
        <a className={`nav-link  ${current === '/admin/prices' && 'active'}`}>
          Manage Prices Categories
        </a>
      </Link>
      {/* <Link href="/admin/price-detail">
        <a
          className={`nav-link  ${
            current === '/admin/price-detail' && 'active'
          }`}
        >
          Manage Price Details
        </a>
      </Link> */}
      <Link href="/admin/about">
        <a className={`nav-link  ${current === '/admin/about' && 'active'}`}>
          Manage About
        </a>
      </Link>
      <Link href="/admin/reviews">
        <a className={`nav-link  ${current === '/admin/reviews' && 'active'}`}>
          Manage Reviews
        </a>
      </Link>
      <Link href="/admin/our-works">
        <a
          className={`nav-link  ${current === '/admin/our-works' && 'active'}`}
        >
          Manage Our Works
        </a>
      </Link>
      <Link href="/admin/manage-users">
        <a
          className={`nav-link  ${
            current === '/admin/manage-users' && 'active'
          }`}
        >
          Manage Staff
        </a>
      </Link>

      <Link href="/admin/messages">
        <a className={`nav-link  ${current === '/admin/messages' && 'active'}`}>
          Messages
        </a>
      </Link>
      <Link href="/admin/offermessage">
        <a
          className={`nav-link  ${
            current === '/admin/offermessage' && 'active'
          }`}
        >
          Price Offer Message
        </a>
      </Link>
      <Link href="/admin/termsofservice">
        <a
          className={`nav-link  ${
            current === '/admin/termsofservice' && 'active'
          }`}
        >
          Terms of Service
        </a>
      </Link>
      <Link href="/admin/services">
        <a className={`nav-link  ${current === '/admin/services' && 'active'}`}>
          Services
        </a>
      </Link>
      <Link href="/admin/partness">
        <a className={`nav-link  ${current === '/admin/partness' && 'active'}`}>
          Partness
        </a>
      </Link>
      <Link href="/admin/customize">
        <a
          className={`nav-link  ${current === '/admin/customize' && 'active'}`}
        >
          Customize
        </a>
      </Link>
    </div>
  );
};

export default AdminNav;
