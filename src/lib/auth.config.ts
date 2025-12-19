import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // Middleware logic is handled in middleware.ts
      return true;
    },
    session({ session, token }) {
      if (token?.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    }
  },
  providers: [],
} satisfies NextAuthConfig;
