import NextAuth from "next-auth";
import { Google, Apple } from "next-auth/react";

export default NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    // other providers...
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

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
// ],
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
// secret: process.env.NEXTAUTH_SECRET,
// });
