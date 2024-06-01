import React from "react";

import Card from "@/components/Card";
import ProfileCard from "@/components/Users/Profile";
import EditProfileForm from "@/components/Users/EditProfile";
import WarningCard from "@/components/Warning";
import { useUserData } from "@/components/Context/UserDataProvider/UserProvider";
import { Spinner } from "react-bootstrap";
const UserProfile = () => {
  const { userData } = useUserData();
  return (
    <div className="container-fluid">
      <div className="row">
       {userData ?  
       <>
       <div className="col-md-3">
          <ProfileCard />
        </div>
        <div className="col-md-9">
          <div className="user-profile-update-area">
            {userData?.kv ==  0 ? (
              <WarningCard message="Hello Sir, Please update your KYC verification. Otherwise you have no access to the withdrawal process or bonus process." />
            ) : ""}
            {userData?.kv ==  2 ? (
              <WarningCard message="Hello Sir, Thanks for your submitting KYC data. Please wait for verification." />
            ) : ""}
            <Card header={"Profile update"}>
              <EditProfileForm />
            </Card>
          </div>
        </div>
       </> : <div className="d-flex align-items-center justify-content-center">
        <Spinner />
        </div>}
      </div>
    </div>
  );
};

export default UserProfile;
