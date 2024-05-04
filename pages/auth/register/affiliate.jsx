import React from "react";
import AffiliateRegisterForm from "@/components/Auth/AffiliateRegisterForm";
const AffiliateRegister = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div className="p-3 bg-shadow df-radius">
            <h6>Register as Affiliate</h6>
            <hr />
            <AffiliateRegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateRegister;
