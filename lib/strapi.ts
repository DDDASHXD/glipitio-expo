import axios from "axios";
import { config } from "./config";

export const STRAPI_URL = config.STRAPI_URL;
const API_TOKEN = config.API_TOKEN;

interface LoginData {
  identifier: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface StrapiUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
}

interface StrapiAuthResponse {
  jwt: string;
  user: StrapiUser;
}

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const strapiApi = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

strapiApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Strapi API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error;
  }
);

export const strapiAuthApi = {
  login: async (data: LoginData): Promise<StrapiAuthResponse> => {
    try {
      const response = await strapiApi.post<StrapiAuthResponse>(
        "/api/auth/local",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  register: async (data: RegisterData): Promise<StrapiAuthResponse> => {
    try {
      const response = await strapiApi.post<StrapiAuthResponse>(
        "/api/auth/local/register",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },
  getMe: async (jwt: string): Promise<StrapiUser> => {
    try {
      const response = await strapiApi.get<StrapiUser>("/api/users/me", {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Get me error:", error);
      throw error;
    }
  }
};

export const strapiClient = {
  get: async <T>(endpoint: string, params = {}) => {
    const headers: Record<string, string> = {};

    console.log("API_TOKEN", API_TOKEN);
    console.log("STRAPI_URL", STRAPI_URL);
    console.log("endpoint", endpoint);

    if (API_TOKEN) {
      headers["Authorization"] = `Bearer ${API_TOKEN}`;
    }

    const response = await strapiApi.get<StrapiResponse<T>>(`/api${endpoint}`, {
      params,
      headers
    });
    return response.data;
  },

  post: async <T>(endpoint: string, data = {}) => {
    const headers: Record<string, string> = {};
    if (API_TOKEN) {
      headers["Authorization"] = `Bearer ${API_TOKEN}`;
    }

    const response = await strapiApi.post<T>(`/api${endpoint}`, data, {
      headers
    });
    return response.data;
  },

  patch: async <T>(endpoint: string, data = {}) => {
    const headers: Record<string, string> = {};
    if (API_TOKEN) {
      headers["Authorization"] = `Bearer ${API_TOKEN}`;
    }

    const response = await strapiApi.patch<T>(`/api${endpoint}`, data, {
      headers
    });
    return response.data;
  },

  delete: async <T>(endpoint: string) => {
    const headers: Record<string, string> = {};
    if (API_TOKEN) {
      headers["Authorization"] = `Bearer ${API_TOKEN}`;
    }

    const response = await strapiApi.delete<T>(`/api${endpoint}`, {
      headers
    });
    return response.data;
  }
};
