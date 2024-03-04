import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
//todo implement facebook and apple
// import FacebookProvider from "next-auth/providers/facebook";
// import AppleProvider from "next-auth/providers/apple";

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
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    // }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "login",
      credentials: {
        username: { label: "Ім'я", type: "text" },
        username: { label: "Прізвище", type: "text" },
        username: {
          label: "Пошта",
          type: "email",
          placeholder: "placeuser@example.com",
        },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        const response = await axios.post(`/user/signUp`, {
          firstName,
          secondName,
          email,
          password,
        });

        // const response = await axios.post(
        //   `/user/signIn`,
        //   { email, password },
        //   { headers: { "Content-type": "application/json" } }
        // );

        const json = response.data;
        localStorage.setItem("user", JSON.stringify(json));
        dispatch(sign_in(json));
        setCookie(null, "auth-token", json.token, {
          path: "/",
          sameSite: "strict",
          maxAge: 3 * 24 * 60 * 60, // expires in 3 days
        });
        setIsLoading(false);
        try {
          const response = await axios.post("/login", {
            username: credentials.username,
            password: credentials.password,
          });

          if (response.status === 200) {
            return { status: "Authenticated" };
          } else {
            throw new Error("User not authenticated");
          }
        } catch (error) {
          throw new Error("User not authenticated");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log(token);
      // console.log(user);
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
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "#e5ffbb", // Hex color code
    logo: "public/logo.svg", // Absolute URL to image
    buttonText: "#6CB4EE", // Hex color code
  },
};

export default NextAuth(authOptions);
