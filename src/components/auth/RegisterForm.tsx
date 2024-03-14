"use client";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/lib/schemas";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import BackLink from "./BackButton";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { FcGoogle } from "react-icons/fc";
import { register } from "@/lib/actions/auth/register";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

type RegisterForm = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      cofngirmPassword: "",
      name: "",
    },
  });

  const togglePassword = () => setShowPassword((show) => !show);

  const onSubmit = (values: RegisterForm) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  const onClick = () => {
    signIn("google", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Create Account
      </Typography>
      <Box
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <Controller
          name="name"
          control={form.control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              autoComplete="name"
              autoFocus
              disabled={isPending}
              error={!!form.formState.errors.name}
              helperText={
                form.formState.errors.name
                  ? form.formState.errors.name.message
                  : ""
              }
            />
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              disabled={isPending}
              error={!!form.formState.errors.email}
              helperText={
                form.formState.errors.email
                  ? form.formState.errors.email.message
                  : ""
              }
            />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Password"
              autoComplete="name"
              type={showPassword ? "text" : "password"}
              disabled={isPending}
              error={!!form.formState.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePassword}
                      disabled={isPending}
                    >
                      {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={
                form.formState.errors.password
                  ? form.formState.errors.password.message
                  : ""
              }
            />
          )}
        />
        <Controller
          name="cofngirmPassword"
          control={form.control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="cpfngirmPassword"
              label="Confirm Password"
              autoComplete="password"
              type={showPassword ? "text" : "password"}
              disabled={isPending}
              error={!!form.formState.errors.cofngirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePassword}
                      disabled={isPending}
                    >
                      {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={
                form.formState.errors.cofngirmPassword
                  ? form.formState.errors.cofngirmPassword.message
                  : ""
              }
              color={form.formState.isValid ? "success" : "primary"}
            />
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isPending}
          sx={{ my: 2 }}
        >
          Create Account
        </Button>
        <Divider variant="middle">
          <Typography>OR</Typography>
        </Divider>
        <Button
          fullWidth
          startIcon={<FcGoogle />}
          disabled={isPending}
          sx={{ my: 2 }}
          variant="outlined"
          onClick={() => onClick()}
        >
          Continue with Google
        </Button>
      </Box>
      <BackLink href="/auth/login" label="Already have an account?" />
    </Box>
  );
}
