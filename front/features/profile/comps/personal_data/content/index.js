import Data from "./data-section";
import Security from "./security-section";
import s from "./index.module.scss";

const Content = () => {
  return (
    <section className={`${s.personal}`}>
      <Data />
      <Security />
    </section>
  );
};

export default Content;
