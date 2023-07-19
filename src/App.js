import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import NavbarUser from './components/navbar/NavbarUser';
import NavbarAdmin from './components/navbar/NavbarAdmin';
import UploadOrigamiPage from './components/pages/UploadOrigamiPage';
import SearchPage from './components/pages/SearchPage';
import CreateEventPage from './components/pages/CreateEventPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/' element={<ProtectedRoutes />}>
          <Route path='/*' element={<UserRoutes />} />
        </Route>
      </Routes>
    </Router>
  );
}

function UserRoutes() {
  const user = JSON.parse(localStorage.getItem('orukami_user'));

  if (user.role === 'admin') {
    return <AdminRoutes />;
  }

  return (
    <>
      <NavbarUser />
      <Routes>
        <Route path='/home' element={<h1>HOME PAGE...</h1>} />
        <Route path='/uploadOrigami' element={<UploadOrigamiPage />} />
        <Route path='/search' element={<CreateEventPage />} />
        <Route path='/*' element={<h1>Error</h1>} />
      </Routes>
    </>
  );
}

function AdminRoutes() {
  return (
    <>
      <NavbarAdmin />
      <Routes>
        <Route path='/home' element={<h1>HOME ADMIN PAGE...</h1>} />
        <Route path='/events' element={<h1>EVENTS ADMIN PAGE...</h1>} />
        <Route path='/*' element={<h1>Error</h1>} />
      </Routes>
    </>
  );
}

function ProtectedRoutes() {
  const user = JSON.parse(localStorage.getItem('orukami_user'));

  if (!user) {
    return <Navigate to='/login' />;
  } else {
    return <Outlet />;
  }
}

export default App;
