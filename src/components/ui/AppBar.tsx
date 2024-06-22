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
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useCurrentUser } from "@/hooks/use-current-user";
import AuthButton from "./AuthButton";
import Link from "next/link";
import { logout } from "@/lib/actions/auth/logout";
import { Divider } from "@mui/material";
import NavButton from "./NavButton";
import UserAvatar from "./UserAvatar";
import Image from "next/image";

const settings = {
  Profile: "/profile",
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
        <Typography textAlign="center">Jobs</Typography>
      </MenuItem>
      <MenuItem onClick={handleClose} component={Link} href="/applications">
        <Typography textAlign="center">Applications</Typography>
      </MenuItem>
      {/* <MenuItem onClick={handleClose} component={Link} href="/companies">
        <Typography textAlign="center">Companies</Typography>
      </MenuItem> */}
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

const UserMenu = ({ anchorEl, handleClose, user }: any) => {
  const name = user.name.split(" ").slice(0, 2).join(" ");
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
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <UserAvatar size="medium" name={user?.name} image={user?.image} />
        <Box sx={{ ml: 2 }}>
          <Typography
            textAlign="center"
            variant="h6"
            sx={{
              typography: {
                xs: "body1",
              },
            }}
          >
            {name}
          </Typography>
        </Box>
      </Box>
      <Divider variant="middle" />
      {Object.entries(settings).map(([key, value]) => (
        <MenuItem key={key} onClick={handleClose} component={Link} href={value}>
          <Typography textAlign="center">{key}</Typography>
        </MenuItem>
      ))}
      <MenuItem onClick={() => logout()}>
        <Typography textAlign="center">Logout</Typography>
      </MenuItem>
      <Divider variant="middle" />
      {user.isRecruiter ? (
        <div>
          <MenuItem
            onClick={handleClose}
            component={Link}
            href="/recruiter/joblisting"
          >
            Job Listings
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            component={Link}
            href="/recruiter/applicants"
          >
            Applicants
          </MenuItem>
        </div>
      ) : (
        <MenuItem onClick={handleClose} component={Link} href="/recruiter/joblisting">
          <Button variant="text" fullWidth>
            Post Job
          </Button>
        </MenuItem>
      )}
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
      square
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
          <Box
            component="a"
            href="/"
            sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
          >
            <Image
              src="/images/logo1.png"
              alt="JobFit Logo"
              width={70}
              height={70}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="secondary"
            >
              <IoMdMenu />
            </IconButton>
            <NavMenu
              anchorEl={anchorElNav}
              handleClose={handleCloseNavMenu}
              loggedIn={user}
            />
          </Box>
          <Box
            component="a"
            href="/"
            sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}
          >
            <Image
              src="/images/logo1.png"
              alt="JobFit Logo"
              width={100}
              height={100}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavButton variant="text" href="/jobs" label="Jobs" />
            <NavButton variant="text" href="/applications" label="Applications" />
            {/* <NavButton variant="text" href="/companies" label="Companies" /> */}
          </Box>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <UserAvatar
                    size="small"
                    name={user?.name}
                    image={user?.image}
                  />
                </IconButton>
              </Tooltip>
              <UserMenu
                anchorEl={anchorElUser}
                handleClose={handleCloseUserMenu}
                user={user}
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
