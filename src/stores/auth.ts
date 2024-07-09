import { createState } from "@libs/state-js";

interface AuthStore  {
  isAuth?: boolean;
  userLogged?: null | UserLogged;
  errors?: {
    message: string;
  } | null;
}
export const authStore = createState<AuthStore>({
  isAuth: false,
  userLogged: null,
  errors: null
})

authStore.listen(state => {
   console.log(state)
   if (state.errors !== null) {
     return setTimeout(() => authStore.set({ errors: null }), 3000)
   }
 })