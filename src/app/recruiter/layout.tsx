import NavBar from "@/components/ui/AppBar";
import Footer from "@/components/ui/Footer";
import { Container } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruiter | JobFit",
  description: "Find the best talent for your company. JobFit is the best platform to find the best talent for your company.",
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <Container maxWidth="lg" component="main">
        {children}
      </Container>
      <Footer />
    </>
  );
}
