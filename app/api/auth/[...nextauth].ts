// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import "dotenv/config"
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
  async signIn({ user, account, profile }) {
    console.log('SignIn Callback:', { user, account, profile });
    return true; 
  },
  async session({ session, token }) {
    console.log('Session Callback:', { session, token });
    return session;
  },
},
});
