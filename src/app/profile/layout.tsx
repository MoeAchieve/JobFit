import NavBar from "@/components/ui/AppBar";
import Footer from "@/components/ui/Footer";
import { Container, Paper } from "@mui/material";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
