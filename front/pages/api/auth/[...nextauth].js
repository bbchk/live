import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
        },
      },
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
  //       console.log(token);
  //       console.log(user);
  //       if (user) {
  //         token.user = user;
  //       }
  //       return token;
  //     },
  //     async session({ session, token }) {
  //       session.us   er = token.user;
  //       return session;
  //     },
  //   },
  secret: process.env.NEXTAUTH_SECRET,
});
