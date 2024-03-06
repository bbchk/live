import { useSession } from "next-auth/react";
import ProfileImage from "./profile_image";
import UserInfoForm from "./user_info_form";
import Card from "react-bootstrap/Card";
import s from "./user_info.module.scss";
import card_s from "./../card.module.scss";

const UserInfo = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <>
      <Card className={`${card_s.card}`}>
        <Card.Header className={`${card_s.header}`}>
          <i className="bi bi-person-circle" />
          <h4>Персональна інформація</h4>
        </Card.Header>
        <Card.Body className={`${card_s.body}`}>
          <section className={`${s.user_info}`}>
            <ProfileImage user={user} />
            <UserInfoForm user={user} />
          </section>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserInfo;
