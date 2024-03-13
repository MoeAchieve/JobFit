import { Button } from "@mui/material";
import Link from "next/link";

interface INavButton {
  label: string;
  href: string;
  variant: "text" | "outlined" | "contained" | undefined;
}

export default function NavButton({ variant, label, href }: INavButton) {
  return (
    <Link href={href}>
      <Button
        variant={variant}
        sx={{
          py: 3,
          borderBottom: "3px solid transparent",
          borderRadius: 0,
          color: "text.secondary",
          ":hover": {
            color: "primary.main",
            borderBottomColor: "primary.main",
            backgroundColor: "transparent",
          },
        }}
      >
        {label}
      </Button>
    </Link>
  );
}
