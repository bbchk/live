import Image from "next/image";
import s from "./cart_item.module.scss";
import { useState } from "react";
import QuantityInput from "./quantity_input";
import { useCart } from "hooks/useCart";

//changin quantity should change the quantity in the cart
//remove functionality
const CartItem = ({ product, quantity }) => {
  // const [quantity, setQuantity] = useState(initq);
  const { removeAll } = useCart();
  return (
    <div className={`${s.cart_item}`}>
      <div>
        <Image
          src={product.images ? product.images[0] : "/images/placeholder.png"}
          alt="Picture of the product"
          width={250}
          height={250}
          priority
        />
        <p>{product.name}</p>
        <button
          onClick={() => {
            console.log("remove");
          }}
        >
          <i className="bi bi-trash" />
        </button>
      </div>
      <div>
        <div className={` ${s.quantity_input}`}>
          <QuantityInput product={product} quantity={quantity} />
        </div>
        <p className={`price ${s.price}`}>
          {product.price * quantity}
          <span>₴</span>
        </p>
      </div>
    </div>
  );
};

export default CartItem;
