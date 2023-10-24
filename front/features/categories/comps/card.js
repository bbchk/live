import s from "./card.module.scss";

const Card = ({ naming, image }) => {
  return (
    <div role="button" onClick={() => {}} className={`${s.cat_card} `}>
      <p className={`${s.naming} `}>{naming}</p>
      <img className="card-img-bottom" src={image} alt="category" />
    </div>
  );
};

export default Card;
