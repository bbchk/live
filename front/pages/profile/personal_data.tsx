import TabLayout from "features/profile/comps/tab-layout";

import Data from "features/profile/comps/personal_data/data-section";
import Security from "features/profile/comps/personal_data/security-section";
import { Accordion } from "react-bootstrap";
import Head from "next/head";

const PersonalData = () => {
  return (
    <>
        <Head>
  <title> Живий світ | Персональна інформація </title>
  <meta
    name="description"
    content="Живий Світ | Персональна інформація"
  />
</Head>
    
    <TabLayout>
      <div className="accordion d-flex flex-column gap-3" id="accordionExample">
        <Data />
        <Security />
      </div>
    </TabLayout>
    </>
  );
};

export default PersonalData;

export { default as getServerSideProps } from "../../utils/auth";
