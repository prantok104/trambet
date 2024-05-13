import React from "react";
import AffiliatLayout from "../layout";
import WarningCard from "@/components/Warning";
import Card from "@/components/Card";
import EditProfileForm from "@/components/Users/EditProfile";

const ProfileSettingPage = () => {
  return (
    <AffiliatLayout>
      <div className="user-profile-update-area">
        <WarningCard message="Hello Sir, Please update your KYC verification. Otherwise you have no access to the withdrawal process or bonus process." />
        <Card header={"Profile update"}>
          <EditProfileForm />
        </Card>
      </div>
    </AffiliatLayout>
  );
};

export default ProfileSettingPage;
