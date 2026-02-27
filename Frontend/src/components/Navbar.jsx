import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { api } from '../util/axios';
import { useUser } from '../util/UserContext';

const Search = styled('div')(({ theme }) => ({
    border: '2px solid #ccc',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: "2rem",
    marginBlock: '0.8rem',
    cursor: 'text',
    [theme.breakpoints.up("md")]: {
        width: "50vw"
    },
    [theme.breakpoints.down("md")]: {
        display: 'none'
    }
}));
const SecondSearch = styled('div')(({ theme }) => ({
    border: '2px solid #ccc',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: "2rem",
    marginBlock: '0.8rem',
    marginInline: 'auto',
    cursor: 'text',
    [theme.breakpoints.up("md")]: {
        display: 'none'
    },
    [theme.breakpoints.down("md")]: {
        width: '70vw'
    },
    [theme.breakpoints.down("sm")]: {
        width: '80vw'
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    height: "35px",
    width: "35px",
    borderRadius: "50%",
    margin: '0.4rem 1rem',
    color: 'white',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    flexGrow: 1,
    padding: '0.5rem'
}));
const ListYourHome = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'black',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}))
const styleMenuItem = {
    marginBlock: '0.7rem',
    paddingInline: '1.1rem 4.5rem',
}

const styleLinks = {
    textDecoration: 'none',
    color: 'black'
}
export const Navbar = () => {
    const { user, setUser } = useUser()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleAuth = () => {
        if (user) {
            api.delete('/user/logout').then(() => {
                setUser(null)
            })
        }
        else {
            navigate('/user/authentication')
        }
    }
    const handleSearch = (e) => {

    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Box sx={{ borderBottom: '2px solid #ccc' }}>
                <Box onClick={handleAuth} style={styleLinks}>
                    <MenuItem sx={styleMenuItem} onClick={handleMenuClose}>{user ? "Logout" : 'Login'}
                    </MenuItem>
                </Box>
            </Box>
            <NavLink to={'/listing/addListing/page1'} style={styleLinks}>
                <MenuItem sx={styleMenuItem} onClick={handleMenuClose}>List Your Home </MenuItem>
            </NavLink>
            <NavLink to={`/mylisting/${user?.id}`} style={styleLinks}>
                <MenuItem sx={styleMenuItem} onClick={handleMenuClose}>My Listing</MenuItem>
            </NavLink>
            <NavLink style={styleLinks}>
                <MenuItem sx={styleMenuItem} onClick={handleMenuClose}>My Booking</MenuItem>
            </NavLink>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );


    return (
        <>
            <Box sx={{ flexGrow: 1, marginBottom: { md: '7rem', xs: '6rem' }, }} >
                <AppBar position="fixed" color='white' sx={{ top: 0, background: 'white', padding: { xs: '0.8rem', sm: '0.5rem 0' } }} >
                    <Toolbar style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                        >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1280px-Airbnb_Logo_B%C3%A9lo.svg.png" height={'40px'} alt="Airbnb img" />
                        </Typography>
                        <Search>
                            <StyledInputBase
                                placeholder="Any Where | Any Location | Any City"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={handleSearch}
                            />
                            <SearchIconWrapper>
                                <SearchIcon sx={{
                                    fontSize: "1.5rem"
                                }} />
                            </SearchIconWrapper>
                        </Search>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}>
                            <ListYourHome onClick={() => { navigate('/listing/addListing/page1') }}
                            >List Your Home</ListYourHome>
                            <Box onClick={handleProfileMenuOpen} sx={{
                                cursor: 'pointer', border: '2px solid #a5a3a3', borderRadius: '2rem',
                                padding: '0.5rem 1rem', display: { md: 'flex' }
                            }}>
                                <IconButton
                                    sx={{
                                        margin: 0,
                                        padding: 0,
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                // sx={{ mr: 2 }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <IconButton
                                    sx={{
                                        margin: 0,
                                        padding: 0,
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"

                                    color="inherit"
                                >
                                    {user ? <Box sx={{
                                        backgroundColor: 'black',
                                        color: 'white',
                                        width: "35px",
                                        height: '35px',
                                        fontSize: '1.2rem',
                                        borderRadius: "50%",
                                        display: 'grid',
                                        placeContent: 'center',
                                        marginLeft: '0.4rem'
                                    }}>{(user?.name).charAt(0).toUpperCase()}</Box> : <AccountCircle sx={{
                                        fontSize: '2.2rem',
                                        marginLeft: '0.4rem'
                                    }} />}
                                </IconButton>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </Box>
            <SecondSearch>
                <StyledInputBase
                    placeholder="Any Where | Any Location | Any City"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearch}
                />
                <SearchIconWrapper>
                    <SearchIcon sx={{
                        fontSize: "1.5rem"
                    }} />
                </SearchIconWrapper>
            </SecondSearch>
        </>
    );
}
