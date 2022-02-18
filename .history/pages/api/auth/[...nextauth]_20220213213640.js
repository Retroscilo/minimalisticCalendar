import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongo"
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: {  label: "Password", type: "password" }
      }
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
})