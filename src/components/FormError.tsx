import Alert from "@mui/material/Alert";

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <Alert variant="standard" severity="error">
      {message}
    </Alert>
  );
}
