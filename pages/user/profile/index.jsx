
import React from 'react'

import Card from '@/components/Card';
import ProfileCard from '@/components/Users/Profile';
import EditProfileForm from '@/components/Users/EditProfile';
import WarningCard from '@/components/Warning';
const UserProfile = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <ProfileCard />
        </div>
        <div className="col-md-9">
          <div className="user-profile-update-area">
            <WarningCard message="Hello Sir, Please update your KYC verification. Otherwise you have no access to the withdrawal process or bonus process." />
            <Card header={'Profile update'}>
               <EditProfileForm />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile