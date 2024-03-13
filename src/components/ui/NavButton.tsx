import { Button } from "@mui/material";
import Link from "next/link";

interface INavButton {
  label: string;
  href: string;
}

export default function NavButton({ label, href }: INavButton) {
  return (
    <Button
      href={href}
      LinkComponent={Link}
      sx={{
        py: 3,
        borderBottom: "3px solid transparent",
        borderRadius: 0,
        color: "black",
        display: "block",
        ":hover": {
          color: "primary.main",
          backgroundColor: "primary.background",
          borderBottomColor: "primary.main",
        },
      }}
    >
      {label}
    </Button>
  );
}
