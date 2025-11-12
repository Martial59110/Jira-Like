import NextAuth, { type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUsers } from "../users";
import bcrypt from "bcryptjs";

const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const users = getUsers();
        const user = users.find((u) => u.email === credentials.email);

        if (!user) {
          return null;
        }

        let isPasswordValid = false;

        if (
          user.password.startsWith("$2a$") ||
          user.password.startsWith("$2b$")
        ) {
          isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
        } else {
          isPasswordValid = user.password === credentials.password;
          if (isPasswordValid) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const updatedUsers = users.map((u) =>
              u.id === user.id ? { ...u, password: hashedPassword } : u
            );
            const { saveUsersSync } = await import("../users");
            saveUsersSync(updatedUsers);
          }
        }

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || "your-secret-key-change-in-production",
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export const { GET, POST } = handlers;
