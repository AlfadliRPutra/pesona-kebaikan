import { Role } from "@/generated/prisma";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  role: Role;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
  
  interface User {
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
  }
}
