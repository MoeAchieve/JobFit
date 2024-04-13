"use client";

import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        marginTop: "auto",
        p: 4,
        color: "white",
        backgroundColor: "secondary.main",
      }}
      component="footer"
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6">JobFit</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="body1" component="div">
              Get job notifications
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 1,
              }}
            >
              <TextField
                type="email"
                size="small"
                placeholder="Enter your email"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  "& input": {
                    padding: "8px",
                  },
                }}
              />
              <Button variant="contained" sx={{ m: 1 }}>
                Subscribe
              </Button>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ background: "#eee", opacity: 0.1 }} />
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption" component="div">
            &copy; {new Date().getFullYear()} JobFit
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <FaLinkedin />
            <FaFacebookSquare />
            <FaSquareXTwitter />
            <FaGithub />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
