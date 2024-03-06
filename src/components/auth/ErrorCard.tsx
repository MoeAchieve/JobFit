"use client";

import { Box, Typography, Button, Alert, AlertTitle } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ErrorCard() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Oops! Something went wrong. Please try again.
      </Alert>
      <Button
        onClick={() => {
          router.back();
        }}
      >
        Go back
      </Button>
    </Box>
  );
}
