import UserInfo from "./user_info/user_info";
import s from "./index.module.scss";
import Security from "./security/security";

const Content = () => {
  return (
    <section className={`${s.personal}`}>
      <UserInfo />
      <Security />
    </section>
  );
};

export default Content;
