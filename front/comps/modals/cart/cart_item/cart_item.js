import Image from "next/image";
import s from "./cart_item.module.scss";
import { useState } from "react";

//changin quantity should change the quantity in the cart
//remove functionality
const CartItem = ({ product, quantity }) => {
  // const [quantity, setQuantity] = useState(initq);
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
        <div>
          <p>{product.name}</p>
          <p>{product.price * quantity}</p>
        </div>
        <button
          onClick={() => {
            console.log("remove");
          }}
        >
          <i class="bi bi-trash" />
        </button>
      </div>
      <div>
        <div>
          <button
            disabled={quantity === 1}
            // onClick={() => setQuantity(quantity - 1)}
            onClick={() => {}}
          >
            -
          </button>
          <input type="text" value={quantity} readOnly />
          {/* <button onClick={() => setQuantity(quantity + 1)}>+</button> */}
          <button onClick={() => {}}>+</button>
        </div>
        <p>{product.price * quantity}</p>
      </div>
    </div>
  );
};

export default CartItem;
