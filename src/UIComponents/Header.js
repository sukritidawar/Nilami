import React, { useContext } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import Store from '../store/Store';
import { LOGOUT } from '../store/Types';

const settings = ['Profile', 'Logout'];

const pages = [
  {
    name: 'Home',
    link: '/feed',
  },
  {
    name: 'Registered Auctions',
    link: '/registeredauction',
  },
  {
    name: 'My Auctions',
    link: '/myauction',
  },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userAuth, dispatch] = useContext(Store);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    Cookies.remove('token');
    Cookies.remove('user_id');
    Cookies.remove('user_name');
    await dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AppBar position="sticky" style={{ backgroundColor: '#002E6E' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Niलाmi
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
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Button component={Link} to={page.link}>
                      {page.name}
                    </Button>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.link}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={userAuth.user_name}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ m: 1, bgcolor: '#00B9F1' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userAuth.isAuth ? (
                <>
                  <MenuItem
                    onClick={() => {
                      navigate('/profile');
                    }}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </>
              ) : (
                  <>
                    <MenuItem
                      onClick={() => {
                        navigate('/');
                      }}
                    >
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                  </>
                )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
