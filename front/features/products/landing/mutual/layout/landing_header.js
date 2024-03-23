import s from "./landing_header.module.scss";
import Breadcrumbs from "comps/navigation/breadcrumbs";
import TabsNavigation from "./landing_tabs_navigation";

const LandingHeader = ({ category, activeTab }) => {
  return (
    <div>
      <div className={`${s.landing_header}`}>
        <Breadcrumbs category={category} />
      </div>
      <TabsNavigation activeTab={activeTab} />
    </div>
  );
};

export default LandingHeader;
