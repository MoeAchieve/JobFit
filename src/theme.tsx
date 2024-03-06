"use client";

import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["greek"],
  display: "swap",
});

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#4640de",
    },
    secondary: {
      main: "#25324b",
    },
    background: {
      default: "#f5f5fa",
    },
  },
});
