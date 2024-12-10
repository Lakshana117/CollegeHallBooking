import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import './Navbar.css';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Halls', path: '/hostels' }, // Fixed the typo from Hallss to Halls
  
  { name: 'Gallery', path: 'gallery' },  // Change path to match the section ID
  { name: 'Contact Us', path: 'contact-us' },  // Change path to match the section ID
  { name: 'About Us', path: 'about-us' }  // Change path to match the section ID
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('loged');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDashboardClick = () => {
    const role = localStorage.getItem('role');
    
    if (role === 'ADMIN') {
      navigate('/admin');
    } else if (role === 'STUDENT') {
      navigate('/studentpanel/student-profile');
    } else if (role === 'FACULTY') {
      navigate('/faculty/profile');
    }
  };

  const isLogged = localStorage.getItem('loged') === 'true';
  const email = localStorage.getItem('email');
  const firstLetter = email ? email.charAt(0).toUpperCase() : '';

  return (
    <>
      <AppBar className="navbar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
              <img
                src="https://tse4.mm.bing.net/th?id=OIP.kiKWJL8djHmFirst70cIUwHaHN&pid=Api&P=0&h=180"
                alt="Sri Krishna Institutions"
                style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
              />
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
              <img
                src="https://tse4.mm.bing.net/th?id=OIP.kiKWJL8djHmFirst70cIUwHaHN&pid=Api&P=0&h=180"
                alt="Sri Krishna Institutions"
                style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
              />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, fontWeight: 700, color: '#fff' }}
            >
              Sri Krishna Institutions
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={() => {
                      if (['Gallery', 'Contact Us', 'About Us'].includes(page.name)) {
                        handleCloseNavMenu();
                      } else {
                        navigate(page.path);
                        handleCloseNavMenu();
                      }
                    }}
                  >
                    {['Gallery', 'Contact Us', 'About Us'].includes(page.name) ? (
                      <ScrollLink to={page.path} smooth={true} duration={500}>
                        <Typography textAlign="center">{page.name}</Typography>
                      </ScrollLink>
                    ) : (
                      <Typography textAlign="center">{page.name}</Typography>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => {
                    if (['Gallery', 'Contact Us', 'About Us'].includes(page.name)) {
                      handleCloseNavMenu();
                    } else {
                      navigate(page.path);
                      handleCloseNavMenu();
                    }
                  }}
                  sx={{ my: 2, color: '#fff', display: 'block' }}
                >
                  {['Gallery', 'Contact Us', 'About Us'].includes(page.name) ? (
                    <ScrollLink to={page.path} smooth={true} duration={500}>
                      {page.name}
                    </ScrollLink>
                  ) : (
                    page.name
                  )}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {isLogged ? (
                <>
                  <IconButton onClick={handleOpenUserMenu} color="inherit">
                    <Avatar>{firstLetter}</Avatar>
                  </IconButton>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleDashboardClick}>
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogoutClick}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button onClick={handleLoginClick} sx={{ my: 2, color: '#fff' }}>
                  Login/SignUp
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}

export default Navbar;
