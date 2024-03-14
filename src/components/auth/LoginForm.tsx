"use client";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/schemas";
import { z } from "zod";
import { login } from "@/lib/actions/auth/login";
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
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

type LoginForm = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePassword = () => setShowPassword((show) => !show);

  const onSubmit = (values: LoginForm) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
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
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
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
              autoFocus
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
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isPending}
          sx={{ my: 2 }}
        >
          Sign In
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
          Sign in with Google
        </Button>
      </Box>
      <BackLink href="/auth/register" label="Don't have an account?" />
    </Box>
  );
}
