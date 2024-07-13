import { createState } from "@libs/state-js";
import type { AstroCookies, ValidRedirectStatus } from "astro";

interface AuthStore  {
  userLogged: null | UserLogged;
  errors: {
    message: string;
  } | null;
  verifySession?: (cookies: AstroCookies, redirect: (path: string, status?: ValidRedirectStatus) => Response
) => Response
}
export const authStore = createState<AuthStore>({
  userLogged: null,
  errors: null,
}, { persist: true })

authStore.listen(state => {
   console.log(state)
   if (state.errors !== null) {
     setTimeout(() => authStore.set({ errors: null, userLogged: null }), 3000)
   }
 })