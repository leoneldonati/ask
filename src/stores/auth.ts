import { createState } from "@libs/state-js";

interface AuthStore {
  userLogged?: null | UserLogged;
  errors: {
    message: string;
  } | null;
}
export const authStore = createState<AuthStore>({
  userLogged: null,
  errors: null,
});

authStore.listen((state) => {
  if (state.errors !== null) {
    setTimeout(() => authStore.set({ errors: null }), 3000);
  }
});
