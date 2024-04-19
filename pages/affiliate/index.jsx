"use client";

import SideNav from "@/components/Affiliate/SideNav";
// import RegisterUsers from "./register-users";
import Websites from "./websites";
// import Promotions from "./promotions";
// import CreatePromotionPage from "./create-promotion";

const Affiliate = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap my-5"></div>
      <div className="row flex-nowrap">
        <SideNav />
        <div className="col py-3">
          {/* <Promotions /> */}
          {/* <CreatePromotionPage /> */}
          {/* <RegisterUsers /> */}
          <Websites />
        </div>
      </div>
    </div>
  );
};

export default Affiliate;
