import { PrismaAdapter } from "@next-auth/prisma-adapter";
import  NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/libs/prismadb";
// import { CredentialsProvider } from "next-auth/providers";
import { error } from "console";
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
          throw new Error("Invalid Credentials");
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

