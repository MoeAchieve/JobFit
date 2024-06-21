import Applications from "@/components/Applications";
import NavBar from "@/components/ui/AppBar";
import Footer from "@/components/ui/Footer";
import { currentUser } from "@/lib/auth";
import { Container } from "@mui/material";
import { Suspense } from "react";

export default async function Page() {
  const user = await currentUser();
  return (
    <>
    <NavBar />
      <Container maxWidth="lg" component="main">
        <Suspense fallback={<div>Loading...</div>}>
          <Applications id={user.id} />
        </Suspense>
      </Container>
      <Footer />
    </>
  );
}
