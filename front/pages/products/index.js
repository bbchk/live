import ProductGallery from "root/features/products/comps/gallery/product-gallery";
import ProductHeader from "root/features/products/comps/gallery/product-header";
import ProductFilter from "root/features/products/comps/gallery/products-filter";
import SortGroup from "root/features/products/comps/gallery/sort-group";

const Products = () => {
  return (
    <div className="mt-5 ">
      <div className="mx-5">
        <ProductHeader />
        <div className="mt-5">
          <SortGroup />
        </div>
      </div>
      <hr className="mt-2 mb-4 splitter " />
      <div className="d-flex ms-3 me-5">
        <div className="me-3">
          <ProductFilter />
        </div>
        <ProductGallery />
      </div>
    </div>
  );
};

export default Products;
