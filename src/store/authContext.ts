import {AuthResponse, User} from "@/interfaces";
import {getItemFromLocalStorage} from "@/utils/localStorage";
import create from "zustand";
import {immer} from "zustand/middleware/immer";

interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  jwt: string | null;
  login: (response: AuthResponse) => void;
  logout: () => void;
}

const useAuthContext = create<AuthContext>()(
  immer((set) => ({
    user: getItemFromLocalStorage("user"),
    isAuthenticated: getItemFromLocalStorage("isAuthenticated") ?? false,
    jwt: getItemFromLocalStorage("jwt"),
    login: ({user, jwt}: AuthResponse) =>
      set((state) => {
        state.jwt = jwt;
        state.user = user;
        state.isAuthenticated = true;
      }),
    logout: () => {
      set((state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.jwt = null;
      });
    },
  }))
);

export default useAuthContext;
