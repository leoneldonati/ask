import { defineMiddleware } from "astro:middleware";

// MIDDLEWARE PARA MANEJAR SESION DEL USUARIO
export const onRequest = defineMiddleware(
  ({ locals, redirect, cookies, url }, next) => {
    const loginPage = new URL(url).pathname === "/login";
    
    if (loginPage) return next();
    
    const token = cookies.get("Cookies");
    
    if (!token) return redirect("/login");
    
    console.log({ locals, token, loginPage }); 

    return next();
  }
);
