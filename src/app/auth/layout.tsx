import { Container, Paper } from "@mui/material";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={1} sx={{ padding: 4, marginTop: 8 }}>
        {children}
      </Paper>
    </Container>
  );
}
