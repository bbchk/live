import TabLayout from "features/profile/comps/tab-layout";
import { Link } from "next/link"; // Import the Link component
import Head from "next/head";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

// const PersonalData = ({ session }) => {
const PersonalData = () => {
  // console.log(session);
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(`/api/auth/signin?callbackUrl=/profile/personal_data`);
    },
  });

  if (status === "loading") {
    return "Loading or not authenticated...";
  }
  return (
    <>
      <Head>
        <title>Живий світ | Персональна інформація</title>
        <meta
          name="description"
          content="Живий Світ | Персональна інформація"
        />
      </Head>

      <TabLayout>
        <h1>UNDER DEVELOPMENT</h1>
        {/* <div
          className="accordion d-flex flex-column gap-3"
          id="accordionExample"
        >
          <Data />
          <Security />
        </div> */}
      </TabLayout>
    </>
  );
};

export default PersonalData;

// export async function getServerSideProps(context) {
// ! should use getServerSession only for server side session fetching
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: `/api/auth/signin?callbackUrl=/profile/personal_data`,
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }

// todo updating user data with no page reloading

// import { useSession } from "next-auth/react"

// export default function Page() {
//   const { data: session, status, update } = useSession()

//   if (status === "authenticated") {
//     return (
//       <>
//         <p>Signed in as {session.user.name}</p>

//         {/* Update the value by sending it to the backend. */}
//         <button onClick={() => update({ name: "John Doe" })}>Edit name</button>
//         {/*
//          * Only trigger a session update, assuming you already updated the value server-side.
//          * All `useSession().data` references will be updated.
//          */}
//         <button onClick={() => update()}>Edit name</button>
//       </>
//     )
//   }

//   return <a href="/api/auth/signin">Sign in</a>
// }
