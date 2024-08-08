import type { UserLogged } from "@types";
import { atom } from "nanostores";

interface AuthStore {
  userLogged?: null | UserLogged;
  errors: {
    message: string;
  } | null;
}
export const authStore = atom<AuthStore>({
  userLogged: null,
  errors: null,
});

authStore.listen((state) => {
  if (state.errors !== null) {
    setTimeout(() => authStore.set({ errors: null }), 3000);
  }

  console.log(state)
});
