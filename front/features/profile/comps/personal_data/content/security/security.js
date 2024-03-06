import Link from "next/link";
import s from "./security.module.scss";
import card_s from "./../card.module.scss";
import { Card } from "react-bootstrap";

const Security = () => {
  return (
    <Card className={`${card_s.card}`}>
      <Card.Header className={`${card_s.header}`}>
        <h5>Безпека</h5>
      </Card.Header>
      <Card.Body className={`${card_s.body}`}>
        <section className={`${s.security}`}>
          <Link href={"/"}>Змінити пароль?</Link>
          {/* <Link href={"/"}>Вийти</Link> */}
        </section>
      </Card.Body>
    </Card>
  );
};

export default Security;
