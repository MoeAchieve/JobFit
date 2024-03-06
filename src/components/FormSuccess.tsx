import Alert from "@mui/material/Alert";

interface FormSuccessProps {
  message?: string;
}

export default function FormError({ message }: FormSuccessProps) {
  if (!message) return null;
  return (
    <Alert variant="standard" severity="success">
      {message}
    </Alert>
  );
}
