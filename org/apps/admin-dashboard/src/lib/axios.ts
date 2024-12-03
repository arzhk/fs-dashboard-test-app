"use client";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith("auth_token="));
  const token = tokenCookie ? tokenCookie.split("=")[1] : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("No auth_token found in cookies.");
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

export interface APIErrorResponse {
  success: boolean;
  message: string;
  details?: string;
}
