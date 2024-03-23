import s from "./landing_header.module.scss";
import Breadcrumbs from "comps/navigation/breadcrumbs";
import Navigation from "./navigation";

const LandingHeader = ({ category, activeTab }) => {
  return (
    <>
      <div className={`${s.landing_header}`}>
        <Breadcrumbs category={category} />
      </div>
      <Navigation activeTab={activeTab} />
    </>
  );
};

export default LandingHeader;
