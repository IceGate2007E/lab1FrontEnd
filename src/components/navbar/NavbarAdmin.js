import React from 'react';
import Navbar from './Navbar';

const tabs = [
  { title: 'Home', url: '/home' },
  { title: 'Create Origami', url: '/createOrigami' },
  { title: 'List Origami', url: '/listOrigami' },
  { title: 'Manage Users', url: '/manageUser' },
  { title: 'Create Event', url: '/createEvent' },
  { title: 'List Events', url: '/listEvents' },
];

function NavbarAdmin() {
  return <Navbar tabs={tabs} />;
}

export default NavbarAdmin;
