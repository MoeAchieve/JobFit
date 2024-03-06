"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/services/logout";
import { Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const user = useCurrentUser();
  const name = user?.name;
  const email = user?.email;
  const image = user?.image;
  return (
    <Container>
      {user ? (
        <div>
          <h1>Welcome back, {name}</h1>
          <p>Email: {email}</p>
          {image && <Image src={image || ""} alt="cll" width={50} height={50} />}
          <br />
          <Button onClick={() => logout()} variant="text" color="inherit">
            Sign out
          </Button>
        </div>
      ) : (
        <div>
          <h1>Welcome to our site</h1>
          <p>Please sign in</p>
          <Link href="/auth/signin">Sign in</Link>
        </div>
      )}
    </Container>
  );
}
