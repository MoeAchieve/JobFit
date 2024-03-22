import { Container, Grid, Divider, Typography } from "@mui/material";
import NavBar from "@/components/ui/AppBar";
import ProfileForm from "@/components/profile/ProfileForm";
import PersonalForm from "@/components/profile/PersonalForm";
import Experience from "@/components/profile/ProfileExperience";
import { currentUser } from "@/lib/auth";
import { getProfileById } from "@/lib/actions/profile";
import { IProfile } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Edit your JobFit profile.",
};

export default async function Page() {
  const user = await currentUser();

  //TODO: Get rid of this
  if (!user) {
    return null;
  }

  const profile: IProfile = await getProfileById(user.id!);

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
          <Grid item xs={8} p={3}>
            <PersonalForm />
            <ProfileForm
              bio={profile.bio}
              location={profile.location}
              website={profile.website}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Experience</Typography>
            <Typography variant="body1" color="gray">
              Add your work experience.
            </Typography>
          </Grid>
          <Grid item xs={8} p={3}>
            <Experience exp={profile.experiences} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
