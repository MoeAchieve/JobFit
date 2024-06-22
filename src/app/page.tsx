"use client";
import NavBar from "@/components/ui/AppBar";
import Footer from "@/components/ui/Footer";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchBar from "@/components/ui/SearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <NavBar />
      <Container
        maxWidth="lg"
        component="main"
        style={{
          height: "100vh",
        }}
      >
        <Box my={10} display="flex">
          <Box>
            <Typography
              variant="h2"
              fontWeight="bold"
              align="left"
              margin="auto"
              color="black"
            >
              Elevate Your Career with
            </Typography>
            <Typography
              variant="h2"
              fontWeight="bold"
              align="left"
              margin="auto"
              color="primary"
            >
              AI-Powered Matching
            </Typography>
            <Typography variant="h5" color="#9e9d9d" align="left">
              Leverage cutting-edge AI technology to find personalized job
              recommendations and make smarter career decisions.
            </Typography>
          </Box>
          <Image
            src="/images/career.svg"
            alt="careerdraw"
            width={500}
            height={500}
          />
        </Box>
        <SearchBar />
      </Container>
      <Footer />
    </>
  );
}
