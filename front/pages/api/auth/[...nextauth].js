import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

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
    CredentialsProvider({
      name: "Credentials",
      id: "login",
      type: "credentials",
      credentials: {
        // firstName: { label: "Ім'я", type: "text" },
        // secondName: { label: "Прізвище", type: "text" },
        email: {
          label: "Пошта",
          type: "email",
          placeholder: "placeuser@example.com",
        },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(req);
        console.log(credentials);
        try {
          const response = await axios.post(
            `/user/signIn`,
            {
              email: credentials.email,
              password: credentials.password,
            },
            { headers: { "Content-type": "application/json" } }
          );
          const user = response.data;

          if (response.status === 200) {
            // return { status: "Authenticated" };
            return user;
          } else {
            return null;
          }
        } catch (error) {
          throw new Error("User not authenticated");
        }
      },
    }),
  ],
  callbacks: {
    // async signIn(user, account, profile) {
    //   console.log(account.provider);
    //   if (account.provider === "github") {
    //     const githubUser = {
    //       id: profile.id,
    //       login: profile.login,
    //       name: profile.name,
    //       avatar: user.image,
    //     };

    //     user.accessToken = await getTokenFromYourAPIServer(
    //       "github",
    //       githubUser
    //     );
    //     return true;
    //   }

    //   return true;
    // },
    async signIn(user, account, profile) {
      console.log(account);
      console.log(user);
      console.log(profile);

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

//todo implement facebook and apple
// import FacebookProvider from "next-auth/providers/facebook";
// import AppleProvider from "next-auth/providers/apple";

// FacebookProvider({
//   clientId: process.env.FACEBOOK_CLIENT_ID,
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
// }),
// AppleProvider({
//   clientId: process.env.APPLE_ID,
//   clientSecret: process.env.APPLE_SECRET
// }),

//callback for user updating their information, so that session will be updated
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
