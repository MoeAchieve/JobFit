import NextAuth from "next-auth"
import { prisma } from "@/config/prisma";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Role } from "@prisma/client";
import { getUserById } from "./lib/actions/user";

// type extendedUser = DefaultSession["user"] & {
//   role: Role;
// };

// declare module "next-auth" {
//   interface Session {
//     user: extendedUser;
//   }
// }

declare module "next-auth" {
  interface User {
    role: Role
    phone: string;
    isRecruiter: boolean;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
    async createUser({ user }) {
      await prisma.profile.create({
      data: {
        userId: user.id,
      },
      })
    },
  },
  adapter: PrismaAdapter(prisma) as any,
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await getUserById(token.sub);
      if (!user) return token;
      token.role = user.role;
      token.name = user.name;
      token.email = user.email;
      token.image = user.image;
      token.phone = user.phone;
      token.isRecruiter = user.isRecruiter;
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image as string;
        session.user.phone = token.phone as string;
        session.user.isRecruiter = token.isRecruiter as boolean;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  ...authConfig,
});
