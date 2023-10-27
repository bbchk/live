import { parseCookies } from "nookies";

export default async function getServerSideProps(context) {
  const { req } = context;
  const cookies = parseCookies({ req });
  const token = cookies["auth-token"];

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const data = ["some data"];

  return {
    props: {
      data: data,
    },
  };
}
