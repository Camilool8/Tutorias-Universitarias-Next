import { initTRPC, TRPCError } from "@trpc/server";
import { getAuth } from "@clerk/nextjs/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const auth = getAuth(opts.req);

  return {
    auth,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create();

// Middleware para verificar autenticación
const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.auth?.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

// Middleware para verificar rol de administrador
const isAdmin = t.middleware(async ({ ctx, next }) => {
  if (!ctx.auth?.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  // Aquí se verificaría si el usuario es administrador
  // Por ejemplo: const user = await db.user.findUnique({ where: { id: ctx.auth.userId } });
  // if (user?.role !== 'ADMIN') throw new TRPCError({ code: 'FORBIDDEN' });

  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
export const adminProcedure = t.procedure.use(isAdmin);
