"use client";
import NavBar from "@/components/ui/AppBar";
import { Container, Grid } from "@mui/material";

export default function Home() {
  return (
    <>
      <NavBar />
      <Container>
        <main>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <h1>Home</h1>
            </Grid>
          </Grid>
        </main>
      </Container>
    </>
  );
}
