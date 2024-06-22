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
              align-text=" left"
              margin="auto"
              color="black"
            >
              Discover<br></br>
              more than
            </Typography>
            <Typography
              variant="h2"
              fontWeight="bold"
              align-text=" left"
              margin="auto"
              color="primary"
            >
              5000+ Jobs
            </Typography>
            <Typography variant="h5" color="#9e9d9d" align="left">
              Great platform for the job seeker that searching <br></br>for new
              career heights and passionate about startups.
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
