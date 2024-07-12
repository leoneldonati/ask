import { createState } from "@libs/state-js";

interface AuthStore  {
  isAuth: boolean;
  userLogged: null | UserLogged;
  errors: {
    message: string;
  } | null;
}
export const authStore = createState<AuthStore>({
  isAuth: false,
  userLogged: null,
  errors: null
}, { persist: true })

authStore.listen(state => {
   console.log(state)
   if (state.errors !== null) {
     setTimeout(() => authStore.set({ errors: null, isAuth: false, userLogged: null }), 3000)
   }
 })