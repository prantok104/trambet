"use client";

import SideNav from "@/components/Affiliate/SideNav";
// import RegisterUsers from "./register-users";
import Websites from "./websites";
import AffiliatLayout from "./layout";
// import Promotions from "./promotions";
// import CreatePromotionPage from "./create-promotion";

const Affiliate = () => {
  return (
    <>
      <AffiliatLayout>
        <Websites />
      </AffiliatLayout>
    </>
  );
};

export default Affiliate;
