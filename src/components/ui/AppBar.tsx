"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { IoMdMenu } from "react-icons/io";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useCurrentUser } from "@/hooks/use-current-user";
import AuthButton from "./AuthButton";
import Link from "next/link";
import { logout } from "@/services/logout";
import { Divider } from "@mui/material";
import NavButton from "./NavButton";

const settings = {
  Profile: "/profile",
  Dashboard: "/dashboard",
};

const NavMenu = ({ anchorEl, handleClose, loggedIn }: any) => {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      sx={{
        display: { xs: "block", md: "none" },
      }}
    >
      <MenuItem onClick={handleClose} component={Link} href="/jobs">
        <Typography textAlign="center">Find Jobs</Typography>
      </MenuItem>
      <MenuItem onClick={handleClose} component={Link} href="/companies">
        <Typography textAlign="center">Browse Companies</Typography>
      </MenuItem>
      {!loggedIn && (
        <div>
          <MenuItem onClick={handleClose} component={Link} href="/auth/login">
            <Typography textAlign="center">Login</Typography>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            component={Link}
            href="/auth/register"
          >
            <Typography textAlign="center">Register</Typography>
          </MenuItem>
        </div>
      )}
    </Menu>
  );
};

const UserMenu = ({ anchorEl, handleClose }: any) => {
  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {Object.entries(settings).map(([key, value]) => (
        <MenuItem key={key} onClick={handleClose} component={Link} href={value}>
          <Typography textAlign="center">{key}</Typography>
        </MenuItem>
      ))}
      <MenuItem onClick={() => logout()}>
        <Typography textAlign="center">Logout</Typography>
      </MenuItem>
      <Divider variant="middle" />
      <MenuItem onClick={handleClose} component={Link} href="/jobs">
        <Button variant="text" fullWidth>
          Post Job
        </Button>
      </MenuItem>
    </Menu>
  );
};

export default function NavBar() {
  const user = useCurrentUser();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: {
              minHeight: "0 !important",
            },
          }}
        >
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <IoMdMenu />
            </IconButton>
            <NavMenu
              anchorEl={anchorElNav}
              handleClose={handleCloseNavMenu}
              loggedIn={user}
            />
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavButton variant="text" href="/jobs" label="Find Jobs" />
            <NavButton
              variant="text"
              href="/companies"
              label="Browse Companies"
            />
          </Box>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user.image || ""} />
                </IconButton>
              </Tooltip>
              <UserMenu
                anchorEl={anchorElUser}
                handleClose={handleCloseUserMenu}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              <AuthButton variant="text" href="/auth/login" label="Login" />
              <Divider orientation="vertical" flexItem />
              <AuthButton
                variant="contained"
                href="auth/register"
                label="Sign Up"
              />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
