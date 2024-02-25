import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import axios from "axios";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // CredentialsProvider({
    //   id: "login",
    //   async authorize(credentials) {
    //     try {
    //       const response = await axios.post(
    //         "http://your-express-server.com/login",
    //         {
    //           username: credentials.username,
    //           password: credentials.password,
    //         }
    //       );

    //       if (response.status === 200) {
    //         return { status: "Authenticated" };
    //       } else {
    //         throw new Error("User not authenticated");
    //       }
    //     } catch (error) {
    //       throw new Error("User not authenticated");
    //     }
    //   },
    // }),
  ],
  //   callbacks: {
  //     async jwt({ token, user }) {
  //       if (user) {
  //         token.user = user;
  //       }
  //       return token;
  //     },
  //     async session({ session, token }) {
  //       session.user = token.user;
  //       return session;
  //     },
  //   },
  secret: process.env.NEXTAUTH_SECRET,
});
