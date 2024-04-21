import Image from "next/image";
import React, { createContext, useContext, useEffect, useState } from "react";
import Logo from "@/public/logo.png";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGift,
  faAngleDown,
  faGear,
  faBell,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import LoginPage from "@/components/Auth/Login";
import Clock from "@/components/Clock";
import { setLocal } from "@/components/Helper";
import { LanguageContext } from "@/components/Context/LanguageProvider";
import { HttpClientCall } from "@/components/HTTPClient";
import { getUserDetailsData } from "@/services/userAuthService";
import BetSlip from "@/components/Bets/BetSlip";
import { useLogout } from "@/components/Context/Context/Users/LogoutContext";

const Header = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [registrationModal, setRegistrationModal] = useState(false);
  const handleRegistrationButton = () => {
    setRegistrationModal(true);
  };

  // language
  const language = useContext(LanguageContext);

  // Handle onChange data
  const handleOnChange = (event) => {
    console.log(event.target.value);
  };

  // handle langugae on change
  const handleLanguageOnChange = (event) => {
    const lang = event?.target.value;
    setLocal("language", lang);
  };
  // handle Login Modal
  const handleLoginPageModal = () => {
    setLoginModal(true);
  };

  const [user, setUser] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserDetailsData().then((res) => {
        setUser(res);
      });
      // const data = JSON.parse(localStorage.getItem("user"));
      // console.log(data);
      // setUser(data);
    }
  }, []);

  const logout = useLogout();
  const handleLogout = () => {
    setUser(null);
    logout();
    //use toster for notification
  };

  return (
    <>
      <div className="header">
        <div className="container-fluid">
          <div className="row d-flex align-items-center py-2">
            <div className="col-md-2">
              <Link href={"/"}>
                <Image src={Logo} alt="Logo" className="logo" />
              </Link>
            </div>
            <div className="col-md-2">
              <Link href={"/promotions"} className="promotion">
                <span>
                  <FontAwesomeIcon icon={faGift} />
                </span>
                Promotion and Bonuses
              </Link>
            </div>
            <div className="col-md-8">
              <div className="d-flex align-items-center gap-2 justify-content-end">
                <select onChange={handleOnChange} className="odds-selection">
                  <option value="d">Decimal Odds</option>
                  <option value="f">Fraction Odds</option>
                  <option value="a">American Odds</option>
                </select>

                {/* {user && (
                  <ul className="droplist">
                    <li>
                      <div className="d-flex align-items-center gap-2 bettor-id-look">
                        <span>+ {user.data}</span>
                        <span className="profile-look">
                          <span style={{ fontSize: 9 }}>BDT</span>
                        </span>
                      </div>
                      <ul className="dropdown-menus">
                        <li>
                          <Link href={"/"}>Deposit: + {user.data}</Link>
                        </li>
                        <li>
                          <Link href={"/"}>Withdrawal: + {user.data}</Link>
                        </li>
                        <li>
                          <Link href={"/"}>Bonus: + {user.data}</Link>
                        </li>
                        <li>
                          <Link href={"/"}>Tramcard: + {user.data}</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                )} */}

                <div className="header-timer">
                  <Clock />
                </div>

                {/* Notification area start */}
                {user && (
                  <ul className="droplist">
                    <li>
                      <div>
                        <span className="profile-look notify-bell">
                          <FontAwesomeIcon
                            icon={faBell}
                            style={{ fontSize: 16 }}
                          />
                          <span className="notify-counter">
                            {user.notifications?.total}
                          </span>
                        </span>
                      </div>
                      <ul className="dropdown-menus notifications-list">
                        <li className="d-flex align-items-center justify-content-between notify-head">
                          <span>Notifications</span>{" "}
                          <span>{user.notifications?.total}</span>
                        </li>
                        <li>
                          {user.notifications?.latest &&
                          user.notifications?.latest.length > 0 ? (
                            user.notifications?.latest.map(
                              (notification, index) => (
                                <Link key={index} href={"/"}>
                                  {notification}
                                </Link>
                              )
                            )
                          ) : (
                            <Link href={"/"}>No new notifications</Link>
                          )}
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}
                {/* Notification area end */}

                {/* User profile area start */}
                {user && (
                  <ul className="droplist">
                    <li>
                      <div className="d-flex align-items-center gap-2 bettor-id-look">
                        <span>ID: {user.user_id}</span>
                        <span className="profile-look">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                      </div>
                      <ul className="dropdown-menus">
                        <li>
                          <Link href={"/user/profile"}>My Profile</Link>
                        </li>
                        <li>
                          <Link href={"/user/otp-verify"}>OTP Verify</Link>
                        </li>
                        <li className="sticky-link">
                          <Link
                            href={"/"}
                            className="d-flex align-items-center justify-content-between"
                          >
                            Deposit{" "}
                            <span>
                              <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                          </Link>
                          <ul className="sticky-items">
                            <li>
                              <Link href={"/user/deposit/"}>Deposit Now</Link>
                            </li>
                            <li>
                              <Link href={"/user/deposit/history"}>
                                Deposit History
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="sticky-link">
                          <Link
                            href={"/"}
                            className="d-flex align-items-center justify-content-between"
                          >
                            Withdraw{" "}
                            <span>
                              <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                          </Link>
                          <ul className="sticky-items">
                            <li>
                              <Link href={"/"}>Withdraw Now</Link>
                            </li>
                            <li>
                              <Link href={"/"}>Withdraw History</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link href={"/"}>Bet Slip</Link>
                        </li>
                        <li>
                          <Link href={"/"}>Bet History</Link>
                        </li>
                        <li>
                          <Link href={"/user/casino-history"}>
                            Casino History
                          </Link>
                        </li>
                        <li>
                          <Link href={"/"}>Bonues</Link>
                        </li>
                        <li>
                          <Link href={"/user/tramcard"}>Tramcard</Link>
                        </li>
                        <li>
                          <Link href={"/"}>Apply for Affiliate</Link>
                        </li>
                        <li>
                          <Link
                            href="javascript:void(0)"
                            // type="submit"
                            onClick={handleLogout}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}
                {/* User profile area end */}

                {/* User settings area start */}
                {user && (
                  <ul className="droplist">
                    <li>
                      <span className="profile-look">
                        <FontAwesomeIcon icon={faGear} />
                      </span>
                      <ul className="dropdown-menus">
                        <li>
                          <Link href={"/user/"}>Change Password</Link>
                        </li>
                        <li>
                          <Link href={"/"}>2FA Verification</Link>
                        </li>
                        <li>
                          <Link href={"/"}>Security and privacy</Link>
                        </li>
                        <li>
                          <Link href={"/"}>Support</Link>
                        </li>
                        <li className="sticky-link">
                          <Link
                            href={"/"}
                            className="d-flex align-items-center justify-content-between"
                          >
                            Referral{" "}
                            <span>
                              <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                          </Link>
                          <ul className="sticky-items">
                            <li>
                              <Link href={"/"}>Referred Link</Link>
                            </li>
                            <li>
                              <Link href={"/"}>Referred Users</Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}
                {/* User settings area end */}

                {/* Language area start */}
                <select
                  onChange={handleLanguageOnChange}
                  className="odds-selection"
                >
                  <option value="en" selected={language === "en"}>
                    English
                  </option>
                  <option value="bn" selected={language === "bn"}>
                    Bangla
                  </option>
                </select>
                {/* Language area end */}

                {!user && (
                  <>
                    <button
                      className="df-btn bg-shadow login-btn"
                      onClick={handleLoginPageModal}
                    >
                      Login
                    </button>
                    <button
                      className="df-btn bg-shadow d-flex align-items-center gap-2 reg-btn"
                      onClick={handleRegistrationButton}
                    >
                      <span>
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                      Complete Registration
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <Navbar />
            </div>
          </div>
        </div>
      </div>

      {/* Login page area start */}
      <Modal
        show={loginModal}
        onHide={() => setLoginModal(false)}
        backdrop="static"
        keyboard={false}
        className="login-page"
      >
        <Modal.Header closeButton>
          <Modal.Title>Login to your account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginPage />
        </Modal.Body>
      </Modal>
      {/* Login page area end */}

      {/* Registration modal area start */}
      <Modal
        show={registrationModal}
        onHide={() => setRegistrationModal(false)}
        backdrop="static"
        keyboard={false}
        className="login-page"
      >
        <Modal.Header closeButton>
          <Modal.Title>Registration process</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-around register-area">
            <Link href="/auth/register" className="df-btn reg-btn">
              Full Registration
            </Link>
            <Link href={"/auth/one-click"} className="df-btn reg-btn one-click">
              One click registration
            </Link>
          </div>
        </Modal.Body>
      </Modal>
      {/* Registration modal area end */}

      {/* Bet slip area start */}
      <div className="betslip-area-start">
        <h6>Betslip</h6>
        <BetSlip />
      </div>
      {/* Bet slip area end */}
    </>
  );
};

export default Header;
