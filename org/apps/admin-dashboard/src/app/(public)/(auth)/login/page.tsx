"use client";
import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Card } from "@org/shared-ui";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authApi } from "../../../../lib/api/auth";
import { AxiosError } from "axios";
import { APIErrorResponse } from "../../../../lib/axios";
import { useAuthStore } from "apps/admin-dashboard/src/lib/hooks/useAuthStore";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = handleSubmit(async (data: LoginFormInputs) => {
    console.log("Submitting data:", data); // Check if this runs
    setIsLoading(true);
    try {
      const response = await authApi.login(data);
      console.log("Response:", response); // Log server response
      if (response.success) {
        const { setUser } = useAuthStore.getState();
        setUser(response.user);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error during login:", error); // Log any errors
      if (error instanceof AxiosError) {
        const errorData = error.response?.data as APIErrorResponse;
        setLoginError(errorData?.message || "Authentication failed");
      } else {
        setLoginError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-[444px]">
        <div className="p-8 flex flex-col items-center">
          <Typography component="h1" variant="h5" className="mb-6">
            Admin Login
          </Typography>
          {loginError && (
            <Typography color="error" className="mb-4">
              {loginError}
            </Typography>
          )}
          <form onSubmit={onSubmit} className="mt-4 w-full">
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              error={!!errors.email}
              helperText={errors.email?.message}
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <Button type="submit" fullWidth variant="contained" className="mt-6 mb-4" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </Card>
    </main>
  );
}
