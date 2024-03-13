"use client";
import { Container, Grid } from "@mui/material";

export default function Home() {
  return (
    <Container>
      <main>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <h1>Home</h1>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}
