import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faBug } from "@fortawesome/free-solid-svg-icons";
import Image from "react-bootstrap/Image";
import { useLogout } from "../Context/Context/Users/LogoutContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useUserData } from "../Context/UserDataProvider/UserProvider";
const ProfileCard = () => {
  const { userData } = useUserData();
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const logout = useLogout();
  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
    Cookies.remove("token");
    router.push("/auth/login");
  };

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
      <h6 className="profile-username">@{user?.username}</h6>
      <h6>{user?.email}</h6>
      <h6>{user?.mobile}</h6>
      <h6>{user?.dob}</h6>
      <h6>
        <FontAwesomeIcon
          icon={faCircleCheck}
          style={{ marginRight: "3px" }}
          className={`${user?.kv === 1 ? "kyc-unverified " : "kyc-verified"}`}
        />
        {user?.kv == 1 ? "KYC Verified" : "KYC Unverified"}
      </h6>

      <hr />
      <ul className="balance-enquary">
        <li className="balance-text">Balance</li>
        <li>
          <strong>Deposit: </strong>{" "}
          <span>
            {Number(user?.balance).toFixed(2)} {user?.currency}
          </span>
        </li>
        <li>
          <strong>Withdrawal: </strong> <span>0.00 {user?.currency}</span>
        </li>
        <li>
          <strong>Bonus: </strong>{" "}
          <span>
            {Number(user?.bonus_account).toFixed(2)} {user?.currency}
          </span>
        </li>
        <li>
          <strong>Tramcard: </strong> <span>0.00 {user?.currency}</span>
        </li>
      </ul>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default ProfileCard;
