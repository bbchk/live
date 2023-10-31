import s from "./footer.module.scss";
import AboutUs from "./comps/about_us";
import WorkHours from "./comps/work_hours";
import Contacts from "./comps/contacts";
import Location from "./comps/location";

const Footer = () => (
  <>
    <div className={`${s.decor_line}`}></div>
    <footer className={`${s.footer_container}`}>
      <div className={`row  ${s.footer}`}>
        <div className={`col-sm-12 col-md-6 col-xl-4   ${s.about_us}`}>
          <AboutUs />
        </div>
        <div className={`col-sm-12 col-md-6 col-xl-3 ${s.work_hours}`}>
          <WorkHours />
        </div>

        <div className={`col-sm-12 col-md-6 col-xl-3 ${s.contacts}`}>
          <Contacts />
        </div>

        <div className={`col-sm-12 col-md-6 col-xl-2  ${s.location}`}>
          <Location />
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
