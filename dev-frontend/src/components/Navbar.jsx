import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, AppBar, Toolbar, Button, Container, Divider, Typography, MenuItem, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { user_logout } from "../redux/actions/userActions";

const logoStyle = {
  width: "200px",
  height: "auto",
  cursor: "pointer",
};

const StyledAppBar = styled(AppBar)({
  boxShadow: 0,
  backgroundColor: "white",
  // marginTop: "16px",
});

const StyledToolbar = styled(Toolbar)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "white",
  // backgroundColor: "rgba(255, 255, 255, 0.4)",
  // backgroundColor: "red",
  // backdropFilter: "blur(24px)",
  // borderRadius: "999px",
  // maxHeight: "40px",
  // border: "1px solid",
  // borderColor: theme.palette.divider,
  // boxShadow: "0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)",
}));

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});


const NavMenuItem = ({ to, children }) => (
  <StyledLink to={to}>
    <MenuItem sx={{ py: '6px', px: '12px' }}>
      <Typography variant="body2" color="text.primary">{children}</Typography>
    </MenuItem>
  </StyledLink>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);
  const isLoggedIn = Boolean(userInfo && userInfo._id);

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);
  const logoutHandler = () => {
    dispatch(user_logout());
    navigate('/');
  }
  const loginRedirect = () => navigate('/signin');
  const registerRedirect = () => navigate('/signup');

  return (
    <StyledAppBar position="fixed">
      <Container maxWidth="lg">
        <StyledToolbar variant="regular">
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", ml: "-18px" }}>
            <Link to="/">
              <Box><img src="/Kloudstac_logo.png" style={logoStyle} alt="logo of Kloudstac" /></Box>
            </Link>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {isLoggedIn && (
                <>
                  <NavMenuItem to="/dashboard">Dashboard</NavMenuItem>
                  {/* <NavMenuItem to="/metrices">Metrices</NavMenuItem> */}
                  <NavMenuItem to="/profile">Profile</NavMenuItem>
                </>
              )}
              <NavMenuItem to="/highlights">Highlights</NavMenuItem>
              <NavMenuItem to="/news">News</NavMenuItem>
              {/* <NavMenuItem to="/pricing">Pricing</NavMenuItem> */}
              {/* <NavMenuItem to="/faq">FAQ</NavMenuItem> */}
            </Box>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, alignItems: "center" }}>
            {isLoggedIn ? (
              <Button color="primary" variant="text" size="small" onClick={logoutHandler}>
                <h3>Logout</h3>
              </Button>
            ) : (
              <>
                <Button color="primary" variant="text" size="small">
                  <Link to="/signin" style={{ textDecoration: "none" }}>
                    <strong>Sign in</strong>
                  </Link>
                </Button>
                <Button color="primary" variant="contained" size="small">
                  <StyledLink to="/signup"><strong>Sign up</strong></StyledLink>
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: { sm: "", md: "none" } }}>
            <Button variant="text" color="primary" onClick={toggleDrawer(true)} sx={{ minWidth: "30px", p: "4px" }}>
              <MenuIcon />
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ minWidth: "60dvw", p: 2, backgroundColor: "background.paper", flexGrow: 1 }}>
                {isLoggedIn && (
                  <>
                    <NavMenuItem to="/dashboard">Dashboard</NavMenuItem>
                    {/* <NavMenuItem to="/metrices">Metrices</NavMenuItem> */}
                    <NavMenuItem to="/profile">Profile</NavMenuItem>
                  </>
                )}
                <NavMenuItem to="/highlights">Highlights</NavMenuItem>
                <NavMenuItem to="/news">News</NavMenuItem>
                {/* <NavMenuItem to="/pricing">Pricing</NavMenuItem> */}
                {/* <NavMenuItem to="/faq">FAQ</NavMenuItem> */}
                <Divider />
                {isLoggedIn ? (
                  <Button color="primary" variant="outlined" onClick={logoutHandler} sx={{ width: "100%" }}>Logout</Button>
                ) : (
                  <>
                    <MenuItem>
                      <Button color="primary" variant="contained" onClick={registerRedirect} sx={{ width: "100%" }}>Sign Up</Button>
                    </MenuItem>
                    <MenuItem>
                      <Button color="primary" variant="outlined" onClick={loginRedirect} sx={{ width: "100%" }}>Sign In</Button>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
}

NavMenuItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Navbar;
