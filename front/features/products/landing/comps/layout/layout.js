import Breadcrumbs from "../../../../../comps/breadcrumbs";
import Navigation from "./navigation";

const LandingProuductLayout = ({ children, category, product, activePage }) => {
  return (
    <>
      <div className="">
        <Breadcrumbs category={category} />
        <Navigation
          activePage={activePage}
          category={category}
          product={product}
        />
      </div>
      {children}
    </>
  );
};

export default LandingProuductLayout;
