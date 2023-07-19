import React from 'react';
import Navbar from './Navbar';

const tabs = [
  { title: 'Home', url: '/home' },
  { title: 'Upload Origami', url: '/uploadOrigami' },
  { title: 'Search Origami', url: '/search' },
  { title: 'Events', url: '/events' },
];

function NavbarUser() {
  return <Navbar tabs={tabs} />;
}

export default NavbarUser;
