import TabLayout from "root/features/profile/comps/tab-layout";

import Data from "root/features/profile/comps/personal_data/data-section";
import Security from "root/features/profile/comps/personal_data/security-section";

const PersonalData = () => {
  return (
    <TabLayout>
      <Data />
      <Security />
    </TabLayout>
  );
};

export default PersonalData;

export { default as getServerSideProps } from "../../utils/auth";
