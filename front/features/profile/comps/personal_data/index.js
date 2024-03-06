import s from "./index.module.scss";
import Tabs from "../tabs/index";
import Content from "./content/index";

const PersonalData = () => {
  return (
    <div className={`${s.profile_layout}`}>
      <Tabs />
      <Content />
    </div>
  );
};

export default PersonalData;
