import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
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
    GithubProvider({
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
  callbacks: {
    async jwt({ token, user }) {
      console.log(token);
      console.log(user);
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    // jwt({ token, trigger, session }) {
    //   if (trigger === "update" && session?.name) {
    //     // todo Noote, that `session` can be any arbitrary object, remember to validate it!
    //     token.name = session.name;
    //   }
    //   return token;
    // },
    //  // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
    //  async session({ session, trigger, newSession }) {
    //   // Note, that `rest.session` can be any arbitrary object, remember to validate it!
    //   if (trigger === "update" && newSession?.name) {
    //     // You can update the session in the database if it's not already updated.
    //     // await adapter.updateUser(session.user.id, { name: newSession.name })

    //     // Make sure the updated value is reflected on the client
    //     session.name = newSession.name
    //   }
    //   return session
    // }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
