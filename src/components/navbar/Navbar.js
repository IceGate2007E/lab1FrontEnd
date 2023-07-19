import { Box } from '@mui/material';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import FixedItem from './FixedItem';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { enqueueSnackbar } from 'notistack';

function Navbar({ tabs }) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = React.useState(false);
  const user = JSON.parse(localStorage.getItem('orukami_user'));

  const handleLogout = () => {
    localStorage.removeItem('orukami_user');
    enqueueSnackbar('Session closed.', { variant: 'info' });
    navigate('/login');
  };

  return (
    <FixedItem>
      <Box sx={styles.logoContainer}>
        <img className='logo' src='/src/logo.png' alt='Logo' />
      </Box>
      <Box sx={styles.navbar}>
        <Box sx={styles.back} onClick={() => window.history.back()}>
          <ArrowBackIosNewIcon />
        </Box>
        {tabs.map((tab, i) => {
          return (
            <NavLink
              className={(a) => (a.isActive ? 'active' : 'link')}
              to={tab.url}
              key={i}
            >
              <Box className='item' title={tab.title} key={i}>
                {tab.title}
              </Box>
            </NavLink>
          );
        })}
        <Box
          sx={styles.username}
          onMouseEnter={() => setOpenMenu(true)}
          onMouseLeave={() => setOpenMenu(false)}
        >
          {`${user.firstname} ${user.lastname}`}
          {openMenu && (
            <>
              <div className='block-space' />
              <div className='triangulo-equilatero-bottom'></div>
              <div className='userMenu'>
                <span title='Profile'>Profile</span>
                <span title='Logout' onClick={() => handleLogout()}>
                  Logout
                </span>
              </div>
            </>
          )}
        </Box>
      </Box>
    </FixedItem>
  );
}

const styles = {
  back: {
    width: '40px',
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '.MuiSvgIcon-root': {
      color: 'inherit',
    },
    '&:hover': {
      backgroundColor: 'rgb(252, 159, 4)',
      color: 'white',
      cursor: 'pointer',
      fontWeight: '700',
    },
    '&:active': {
      backgroundColor: 'rgb(251,98,5)',
    },
  },
  logoContainer: {
    backgroundColor: 'white',
    textAlign: 'center',
    width: '100%',
    '.logo': {
      height: '80px',
    },
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: 'rgb(253, 207, 121)',
    color: 'grey',
    display: 'flex',
    fontSize: '18px',
    height: '53px',
    width: '100%',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
    fontWeight: '500',
    a: {
      textDecoration: 'none',
      boxSizing: 'border-box',
    },
    '.item': {
      padding: '14px 24px',
      textAlign: 'center',
      transition: 'font-weight 0.3s ease',
    },
    '.active': {
      backgroundColor: 'rgb(251,98,5)',
      color: 'white',
      fontWeight: '700',
      height: '100%',
    },
    '.link': {
      color: 'grey',
      fontWeight: '500',
      '.item': {
        '&:hover': {
          backgroundColor: 'rgb(252, 159, 4)',
          borderBottom: '4px solid white',
          color: 'white',
          cursor: 'pointer',
          fontWeight: '700',
        },
        '&:active': {
          backgroundColor: 'rgb(251,98,5)',
        },
        '&::before': {
          content: 'attr(title)',
          display: 'block',
          fontWeight: '700',
          height: '0px',
          overflow: 'hidden',
          visibility: 'hidden',
        },
      },
    },
  },
  username: {
    marginLeft: 'auto',
    borderRadius: '36px',
    float: 'right',
    fontWeight: '700',
    padding: '16px 20px',
    marginRight: '40px',
    backgroundColor: 'rgb(251, 98, 5)',
    color: 'white',
    position: 'relative',
    '.block-space': {
      backgroundColor: '#fff0',
      width: '100%',
      height: '20px',
      position: 'absolute',
      left: '0',
      bottom: '-20px',
    },
    '.triangulo-equilatero-bottom': {
      width: '0',
      height: '0',
      borderRight: '16px solid transparent',
      borderTop: '53px solid transparent',
      borderLeft: '16px solid transparent',
      borderBottom: '16px solid rgb(251, 98, 5)',
      position: 'absolute',
      top: '0',
      right: 'calc(50% - 16px)',
    },
    '.userMenu': {
      position: 'absolute',
      backgroundColor: 'inherit',
      top: '66px',
      right: 'calc(50% - 60px)',
      borderRadius: '12px',
      padding: '16px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      width: '120px',
      alignItems: 'center',
      gap: '12px',
      span: {
        fontWeight: '500',
        '&:hover': {
          cursor: 'pointer',
          fontWeight: '700',
        },
        '&::before': {
          content: 'attr(title)',
          display: 'block',
          fontWeight: '700',
          height: '0px',
          overflow: 'hidden',
          visibility: 'hidden',
        },
      },
    },
  },
};

export default Navbar;
