import "./CompanyNavbar.css"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {NavLink, useNavigate} from "react-router-dom";
import authService from "../../../Services/AuthService";
import {toast} from "react-toastify";
import errorHandler from "../../../Utils/ErrorHandler";
import {authStore} from "../../../Redux/OurStore";

const pages: any[] = [/*'The Coupon Emporium','Customers', 'Companies'*/];
const settings = ['Profile','Coupons', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const userName = authStore.getState().user.name;
    const navigate = useNavigate();
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (/*page:string */) => {
        setAnchorElNav(null);
        //    
        //     if (page === 'Companies')
        //         navigate("admin/getcompanies");
        //     else if (page === 'Customers')
        //         navigate("/admin/getcustomers");
        //     else 
        //         navigate("/discovery");
        //    
    };

    const handleCloseUserMenu = (setting:string) => {
        setAnchorElUser(null);
        if (setting === 'Profile')
            navigate("company/details");
        else if (setting === 'Coupons')
            navigate("company/coupons");
        else if (setting === 'Logout')
            authService.logout()
                .then(()=>{toast.success("Logged out successfully");navigate("/login")})
                .catch(e=>errorHandler.showError(e));
        else 
            navigate("/discovery");
    };

    return (
        <AppBar className={"appBar"} position="static" sx={{backgroundColor: "#e8a885"} }>
            <Container maxWidth="xl">
                <Toolbar className={"toolBar"} disableGutters>
                    {/*<AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>*/}
                    {/*</NavLink>*/}
                    <NavLink to={"/homepage"}><img src={"/the-coupon-emporium-high-resolution-logo.png"} alt={"Logo"}/> </NavLink>
                    <Typography className={"logoImage"}
                                variant="h6"
                                noWrap
                                component="a"
                                // href="/discovery"
                                sx={{
                                    mr: 2,
                                    display: {xs: 'none', md: 'flex'},
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    paddingBottom: '.5rem',
                                    marginBottom: '.1.2rem'
                                }}
                    >
                        {/*<img src={"/2the-coupon-emporium-favicon-black2.png"} alt={"Logo"}/>*/}
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
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
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'black', display: 'block'}}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" 
                                        sx={{
                                            backgroundColor: '#e5c8b9',
                                            color: 'black',
                                            fontWeight: 'bold',
                                }}>
                                    {userName ? userName[0].toUpperCase() : ''}
                                </Avatar>

                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={()=>handleCloseUserMenu(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
