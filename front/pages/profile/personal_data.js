import TabLayout from "features/profile/comps/tab-layout";
import { Link } from "next/link"; // Import the Link component
import Head from "next/head";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Data from "features/profile/comps/personal_data/data-section";
import Security from "features/profile/comps/personal_data/security-section";
const PersonalData = () => {
  // console.log(session);
  const router = useRouter();
  const { data: session, status } = useSession();
  // console.log("🚀 ~ session:", session);

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
        {/* <h1>UNDER DEVELOPMENT</h1> */}
        <div
          className="accordion d-flex flex-column gap-3"
          id="accordionExample"
        >
          <Data />
          <Security />
        </div>
      </TabLayout>
    </>
  );
};

export default PersonalData;

// PersonalData.auth = true;

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
