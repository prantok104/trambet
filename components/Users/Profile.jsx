import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faBug } from "@fortawesome/free-solid-svg-icons";
import Image from 'react-bootstrap/Image'
import { getUserDetailsData, userLogout } from '@/services/userAuthService';
import { useLogout } from '../Context/Context/Users/LogoutContext';
const ProfileCard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
      setUser(JSON.parse(localStorage.getItem("userDetails")));
  }, []);

  const logout = useLogout();
  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };
console.log(user)


  return (
    <div className="user-profile-area text-center bg-shadow">
      <Image
        className="img-rounded profile-image"
        src={"/user/profile.png"}
        alt="user"
        roundedCircle
        width={120}
        height={120}
      />
      <span className="is_login_sign"></span>
      <h5>Bettor ID: {user?.user_id}</h5>
      <h6 className="profile-username">@username</h6>
      <h6>{user?.email}</h6>
      <h6>{user?.mobile}</h6>
      <h6>{user?.dob}</h6>
      <h6>
        <FontAwesomeIcon icon={faCircleCheck} className={"kyc-verified"} /> {user?.kv == 1 ? 'KYC Verified' : 'KYC Unverified'}
      </h6>

      <hr />
      <ul className="balance-enquary">
        <li className="balance-text">Balance</li>
        <li>
          <strong>Deposit: </strong> <span>{Number(user?.balance).toFixed(2)} {user?.currency}</span>
        </li>
        <li>
          <strong>Withdrawal: </strong> <span>0.00 {user?.currency}</span>
        </li>
        <li>
          <strong>Bonus: </strong> <span>{Number(user?.bonus_account).toFixed(2)} {user?.currency}</span>
        </li>
        <li>
          <strong>Tramcard: </strong> <span>0.00 {user?.currency}</span>
        </li>
      </ul>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
}

export default ProfileCard