import { Box, Typography } from "@mui/material";
import Link from "next/link";

interface BackLinkProps {
  href: string;
  label: string;
}

export default function BackLink({ href, label }: BackLinkProps) {
  return (
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ ":hover": "text-decoration: underline" }}
      >
        <Link href={href}>{label}</Link>
      </Typography>
  );
}
