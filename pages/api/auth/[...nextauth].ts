import { PrismaAdapter } from "@next-auth/prisma-adapter";
// This line imports the PrismaAdapter from the @next-auth/prisma-adapter package. The PrismaAdapter is used to integrate NextAuth with Prisma for session management and user authentication.

import  NextAuth, { AuthOptions } from "next-auth";
// This line imports the NextAuth function and the AuthOptions interface from the next-auth package. NextAuth is the main function used to configure and initialize the NextAuth authentication system.
import GithubProvider from "next-auth/providers/github";
// This line imports the GithubProvider from the next-auth/providers/github package. It provides the GitHub OAuth authentication provider for NextAuth.
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/libs/prismadb";
// This line imports the prisma instance from the @/app/libs/prismadb module. It is used as the database adapter for NextAuth through the PrismaAdapter.
// import { CredentialsProvider } from "next-auth/providers";
// This line imports the bcrypt library, which is used for password hashing and comparison.
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      // these will be the credentials given by the user

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Oops! The Email and password does not match..");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
        });

        //IF USER is not found or it does not have the credentials then
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }
const isCorrectPassword = await bcrypt.compare(
  credentials.password
  ,
  user.hashedPassword
);

//if password doesnot match with the hashed password of the database

if(!isCorrectPassword){
  throw new Error("Invalid  Credentials")
}

 return user;
     }
    })
  ],
//if any error happens in the credentials it redirects to tha slash page

  pages:{
    signIn:'/',
  },

  //this will help you to see the error else you would not be able to see them

  debug:process.env.NODE_ENV =="development",
  session:{
    strategy:'jwt'
  },
  secret:process.env.NEXTAUTH_SECRET
};
export default NextAuth(authOptions)





// export const authOptions: AuthOptions = { ... }: This line exports the authOptions object as a named export. It contains the configuration options for NextAuth.

// adapter: PrismaAdapter(prisma),: This line sets the adapter option to use the PrismaAdapter with the prisma instance as the adapter for session management and user authentication.

// providers: [...]: This array defines the authentication providers to be used by NextAuth. In this case, it includes GithubProvider, GoogleProvider, and CredentialsProvider with their respective configurations.

// async authorize(credentials) { ... }: This function is the authorize callback for the CredentialsProvider. It is responsible for validating the provided credentials (email and password) and returning the corresponding user object if authentication is successful.

// pages: { ... }: This object defines the authentication-related page routes. In this case, it sets the signIn page to '/', which means the sign-in page will be the home page of the application.

// debug: process.env.NODE_ENV === "development",: This line enables debug mode for NextAuth when the environment is set to development. It provides more detailed error messages during development.

// session: { strategy: 'jwt' },: This line configures the session strategy to use JSON Web Tokens (JWT) for session management.

// secret: process.env.NEXTAUTH_SECRET,: This line sets the secret key used for signing and verifying JWT tokens. It retrieves the value from the NEXTAUTH_SECRET environment variable.