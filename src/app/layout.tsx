import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to JobFit - the best place to find your next job!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
