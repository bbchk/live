import Image from "next/image";
import s from "./no_products.module.scss";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { startLoading } from "store/modalSlice";

const NoProductYet = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const goBack = (e) => {
    e.preventDefault();
    dispatch(startLoading());
    router.back();
  };

  return (
    <article className={`${s.no_products} `}>
      <figure>
        <Image
          src={"/assets/empty_shelf.svg"}
          alt="product image"
          width={150}
          height={150}
          quality={100}
          priority
        />
        <figcaption>
          У даній категорій відсутні товари.
          <br /> Пробачте за тимчасові незручності!
        </figcaption>
      </figure>
      <Link
        href={"#"}
        onClick={goBack}
        className="link_primary"
        id="main_content"
      >
        <i className="bi bi-box-arrow-left" />
        <p>Повернутись назад</p>
      </Link>
    </article>
  );
};

export default NoProductYet;
