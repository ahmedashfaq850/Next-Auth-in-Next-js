import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/DBModels/user.model";
import ConnectDB from "@/lib/db";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        // Connect to the database
        // await ConnectDB();
        try {
          const user = await User.findOne({ email: credentials.email });
          /* if (!user) {
            throw new Error("No user found");
          }
          if (user.password !== credentials.password) {
            throw new Error("Password is incorrect");
          } */

          if (user) {
            const isPasswordCorrect =
              (await user.password) === credentials.password ? true : false;

            if (isPasswordCorrect) {
              return user;
            }
          }
          return user;
        } catch (error) {
          throw new Error("Error while connecting to the database");
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
