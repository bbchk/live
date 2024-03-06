import UserInfo from "./user_info/user_info";
import s from "./index.module.scss";
import Security from "./security/security";
import { useSession } from "next-auth/react";

const Content = () => {
  const { data: session } = useSession();

  return (
    <section className={`${s.personal}`}>
      <UserInfo />
      {session && session.provider == "credentials" && <Security />}
    </section>
  );
};

export default Content;
