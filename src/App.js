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
import EventsPage from './components/pages/EventsPage';
import UploadOfficialPage from './components/pages/UpdateOfficialPage';
import ListOrigami from './components/pages/ListOrigami';
import DetailsPage from './components/pages/DetailsPage';
import HomePage from './components/pages/HomePage';
import EventDetails from './components/pages/EventDetails';

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

  if (user.role === 'Admin') {
    return <AdminRoutes />;
  }

  return (
    <>
      <NavbarUser />
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/uploadOrigami' element={<UploadOrigamiPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/events' element={<EventsPage />} />
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
        <Route path='/home' element={<HomePage />} />
        <Route path='/createOrigami' element={<UploadOfficialPage />} />
        <Route path='/createEvent' element={<CreateEventPage />} />
        <Route path='/listOrigami' element={<ListOrigami />} />
        <Route path='/listEvents' element={<EventsPage />} />
        <Route path='/details/:id' element={<DetailsPage />} />
        <Route path='/events/:id' element={<EventDetails />} />
        <Route
          path='/*'
          element={
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h1>Error, page not found.</h1>
            </div>
          }
        />
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
