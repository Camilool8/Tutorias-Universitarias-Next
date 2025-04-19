// src/app/api/auth/[...nextauth]/route.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Rutas públicas que no requieren autenticación
  publicRoutes: [
    "/",
    "/blog(.*)",
    "/services(.*)",
    "/cotizar",
    "/turnitin",
    "/contact",
    "/about",
    "/api/webhook(.*)",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
