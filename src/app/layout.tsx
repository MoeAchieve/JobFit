import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/lib/theme";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { EdgeStoreProvider } from "@/lib/edgestore";
import LocProvider from "@/LocProvider";
import ToasterContainer from "@/components/ToasterContainer";

export const metadata: Metadata = {
  title: "Home | JobFit",
  description: "Welcome to JobFit - the best place to find your next job!",
  icons: ["/images/logoico.ico"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <EdgeStoreProvider>
          <LocProvider>
            <ThemeProvider theme={theme}>
              <body>
                {children}
                <ToasterContainer />
              </body>
            </ThemeProvider>
          </LocProvider>
        </EdgeStoreProvider>
      </SessionProvider>
    </html>
  );
}
