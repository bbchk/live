import Description from "./description";
import ProductCard from "./product-card";
import Characteristics from "../characteristics/characteristics";

const About = ({ product }) => {
  return (
    <div>
      <ProductCard product={product} />
      <div className="d-flex">
        <div className="w-50">
          <Description product={product} />
          <Characteristics title={"Характеристики:"} product={product} />
        </div>
        {/* <ReviewsList /> */}
      </div>
    </div>
  );
};

export default About;
