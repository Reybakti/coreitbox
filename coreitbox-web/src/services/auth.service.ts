import { api } from "./api";

import {
  LoginResponse,
} from "@/types/auth";

export const AuthService = {
  async login(
    username: string,
    password: string,
  ) {
    const response =
      await api.post<LoginResponse>(
        "/auth/login",
        {
          username,
          password,
        },
      );

    return response.data;
  },

  async me() {
    const response =
      await api.get("/auth/me");

    return response.data;
  },
};