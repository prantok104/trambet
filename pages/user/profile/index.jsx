import Image from 'react-bootstrap/Image'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck, faBug
} from "@fortawesome/free-solid-svg-icons";
const UserProfile = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
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
            <h5>Bettor ID: 12345678</h5>
            <h6 className="profile-username">@username</h6>
            <h6>email@example.com</h6>
            <h6>+880 1745 507075</h6>
            <h6>06 July 2001</h6>
            <h6>
              {" "}
              <FontAwesomeIcon
                icon={faCircleCheck}
                className={"kyc-verified"}
              />{" "}
              KYC Verified
            </h6>

            <hr />
            <ul className="balance-enquary">
              <li className="balance-text">Balance</li>
              <li>
                <strong>Deposit: </strong> <span>0.00 BDT</span>
              </li>
              <li>
                <strong>Withdrawal: </strong> <span>0.00 BDT</span>
              </li>
              <li>
                <strong>Bonus: </strong> <span>0.00 BDT</span>
              </li>
              <li>
                <strong>Tramcard: </strong> <span>0.00 BDT</span>
              </li>
            </ul>
            <button className="logout-btn">Logout</button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="user-profile-update-area">
            <div className="profile-warning-message bg-shadow px-4 py-3 d-flex align-items-center  gap-3 mb-2">
              <span>
                <FontAwesomeIcon
                  icon={faBug}
                  className={"warning-icon"}
                />
                    </span>
                    <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit esse laudantium.</span>
            </div>

            <div className="card">
               <div className="card-header"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile