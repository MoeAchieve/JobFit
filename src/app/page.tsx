"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button, Container, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  const user = useCurrentUser();
  const name = user?.name;
  const email = user?.email;
  const image = user?.image;
  return (
    <Container>
      {user ? (
        <div>
          <Typography variant="h6">Welcome back, {name}</Typography>
          <p>Email: {email}</p>
          <Image src={image || ""} alt="cll" width={50} height={50} />
        </div>
      ) : (
        <div>
          <Typography variant="h4">Welcome to our site</Typography>
          <p>Please sign in</p>
          <Button href="/auth/signin" variant="outlined">
            Sign in
          </Button>
        </div>
      )}
    </Container>
  );
}
