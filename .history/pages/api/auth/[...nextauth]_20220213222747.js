import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../../../lib/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'email',
      credentials: {
        username: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials, req) {
        const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }
        return user
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
    async signIn({ account, user }) {
      if (account.provider === "google") {
        await dbConnect()
        let userInDb = User.find(profil.email)
        if(userInDb) return true 

        userInDb = User.create({
          email: user.email
        })
      }
    }
  },
});
