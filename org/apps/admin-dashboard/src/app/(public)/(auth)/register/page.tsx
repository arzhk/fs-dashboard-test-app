"use client";
import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
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
    <main className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-[444px]">
        <div className="p-8 flex flex-col items-center">
          <Typography component="h1" variant="h5" className="mb-6">
            Admin Registration
          </Typography>
          {registerError && (
            <Typography color="error" className="mb-4">
              {registerError}
            </Typography>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full">
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Full Name"
              error={!!errors.name}
              helperText={errors.name?.message}
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
            <TextField
              margin="normal"
              fullWidth
              label="Confirm Password"
              type="password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "The passwords do not match",
              })}
            />
            <Button type="submit" fullWidth variant="contained" className="mt-6 mb-4" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </div>
      </Card>
    </main>
  );
}
