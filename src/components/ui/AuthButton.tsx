"use client";

import { Button } from "@mui/material";
import Link from "next/link";

interface IAuthButton {
  label: string;
  href: string;
  variant: "text" | "outlined" | "contained" | undefined;
}

export default function AuthButton({ variant, label, href }: IAuthButton) {
  return (
    <Link href={href}>
      <Button
        variant={variant}
        sx={{
          mx: 2,
          borderRadius: 0,
          fontWeight: 500,
        }}
      >
        {label}
      </Button>
    </Link>
  );
}
