import { strapiAuthApi } from "@/lib/strapi";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
interface User {
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

interface AuthStore {
  user: User | null;
  jwt: string | null;
  setUser: (user: User) => void;
  setJwt: (jwt: string) => Promise<void>;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  jwt: null,
  setUser: (user: User) => set({ user }),
  setJwt: async (jwt: string) => {
    await AsyncStorage.setItem("jwt", jwt);
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    set({ jwt });
  },
  logout: async () => {
    await AsyncStorage.removeItem("jwt");
    delete axios.defaults.headers.common["Authorization"];
    set({ user: null, jwt: null });
    router.replace("/sign-in");
  },
  login: async (email: string, password: string) => {
    const res = await strapiAuthApi.login({ identifier: email, password });
    if (res.jwt) {
      await AsyncStorage.setItem("jwt", res.jwt);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.jwt}`;
      set({ user: res.user, jwt: res.jwt });
    }
  }
}));

export default useAuthStore;
