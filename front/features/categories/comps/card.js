import { useRouter } from "next/router";
import s from "./card.module.scss";

const Card = ({ naming, image }) => {
  const router = useRouter();
  return (
    <div
      role="button"
      onClick={() => {
        router.push("/");
      }}
      className={`${s.cat_card} `}
    >
      <p className={`${s.naming} `}>{naming}</p>
      <img className="card-img-bottom" src={image} alt="category" />
    </div>
  );
};

export default Card;
