import api from "../axios";
import serverApi from "../axiosServer";
import { User } from "../stores/authStore";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

interface DefaultResponse {
  success: boolean;
  message: string;
}

interface LoginResponse extends DefaultResponse {
  user: User;
}

interface LogoutResponse extends DefaultResponse {
  redirectUrl?: Location | (string & Location);
}

interface VerifyResponse extends DefaultResponse {
  user: User;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials, {
      withCredentials: true,
    });
    return data;
  },

  register: async (credentials: RegisterCredentials) => {
    const { data } = await api.post<DefaultResponse>("/auth/register", credentials, {
      withCredentials: true,
    });
    return data;
  },

  logout: async () => {
    const { data } = await api.post<LogoutResponse>("/auth/logout", {}, { withCredentials: true });
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await api.get<VerifyResponse>("/auth/verify", {
      withCredentials: true,
    });
    return data;
  },
};
