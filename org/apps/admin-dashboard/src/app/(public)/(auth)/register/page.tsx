"use client";
import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { Card } from "@org/shared-ui";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authApi } from "../../../../lib/api/auth";
import { APIErrorResponse } from "../../../../lib/axios";
import { AxiosError } from "axios";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [registerError, setRegisterError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInputs>();

  const password = watch("password");

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    try {
      const response = await authApi.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (response.success) {
        router.push("/login");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data as APIErrorResponse;
        setRegisterError(errorData?.message || "Registration failed");
      } else {
        setRegisterError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        bgcolor: "background.default",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "444px",
          p: 0,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "background.paper",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 4,
              color: "text.primary",
              fontWeight: "bold",
            }}
          >
            Admin Registration
          </Typography>

          {registerError && (
            <Typography
              color="error"
              sx={{
                mb: 3,
                bgcolor: "error.main",
                color: "error.contrastText",
                py: 1,
                px: 2,
                borderRadius: 1,
                width: "100%",
                textAlign: "center",
              }}
            >
              {registerError}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              width: "100%",
              mt: 1,
            }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Full Name"
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
                "& .MuiFormHelperText-root": {
                  mt: 0.5,
                  mb: -0.5,
                },
              }}
              {...register("name", {
                required: "Name is required",
              })}
            />

            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                mt: 1,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
                "& .MuiFormHelperText-root": {
                  mt: 0.5,
                  mb: -0.5,
                },
              }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                mt: 1,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
                "& .MuiFormHelperText-root": {
                  mt: 0.5,
                  mb: -0.5,
                },
              }}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Confirm Password"
              type="password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              sx={{
                mt: 1,
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
                "& .MuiFormHelperText-root": {
                  mt: 0.5,
                  mb: 0,
                },
              }}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "The passwords do not match",
              })}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 1,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                  transform: "translateY(-1px)",
                  boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.dark}40`,
                },
                "&:disabled": {
                  bgcolor: "primary.dark",
                  opacity: 0.6,
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
