import api from "@/lib/api";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
    };
    token: string;
  };
  statusCode: number;
}

export const loginUser = async (payload: LoginPayload) => {
  const { data } = await api.post<ApiResponse>("/api/auth/login", payload);
  return data.data;
};

export const registerUser = async (payload: RegisterPayload) => {
  const { data } = await api.post<ApiResponse>("/api/auth/register", payload);
  return data.data;
};
