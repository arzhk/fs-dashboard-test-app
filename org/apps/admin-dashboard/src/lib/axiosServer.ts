"use server";
import axios from "axios";
import { cookies } from 'next/headers';

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials:true,
  headers: {
    "Content-Type": "application/json",
  },
});

serverApi.interceptors.request.use((config) => {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

serverApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default serverApi;

export type { APIErrorResponse } from './axios';
