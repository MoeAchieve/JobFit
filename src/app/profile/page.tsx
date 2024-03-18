"use client";

import { Container, Grid, Divider, Typography } from "@mui/material";
import NavBar from "@/components/ui/AppBar";
import ProfileForm from "@/components/profile/ProfileForm";
import PersonalForm from "@/components/profile/PersonalForm";
import Experience from "@/components/profile/ProfileExperience";

export default function Page() {
  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <Grid
          container
          spacing={4}
          my={1}
          sx={{
            border: "1px solid #e0e0e0",
          }}
        >
          <Grid item xs={4}>
            <Typography variant="h6">About</Typography>
            <Typography variant="body1" color="gray">
              Tell us about yourself.
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <PersonalForm />
            <ProfileForm />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Experience</Typography>
            <Typography variant="body1" color="gray">
              Add your work experience.
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Experience />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
