import Jobs from "@/components/jobs/Jobs";
import NavBar from "@/components/ui/AppBar";
import Footer from "@/components/ui/Footer";
import SearchBar from "@/components/ui/SearchBar";
import { Container, Grid } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs | JobFit",
  description: "Find the best jobs for you. JobFit is the best platform to find the best jobs for you.",
};

export default function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const query = searchParams || "";
  const currentPage = Number(searchParams?.page) || 1;
  
  return (
    <>
      <NavBar />
      <Container maxWidth="lg" component="main">
        <Grid container spacing={2} my={2}>
          <Grid item xs={12}>
            <SearchBar />
          </Grid>
          <Jobs query={query} page={currentPage} />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
