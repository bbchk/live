import s from "./product-header.module.scss";

const ProductHeader = () => {
  return (
    <>
      <div className={`${s.product_header}`}>
        <nav className={`${s.breadcrumbs}`} aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Library</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Data
            </li>
          </ol>
        </nav>
        <div
          className={`btn-group ${s.body}`}
          data-bs-toggle="buttons"
          role="group"
          aria-label="Basic example"
        >
          <p className="fs-3 fw-bold">Пошук за запитом: "Текст запиту"</p>
        </div>
      </div>
    </>
  );
};

export default ProductHeader;
